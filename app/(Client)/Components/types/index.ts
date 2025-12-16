import {
  getCategoryListClientService,
  LatestTabListNews,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";

export type ContainerWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export type CustomWrapperProps = {
  children: React.ReactNode;
  component?: React.HTMLElementType;
  className?: string;
};

export type SmallNewsComponentProps = {
  imageId: string | null;
  title: string;
  subDescription?: string;
  createdAt: Date;
  id: number;
  categoryName: string;
};

export type NewsLinkProps = {
  title: string;
  categoryName: string;
  newsId: number;
  children: React.ReactNode;
};

export type SlideNewsItemProps = {
  news: SliderProps["newses"][number];
};

export type SmallSectionTitleProps = {
  title: string;
};

export type SliderProps = {
  newses: any[];
  nextClass?: string;
  prevClass?: string;
};

export type TabListProps = {
  latestNews: Awaited<ReturnType<typeof LatestTabListNews>>;
  popularNews: Awaited<ReturnType<typeof PopularTabListNews>>;
  randomNews: Awaited<ReturnType<typeof RandomTabListNews>>;
};

export type ItemsType = "En Son" | "Popüler" | "Rastege";
export type TabListItemType = Record<ItemsType, TabListProps["latestNews"]>;

export type HeaderContainerProps = {
  categories: Awaited<ReturnType<typeof getCategoryListClientService>>;
};

export type HeaderAsideProps = {
  categories: HeaderContainerProps["categories"];
};

export type HeaderNavProps = {
  categories: HeaderContainerProps["categories"];
};

export type HeaderSeachProps = {
  className: string;
};
