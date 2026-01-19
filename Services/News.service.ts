"use server";
import { NewsClass } from "@/Abstract";
import prisma from "@/lib/db";
import {
  CACHE_KEYS,
  categorySlugUrl,
  envVariables,
  RegisterImageToCdn,
} from "@/lib/utils";
import { AddNewsType } from "@/Types";
import { revalidatePath, revalidateTag } from "next/cache";

export async function RegisterAllNewses() {
  const categorySources = await prisma.categorySources.findMany({
    orderBy: { id: "asc" },
  });

  for (let i = 0; i < categorySources.length; i++) {
    const elem = categorySources[i];
    const categoruSource = new NewsClass(elem);
    await categoruSource.getNewsList();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      categoryName: true,
      id: true,
      _count: {
        select: {
          Newses: true,
        },
      },
    },
  });

  revalidateTag(CACHE_KEYS.CATEGORY_DETAIL, "default");
  revalidateTag(CACHE_KEYS.CATEGORY_LIST, "default");
  revalidateTag(CACHE_KEYS.MOST_READED, "default");
  revalidateTag(CACHE_KEYS.TAB_LIST, "default");

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const pageSize = Math.ceil(Number(category._count) / 12);

    const url = categorySlugUrl({
      categoryName: category.categoryName,
      categoryId: category.id,
    });
    revalidatePath(url);
    for (let k = 1; k <= pageSize; k++) {
      revalidatePath(`${url}/${k}`);
    }
  }
}

export async function DeleteNewsService(id: number) {
  const data = await prisma.newses.delete({ where: { id } });

  if (data && data.imageId) {
    await deleteNewsImageService(data.imageId);
  }

  if (!data) {
    throw new Error("Haber Bulunamadı");
  }

  return data;
}
export async function AddNewsService(item: AddNewsType) {
  return await prisma.newses.create({
    data: {
      content: item.content,
      seoDescription: item.seoDescription,
      seoTitle: item.seoTitle,
      subDescription: item.subDescription,
      title: item.title,
      categoryId: Number(item.categoryId),
      imageId: item.image
        ? await RegisterImageToCdn(item.image, item.title)
        : null,
    },
  });
}

async function deleteNewsImageService(imageId: string) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1/${imageId}`;
  const response = await fetch(url, {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
    },
  });
  await response.json();
}
