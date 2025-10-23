import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";

interface DatatableColumnHeader<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DatatableColumnHeader<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.getIsSorted() == "asc" ? (
              <ArrowDown />
            ) : column.getIsSorted() == "desc" ? (
              <ArrowUp />
            ) : (
              <ArrowDownUp />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp />
            Artan
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown />
            Azalan
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff />
            Gizle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
