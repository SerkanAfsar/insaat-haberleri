"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  Info,
  LogOut,
  Settings,
  UserRoundPen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { logOut } from "@/lib/auth";

export default function UserInfo() {
  const [opened, setIsOpened] = React.useState<boolean>(false);
  return (
    <DropdownMenu defaultOpen={opened} onOpenChange={setIsOpened}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex cursor-pointer items-center gap-2 active:bg-none"
        >
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="flex items-center gap-1 text-sm">
            Serkan Afşar{" "}
            <ChevronDown
              size={50}
              className={cn(
                "size-5 text-lg transition-all",
                opened && "-rotate-180",
              )}
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[260px]">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-theme-sm block font-medium text-gray-700 dark:text-gray-400">
            Serkan Afşar
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            serkanafsar84@gmail.com
          </span>
        </DropdownMenuLabel>
        <div className="m-6 mt-6 ml-6 flex w-full flex-col gap-6 text-sm">
          <Link href={"/"} className="flex items-center gap-2">
            <UserRoundPen className="size-5" />
            <span>Profili Güncelle</span>
          </Link>
          <Link href={"/"} className="flex items-center gap-2">
            <Settings className="size-5" />
            <span>Hesap Ayarları</span>
          </Link>
          <Link href={"/"} className="flex items-center gap-2">
            <Info className="size-5" />
            <span>Destek</span>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <Link
          href={"/"}
          onClick={async (e) => {
            e.preventDefault();
            await logOut();
          }}
          className="flex items-center gap-2 px-7 py-2"
        >
          <LogOut className="size-5" />
          <span>Çıkış</span>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
