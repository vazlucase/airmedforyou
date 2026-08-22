"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, RotateCcw, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import {
  quoteFormSchema,
  type QuoteFormSchema,
  type QuoteFormState,
} from "@/lib/validations";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import { EmergencyBanner } from "@/components/quote/EmergencyBanner";
import {
  SectionRequestType,
  SectionRoute,
  SectionContact,
  SectionConsent,
} from "@/components/quote/QuoteWizardSteps";
import { cn } from "@/lib/utils";

/* Estado inicial: nenhum tipo pré-selecionado, o visitante escolhe de verdade. */
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

/**
 * Formulário de cotação em uma única tela: tipo de solicitação, percurso e
 * contato ficam todos visíveis de uma vez, sem etapas. No envio, a mensagem
 * pronta abre no WhatsApp com os dados formatados. Sem cadastro, sem burocracia.
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

  const formRef = React.useRef<HTMLDivElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  const form = useForm<QuoteFormSchema, unknown, QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      ...(DEFAULT_VALUES as unknown as QuoteFormSchema),
      requestType: defaultRequestType ?? (null as QuoteFormSchema["requestType"] | null),
    } as QuoteFormSchema,
    mode: "onTouched",
  });

  /** Envio falhou: leva o foco ao primeiro campo inválido desta instância. */
  function focusFirstError() {
    const firstInvalid = formRef.current?.querySelector<HTMLElement>(
      'fieldset[aria-invalid="true"] input, input[aria-invalid="true"], textarea[aria-invalid="true"], select[aria-invalid="true"]'
    );
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid?.focus({ preventScroll: true });
  }

  async function handleSubmit() {
    // Guarda contra duplo clique: ignora a segunda execução enquanto a
    // primeira estiver validando (evita duas abas wa.me com a mesma cotação).
    if (sending) return;
    setSending(true);

    try {
      await form.handleSubmit(
        (values) => {
          const link = buildQuoteWhatsAppLink(values);
          setSubmitted(true);
          window.open(link, "_blank", "noopener,noreferrer");
          requestAnimationFrame(() => {
            successRef.current?.focus({ preventScroll: true });
          });
        },
        () => {
          requestAnimationFrame(() => focusFirstError());
        }
      )();
    } finally {
      setSending(false);
    }
  }

  function startOver() {
    form.reset({
      ...(DEFAULT_VALUES as unknown as QuoteFormSchema),
      requestType: defaultRequestType ?? (null as QuoteFormSchema["requestType"] | null),
    } as QuoteFormSchema);
    setSubmitted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={formRef} className={cn("flex scroll-mt-24 flex-col gap-4", className)}>
      {showEmergencyBanner ? <EmergencyBanner /> : null}

      <div className="mx-auto w-full max-w-[38rem] rounded-2xl border border-hairline bg-white px-5 py-4 shadow-elevated sm:px-7">
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
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
            className="grid gap-3"
          >
            <SectionContact form={form} />
            <SectionRequestType form={form} />
            <SectionRoute form={form} />
            <SectionConsent form={form} />

            <button
              type="submit"
              disabled={sending}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:bg-accent-strong hover:shadow-card active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60",
                "h-11 sm:h-12"
              )}
            >
              <Send className="size-4" />
              {sending ? "Preparando mensagem..." : "Solicitar cotação pelo WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}