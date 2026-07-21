import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Percent, PhoneCall, Plane, Stethoscope, Umbrella } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
import heroClub from "@/assets/images/hero-club.jpg";
import suporteUti from "@/assets/images/suporte-uti.jpg";

export const metadata: Metadata = {
  title: "ClubMed — Clube de Benefícios",
  description:
    "O ClubMed é o clube de benefícios da AirMedPlan: assistência de urgência 24h, telemedicina e vantagens em saúde, bem-estar e lazer para você e sua família.",
};

const BENEFITS = [
  {
    icon: PhoneCall,
    title: "Assistência de urgência 24h",
    description: "Uma central sempre disponível para orientar você nos momentos que não podem esperar.",
  },
  {
    icon: Stethoscope,
    title: "Telemedicina",
    description: "Orientação médica por vídeo ou telefone, a qualquer hora, para você e sua família.",
  },
  {
    icon: Percent,
    title: "Condições especiais em remoção aeromédica",
    description: "Membros do ClubMed contam com condições diferenciadas em missões de UTI aérea.",
  },
  {
    icon: Umbrella,
    title: "Bem-estar e lazer",
    description: "Vantagens em parceiros selecionados de saúde, bem-estar e experiências de lazer.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado para a família toda",
    description: "Planos pensados para incluir dependentes, do jeito que a sua família funciona.",
  },
  {
    icon: Plane,
    title: "Parte do ecossistema AirMedPlan",
    description: "O mesmo time que opera UTIs aéreas cuida da experiência do ClubMed, do início ao fim.",
  },
];

export default function ClubMedPage() {
  return (
    <>
      <PageHero
        eyebrow="CLUBE DE BENEFÍCIOS"
        title="Benefícios que vão muito além da saúde."
        description="O ClubMed reúne assistência, telemedicina e vantagens de bem-estar para cuidar da sua rotina — não só das emergências."
        image={heroClub}
        imageAlt="Área de piscina de resort com prédios ao fundo"
      />

      <section className="bg-white py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="O QUE VOCÊ GANHA"
            title="Um clube pensado para o seu dia a dia."
            description="Benefícios que você usa continuamente, com a segurança de saber que a AirMedPlan está por trás de cada um deles."
          />
          <div className="mt-14">
            <FeatureGrid items={BENEFITS} />
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card">
              <Image
                src={suporteUti}
                alt="Cabine de aeronave equipada como UTI aérea, com maca e monitores"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                COMPLEMENTA, NÃO SUBSTITUI
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl font-heading">
                O ClubMed não substitui um plano de saúde.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-granite-600 md:text-lg">
                Ele foi desenhado para complementar sua cobertura atual, somando assistência de
                urgência, telemedicina e vantagens de bem-estar — o suporte que, muitas vezes,
                falta no dia a dia.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Quer conhecer os planos do ClubMed?"
        description="Conte um pouco sobre você e nossa equipe apresenta a melhor opção para sua família."
        quoteLabel="Conhecer o ClubMed"
        whatsappMessage="Olá! Gostaria de conhecer os planos do ClubMed."
      />
    </>
  );
}
