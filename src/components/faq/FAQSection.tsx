"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_CATEGORIES } from "@/lib/faq";

export function FAQSection() {
  const [active, setActive] = React.useState<string>("all");

  const categories = React.useMemo(
    () => [{ id: "all", label: "Todas" }, ...FAQ_CATEGORIES],
    []
  );

  const visibleItems = React.useMemo(() => {
    if (active === "all") {
      return FAQ_CATEGORIES.flatMap((cat) => cat.items);
    }
    return (
      FAQ_CATEGORIES.find((cat) => cat.id === active)?.items ?? []
    );
  }, [active]);

  return (
    <div>
      {/* Filtros de categoria; não são abas porque substituem a lista exibida. */}
      <div className="flex flex-wrap gap-2" aria-label="Categorias de perguntas">
        {categories.map((cat) => {
          const selected = cat.id === active;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(cat.id)}
              className={cn(
                "min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-200",
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-hairline-strong bg-white text-ink-muted hover:border-accent hover:text-accent"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <Accordion items={visibleItems} />
      </div>
    </div>
  );
}