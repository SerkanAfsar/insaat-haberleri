import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function NewsItemImage({
  thumbnail,
  bigImage,
}: {
  thumbnail: string;
  bigImage: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Image
        src={thumbnail}
        alt="News Image"
        className="cursor-pointer"
        width={200}
        height={150}
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: bigImage }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
      />
    </>
  );
}
