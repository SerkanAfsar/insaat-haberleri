import { slugUrl } from "@/lib/utils";
import Link from "next/link";
import { NewsLinkProps } from "../types";

export default function NewsLink({
  categoryName,
  newsId,
  title,
  children,
}: NewsLinkProps) {
  const urlSlug = `/haberler/${slugUrl(categoryName)}/${slugUrl(title)}/${newsId}`;
  return (
    <Link
      href={urlSlug}
      className="relative mb-0 block w-full hover:underline"
      title={title}
    >
      {children}
    </Link>
  );
}
