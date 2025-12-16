import { cn } from "@/lib/utils";
import { ContainerWrapperProps } from "../types";

export default function ContainerWrapper({
  children,
  className,
}: ContainerWrapperProps) {
  return (
    <div className={cn("container mx-auto mt-4", className)}>{children}</div>
  );
}
