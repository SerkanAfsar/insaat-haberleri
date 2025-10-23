export type EnvData = {
  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
};

export type ContentType = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;
