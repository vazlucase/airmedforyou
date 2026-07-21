"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { quoteFormSchema, STEP_FIELDS, type QuoteFormSchema } from "@/lib/validations";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { EmergencyBanner } from "@/components/quote/EmergencyBanner";
import { StepRequestType, StepRoute, StepNotes, StepContact } from "@/components/quote/QuoteWizardSteps";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 4;

const DEFAULT_VALUES: QuoteFormSchema = {
  requestType: "emergencia",
  origin: "",
  destination: "",
  tripType: "so-ida",
  preferredDate: "",
  patientMobility: undefined,
  passengers: "1",
  notes: "",
  fullName: "",
  phone: "",
  email: "",
  consent: false,
};

export function QuoteWizard({
  showEmergencyBanner = true,
  className,
  defaultRequestType,
}: {
  showEmergencyBanner?: boolean;
  className?: string;
  defaultRequestType?: QuoteFormSchema["requestType"];
}) {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  const form = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      requestType: defaultRequestType ?? DEFAULT_VALUES.requestType,
    },
    mode: "onTouched",
  });

  async function goNext() {
    const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS];
    const valid = await form.trigger([...fields] as (keyof QuoteFormSchema)[]);
    if (!valid) return;

    if (step === TOTAL_STEPS - 1) {
      const values = form.getValues();
      const link = buildQuoteWhatsAppLink(values);
      setSubmitted(true);
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function resendWhatsApp() {
    const link = buildQuoteWhatsAppLink(form.getValues());
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function startOver() {
    form.reset({ ...DEFAULT_VALUES, requestType: defaultRequestType ?? DEFAULT_VALUES.requestType });
    setSubmitted(false);
    setStep(0);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {showEmergencyBanner ? <EmergencyBanner /> : null}

      <div className="rounded-[2rem] border border-navy-100 bg-white p-6 shadow-card md:p-9">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp-dark">
              <CheckCircle2 className="size-8" strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-navy-900 font-heading">
              Sua solicitação está pronta!
            </h3>
            <p className="text-pretty mt-2 max-w-sm text-sm leading-relaxed text-granite-600">
              Abrimos o WhatsApp com sua mensagem preenchida. Se a janela não abriu, use o botão
              abaixo para enviar manualmente.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={resendWhatsApp}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
              >
                <WhatsAppIcon className="size-4" />
                Abrir WhatsApp novamente
              </button>
              <button
                type="button"
                onClick={startOver}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy-200 px-6 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                <RotateCcw className="size-4" />
                Nova cotação
              </button>
            </div>
          </div>
        ) : (
          <>
            <QuoteProgress current={step} />

            <div className="relative mt-8 min-h-[280px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 ? <StepRequestType form={form} /> : null}
                  {step === 1 ? <StepRoute form={form} /> : null}
                  {step === 2 ? <StepNotes form={form} /> : null}
                  {step === 3 ? <StepContact form={form} /> : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex h-12 items-center gap-1.5 rounded-full px-5 text-sm font-medium text-granite-500 transition-colors hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeft className="size-4" />
                Voltar
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-red-500 px-7 text-sm font-medium text-white shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-red-600 active:scale-[0.96]"
              >
                {step === TOTAL_STEPS - 1 ? (
                  <>
                    Enviar pelo WhatsApp
                    <WhatsAppIcon className="size-4" />
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
