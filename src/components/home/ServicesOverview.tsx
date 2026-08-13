import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-canvas py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="O QUE FAZEMOS"
          title="Três formas de estar no ar quando você mais precisa."
          description="De uma remoção crítica a uma viagem executiva ou um benefício para o dia a dia — a mesma equipe, o mesmo padrão de segurança."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-[20px] shadow-[0_1px_3px_rgba(0,43,96,0.06),0_8px_24px_-12px_rgba(0,43,96,0.1)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,43,96,0.05),0_20px_50px_-20px_rgba(0,43,96,0.18)]"
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-105"
                />
                <div className="absolute inset-0 editorial-overlay transition-opacity duration-500" />
                <div className="relative flex flex-col gap-4 p-9">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/75">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-balance font-heading text-2xl font-medium leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-white/80">
                    {service.description}
                  </p>
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#002b60]">
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
