"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { HeaderSeachProps } from "../types";

export default function HeaderSearch({ className }: HeaderSeachProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!isActive) {
      setValue("");
    }
  }, [isActive]);

  return (
    <div className={cn("relative block p-4", className)}>
      <Search onClick={() => setIsActive(!isActive)} />
      <div
        className={cn(
          "bg-theme-secodary border-theme-secodary absolute top-full right-0 hidden w-xs gap-3 border-2 p-2",
          isActive && "animate-fadeUp block",
        )}
      >
        <div className="flex items-center justify-between gap-1 bg-white p-1">
          <input
            type="text"
            placeholder="Arama"
            className="flex-1 border-none p-2 text-sm text-black outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className="bg-theme-primary shrink-0 grow-0 cursor-pointer p-2 text-sm text-white uppercase"
          >
            Arama
          </button>
        </div>
      </div>
    </div>
  );
}
