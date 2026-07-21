import Image from "next/image";
import { ShieldCheck, Timer, Users2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import heroExecutive from "@/assets/images/hero-executive.jpg";

const POINTS = [
  { icon: Timer, text: "Resposta em minutos, 24h por dia" },
  { icon: ShieldCheck, text: "Equipe médica e aeronaves certificadas" },
  { icon: Users2, text: "Atendimento adulto, pediátrico e neonatal" },
];

export function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 md:py-32">
      <Image
        src={heroExecutive}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.12]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/95 to-navy-900" />

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Badge tone="white">COTE SEU VOO</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.6rem] font-heading">
              Faça sua cotação agora mesmo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Um assistente rápido, pensado para o momento em que você está — seja uma
              emergência ou uma viagem planejada. Sem compromisso.
            </p>
          </Reveal>
          <ul className="mt-8 flex flex-col gap-4">
            {POINTS.map((point, i) => (
              <Reveal key={point.text} delay={0.15 + i * 0.05} as="li">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <point.icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.92rem] text-white/80">{point.text}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <QuoteWizard />
        </Reveal>
      </Container>
    </section>
  );
}
