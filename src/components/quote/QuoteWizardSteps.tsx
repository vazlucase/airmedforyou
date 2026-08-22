"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { ChevronDown, Plus } from "lucide-react";
import { cn, maskPhoneCaret } from "@/lib/utils";
import type { QuoteFormSchema } from "@/lib/validations";
import { LocationInput } from "@/components/quote/LocationInput";

const inputClass =
  "h-11 w-full rounded-lg border border-hairline-strong bg-white px-3.5 text-base text-ink placeholder:text-ink-muted outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15 aria-invalid:border-ember-500 aria-invalid:ring-ember-500/10";

const labelClass = "text-[0.8125rem] font-semibold leading-none text-ink";
const fieldClass = "grid min-w-0 gap-1";

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-xs leading-relaxed text-ember-600">
      {message}
    </p>
  );
}

const REQUEST_OPTIONS = [
  { value: "emergencia" as const, label: "UTI Aérea - Emergência" },
  { value: "transferencia" as const, label: "UTI Aérea - Transferência agendada" },
  { value: "executivo" as const, label: "Voo Executivo" },
];

export function SectionRequestType({
  form,
}: {
  form: UseFormReturn<QuoteFormSchema>;
}) {
  const error = form.formState.errors.requestType?.message;

  return (
    <div className={fieldClass}>
      <label htmlFor="requestType" className={labelClass}>
        Tipo de serviço
      </label>
      <div className="relative">
        <select
          id="requestType"
          className={cn(inputClass, "cursor-pointer appearance-none pr-11")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "requestType-error" : undefined}
          {...form.register("requestType")}
        >
          <option value="">Selecione o serviço</option>
          {REQUEST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
        />
      </div>
      <FieldError id="requestType-error" message={error} />
    </div>
  );
}

const MOBILITY_OPTIONS = [
  { value: "autonomo" as const, label: "Autônomo(a)" },
  { value: "cadeira-de-rodas" as const, label: "Cadeira de rodas" },
  { value: "leito" as const, label: "Maca / leito" },
  { value: "uti" as const, label: "Suporte de UTI" },
];

function todayISO(): string {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function SectionRoute({
  form,
}: {
  form: UseFormReturn<QuoteFormSchema>;
}) {
  const requestType = form.watch("requestType");
  const isMedical = requestType === "emergencia" || requestType === "transferencia";
  const [showNotes, setShowNotes] = React.useState(false);
  const {
    formState: { errors },
  } = form;

  return (
    <fieldset className="grid gap-3">
      <legend className="sr-only">Rota e detalhes do voo</legend>

      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <LocationInput
          id="origin"
          label="Origem"
          placeholder="Cidade, aeroporto ou pista"
          value={form.watch("origin") ?? ""}
          onChange={(value) => form.setValue("origin", value, { shouldValidate: true })}
          onBlur={() => form.trigger("origin")}
          error={errors.origin?.message}
          focusedOnSelect={() => {
            const destination = document.getElementById("destination") as HTMLInputElement | null;
            destination?.focus();
          }}
        />
        <LocationInput
          id="destination"
          label="Destino"
          placeholder="Cidade, aeroporto ou pista"
          value={form.watch("destination") ?? ""}
          onChange={(value) => form.setValue("destination", value, { shouldValidate: true })}
          onBlur={() => form.trigger("destination")}
          error={errors.destination?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <div className={fieldClass}>
          <label htmlFor="preferredDate" className={labelClass}>
            Data de partida
          </label>
          <input
            id="preferredDate"
            type="date"
            min={todayISO()}
            className={inputClass}
            aria-invalid={errors.preferredDate ? true : undefined}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
            {...form.register("preferredDate")}
          />
          <FieldError id="preferredDate-error" message={errors.preferredDate?.message} />
        </div>
        <div className={fieldClass}>
          <label htmlFor="passengers" className={labelClass}>
            {requestType === "executivo" ? "Passageiros" : "Acompanhantes"}
          </label>
          <input
            id="passengers"
            type="number"
            inputMode="numeric"
            min={0}
            max={12}
            placeholder="1"
            className={inputClass}
            aria-invalid={errors.passengers ? true : undefined}
            aria-describedby={errors.passengers ? "passengers-error" : undefined}
            {...form.register("passengers")}
          />
          <FieldError id="passengers-error" message={errors.passengers?.message} />
        </div>
      </div>

      {isMedical ? (
        <fieldset className="grid gap-2">
          <legend className={labelClass}>Mobilidade do paciente</legend>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {MOBILITY_OPTIONS.map((option) => {
              const active = form.watch("patientMobility") === option.value;

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2.5 py-2 text-center text-xs font-semibold leading-tight transition-[border-color,background-color,color,box-shadow] duration-200 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20",
                    active
                      ? "border-accent bg-accent-tint text-accent"
                      : "border-hairline-strong bg-white text-ink-muted hover:border-accent hover:text-accent"
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    aria-label={option.label}
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
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="border-y border-hairline">
        <button
          type="button"
          onClick={() => setShowNotes((state) => !state)}
          aria-expanded={showNotes}
          aria-controls="quote-notes-panel"
          className="flex min-h-11 w-full items-center justify-between gap-3 py-2.5 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Plus
              aria-hidden
              className={cn("size-4 text-accent transition-transform", showNotes && "rotate-45")}
            />
            Adicionar detalhes <span className="font-normal text-ink-muted">(opcional)</span>
          </span>
        </button>
        {showNotes ? (
          <div id="quote-notes-panel" className="border-t border-hairline py-4">
            <textarea
              id="notes"
              rows={4}
              maxLength={500}
              placeholder="Ex.: condição do paciente, necessidade de oxigênio ou horário preferencial..."
              className={cn(inputClass, "h-auto resize-none py-3 leading-relaxed")}
              {...form.register("notes")}
            />
            <span aria-live="polite" className="mt-1.5 flex justify-end text-xs text-ink-muted">
              {(form.watch("notes") ?? "").length}/500
            </span>
          </div>
        ) : null}
      </div>
    </fieldset>
  );
}

export function SectionContact({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  return (
    <fieldset className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
      <legend className="sr-only">Seus dados de contato</legend>

      <div className={fieldClass}>
        <label htmlFor="fullName" className={labelClass}>
          Nome completo
        </label>
        <input
          id="fullName"
          autoComplete="name"
          maxLength={100}
          placeholder="João Silva"
          className={inputClass}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
        <FieldError id="fullName-error" message={errors.fullName?.message} />
      </div>

      <div className={fieldClass}>
        <label htmlFor="email" className={labelClass}>
          E-mail <span className="font-normal text-ink-faint">(opcional)</span>
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder="joao@exemplo.com"
          className={inputClass}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div className={cn(fieldClass, "sm:col-span-2")}>
        <label htmlFor="phone" className={labelClass}>
          WhatsApp
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 91234-5678"
          className={inputClass}
          {...register("phone", {
            onChange: (event) => {
              const { masked, caret } = maskPhoneCaret(
                event.target.value,
                event.target.selectionStart ?? 0
              );
              setValue("phone", masked);
              requestAnimationFrame(() => {
                event.target.selectionStart = caret;
                event.target.selectionEnd = caret;
              });
            },
          })}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        <FieldError id="phone-error" message={errors.phone?.message} />
      </div>
    </fieldset>
  );
}

export function SectionConsent({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const error = form.formState.errors.consent?.message;

  return (
    <div className="grid gap-1.5">
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-accent"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-description consent-error" : "consent-description"}
          {...form.register("consent")}
        />
        <span id="consent-description" className="text-xs leading-relaxed text-ink-muted">
          Concordo com o uso dos dados desta solicitação, inclusive informações de saúde que eu
          decidir informar, para contato e envio pelo WhatsApp/Meta, conforme a{" "}
          <a
            href="/politica-de-privacidade"
            className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      <FieldError id="consent-error" message={error} />
    </div>
  );
}
