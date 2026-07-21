"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "li" | "span" | "p" | "article" | "section";
  once?: boolean;
}

const makeVariants = (y: number, x: number): Variants => ({
  hidden: { opacity: 0, y, x },
  visible: { opacity: 1, y: 0, x: 0 },
});

/**
 * Envolve conteúdo e revela com fade + deslocamento ao entrar na viewport.
 * Corresponde às animações fadeInUp / fadeIn do Amapil.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={makeVariants(y, x)}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </MotionTag>
  );
}
