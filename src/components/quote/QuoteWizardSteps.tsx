"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  AlertTriangle,
  CalendarDays,
  Clock,
  Heart,
  LocateFixed,
  Plane,
  Plus,
  Route,
  UserRound,
} from "lucide-react";
import { cn, maskPhoneCaret } from "@/lib/utils";
import type { QuoteFormSchema } from "@/lib/validations";
import { AIRSTRIPS, airstripHintCities } from "@/lib/airstrips";
import { LocationInput } from "@/components/quote/LocationInput";

const inputClass =
  "h-12 w-full rounded-lg border border-hairline-strong bg-white px-4 text-base text-ink placeholder:text-ink-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 sm:text-[0.95rem]";

const labelClass = "text-sm font-semibold text-ink";

function FieldError({ id, message }: { id?: string; message?: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 min-h-4 text-xs text-ember-600">
      {message ?? ""}
    </p>
  );
}

/* ---------------------------------------------------------- */
/* Head de seção — marcador por ícone (sem "etapas" numeradas)  */
/* ---------------------------------------------------------- */

function SectionHeading({
  headingId,
  icon: Icon,
  title,
  description,
}: {
  headingId: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent"
      >
        <Icon className="size-3.5" />
      </span>
      <div>
        <h2 id={headingId} className="font-heading text-lg font-semibold text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Bloco 1 — Solicitação (tipo)                                 */
/* ---------------------------------------------------------- */

const REQUEST_OPTIONS = [
  {
    value: "emergencia" as const,
    icon: AlertTriangle,
    title: "Emergência",
    desc: "Preciso de UTI aérea o quanto antes",
  },
  {
    value: "transferencia" as const,
    icon: CalendarDays,
    title: "Transferência agendada",
    desc: "Remoção programada, sem urgência imediata",
  },
  {
    value: "executivo" as const,
    icon: Plane,
    title: "Voo executivo",
    desc: "Quero fretar uma aeronave executiva",
  },
  {
    value: "clubmed" as const,
    icon: Heart,
    title: "ClubMed",
    desc: "Quero conhecer o clube de benefícios",
  },
];

export function SectionRequestType({
  form,
  onSelect,
}: {
  form: UseFormReturn<QuoteFormSchema>;
  /** Chamado ao escolher um tipo — o wizard avança sozinho para o percurso. */
  onSelect?: () => void;
}) {
  const selected = form.watch("requestType");
  return (
    <fieldset>
      <legend className="sr-only">Tipo de solicitação</legend>
      <div className="mb-5">
        <SectionHeading
          headingId="quote-request-heading"
          icon={AlertTriangle}
          title="Como podemos ajudar agora?"
          description="Selecione a opção que melhor descreve sua solicitação."
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-sm:gap-2">
        {REQUEST_OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = selected === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent max-sm:p-3",
                active
                  ? "border-accent bg-accent-tint ring-4 ring-accent/10"
                  : "border-hairline bg-canvas hover:border-hairline-strong hover:bg-mist"
              )}
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...form.register("requestType", {
                  onChange: (e) => {
                    // Só avança quando o usuário escolhe de fato: a montagem
                    // inicial com defaultRequestType (ex.: ?tipo=) não dispara
                    // a transição automática.
                    if (e.target.value !== selected) onSelect?.();
                  },
                })}
              />
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  active ? "bg-accent text-white" : "bg-mist-deep text-ink-muted"
                )}
              >
                <Icon className="size-[1.1rem]" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-[0.95rem] font-semibold text-ink">
                  {option.title}
                </span>
                <span className="mt-0.5 block text-[0.83rem] leading-snug text-ink-muted">
                  {option.desc}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id="requestType-error" message={form.formState.errors.requestType?.message} />
    </fieldset>
  );
}

/* ---------------------------------------------------------- */
/* Bloco 2 — Percurso (rota / detalhes)                         */
/* ---------------------------------------------------------- */

const MOBILITY_OPTIONS = [
  { value: "autonomo" as const, label: "Autônomo(a)" },
  { value: "cadeira-de-rodas" as const, label: "Cadeira de rodas" },
  { value: "leito" as const, label: "Maca / leito" },
  { value: "uti" as const, label: "Suporte de UTI" },
];

/** Data de hoje em formato ISO (YYYY-MM-DD) para o atributo `min` do input date. */
function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}


export function SectionRoute({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const requestType = form.watch("requestType");
  const tripType = form.watch("tripType");
  const [showNotes, setShowNotes] = React.useState(false);
  const {
    formState: { errors },
  } = form;

  if (requestType === "clubmed") {
    return (
      <fieldset>
        <legend className="sr-only">Sua cidade</legend>
        <div className="mb-5">
          <SectionHeading
            headingId="quote-route-heading"
            icon={LocateFixed}
            title="Ótima escolha."
            description="Para te apresentar o ClubMed, só precisamos saber de onde você fala."
          />
        </div>
        <LocationInput
          id="origin"
          label="Sua cidade"
          placeholder="Ex.: Belém, PA"
          value={form.watch("origin") ?? ""}
          onChange={(v) => form.setValue("origin", v, { shouldValidate: true })}
        />
      </fieldset>
    );
  }

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Percurso</legend>
      <div className="mb-1">
        <SectionHeading
          headingId="quote-route-heading"
          icon={Route}
          title="Para onde vamos?"
          description="De onde para onde, sem burocracia."
        />
      </div>

      {/* Origem / Destino */}
      <div className="flex flex-col gap-4">
        <LocationInput
          id="origin"
          label="Origem"
          placeholder="Cidade, aeroporto ou pista"
          value={form.watch("origin") ?? ""}
          onChange={(v) => form.setValue("origin", v, { shouldValidate: true })}
          onBlur={() => form.trigger("origin")}
          error={errors.origin?.message}
          focusedOnSelect={() => {
            // Chain: ao escolher a origem, foca o destino.
            const el = document.getElementById("destination") as HTMLInputElement | null;
            el?.focus();
          }}
        />
        <LocationInput
          id="destination"
          label="Destino"
          placeholder="Cidade, aeroporto ou pista"
          value={form.watch("destination") ?? ""}
          onChange={(v) => form.setValue("destination", v, { shouldValidate: true })}
          onBlur={() => form.trigger("destination")}
          error={errors.destination?.message}
        />
      </div>

      {/* Dica de pistas regionais — linha única */}
      <p className="text-xs leading-relaxed text-ink-muted">
        Também pousamos em pistas regionais, como{" "}
        <span className="font-semibold text-ink">{airstripHintCities().join(", ")}</span>.
      </p>

      
      {/* Data / Acompanhantes */}
      <div className="grid grid-cols-2 items-end gap-2.5 max-sm:gap-2">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="preferredDate" className="text-xs font-semibold text-ink">
            Data desejada
          </label>
          <input
            id="preferredDate"
            type="date"
            min={todayISO()}
            className={inputClass}
            {...form.register("preferredDate")}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="passengers" className="text-xs font-semibold text-ink">
            Acompanhantes
          </label>
          <input
            id="passengers"
            type="number"
            min={0}
            max={12}
            placeholder="0"
            className={inputClass}
            {...form.register("passengers")}
          />
        </div>
      </div>

      {requestType !== "executivo" ? (
        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Mobilidade do paciente</span>
          <div className="grid grid-cols-2 gap-2">
            {MOBILITY_OPTIONS.map((opt) => {
              const active = form.watch("patientMobility") === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.83rem] font-medium transition-colors focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent",
                    active
                      ? "border-accent bg-accent-tint text-accent"
                      : "border-hairline-strong bg-white text-ink-muted hover:border-accent hover:text-accent"
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    {...form.register("patientMobility")}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "block size-2.5 shrink-0 rounded-full border",
                      active ? "border-accent bg-accent" : "border-hairline-strong bg-white"
                    )}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Observações — recolhidas por padrão */}
      <div className="rounded-xl border border-hairline bg-white">
        <button
          type="button"
          onClick={() => setShowNotes((s) => !s)}
          aria-expanded={showNotes}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left max-sm:py-2.5"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Plus className="size-4 text-accent" />
            Mais algum detalhe? <span className="font-normal text-ink-muted">(opcional)</span>
          </span>
        </button>
        {showNotes ? (
          <div className="border-t border-hairline p-4">
            <textarea
              id="notes"
              rows={4}
              maxLength={500}
              placeholder="Ex.: paciente em pós-operatório, necessidade de oxigênio contínuo, horário preferencial..."
              className={cn(inputClass, "h-auto resize-none py-3 leading-relaxed")}
              {...form.register("notes")}
            />
            <span aria-live="polite" className="mt-1 flex justify-end text-xs text-ink-muted">
              {(form.watch("notes") ?? "").length}/500
            </span>
          </div>
        ) : null}
      </div>
    </fieldset>
  );
}

/* ---------------------------------------------------------- */
/* Bloco 3 — Contato                                           */
/* ---------------------------------------------------------- */

export function SectionContact({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="sr-only">Contato</legend>
      <div className="mb-1">
        <SectionHeading
          headingId="quote-contact-heading"
          icon={UserRound}
          title="Para finalizar, seu contato."
          description="Enviaremos a resposta da cotação direto no seu WhatsApp."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className={labelClass}>
          Nome completo
        </label>
        <input
          id="fullName"
          placeholder="Seu nome"
          className={inputClass}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
        <FieldError id="fullName-error" message={errors.fullName?.message} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelClass}>
            WhatsApp
          </label>
          <input
            id="phone"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            className={inputClass}
            {...register("phone", {
              onChange: (e) => {
                const { masked, caret } = maskPhoneCaret(e.target.value, e.target.selectionStart ?? 0);
                setValue("phone", masked);
                // Preserva a posição do cursor ao editar o meio do número
                requestAnimationFrame(() => {
                  e.target.selectionStart = caret;
                  e.target.selectionEnd = caret;
                });
              },
            })}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            E-mail <span className="text-ink-faint">(opcional)</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            className={inputClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-mist p-4">
        <input
          type="checkbox"
          className="mt-px size-4 shrink-0 accent-accent"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          {...register("consent")}
        />
        <span className="text-[0.83rem] leading-relaxed text-ink-muted">
          Concordo com o uso dos meus dados para que a AirMedPlan entre em contato sobre esta
          solicitação, conforme a{" "}
          <a href="/politica-de-privacidade" className="font-semibold text-accent underline underline-offset-2">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      <FieldError id="consent-error" message={errors.consent?.message} />

      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <Clock className="size-3.5" />
        Tempo médio de resposta: poucos minutos, 24 horas por dia.
      </div>
    </fieldset>
  );
}