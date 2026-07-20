import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="O QUE FAZEMOS"
          title="Três formas de estar no ar quando você mais precisa."
          description="De uma remoção crítica a uma viagem executiva ou um benefício para o dia a dia — a mesma equipe, o mesmo padrão de segurança."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-ink-900/5 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="relative flex flex-col gap-3 p-7">
                  <span className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-white/70">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-white/70">
                    {service.description}
                  </p>
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-ink-500">
                    Saiba mais
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
