"use client";

import { cn, isCurrentItem } from "@/lib/utils";
import { AdminMenuList } from "@/lib/admin.data";
import { ChevronDown, TextAlignJustify } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminTopWrapper from "./admin-top-wrapper";
import { AdminDataType } from "@/Types";

export default function AdminLeftMenu() {
  const [activeItem, setActiveItem] = useState<string>("");

  return (
    <aside className="flex h-full w-[240px] flex-auto shrink-0 grow-0 flex-col border-r text-[#344054]">
      <AdminTopWrapper className="justify-start gap-4 px-5 py-4">
        <TextAlignJustify size={18} />
        <h1 className="text-xl font-bold uppercase">Admin Panel</h1>
      </AdminTopWrapper>
      <div className="flex w-full flex-col gap-1 p-4">
        {AdminMenuList.map((item, key) => (
          <Item
            item={item}
            key={key}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        ))}
      </div>
    </aside>
  );
}

function Item({
  item,
  activeItem,
  setActiveItem,
}: {
  item: AdminDataType;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}) {
  const Icon = item.icon;
  const pathName = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const innerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpened(activeItem == item.title);
  }, [activeItem, setIsOpened, item.title]);

  const height = isOpened ? innerDiv.current?.scrollHeight + "px" : "0px";
  const isCurrent = isCurrentItem(item, pathName);

  return (
    <li className="flex cursor-pointer flex-col gap-2">
      <Link
        onClick={(e) => {
          if (item.subItems && !item.href) {
            e.preventDefault();
            e.stopPropagation();
            setActiveItem(item.title);
            setIsOpened(!isOpened);
          } else {
            setActiveItem(item.title);
          }
        }}
        href={item.href ?? "#"}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md bg-white px-2 py-3 text-sm hover:bg-[#ecf3ff]",
          (isOpened || isCurrent) && "bg-[#ecf3ff]",
        )}
      >
        <span className="flex items-center justify-between gap-2">
          <Icon className="size-4.5" />
          {item.title}
        </span>
        {item.subItems ? (
          <ChevronDown
            className={cn(
              "size-4.5 transition-all duration-300",
              isOpened && "-rotate-180",
            )}
          />
        ) : null}
      </Link>
      {item.subItems && (
        <div
          ref={innerDiv}
          className={cn(
            "h-0 w-full overflow-hidden text-sm transition-all duration-300",
          )}
          style={{ height }}
        >
          <ul className="flex flex-col gap-2 pl-2">
            {item.subItems.map((elem, index) => (
              <Item
                key={index}
                item={elem}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
