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
    title: "Bem estar e lazer",
    description: "desfrute você e sua familía de nossos resorts de alto nivel durante suas viagens",
  },
  {
    icon: Stethoscope,
    title: "assitencia medica remota 24h",
    description: "Sua saúde em primeiro lugar através da nossa plataforma de telemedicina 24h.",
  },
  {
    icon: Percent,
    title: "Segurança 24h com nossa UTI Aérea",
    description: "A sua segurança em suas viagens através de nossa UTI Aéria 24h.",
  },
  {
    icon: Umbrella,
    title: "Renda Extra",
    description: "Você aproveita os benefícios, compartilha uma solução que pode interessar a outras pessoas e ainda pode transformar suas indicações em uma nova fonte de renda.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado para a família toda",
    description: "Planos pensados para incluir dependentes, do jeito que a sua família necessita",
  },
  {
    icon: Plane,
    title: "QUERO CONHECER O A CLUB MED →",
    description: "botão call to action"
  },
];

export default function ClubMedPage() {
  return (
    <>
      <PageHero
        eyebrow="CLUBE DE BENEFÍCIOS"
        crumb="ClubMed"
        title="Benefícios que vão muito além da saúde."
        description="O ClubMed reúne assistência, telemedicina e vantagens de bem-estar para cuidar da sua rotina — não só das emergências."
        image={heroClub}
        imageAlt="Área de piscina de resort com prédios ao fundo"
      />

      <section className="bg-canvas py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="alt"
            title="Club Med pensando no seu dia a dia."
            description="É uma combinação poderosa: Experiências + Resorts + Assistência + Segurança Aeromédica + Oportunidade de Renda."
          />
          <div className="mt-14">
            <FeatureGrid items={BENEFITS} />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 md:py-32">
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
              <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
                Conheça todos os benefícios
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl font-heading">
                ClubMed
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
                Um clube para viajar melhor, viver novas experiências, proteger quem você ama e criar novas oportunidades.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Quer conhecer os planos do ClubMed?"
        description="Conte um pouco sobre você e nossa equipe apresenta a melhor opção para sua família."
        quoteLabel="Conhecer o ClubMed"
        whatsappMessage="Olá, Quero Conhecer Melhor o Club Med.
        Pode entrar em contato comigo.
        Aguardo seu contato.
        Obrigado."
      />
    </>
  );
}
