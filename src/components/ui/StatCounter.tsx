"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/types";

export function StatCounter({ stat }: { stat: StatItem }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = stat.value;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-semibold leading-none text-white md:text-5xl font-heading"
      >
        {count}
        {stat.suffix ?? ""}
      </motion.span>
      <span className="text-sm font-medium text-white/60">{stat.label}</span>
    </div>
  );
}

export function StatItemStatic({ stat, className }: { stat: StatItem; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <span className="text-4xl font-semibold leading-none text-navy-800 md:text-5xl font-heading">
        {stat.value}
        {stat.suffix ?? ""}
      </span>
      <span className="text-sm font-medium text-granite-400">{stat.label}</span>
    </div>
  );
}
