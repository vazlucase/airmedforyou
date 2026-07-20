import type { Metadata } from "next";
import { Clock3, MessagesSquare, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import heroExecutive from "@/assets/images/hero-executive.jpg";
import type { QuoteRequestType } from "@/types";

export const metadata: Metadata = {
  title: "Cote seu Voo",
  description:
    "Solicite sua cotação de UTI aérea, voo executivo ou ClubMed em poucos passos. Resposta direta pelo WhatsApp, 24 horas por dia.",
};

const QUOTE_FAQS = [
  {
    question: "A cotação tem algum custo?",
    answer: "Não. A cotação é gratuita e sem compromisso, para qualquer um dos nossos serviços.",
  },
  {
    question: "Em quanto tempo recebo uma resposta?",
    answer:
      "Em casos de emergência, o retorno é imediato. Para solicitações agendadas ou voos executivos, normalmente respondemos em poucas horas.",
  },
  {
    question: "Preciso preencher tudo para falar com um atendente?",
    answer:
      "Não. Se preferir, use os botões de emergência no topo da página para falar direto pelo telefone ou WhatsApp a qualquer momento.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim. Usamos suas informações apenas para elaborar sua cotação, conforme nossa Política de Privacidade, alinhada à LGPD.",
  },
];

const VALID_TYPES: QuoteRequestType[] = ["emergencia", "transferencia", "executivo", "clubmed"];

export default async function CoteSeuVooPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const params = await searchParams;
  const tipo = VALID_TYPES.includes(params.tipo as QuoteRequestType)
    ? (params.tipo as QuoteRequestType)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="COTAÇÃO SEM COMPROMISSO"
        title="Cote seu voo em menos de 2 minutos."
        description="Emergência, transferência agendada, voo executivo ou ClubMed — um só formulário, resposta direta no seu WhatsApp."
        image={heroExecutive}
        imageAlt="Interior de jato executivo com poltronas de couro"
        compact
      />

      <section className="bg-mist-50 py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <QuoteWizard defaultRequestType={tipo} />
          </Reveal>

          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-ink-500/8 bg-white p-6">
                <Badge tone="ink">O QUE ACONTECE DEPOIS</Badge>
                <ul className="mt-5 flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <MessagesSquare className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-400">
                      Você é direcionado ao WhatsApp com a mensagem já preenchida — é só enviar.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <Clock3 className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-400">
                      Nossa equipe analisa o caso e retorna com a cotação e os próximos passos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <ShieldCheck className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-400">
                      Aprovando a proposta, iniciamos a regulação médica e a operação imediatamente.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-ink-500 p-6 text-white">
                <p className="text-sm leading-relaxed text-white/80">
                  Certificações ANAC, ANVISA e supervisão médica pelo CRM em cada operação.
                </p>
                <p className="mt-3 font-mono text-2xs uppercase tracking-[0.14em] text-white/50">
                  Atendimento 24 horas, todos os dias
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 md:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink-500 sm:text-4xl">
              Perguntas sobre a cotação
            </h2>
          </Reveal>
          <div className="mt-10">
            <Accordion items={QUOTE_FAQS} />
          </div>
        </Container>
      </section>
    </>
  );
}
