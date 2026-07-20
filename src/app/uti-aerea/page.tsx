import type { Metadata } from "next";
import { Baby, HeartPulse, Plane, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { EmergencyBanner } from "@/components/quote/EmergencyBanner";
import { Reveal } from "@/components/ui/Reveal";
import heroEmergencia from "@/assets/images/hero-emergencia.jpg";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UTI Aérea — Remoção Aeromédica 24h",
  description:
    "Remoção aeromédica de alta complexidade em todo o Brasil. Aeronaves-UTI, equipe médica especializada e regulação 24 horas, com certificação ANAC, ANVISA e CRM.",
};

const CAPABILITIES = [
  {
    icon: HeartPulse,
    title: "Suporte avançado à vida",
    description: "Ventilação mecânica, monitorização multiparamétrica e desfibrilador a bordo.",
  },
  {
    icon: Stethoscope,
    title: "Equipe médica dedicada",
    description: "Médico e enfermeiro especializados em transporte crítico em cada missão.",
  },
  {
    icon: Baby,
    title: "Adulto, pediátrico e neonatal",
    description: "Equipamentos e protocolos específicos para cada faixa etária, incluindo incubadora.",
  },
  {
    icon: ShieldCheck,
    title: "Certificações plenas",
    description: "Operação homologada pela ANAC, ANVISA e supervisão médica pelo CRM.",
  },
  {
    icon: Plane,
    title: "Frota sob demanda",
    description: "Aeronaves compatíveis com pistas curtas e não pavimentadas em toda a Amazônia.",
  },
  {
    icon: Users,
    title: "Acompanhante a bordo",
    description: "Espaço reservado para um acompanhante em praticamente todas as missões.",
  },
];

const STEPS = [
  {
    title: "Contato e regulação médica",
    description:
      "Você aciona a AirMedPlan pelo site, telefone ou WhatsApp. Nossa equipe de regulação avalia o caso com o hospital de origem.",
  },
  {
    title: "Definição da aeronave e equipe",
    description:
      "Com base na condição clínica e na distância, escolhemos a aeronave, os equipamentos e a equipe médica ideais para a missão.",
  },
  {
    title: "Embarque e monitorização contínua",
    description:
      "O paciente é transferido com estabilidade, sob monitorização contínua durante todo o trajeto — do solo ao ar e do ar ao solo.",
  },
  {
    title: "Chegada e transferência ao destino",
    description:
      "Nossa equipe entrega o paciente diretamente à equipe do hospital de destino, com relatório clínico completo da missão.",
  },
];

export default function UtiAereaPage() {
  return (
    <>
      <PageHero
        eyebrow="REMOÇÃO AEROMÉDICA · 24 HORAS"
        title="UTI aérea completa, em qualquer lugar do Brasil."
        description="Transferimos pacientes críticos com o mesmo padrão de cuidado de uma UTI hospitalar — do leito de origem ao leito de destino."
        image={heroEmergencia}
        imageAlt="Equipe médica embarcando paciente em maca em jato de remoção aeromédica"
      />

      <section className="bg-white py-16 md:py-20">
        <Container>
          <Reveal>
            <EmergencyBanner />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white pb-24 md:pb-32">
        <Container>
          <SectionHeading
            eyebrow="CAPACIDADE CLÍNICA"
            title="Uma UTI equipada, a bordo de cada missão."
            description="Cada aeronave é preparada para reproduzir o padrão de uma unidade de terapia intensiva hospitalar."
          />
          <div className="mt-14">
            <FeatureGrid items={CAPABILITIES} />
          </div>
        </Container>
      </section>

      <section className="bg-sky-50 py-24 md:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="COMO FUNCIONA"
            title="Do primeiro contato à chegada ao destino."
            description="Um processo desenhado para reduzir tempo de resposta sem abrir mão de segurança."
          />
          <ProcessSteps steps={STEPS} />
        </Container>
      </section>

      <section className="bg-white py-24 md:py-32">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="DÚVIDAS FREQUENTES" title="Perguntas sobre a UTI Aérea" />
          <div className="mt-12">
            <Accordion items={FAQS} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Precisa de uma remoção aeromédica?"
        description="Fale com nossa central de regulação 24 horas e receba uma resposta em minutos."
        quoteLabel="Cotar remoção agora"
        whatsappMessage="Olá! Preciso de informações sobre remoção aeromédica / UTI Aérea."
      />
    </>
  );
}
