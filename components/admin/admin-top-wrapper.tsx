import { cn } from "@/lib/utils";
import { ContentType } from "@/Types";

export default function AdminTopWrapper({ children, className }: ContentType) {
  return (
    <div
      className={cn("flex h-16 w-full items-center justify-center", className)}
    >
      {children}
    </div>
  );
}
