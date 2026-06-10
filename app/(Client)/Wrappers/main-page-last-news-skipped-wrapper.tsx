import CustomWrapper from "../Components/Common/custom-wrapper";
import { getLastNewsSkippedClientService } from "@/ClientServices/news.clientservice";
import MainPageLastNewsSkipped from "../Sections/MainPage/main-page-last-news-skipped";

type MainPageLastNewsSkippedProps = {
  result: Awaited<ReturnType<typeof getLastNewsSkippedClientService>>;
};

export default async function MainPageLastNewsSkippedWrapper({
  result,
}: MainPageLastNewsSkippedProps) {
  return (
    <CustomWrapper
      className="mt-20 flex flex-col gap-4 xl:flex-row"
      component="section"
    >
      {result.map((item, index) => {
        return <MainPageLastNewsSkipped newsList={item} key={index} />;
      })}
    </CustomWrapper>
  );
}
