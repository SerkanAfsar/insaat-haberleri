import NewsItemComponentOne from "../Common/news-item-component-one";
import { SliderProps } from "../Common/swiper-slide-list";

export default function Slider3Section({ newses }: SliderProps) {
  return (
    <section className="mt-4 flex w-full flex-col justify-between gap-4 md:flex-row">
      {newses.map((item, index) => (
        <NewsItemComponentOne key={index} news={item} />
      ))}
    </section>
  );
}
