"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validations";
import { buildContactWhatsAppLink } from "@/lib/whatsapp";
import { cn, maskPhoneInput } from "@/lib/utils";

const inputClass =
  "h-12 w-full rounded-2xl border border-ink-500/12 bg-white px-4 text-[0.95rem] text-ink-500 placeholder:text-ink-300 transition-colors duration-200 focus:border-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-500/10";
const labelClass = "text-sm font-medium text-ink-500";

function FieldError({ message }: { message?: string }) {
  return <p className="mt-1.5 min-h-4 text-xs text-red-500">{message ?? ""}</p>;
}

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(values: ContactFormSchema) {
    const link = buildContactWhatsAppLink(values);
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function resend() {
    window.open(buildContactWhatsAppLink(getValues()), "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-[2rem] border border-ink-500/8 bg-white p-10 text-center shadow-elevated">
        <span className="flex size-16 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp-dark">
          <CheckCircle2 className="size-8" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink-500">Mensagem pronta para envio!</h3>
        <p className="text-pretty mt-2 max-w-sm text-sm leading-relaxed text-ink-400">
          Abrimos o WhatsApp com sua mensagem preenchida. Se a janela não abriu, use o botão
          abaixo.
        </p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={resend}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-4" />
            Abrir WhatsApp novamente
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setSubmitted(false);
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink-500/15 px-6 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50"
          >
            <RotateCcw className="size-4" />
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-[2rem] border border-ink-500/8 bg-white p-6 shadow-elevated md:p-9"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className={labelClass}>
          Nome completo
        </label>
        <input id="fullName" className={inputClass} placeholder="Seu nome" {...register("fullName")} />
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
            {...register("phone", { onChange: (e) => setValue("phone", maskPhoneInput(e.target.value)) })}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            E-mail <span className="text-ink-300">(opcional)</span>
          </label>
          <input id="email" type="email" placeholder="voce@email.com" className={inputClass} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className={labelClass}>
          Assunto
        </label>
        <input
          id="subject"
          placeholder="Ex.: Dúvida sobre o ClubMed"
          className={inputClass}
          {...register("subject")}
        />
        <FieldError message={errors.subject?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Como podemos ajudar?"
          className={cn(inputClass, "h-auto resize-none py-3 leading-relaxed")}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink-500/10 bg-mist-50 p-4">
        <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-red-500" {...register("consent")} />
        <span className="text-[0.83rem] leading-relaxed text-ink-400">
          Concordo com o uso dos meus dados para contato, conforme a{" "}
          <a href="/politica-de-privacidade" className="font-medium text-ink-500 underline underline-offset-2">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      <FieldError message={errors.consent?.message} />

      <button
        type="submit"
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-500 px-7 text-sm font-medium text-white shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-red-600 active:scale-[0.96]"
      >
        <WhatsAppIcon className="size-4" />
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}
