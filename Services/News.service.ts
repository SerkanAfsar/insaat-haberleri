import { NEWS_SOURCES } from "@/lib/admin.data";
import prisma from "@/lib/db";
import { createNewUrl } from "@/lib/utils";
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
          imageId: "",
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
}
