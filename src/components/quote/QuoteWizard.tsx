"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronLeft, RotateCcw, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import {
  quoteFormSchema,
  SECTION_FIELDS,
  type QuoteFormSchema,
  type QuoteFormState,
} from "@/lib/validations";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import { EmergencyBanner } from "@/components/quote/EmergencyBanner";
import { SectionRequestType, SectionRoute, SectionContact } from "@/components/quote/QuoteWizardSteps";
import { cn } from "@/lib/utils";

/* Estado inicial: nenhum tipo pré-selecionado — o visitante escolhe de verdade. */
const DEFAULT_VALUES: QuoteFormState = {
  requestType: null,
  origin: "",
  destination: "",
  tripType: "percurso",
  preferredDate: "",
  patientMobility: undefined,
  passengers: "1",
  notes: "",
  fullName: "",
  phone: "",
  email: "",
  consent: false,
};

/** Ids dos headings de cada seção (aria-labelledby + foco pós-transição). */
const SECTION_IDS: Record<0 | 1 | 2, string> = {
  0: "quote-request-heading",
  1: "quote-route-heading",
  2: "quote-contact-heading",
};
const SECTION_NAMES: Record<0 | 1 | 2, string> = {
  0: "Solicitação",
  1: "Percurso",
  2: "Contato",
};

/** Slide + fade por seção — a direção define de onde o painel vem. */
const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -44 : 44 }),
};

/**
 * Assistente de cotação em fluxo contínuo: uma seção por vez (Solicitação →
 * Percurso → Contato), sem etapas numeradas. Ao escolher o tipo de
 * solicitação, o formulário avança sozinho; uma barra fina mostra o progresso
 * e o envio vai para o WhatsApp com a mensagem formatada. Sem cadastro,
 * sem burocracia.
 */
export function QuoteWizard({
  showEmergencyBanner = true,
  className,
  defaultRequestType,
}: {
  showEmergencyBanner?: boolean;
  className?: string;
  defaultRequestType?: QuoteFormSchema["requestType"];
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [active, setActive] = React.useState<0 | 1 | 2>(defaultRequestType ? 1 : 0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  /** Flag de primeira validação (onMount) — garante que nenhum campo pré-preenchido seja exibido como "já validado" antes do toque do usuário. */
  const firstValidation = React.useRef(false);

  const formRef = React.useRef<HTMLDivElement>(null);
  const requestRef = React.useRef<HTMLElement>(null);
  const routeRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  const form = useForm<QuoteFormSchema, unknown, QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      ...(DEFAULT_VALUES as unknown as QuoteFormSchema),
      requestType: defaultRequestType ?? (null as QuoteFormSchema["requestType"] | null),
    } as QuoteFormSchema,
    mode: "onTouched",
  });

  // Depois da transição, leva o foco ao título da seção atual (leitura e
  // navegação por teclado acompanham a mudança de painel).
  React.useEffect(() => {
    if (submitted) return;
    const t = window.setTimeout(() => {
      document.getElementById(SECTION_IDS[active])?.focus({ preventScroll: true });
    }, 320);
    return () => window.clearTimeout(t);
  }, [active, submitted]);

  function goTo(next: 0 | 1 | 2, dir: 1 | -1) {
    setDirection(dir);
    setActive(next);
  }

  function handleBack() {
    if (active === 0) return;
    goTo((active - 1) as 0 | 1, -1);
  }

  /** Validação falhou: rola até a seção e leva o foco ao bloco com erro. */
  function focusSectionError(step: 0 | 1 | 2) {
    const ref = step === 0 ? requestRef : step === 1 ? routeRef : contactRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    ref.current?.focus({ preventScroll: true });
  }

  async function handleContinue() {
    const ok = await form.trigger([...SECTION_FIELDS[1]]);
    if (!ok) {
      focusSectionError(1);
      return;
    }
    goTo(2, 1);
  }

  async function handleSubmit() {
    // Guarda contra duplo clique: ignora a segunda execução enquanto a
    // primeira estiver validando (evita duas abas wa.me com a mesma cotação).
    if (sending) return;
    setSending(true);

    try {
      const ok = await form.trigger([...SECTION_FIELDS[2]]);
      if (!ok) {
        focusSectionError(2);
        return;
      }
      const values = form.getValues();
      const link = buildQuoteWhatsAppLink(values);
      setSubmitted(true);
      window.open(link, "_blank", "noopener,noreferrer");
      // Anuncia a transição para leitores de tela e leva o foco ao título
      // (o botão de envio sai do DOM no novo estado).
      requestAnimationFrame(() => {
        successRef.current?.focus({ preventScroll: true });
      });
    } finally {
      setSending(false);
    }
  }

  /** Escolher o tipo de solicitação avança sozinho para o percurso. */
  /** Escolher o tipo de solicitação avança sozinho para o percurso. */
  function handleTypeSelect() {
    // O schema exige requestType válido; como nenhum tipo nasce pré-selecionado,
    // ao escolher o valor já é válido — o trigger limpa o erro antes de avançar.
    void form.trigger("requestType");
    window.setTimeout(() => goTo(1, 1), 220);
  }

  function startOver() {
    firstValidation.current = true;
    form.reset({ ...(DEFAULT_VALUES as unknown as QuoteFormSchema) });
    setSubmitted(false);
    setActive(defaultRequestType ? 1 : 0);
    setDirection(1);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const progress = ((active + 1) / 3) * 100;

  return (
    <div ref={formRef} className={cn("flex scroll-mt-24 flex-col gap-4", className)}>
      {showEmergencyBanner ? <EmergencyBanner /> : null}

      <div className="rounded-2xl border border-hairline bg-white p-4 shadow-elevated sm:p-6 md:p-8">
        {submitted ? (
          <div aria-live="polite" className="flex flex-col items-center py-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-accent-tint text-accent">
              <CheckCircle2 className="size-8" strokeWidth={1.5} />
            </span>
            <h2
              ref={successRef}
              tabIndex={-1}
              className="mt-5 font-heading text-xl font-semibold text-ink outline-none"
            >
              Sua solicitação está pronta!
            </h2>
            <p className="text-pretty mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
              Abrimos o WhatsApp com sua mensagem preenchida. Se a janela não abriu, use o botão
              abaixo para enviar manualmente.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  const link = buildQuoteWhatsAppLink(form.getValues());
                  window.open(link, "_blank", "noopener,noreferrer");
                }}
                className="whatsapp-gradient inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all hover:brightness-105"
              >
                <WhatsAppIcon className="size-4" />
                Abrir WhatsApp novamente
              </button>
              <button
                type="button"
                onClick={startOver}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-hairline-strong px-6 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                <RotateCcw className="size-4" />
                Nova cotação
              </button>
            </div>
          </div>
        ) : (
          <MotionConfig reducedMotion="user">
            {/* Progresso anônimo: barra fina, sem números nem etapas */}
            <div aria-hidden className="mb-6 h-1 w-full overflow-hidden rounded-full bg-hairline max-sm:mb-4">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>

            {/* Anúncio do painel atual para leitores de tela */}
            <span aria-live="polite" className="sr-only">
              {SECTION_NAMES[active]}
            </span>

            {active > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="-mx-1 mb-4 inline-flex min-h-11 items-center gap-1 rounded-lg px-1 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
              >
                <ChevronLeft className="size-4" />
                Voltar
              </button>
            ) : null}

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === 0 ? (
                  <section
                    ref={requestRef}
                    aria-labelledby="quote-request-heading"
                    tabIndex={-1}
                    className="scroll-mt-24 outline-none focus:outline-none"
                  >
                    <SectionRequestType form={form} onSelect={handleTypeSelect} />
                  </section>
                ) : active === 1 ? (
                  <section
                    ref={routeRef}
                    aria-labelledby="quote-route-heading"
                    tabIndex={-1}
                    className="scroll-mt-24 outline-none focus:outline-none"
                  >
                    <SectionRoute form={form} />
                  </section>
                ) : (
                  <section
                    ref={contactRef}
                    aria-labelledby="quote-contact-heading"
                    tabIndex={-1}
                    className="scroll-mt-24 outline-none focus:outline-none"
                  >
                    <SectionContact form={form} />
                  </section>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Rodapé por seção */}
            {active === 0 ? (
              <p className="mt-6 text-center text-sm text-ink-muted max-sm:mt-5">
                Toque em uma opção para continuar — leva menos de um minuto.
              </p>
            ) : null}
            {active === 1 ? (
              <div className="mt-7 flex flex-col gap-2 border-t border-hairline pt-6 max-sm:mt-5 max-sm:pt-4">
                <button
                  type="button"
                  onClick={() => void handleContinue()}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-strong active:scale-[0.97]"
                >
                  <ArrowRight className="size-4" />
                  Continuar
                </button>
                <p className="text-center text-xs text-ink-muted">
                  Sem compromisso — resposta em poucos minutos.
                </p>
              </div>
            ) : null}
            {active === 2 ? (
              <div className="mt-7 flex flex-col gap-2 border-t border-hairline pt-6 max-sm:mt-5 max-sm:pt-4">
                <button
                  type="button"
                  disabled={sending}
                  onClick={() => void handleSubmit()}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 text-sm font-semibold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:bg-accent-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-4" />
                  Enviar pelo WhatsApp
                </button>
                <p className="text-center text-xs text-ink-muted">
                  Ao enviar, a mensagem pronta abre no seu WhatsApp — sem compromisso.
                </p>
              </div>
            ) : null}
          </MotionConfig>
        )}
      </div>
    </div>
  );
}