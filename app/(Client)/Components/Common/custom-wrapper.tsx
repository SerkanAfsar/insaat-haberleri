import { cn } from "@/lib/utils";

export type CustomWrapperProps = {
  children: React.ReactNode;
  component?: React.HTMLElementType;
  className?: string;
};
export default function CustomWrapper({
  children,
  component,
  className,
}: CustomWrapperProps) {
  const Component = component || "section";
  return <Component className={cn("w-full", className)}>{children}</Component>;
}
