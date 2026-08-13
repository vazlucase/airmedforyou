import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumb,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: StaticImageData;
  imageAlt: string;
  crumb?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="bg-canvas pt-32 md:pt-40">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Trilha de navegação" className="text-sm text-[#002b60]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-opacity hover:opacity-70">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 text-[#002b60]/50" />
            </li>
            <li>
              <Link href="/#servicos" className="transition-opacity hover:opacity-70">
                Serviços
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 text-[#002b60]/50" />
            </li>
            <li aria-current="page">
              <strong>{crumb ?? eyebrow}</strong>
            </li>
          </ol>
        </nav>

        <div
          className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] ${
            compact ? "pb-12 pt-8 md:pb-14" : "pb-14 pt-10 md:pb-16"
          }`}
        >
          <div>
            <h1
              className={`text-balance text-[#002b60] font-heading ${
                compact
                  ? "text-[clamp(1.9rem,5vw,2.6rem)]"
                  : "text-[clamp(2.1rem,6vw,3rem)]"
              } leading-[1.12] tracking-tight`}
            >
              {title}
            </h1>
            {description ? (
              <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-[#002b60]/85 md:text-lg">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          <div className="relative w-full max-w-[660px] justify-self-center overflow-hidden shadow-[0_2px_8px_rgba(0,43,96,0.05),0_20px_50px_-20px_rgba(0,43,96,0.2)]">
            <Image
              src={image}
              alt={imageAlt}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={85}
              className="aspect-[660/472] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
