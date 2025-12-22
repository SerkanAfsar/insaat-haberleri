"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import img from "../../../public/error.jpg";
import Image from "next/image";
import ContainerWrapper from "../Components/Common/container-wrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ContainerWrapper className="flex h-full flex-col items-center justify-center">
      <Image
        src={img}
        width={500}
        height={400}
        alt="error"
        className="rounded-md"
      />
      <div className="font-oswald mt-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">HATA!</h2>
        <h3 className="text-xl font-bold">{error.message}</h3>
        <button
          className="bg-primary cursor-pointer rounded-md p-4 font-bold text-white underline"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Yeniden Deneyiniz
        </button>
      </div>
    </ContainerWrapper>
  );
}
