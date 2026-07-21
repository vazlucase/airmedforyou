import type { Metadata } from "next";
import { CalendarClock, Landmark, Lock, MapPinned, PlaneTakeoff, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
import heroExecutive from "@/assets/images/hero-executive.jpg";

export const metadata: Metadata = {
  title: "Voos Executivos",
  description:
    "Fretamento de aeronaves executivas com a agilidade e o rigor operacional da AirMedPlan. Rotas flexíveis, aeroportos alternativos e total privacidade.",
};

const BENEFITS = [
  {
    icon: CalendarClock,
    title: "Agenda sob seu controle",
    description: "Horários definidos por você, sem depender de malha aérea comercial.",
  },
  {
    icon: MapPinned,
    title: "Mais aeroportos disponíveis",
    description: "Acesso a pistas e aeródromos que voos comerciais não alcançam.",
  },
  {
    icon: Lock,
    title: "Privacidade do início ao fim",
    description: "Cabine reservada, ideal para decisões estratégicas ou momentos pessoais.",
  },
  {
    icon: PlaneTakeoff,
    title: "Rotas sob medida",
    description: "Trechos diretos, com ou sem escalas, ajustados à sua necessidade real.",
  },
  {
    icon: Landmark,
    title: "Para empresas e pessoas físicas",
    description: "Contratos corporativos recorrentes ou voos avulsos, com a mesma excelência.",
  },
  {
    icon: Sparkles,
    title: "Mesmo padrão da UTI aérea",
    description: "O rigor operacional e de segurança que aplicamos a missões críticas, em cada voo.",
  },
];

export default function VoosExecutivosPage() {
  return (
    <>
      <PageHero
        eyebrow="AVIAÇÃO EXECUTIVA"
        title="Sua agenda não espera. Seu voo, sob medida."
        description="Fretamento executivo com a pontualidade e a segurança de quem também opera missões médicas críticas."
        image={heroExecutive}
        imageAlt="Interior de jato executivo com poltronas de couro"
      />

      <section className="bg-white py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="POR QUE VOAR COM A AIRMEDPLAN"
            title="Precisão operacional aplicada à aviação executiva."
            description="A mesma central de operações que coordena remoções aeromédicas cuida do seu voo executivo."
          />
          <div className="mt-14">
            <FeatureGrid items={BENEFITS} />
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Reveal>
            <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">
              PARA QUEM É
            </span>
            <h2 className="text-balance mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl font-heading">
              De viagens corporativas a ocasiões que não podem esperar.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-5 text-white/75">
              <li className="border-b border-white/10 pb-5">
                <span className="font-medium text-white">Viagens corporativas</span> — reuniões,
                inaugurações e compromissos em múltiplas cidades no mesmo dia.
              </li>
              <li className="border-b border-white/10 pb-5">
                <span className="font-medium text-white">Grupos pequenos</span> — famílias ou
                equipes que preferem viajar juntas, com privacidade.
              </li>
              <li>
                <span className="font-medium text-white">Ocasiões especiais</span> — compromissos
                em que o tempo de deslocamento faz toda a diferença.
              </li>
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Vamos planejar o seu próximo voo executivo?"
        description="Conte a rota e a data desejada — nossa equipe retorna com uma cotação sem compromisso."
        quoteLabel="Cotar voo executivo"
        whatsappMessage="Olá! Gostaria de cotar um voo executivo."
      />
    </>
  );
}
