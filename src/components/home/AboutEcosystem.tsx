import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { OPERATION_IMAGE } from "@/lib/constants";

const DIFFERENTIALS = [
  "Regulação médica própria, 24 horas por dia, todos os dias do ano",
  "Protocolo bed-to-bed: estabilidade clínica do leito de origem ao destino",
  "Certificações ANAC, ANVISA e CRM em toda a operação",
  "Atendimento adulto, pediátrico e neonatal, nacional e internacional",
];

export function AboutEcosystem() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-[3/4] shadow-card">
            <Image
              src={OPERATION_IMAGE.src}
              alt={OPERATION_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-lg border border-hairline bg-white/95 p-4 shadow-card backdrop-blur-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-teal-600 font-heading text-xs font-semibold text-white">
                CMTE
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Cmte. Tadeu Pessoa</p>
                <p className="text-xs text-ink-muted">Fundador · comando de operações aéreas</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Badge tone="teal">O ECOSSISTEMA AIRMEDPLAN</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance mt-5 text-3xl font-medium leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.5rem] font-heading">
              Fundada por quem vive a operação aérea — não só a administra.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              A AirMedPlan nasceu da experiência de comando em operações aéreas críticas.
              Hoje reunimos UTI aérea, voos executivos e o ClubMed em um único
              ecossistema, com o mesmo rigor técnico do primeiro ao último voo.
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4">
            {DIFFERENTIALS.map((item, i) => (
              <Reveal key={item} delay={0.12 + i * 0.05} as="li">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                  <span className="text-[0.95rem] leading-relaxed text-ink-soft">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.35}>
            <div className="mt-9">
              <Button href="/sobre" variant="secondary" size="lg">
                Conhecer nossa história
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
