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
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorias de perguntas">
        {categories.map((cat) => {
          const selected = cat.id === active;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200",
                selected
                  ? "border-[#002b60] bg-[#002b60] text-white"
                  : "border-[#b7c8e4] bg-canvas text-[#5a6f92] hover:border-[#002b60] hover:text-[#002b60]"
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