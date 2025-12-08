import { getLastNewsClientService } from "@/ClientServices/news.clientservice";
import MainPageContainer from "./Components/MainPage/main-page-container";

export default async function Home() {
  const [lastNewsResult] = await Promise.all([getLastNewsClientService()]);
  return <MainPageContainer lastNews={lastNewsResult} />;
}
