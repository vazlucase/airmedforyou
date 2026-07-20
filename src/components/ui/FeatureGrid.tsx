import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureGrid({
  items,
  columns = 3,
  tone = "light",
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark";
}) {
  const colsClass =
    columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid grid-cols-1 gap-4", colsClass)}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
          <div
            className={cn(
              "flex h-full flex-col gap-4 rounded-3xl p-6 transition-colors duration-300",
              tone === "light"
                ? "border border-ink-500/8 bg-white hover:border-ink-500/15"
                : "glass-dark text-white"
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                tone === "light" ? "bg-red-50 text-red-500" : "bg-white/10 text-white"
              )}
            >
              <item.icon className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3
                className={cn(
                  "text-[1.05rem] font-semibold leading-snug",
                  tone === "light" ? "text-ink-500" : "text-white"
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "text-pretty mt-2 text-sm leading-relaxed",
                  tone === "light" ? "text-ink-400" : "text-white/65"
                )}
              >
                {item.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
