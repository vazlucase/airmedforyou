import type { Metadata } from "next";
import {
  Baby,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  PhoneCall,
  Plane,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
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
    icon: PhoneCall,
    title: "Solicitação de remoção",
    description:
      "Paciente, familiar ou representante entra em contato com nossa Central de Fretamento, disponível 24 horas por dia, 7 dias por semana, para solicitar um orçamento.",
  },
  {
    icon: Stethoscope,
    title: "Regulação médica",
    description:
      "Nossos médicos reguladores avaliam o caso em comunicação com a equipe do hospital de origem, garantindo uma remoção aérea segura e adequada ao quadro clínico.",
  },
  {
    icon: ClipboardList,
    title: "Planejamento da missão",
    description:
      "Definimos a aeronave, a escala da tripulação, a equipe médica e o acionamento das ambulâncias de origem e destino, com todas as autorizações e o planejamento operacional.",
  },
  {
    icon: Plane,
    title: "Execução do voo",
    description:
      "Realizamos o transporte aeromédico com suporte completo de UTI aérea. Durante toda a missão, o paciente permanece acompanhado pela equipe médica que monitora continuamente o quadro clínico.",
  },
  {
    icon: HeartPulse,
    title: "Entrega ao destino",
    description:
      "O paciente é transferido com estabilidade para a equipe do hospital de destino, em protocolo bed-to-bed — do leito de origem ao leito de destino, sem interrupção do cuidado.",
  },
  {
    icon: CheckCircle2,
    title: "Pós-voo e acompanhamento",
    description:
      "Após a conclusão da missão, elaboramos todos os relatórios operacionais e médicos referentes ao voo e realizamos pesquisas de satisfação para melhoria contínua.",
  },
];

export default function UtiAereaPage() {
  return (
    <>
      <PageHero
        eyebrow="REMOÇÃO AEROMÉDICA · 24 HORAS"
        crumb="UTI Aérea"
        title="UTI aérea completa, em qualquer lugar do Brasil."
        description="Transferimos pacientes críticos com o mesmo padrão de cuidado de uma UTI hospitalar — do leito de origem ao leito de destino."
        image={heroEmergencia}
        imageAlt="Equipe médica embarcando paciente em maca em jato de remoção aeromédica"
      />

      <section className="bg-canvas py-14 md:py-16">
        <Container>
          <Reveal>
            <EmergencyBanner />
          </Reveal>
        </Container>
      </section>

      <section className="bg-canvas pb-24 md:pb-32">
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

      {/* Fluxo de Atendimento — 6 etapas em 2 linhas de 3 */}
      <section className="border-t border-hairline bg-paper py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="COMO FUNCIONA"
            title="Fluxo de Atendimento"
            description="Um processo desenhado para reduzir o tempo de resposta sem abrir mão de segurança — da solicitação ao pós-voo."
            align="center"
            className="mx-auto items-center text-center"
          />
          <div className="mt-16">
            <ProcessSteps steps={STEPS} />
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-24 md:py-32">
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
