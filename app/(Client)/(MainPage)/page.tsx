import {
  getLastNewsClientService,
  getLastNewsSkippedClientService,
  getSkipped12NewsClientService,
  mostReadedNewsClientService,
} from "@/ClientServices/news.clientservice";

import { Metadata } from "next";

import Slider3Section from "../Sections/MainPage/slider-3-section";
import CustomWrapper from "../Components/Common/custom-wrapper";
import MainPageLastNewsSkipped from "../Sections/MainPage/main-page-last-news-skipped";
import MainPageSkipped12 from "../Sections/MainPage/main-page-skipped-12";
import SwiperSlideList from "../Components/Common/swiper-slide-list";

export const metadata: Metadata = {
  title: "Güncel İnşaat Haberleri | İnşaat Haberleri",
  description: "Güncel İnşaat Haberleri | İnşaat Haberleri",
  robots: "index,follow",
  publisher: "İnşaat Haberleri",
  authors: [
    {
      name: "İnşaat Haberleri",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  ],

  openGraph: {
    title: "Güncel İnşaat Haberleri | İnşaat Haberleri",
    description: "Güncel İnşaat Haberleri | İnşaat Haberleri",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    locale: "tr_TR",
    siteName: "İnşaat Haberleri",
    authors: ["İnşaat Haberleri"],
    emails: ["info@insaathaberleri.org"],
  },

  twitter: {
    card: "summary",
    description: "Güncel İnşaat Haberleri | İnşaat Haberleri",
    title: "Güncel İnşaat Haberleri | İnşaat Haberleri",
    creator: "@insaathaberleri",
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default async function Home() {
  const [lastNewsResult, lastNewsSkipped, mostReaded, mostReaded12Skipped] =
    await Promise.all([
      getLastNewsClientService(),
      getLastNewsSkippedClientService(),
      mostReadedNewsClientService(),
      getSkipped12NewsClientService(),
    ]);

  return (
    <>
      <SwiperSlideList
        newses={lastNewsResult.slice(0, 3)}
        nextClass="next1"
        prevClass="prev1"
        key={0}
      />
      <Slider3Section newses={lastNewsResult.slice(3, 6)} key={1} />
      <CustomWrapper
        className="mt-20 flex flex-col gap-4 xl:flex-row"
        component="section"
      >
        {lastNewsSkipped.map((item, index) => {
          return <MainPageLastNewsSkipped newsList={item} key={index} />;
        })}
      </CustomWrapper>
      <SwiperSlideList
        newses={mostReaded}
        nextClass="next2"
        prevClass="prev2"
      />
      <MainPageSkipped12
        items={mostReaded12Skipped}
        className="mt-20 block"
        key={4}
      />
    </>
  );
}
