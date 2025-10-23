"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BellRing, X } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function LastContactList() {
  const [open, setIsOpened] = useState<boolean>(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setIsOpened}>
        <PopoverTrigger className="relative cursor-pointer rounded-full border p-2">
          <span className="absolute top-0.5 right-0 z-10 flex h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          </span>
          <BellRing />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="font-outfit w-sm p-0"
        >
          <div className="flex flex-col gap-2 py-2">
            <div className="flex items-center justify-between p-3 py-2">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Notifications
              </h5>
              <X
                className="cursor-pointer"
                onClick={() => setIsOpened(false)}
                size={17}
              />
            </div>
            <hr className="mx-3" />
            <ScrollArea className="h-[240px] w-full pb-3">
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
              <div className="notification">
                <b>Serkan Afşar</b>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magni, qui.
                </p>
                <div className="date">12-12-2022</div>
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
