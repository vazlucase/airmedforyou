import Image from "next/image";
import { ArrowRight, ShieldCheck, Timer, Users2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { whatsappHref } from "@/lib/constants";
import heroCitation from "@/assets/images/hero-citation.jpg";

const POINTS = [
  { icon: Timer, text: "Resposta em minutos, 24h por dia" },
  { icon: ShieldCheck, text: "Equipe médica e aeronaves certificadas" },
  { icon: Users2, text: "Atendimento adulto, pediátrico e neonatal" },
];

/**
 * Primeira seção da home — fusão do Hero com a cotação: a essência do
 * hero (linha de apoio, título e CTAs) sobre a imagem do Citation II em
 * voo, com o assistente de cotação em evidência ao lado. Mesmo estilo
 * visual de antes, só a organização mudou.
 */
export function QuoteHero() {
  return (
    <section className="relative overflow-hidden bg-[#0d1728]">
      <Image
        src={heroCitation}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover opacity-[0.18]"
        aria-hidden
      />
      <div className="absolute inset-0 editorial-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1220]/75 via-[#0a1220]/25 to-transparent" />

      <Container className="relative grid grid-cols-1 gap-16 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-semibold uppercase tracking-[0.14em] text-white text-[0.68rem] backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-teal-300" />
                <span className="relative inline-flex size-1.5 rounded-full bg-teal-300" />
              </span>
              Cotação em minutos
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance mt-6 font-heading text-[clamp(2.1rem,6vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl">
              Cada minuto importa. Estamos no ar em minutos.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Preencha a cotação ao lado e receba a proposta da UTI aérea ou do voo executivo em
              minutos — 24 horas por dia, sem compromisso.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/cote-seu-voo"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0a1220] transition-all duration-300 hover:bg-white/90 active:scale-[0.97]"
              >
                Cotar remoção agora
                <ArrowRight className="size-4" />
              </a>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
              >
                <WhatsAppIcon className="size-4" />
                Falar agora
              </a>
            </div>
          </Reveal>
          <ul className="mt-10 flex flex-col gap-4">
            {POINTS.map((point, i) => (
              <Reveal key={point.text} delay={0.2 + i * 0.05} as="li">
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