import dynamic from "next/dynamic";
import { SliderProps } from "../../Components/types";

const NewsItemComponentOne = dynamic(
  () => import("../../Components/Common/news-item-component-one"),
);

export default function Slider3Section({
  newses,
  title,
}: SliderProps & { title?: string }) {
  return (
    <>
      {title && (
        <h3 className="font-oswald mt-4 block w-full text-lg font-semibold text-black uppercase">
          {title}
        </h3>
      )}
      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        {newses.map((item, index) => (
          <NewsItemComponentOne key={index} news={item} />
        ))}
      </section>
    </>
  );
}
