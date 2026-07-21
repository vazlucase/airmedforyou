import { cn } from "@/lib/utils";

type BadgeTone = "navy" | "red" | "white" | "ghost";

const TONE_CLASSES: Record<BadgeTone, string> = {
  navy: "bg-navy-100 text-navy-800",
  red: "bg-red-50 text-red-600",
  white: "bg-white/15 text-white backdrop-blur-sm",
  ghost: "bg-transparent text-navy-400 border border-navy-200",
};

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
