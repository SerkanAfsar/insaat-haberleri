import { Metadata } from "next";
import { Suspense } from "react";
import MainPageLastNewsSkippedWrapper from "../Wrappers/main-page-last-news-skipped-wrapper";
import CommonWrapper from "../Wrappers/common-wrapper";
import {
  getLastNewsClientService,
  getLastNewsSkippedClientService,
  getSkipped12NewsClientService,
  mostReadedNewsClientService,
} from "@/ClientServices/news.clientservice";
import SwiperSlideList from "../Components/Common/swiper-slide-list";
import MainPageSkipped12 from "../Sections/MainPage/main-page-skipped-12";

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

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonWrapper
          func={getLastNewsClientService}
          component={SwiperSlideList}
          propName="newses"
          nextClass="next1"
          prevClass="prev1"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonWrapper
          func={getLastNewsSkippedClientService}
          component={MainPageLastNewsSkippedWrapper}
          propName="result"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonWrapper
          func={getLastNewsClientService}
          component={SwiperSlideList}
          propName="newses"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonWrapper
          func={mostReadedNewsClientService}
          component={SwiperSlideList}
          propName="newses"
          nextClass="next2"
          prevClass="prev2"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CommonWrapper
          component={MainPageSkipped12}
          func={getSkipped12NewsClientService}
          propName="items"
        />
      </Suspense>
    </>
  );
}
