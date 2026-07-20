"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { HERO_SLIDES, whatsappHref } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

const SLIDE_DURATION = 6000;

export function Hero() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const slide = HERO_SLIDES[index % HERO_SLIDES.length]!;

  React.useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, index]);

  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900"
      aria-roledescription="carrossel"
      aria-label="Destaques AirMedPlan"
    >
      {/* Camada de imagens de fundo */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: reduceMotion ? 1 : 1.09 }}
              transition={{ duration: (SLIDE_DURATION / 1000) + 1, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 via-ink-900/10 to-transparent" />
      </div>

      <Container className="relative flex w-full flex-col gap-10 pb-16 pt-40 md:pb-20 md:pt-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 font-mono text-2xs font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-red-400" />
                <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
              </span>
              {slide.eyebrow}
            </span>
            <h1 className="text-balance mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
              {slide.title}
            </h1>
            <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={slide.ctaHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-500 px-7 text-[0.95rem] font-medium text-white shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-red-600 active:scale-[0.96]"
              >
                {slide.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium text-white transition-all duration-300 hover:bg-white/15 active:scale-[0.96]"
              >
                <WhatsAppIcon className="size-4" />
                Falar agora
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores / progresso do carrossel */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative h-1 flex-1 max-w-16 overflow-hidden rounded-full bg-white/20"
              aria-label={`Mostrar destaque: ${s.eyebrow}`}
              aria-current={i === index}
            >
              {i === index ? (
                <motion.span
                  key={`${slide.id}-progress`}
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? undefined : 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              ) : i < index ? (
                <span className="absolute inset-0 rounded-full bg-white/60" />
              ) : null}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
