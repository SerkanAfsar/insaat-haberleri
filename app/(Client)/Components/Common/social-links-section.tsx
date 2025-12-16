import {
  Facebook,
  MessageCircleHeart,
  Rss,
  Twitter,
  Youtube,
} from "lucide-react";
import dynamic from "next/dynamic";

const SmallSectionTitle = dynamic(() => import("./small-section-title"));

export default function SocialLinksSection() {
  const items = [Facebook, Twitter, Youtube, MessageCircleHeart, Rss];

  return (
    <section className="block w-full">
      <SmallSectionTitle title="Sosyal Medya" />
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {items.map((Component, index) => {
          return (
            <div
              className="hover:bg-theme-primary cursor-pointer border-2 border-black p-2 text-sm transition-all hover:text-white"
              key={index}
            >
              {<Component size={17} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
