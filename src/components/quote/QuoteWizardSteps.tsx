"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  AlertTriangle,
  CalendarDays,
  Clock,
  Heart,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";
import { cn, maskPhoneInput } from "@/lib/utils";
import type { QuoteFormSchema } from "@/lib/validations";

const inputClass =
  "h-12 w-full rounded-2xl border border-ink-500/12 bg-white px-4 text-[0.95rem] text-ink-500 placeholder:text-ink-300 transition-colors duration-200 focus:border-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-500/10";

const labelClass = "text-sm font-medium text-ink-500";

function FieldError({ message }: { message?: string }) {
  return <p className="mt-1.5 min-h-4 text-xs text-red-500">{message ?? ""}</p>;
}

/* ---------------------------------------------------------- */
/* Etapa 0 — Tipo de solicitação                                */
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

export function StepRequestType({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const selected = form.watch("requestType");
  return (
    <fieldset>
      <legend className="mb-1 text-lg font-semibold text-ink-500">
        Como podemos ajudar agora?
      </legend>
      <p className="mb-6 text-sm text-ink-400">Selecione a opção que melhor descreve sua solicitação.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {REQUEST_OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = selected === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all duration-200",
                active
                  ? "border-red-500/40 bg-red-50 ring-4 ring-red-500/10"
                  : "border-ink-500/10 bg-white hover:border-ink-500/20 hover:bg-ink-50/50"
              )}
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...form.register("requestType")}
              />
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  active ? "bg-red-500 text-white" : "bg-ink-50 text-ink-400"
                )}
              >
                <Icon className="size-[1.1rem]" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-[0.95rem] font-medium text-ink-500">
                  {option.title}
                </span>
                <span className="mt-0.5 block text-[0.83rem] leading-snug text-ink-400">
                  {option.desc}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <FieldError message={form.formState.errors.requestType?.message} />
    </fieldset>
  );
}

/* ---------------------------------------------------------- */
/* Etapa 1 — Rota / detalhes                                    */
/* ---------------------------------------------------------- */

const MOBILITY_OPTIONS = [
  { value: "autonomo" as const, label: "Autônomo(a)" },
  { value: "cadeira-de-rodas" as const, label: "Cadeira de rodas" },
  { value: "leito" as const, label: "Maca / leito" },
  { value: "uti" as const, label: "Suporte de UTI" },
];

export function StepRoute({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const requestType = form.watch("requestType");
  const {
    register,
    formState: { errors },
  } = form;

  if (requestType === "clubmed") {
    return (
      <fieldset>
        <legend className="mb-1 text-lg font-semibold text-ink-500">Ótima escolha.</legend>
        <p className="mb-6 text-sm text-ink-400">
          Para te apresentar o ClubMed, só precisamos saber de onde você fala.
        </p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="origin" className={labelClass}>
            Sua cidade
          </label>
          <input
            id="origin"
            placeholder="Ex.: Belém, PA"
            className={inputClass}
            {...register("origin")}
          />
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="flex flex-col gap-5">
      <div>
        <legend className="mb-1 text-lg font-semibold text-ink-500">Para onde vamos?</legend>
        <p className="text-sm text-ink-400">Nos diga a origem, o destino e a data desejada.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["so-ida", "ida-e-volta"] as const).map((value) => {
          const active = form.watch("tripType") === value;
          return (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-ink-500 bg-ink-500 text-white"
                  : "border-ink-500/15 text-ink-400 hover:border-ink-500/30"
              )}
            >
              <input type="radio" value={value} className="sr-only" {...register("tripType")} />
              {value === "so-ida" ? "Só ida" : "Ida e volta"}
            </label>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="origin" className={labelClass}>
            Origem
          </label>
          <input
            id="origin"
            placeholder="Cidade ou aeroporto"
            className={inputClass}
            {...register("origin")}
          />
          <FieldError message={errors.origin?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="destination" className={labelClass}>
            Destino
          </label>
          <input
            id="destination"
            placeholder="Cidade ou aeroporto"
            className={inputClass}
            {...register("destination")}
          />
          <FieldError message={errors.destination?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredDate" className={labelClass}>
            <CalendarDays className="mr-1 inline size-3.5 -translate-y-px" />
            Data desejada
          </label>
          <input
            id="preferredDate"
            type="date"
            className={inputClass}
            {...register("preferredDate")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="passengers" className={labelClass}>
            <Users className="mr-1 inline size-3.5 -translate-y-px" />
            Acompanhantes
          </label>
          <input
            id="passengers"
            type="number"
            min={0}
            max={12}
            placeholder="0"
            className={inputClass}
            {...register("passengers")}
          />
        </div>
      </div>

      {requestType !== "executivo" ? (
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Mobilidade do paciente</span>
          <div className="flex flex-wrap gap-2">
            {MOBILITY_OPTIONS.map((opt) => {
              const active = form.watch("patientMobility") === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-red-500/40 bg-red-50 text-red-600"
                      : "border-ink-500/15 text-ink-400 hover:border-ink-500/30"
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    {...register("patientMobility")}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      ) : null}
    </fieldset>
  );
}

/* ---------------------------------------------------------- */
/* Etapa 2 — Observações                                        */
/* ---------------------------------------------------------- */

export function StepNotes({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const notes = form.watch("notes") ?? "";
  return (
    <fieldset>
      <legend className="mb-1 text-lg font-semibold text-ink-500">Mais algum detalhe?</legend>
      <p className="mb-6 text-sm text-ink-400">
        Conte o que for importante para a nossa equipe médica já chegar preparada. Este campo é
        opcional.
      </p>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelClass}>
          Observações
        </label>
        <textarea
          id="notes"
          rows={5}
          maxLength={500}
          placeholder="Ex.: paciente em pós-operatório, necessidade de oxigênio contínuo, horário preferencial..."
          className={cn(inputClass, "h-auto resize-none py-3 leading-relaxed")}
          {...form.register("notes")}
        />
        <span className="self-end text-xs text-ink-300">{notes.length}/500</span>
      </div>

      <div className="mt-2 flex items-start gap-3 rounded-2xl bg-sky-50 p-4">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-600" />
        <p className="text-[0.83rem] leading-relaxed text-ink-400">
          Quanto mais contexto você nos der, mais rápida e precisa será a nossa resposta —
          especialmente em casos clínicos.
        </p>
      </div>
    </fieldset>
  );
}

/* ---------------------------------------------------------- */
/* Etapa 3 — Contato                                            */
/* ---------------------------------------------------------- */

export function StepContact({ form }: { form: UseFormReturn<QuoteFormSchema> }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  return (
    <fieldset className="flex flex-col gap-4">
      <div>
        <legend className="mb-1 text-lg font-semibold text-ink-500">Quase lá.</legend>
        <p className="text-sm text-ink-400">
          Precisamos só do seu contato para enviar a cotação pelo WhatsApp.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className={labelClass}>
          Nome completo
        </label>
        <input
          id="fullName"
          placeholder="Seu nome"
          className={inputClass}
          {...register("fullName")}
        />
        <FieldError message={errors.fullName?.message} />
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
              onChange: (e) => setValue("phone", maskPhoneInput(e.target.value)),
            })}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            E-mail <span className="text-ink-300">(opcional)</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            className={inputClass}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl border border-ink-500/10 bg-mist-50 p-4">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-red-500"
          {...register("consent")}
        />
        <span className="text-[0.83rem] leading-relaxed text-ink-400">
          Concordo com o uso dos meus dados para que a AirMedPlan entre em contato sobre esta
          solicitação, conforme a{" "}
          <a href="/politica-de-privacidade" className="font-medium text-ink-500 underline underline-offset-2">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      <FieldError message={errors.consent?.message} />

      <div className="flex items-center gap-2 text-xs text-ink-300">
        <Clock className="size-3.5" />
        Tempo médio de resposta: poucos minutos, 24 horas por dia.
      </div>
    </fieldset>
  );
}
