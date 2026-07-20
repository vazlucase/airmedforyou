"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import type { StatItem } from "@/types";

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 26, stiffness: 90 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  React.useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function StatCounter({ stat }: { stat: StatItem }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-4xl font-medium tracking-tight text-white md:text-5xl">
        {stat.prefix}
        <AnimatedNumber value={stat.value} decimals={stat.decimals} />
        {stat.suffix}
      </p>
      <p className="text-sm leading-snug text-white/65 md:text-[0.95rem]">{stat.label}</p>
    </div>
  );
}
