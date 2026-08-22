"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(5, "Escreva uma mensagem"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-lg border border-hairline-strong bg-white px-4 py-3 text-base text-ink placeholder:text-ink-faint outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate send — in production send to API/email
    await new Promise((r) => setTimeout(r, 800));
    const message = `*Contato via Site*\n\n*Nome:* ${data.name}\n*E-mail:* ${data.email}\n*Telefone:* ${data.phone}\n\n*Mensagem:* ${data.message}`;
    window.open(whatsappHref(message), "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-tint">
          <Send className="size-6 text-accent" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
          Mensagem enviada!
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Você será redirecionado ao WhatsApp para finalizar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
          Nome completo
        </label>
        <input
          id="contact-name"
          autoComplete="name"
          {...register("name")}
          placeholder="Seu nome"
          className={cn(inputClass, errors.name && "border-ember-500")}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-ember-600">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink">
            E-mail
          </label>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={cn(inputClass, errors.email && "border-ember-500")}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-ember-600">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Telefone
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register("phone")}
            placeholder="(91) 99999-9999"
            className={cn(inputClass, errors.phone && "border-ember-500")}
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-ember-600">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={4}
          placeholder="Digite sua mensagem..."
          className={cn(inputClass, "resize-none", errors.message && "border-ember-500")}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-ember-600">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 self-stretch rounded-xl bg-accent px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:self-start"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
