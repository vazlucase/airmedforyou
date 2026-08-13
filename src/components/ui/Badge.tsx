import { cn } from "@/lib/utils";

type BadgeTone = "teal" | "neutral" | "ember" | "light" | "ghost";

const TONE_CLASSES: Record<BadgeTone, string> = {
  teal: "bg-[#e0edff] text-[#002b60]",
  neutral: "bg-[#f4f8ff] text-[#002b60] border border-[#d2e3fb]",
  ember: "bg-ember-100 text-ember-700",
  light: "bg-white/12 text-white backdrop-blur-sm",
  ghost: "bg-transparent text-[#002b60] border border-[#002b60]/40",
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
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
