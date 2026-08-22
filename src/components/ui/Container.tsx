import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1250px] px-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-[max(2.5rem,env(safe-area-inset-left))] md:pr-[max(2.5rem,env(safe-area-inset-right))]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
