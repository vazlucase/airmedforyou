import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "red" | "ink" | "sky" | "white" | "whatsapp";

const TONE_CLASSES: Record<Tone, string> = {
  red: "bg-red-50 text-red-600",
  ink: "bg-ink-50 text-ink-500",
  sky: "bg-sky-100 text-sky-600",
  white: "bg-white/15 text-white",
  whatsapp: "bg-whatsapp/10 text-whatsapp-dark",
};

export function Badge({
  children,
  tone = "red",
  className,
  icon,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-2xs font-medium uppercase tracking-[0.14em]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
