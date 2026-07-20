import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Solicitação", "Rota", "Detalhes", "Contato"];

export function QuoteProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEP_LABELS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "upcoming";
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors duration-300 md:size-9",
                  state === "done" && "bg-red-500 text-white",
                  state === "active" && "bg-ink-500 text-white",
                  state === "upcoming" && "bg-ink-50 text-ink-300"
                )}
              >
                {state === "done" ? <Check className="size-3.5" strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-2xs font-medium uppercase tracking-[0.08em] sm:block",
                  state === "upcoming" ? "text-ink-300" : "text-ink-500"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 ? (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition-colors duration-500 md:mx-3",
                  i < current ? "bg-red-500" : "bg-ink-100"
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
