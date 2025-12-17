import Image from "next/image";
import img from "../../public/notfound.jpg";
export default function NotFound() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Image src={img} alt="Not Found" width={500} height={400} />
    </section>
  );
}
