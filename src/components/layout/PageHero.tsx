import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: StaticImageData;
  imageAlt: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        compact ? "min-h-[62vh]" : "min-h-[78vh]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 amapil-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-transparent to-transparent" />

      <Container className="relative pb-16 pt-40 md:pb-20 md:pt-48">
        <Badge tone="white" className="mb-5">
          {eyebrow}
        </Badge>
        <h1 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl font-heading">
          {title}
        </h1>
        {description ? (
          <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
