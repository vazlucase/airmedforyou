"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const isOpen = open === item.question;
        return (
          <div
            key={item.question}
            className={cn(
              "border-b border-hairline transition-colors duration-300 first:border-t",
              isOpen && "border-accent"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.question)}
              className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left sm:px-2"
            >
              <span className="font-heading text-base font-semibold leading-snug text-ink sm:text-lg">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-ink-faint transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-6 sm:px-2">
                    <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
