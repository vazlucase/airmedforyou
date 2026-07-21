import type { Metadata } from "next";
import Image from "next/image";
import { Award, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { OPERATION_IMAGE, STATS } from "@/lib/constants";
import operacaoResgate from "@/assets/images/operacao-resgate.jpg";

export const metadata: Metadata = {
  title: "Sobre a AirMedPlan",
  description:
    "Conheça a história da AirMedPlan, fundada por um comandante de operações aéreas, e o ecossistema que reúne UTI aérea, voos executivos e o ClubMed.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Segurança inegociável",
    description: "Cada missão segue protocolos clínicos e operacionais rigorosos, sem exceções.",
  },
  {
    icon: Compass,
    title: "Precisão de comando",
    description: "Decisões tomadas com a mesma disciplina de quem já comandou operações aéreas críticas.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado de ponta a ponta",
    description: "Do primeiro contato à alta do paciente, uma única equipe acompanha toda a jornada.",
  },
  {
    icon: Award,
    title: "Excelência certificada",
    description: "Operação homologada pela ANAC e ANVISA, com supervisão médica pelo CRM.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="SOBRE A AIRMEDPLAN"
        title="Nascemos no comando de operações aéreas — não em uma sala de reunião."
        description="Hoje somos um ecossistema completo de UTI aérea, voos executivos e benefícios, guiado pela mesma disciplina do primeiro voo."
        image={operacaoResgate}
        imageAlt={OPERATION_IMAGE.alt}
      />

      <section className="bg-white py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                A ORIGEM
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl font-heading">
                Uma trajetória construída no ar, antes de ser construída como empresa.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-granite-600 md:text-lg">
                A AirMedPlan foi fundada pelo Cmte. Tadeu Pessoa, com trajetória em comando de
                operações aéreas. Essa vivência — decisões sob pressão, rotas complexas e
                logística exigente — é a base de como operamos até hoje: cada remoção
                aeromédica planejada com o mesmo rigor de uma missão de resgate.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-pretty mt-4 max-w-lg text-base leading-relaxed text-granite-600 md:text-lg">
                Esse know-how se expandiu para os voos executivos e, mais recentemente, para o
                ClubMed — um clube de benefícios que leva o mesmo cuidado para o dia a dia de
                quem confia na gente.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-card">
              <Image
                src={operacaoResgate}
                alt={OPERATION_IMAGE.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-900 py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 hex-bg opacity-30" aria-hidden />
        <Container>
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <StatCounter stat={stat} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="NOSSOS VALORES"
            title="O que guia cada decisão, em terra ou no ar."
            align="center"
            className="mx-auto items-center text-center"
          />
          <div className="mt-14">
            <FeatureGrid items={VALUES} columns={4} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Quer conhecer mais sobre nossa operação?"
        description="Fale com nossa equipe e entenda como podemos ajudar você ou sua empresa."
      />
    </>
  );
}
