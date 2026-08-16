import Image from "next/image";
import { ArrowRight, CheckCircle2, HeartHandshake, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import heroEmergencia from "@/assets/images/hero-emergencia.jpg";

const SERVICES_MINI = [
  {
    icon: ShieldCheck,
    title: "UTI Aérea",
    description: "Remoção crítica com equipe médica a bordo, 24h.",
  },
  {
    icon: Plane,
    title: "Voos Executivos",
    description: "Fretamento sob medida, com a mesma segurança de cada missão.",
  },
  {
    icon: HeartHandshake,
    title: "ClubMed",
    description: "Benefícios, bem-estar e experiências para a sua família.",
  },
];

const DIFFERENTIALS = [
  "Regulação médica própria, 24 horas por dia, todos os dias do ano",
  "Protocolo bed-to-bed: estabilidade clínica do leito de origem ao destino",
  "Certificações ANAC, ANVISA e CRM em toda a operação",
  "Atendimento adulto, pediátrico e neonatal, nacional e internacional",
];

export function AboutEcosystem() {
  return (
    <section className="bg-paper py-14 md:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Badge tone="teal">
                <Sparkles className="size-3.5" />
                O ecossistema AirMedPlan
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-4 font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.15rem]">
                Toda a proteção,{" "}
                <span className="text-accent">em um único clube de benefícios.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-pretty text-base leading-relaxed text-ink-muted">
              A AirMedPlan nasceu da experiência de comando em operações aéreas críticas — e hoje
              reúne UTI aérea, voos executivos e o ClubMed em um só lugar, com o mesmo rigor
              técnico do primeiro ao último voo.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* Imagem — a operação que deu origem ao ecossistema */}
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-elevated lg:aspect-auto lg:min-h-full">
              <Image
                src={heroEmergencia}
                alt="Equipe médica embarcando paciente em maca em jato de remoção aeromédica"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Bento — serviços + diferenciais + CTA */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SERVICES_MINI.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.title} delay={0.1 + i * 0.05}>
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white p-5 transition-all duration-300 hover:border-hairline-strong hover:shadow-elevated">
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent via-amber-300 to-amber-200 transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:scale-x-100"
                      />
                      <span className="flex size-10 items-center justify-center rounded-xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-hairline bg-white p-5 transition-all duration-300 hover:shadow-elevated md:p-6">
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {DIFFERENTIALS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                      <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-[#0d1728] p-6 md:flex-row md:items-center md:justify-between md:px-7">
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-48 rounded-full bg-amber-300/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
                <div className="relative">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Conheça o ClubMed — a felicidade que também se planeja.
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                    Saúde, bem-estar e experiências para quem você ama, com vantagens no Salinas
                    Beach Resort.
                  </p>
                </div>
                <Button
                  href="/clubmed"
                  variant="whatsapp"
                  icon={<ArrowRight />}
                  iconPosition="right"
                  className="w-full shrink-0 md:w-auto"
                >
                  Conhecer o ClubMed
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
