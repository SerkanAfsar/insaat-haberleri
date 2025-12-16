import { cn } from "@/lib/utils";
import { CustomWrapperProps } from "../types";

export default function CustomWrapper({
  children,
  component,
  className,
}: CustomWrapperProps) {
  const Component = component || "section";
  return <Component className={cn("w-full", className)}>{children}</Component>;
}
