import Image from "next/image";
import { ArrowRight, ShieldCheck, Timer, Users2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { whatsappHref } from "@/lib/constants";
import heroCitation from "@/assets/images/hero-citation.jpg";

const POINTS = [
  { icon: Timer, text: "Central de atendimento disponível 24 horas" },
  { icon: ShieldCheck, text: "Planejamento clínico e operacional para cada missão" },
  { icon: Users2, text: "Atendimento aeromédico adulto, pediátrico e neonatal" },
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

      <Container className="relative grid grid-cols-1 gap-10 pb-12 pt-[max(8rem,calc(6rem+env(safe-area-inset-top)))] sm:gap-12 md:pb-14 md:pt-[max(10rem,calc(8rem+env(safe-area-inset-top)))] lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)] lg:items-center lg:gap-14 lg:pb-8 lg:pt-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal delay={0.05}>
            <h1 className="text-balance mt-5 font-heading text-[clamp(2.1rem,6vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl">
              Quando o tempo importa, cada etapa exige precisão.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Solicite uma remoção aeromédica ou um voo executivo. Envie a rota e seus dados, e
              nossa equipe retorna pelo WhatsApp com a cotação e os próximos passos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="/cote-seu-voo"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0a1220] transition-all duration-300 hover:bg-white/90 active:scale-[0.97] sm:w-auto"
              >
                Solicitar cotação
                <ArrowRight className="size-4" />
              </a>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.97] sm:w-auto"
              >
                <WhatsAppIcon className="size-4" />
                Falar com a central
              </a>
            </div>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-2.5">
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

        <Reveal delay={0.1} className="grid content-start">
          <QuoteWizard showEmergencyBanner={false} />
        </Reveal>
      </Container>
    </section>
  );
}