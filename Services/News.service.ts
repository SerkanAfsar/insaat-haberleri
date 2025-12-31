"use server";
import { NewsClass } from "@/Abstract";
import prisma from "@/lib/db";
import { envVariables, RegisterImageToCdn } from "@/lib/utils";
import { AddNewsType } from "@/Types";

export async function RegisterAllNewses() {
  const categorySources = await prisma.categorySources.findMany({
    orderBy: { id: "asc" },
  });

  for (let i = 0; i < categorySources.length; i++) {
    const elem = categorySources[i];
    const categoruSource = new NewsClass(elem);
    await categoruSource.getNewsList();
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
