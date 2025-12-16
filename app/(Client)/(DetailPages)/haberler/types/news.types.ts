export type NewsDetailProps = {
  title: string;
  subDescription: string;
  imageId: string | null;
  createdAt: Date;
  content: any;
};

export type DetailPageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
};
