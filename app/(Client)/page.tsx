import {
  getLastNewsClientService,
  getLastNewsSkippedClientService,
  getSkipped12NewsClientService,
  mostReadedNewsClientService,
} from "@/ClientServices/news.clientservice";
import dynamic from "next/dynamic";

const MainPageContainer = dynamic(
  () => import("./Containers/main-page-container"),
);

export default async function Home() {
  const [lastNewsResult, lastNewsSkipped, mostReaded, mostReaded12Skipped] =
    await Promise.all([
      getLastNewsClientService(),
      getLastNewsSkippedClientService(),
      mostReadedNewsClientService(),
      getSkipped12NewsClientService(),
    ]);

  return (
    <MainPageContainer
      lastNews={lastNewsResult}
      lastSkippedNews={lastNewsSkipped}
      mostReadedNews={mostReaded}
      mostReaded12Skipped={mostReaded12Skipped}
    />
  );
}
