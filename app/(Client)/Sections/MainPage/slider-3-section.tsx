import dynamic from "next/dynamic";
import { SliderProps } from "../../Components/Common/swiper-slide-list";

const NewsItemComponentOne = dynamic(
  () => import("../../Components/Common/news-item-component-one"),
);

export default function Slider3Section({ newses }: SliderProps) {
  return (
    <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
      {newses.map((item, index) => (
        <NewsItemComponentOne key={index} news={item} />
      ))}
    </section>
  );
}
