import type { StaticImageData } from "next/image";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ServiceSummary {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Tipos de solicitação no assistente de cotação */
export type QuoteRequestType =
  | "emergencia"
  | "transferencia"
  | "executivo"
  | "clubmed";
