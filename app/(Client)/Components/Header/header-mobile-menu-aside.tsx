"use client";
import { Menu } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { categorySlugUrl, cn } from "@/lib/utils";
import { HeaderAsideProps } from "../types";

export default function HeaderMobileMenuAside({
  categories,
}: HeaderAsideProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useLayoutEffect(() => {
    const overFlow = isOpen ? "hidden" : "auto";
    document.body.style.overflow = overFlow;
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={cn(
          "fixed inset-0 z-10 hidden h-full w-full bg-black/30",
          isOpen && "block",
        )}
      ></div>
      <aside
        className={cn(
          "before:w-fullbefore:content-[''] before fixed top-0 bottom-0 -left-full z-30 block w-[250px] overflow-auto overscroll-contain bg-[#010101] p-4 transition-all",
          isOpen && "left-0",
        )}
      >
        <nav className="flex w-full flex-col gap-3">
          <Link
            href={"/"}
            className="block border-b border-[#111] py-2 text-sm text-[#999] uppercase"
            title={"Anasayfa"}
          >
            Anasayfa
          </Link>
          {categories.map((item, index) => (
            <Link
              href={categorySlugUrl({
                categoryName: item.categoryName,
                categoryId: item.id,
              })}
              className="block border-b border-[#111] py-2 text-sm text-[#999] uppercase"
              title={item.categoryName}
              key={index}
            >
              {item.categoryName}
            </Link>
          ))}
        </nav>
      </aside>
      <div
        className="flex items-center gap-2 p-4 xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
        <span className="text-lg font-bold uppercase">Menü</span>
      </div>
    </>
  );
}
