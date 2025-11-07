"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OptionsType } from "@/Types";

export type CustomSelectType = {
  value: number | string;
  options: OptionsType[];
  placeholder: string;
  onChange: (item: string | number) => void;
};

export function CustomSelect({
  value: defaultValue,
  options,
  placeholder = "Seçiniz",
  onChange: customChange,
}: CustomSelectType) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | string>(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {options.find((a) => a.value == value)?.label ?? placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command className="w-full">
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList className="w-full">
            <CommandEmpty>Veri Bulunamadı...</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    customChange(
                      options.find((a) => a.label == currentValue)?.value ??
                        defaultValue,
                    );
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
