import { NEWS_SOURCES } from "@/lib/admin.data";
import prisma from "@/lib/db";
import {
  createNewUrl,
  envVariables,
  getImageTypeFromPath,
  slugUrl,
} from "@/lib/utils";
import { CloudFlareResponseType } from "@/Types";
import { CategorySources } from "@prisma/client";
import { parse } from "node-html-parser";

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
export class NewsClass {
  public categoryNode: string;
  public node: CategorySources;

  constructor(node: CategorySources) {
    this.node = node;
    this.categoryNode =
      NEWS_SOURCES[
        node.sourceSiteName as keyof typeof NEWS_SOURCES
      ].categoryNodeKey;
  }
  public getNewsList = async () => {
    const response = await fetch(this.node.sourceUrl);
    if (response.ok) {
      const result = await response.text();
      const nodeRoot = parse(result);
      const items = nodeRoot.querySelectorAll(this.categoryNode);
      for (let i = 0; i < items.length; i++) {
        const newsList = items[i];
        const url = newsList.getAttribute("href");
        if (url) {
          const newUrl = createNewUrl(url, this.node.sourceUrl);
          await this.getNewsDetail(newUrl);
        }
      }
    }
  };
  private getNewsDetail = async (newsUrl: string) => {
    if (!newsUrl) return;
    const response = await fetch(newsUrl);
    if (response.ok) {
      const result = await response.text();
      const nodeRoot = parse(result);
      const source =
        NEWS_SOURCES[this.node.sourceSiteName as keyof typeof NEWS_SOURCES];
      const title = nodeRoot.querySelector(source.newsDetail.title);
      const subDescription = nodeRoot.querySelector(source.newsDetail.subTitle);
      const content = nodeRoot.querySelector(source.newsDetail.content);
      const imagePath = nodeRoot.querySelector(
        source.newsDetail.imageSourceNode,
      );

      content?.querySelectorAll("iframe").forEach((iframe) => iframe.remove());
      content?.querySelectorAll(".banner").forEach((iframe) => iframe.remove());

      if (!title?.innerText) return;
      if (await this.isExist(title?.innerText)) return;

      await prisma.newses.create({
        data: {
          content: content?.innerHTML ?? "",
          seoTitle: title.innerText,
          seoDescription: title.innerText,
          title: title.innerText,
          categoryId: this.node.categoryId,
          subDescription: subDescription?.innerText ?? "",
          imageId:
            (await this.uploadImage(
              title.innerText,
              imagePath?.getAttribute("src") ?? "",
            )) ?? "",
          updatedAt: new Date(),
        },
      });
    }
  };
  private isExist = async (title: string) => {
    return await prisma.newses.findFirst({
      where: {
        title,
      },
    });
  };

  private async uploadImage(title: string, imagePath: string) {
    if (!imagePath) {
      return null;
    }

    const imageFetchResponse = await fetch(imagePath);

    if (!imageFetchResponse.ok) {
      return null;
    }

    const type = getImageTypeFromPath(imagePath);
    const result = await imageFetchResponse.blob();
    const form = new FormData();
    const file = new File([result], `${slugUrl(title)}.${type}`, {
      type: type,
    });
    form.append("file", file);
    form.append("requireSignedURLs", "false");

    const url = `https://api.cloudflare.com/client/v4/accounts/${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
      },
      body: form,
    });

    if (response.ok) {
      const data: CloudFlareResponseType = await response.json();
      if (!data.success) {
        return null;
      }
      return data.result.id;
    }
    return null;
  }
}
