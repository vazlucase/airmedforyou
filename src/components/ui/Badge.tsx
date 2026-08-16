import { cn } from "@/lib/utils";

type BadgeTone = "teal" | "neutral" | "ember" | "light" | "ghost";

const TONE_CLASSES: Record<BadgeTone, string> = {
  teal: "bg-accent-tint text-accent",
  neutral: "bg-white text-ink border border-hairline-strong",
  ember: "bg-ember-50 text-ember-700 border border-ember-100",
  light: "bg-white/10 text-white backdrop-blur-sm",
  ghost: "bg-transparent text-ink border border-hairline-strong",
};

export function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
