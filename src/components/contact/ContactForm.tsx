"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(5, "Escreva uma mensagem"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
      <div className="rounded-2xl bg-navy-50 p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy-100">
          <Send className="size-6 text-navy-600" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-navy-900 font-heading">Mensagem enviada!</h3>
        <p className="mt-2 text-sm text-granite-600">
          Você será redirecionado ao WhatsApp para finalizar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-granite-700">
          Nome completo
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Seu nome"
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-sm text-granite-800 outline-none transition-colors placeholder:text-granite-300 focus:border-navy-400 focus:ring-2 focus:ring-navy-100",
            errors.name && "border-red-400 focus:border-red-400 focus:ring-red-100"
          )}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-granite-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm text-granite-800 outline-none transition-colors placeholder:text-granite-300 focus:border-navy-400 focus:ring-2 focus:ring-navy-100",
              errors.email && "border-red-400 focus:border-red-400 focus:ring-red-100"
            )}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-granite-700">
            Telefone
          </label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="(91) 99999-9999"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm text-granite-800 outline-none transition-colors placeholder:text-granite-300 focus:border-navy-400 focus:ring-2 focus:ring-navy-100",
              errors.phone && "border-red-400 focus:border-red-400 focus:ring-red-100"
            )}
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-granite-700">
          Mensagem
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          placeholder="Como podemos ajudar?"
          className={cn(
            "w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-granite-800 outline-none transition-colors placeholder:text-granite-300 focus:border-navy-400 focus:ring-2 focus:ring-navy-100",
            errors.message && "border-red-400 focus:border-red-400 focus:ring-red-100"
          )}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        ) : null}
      </div>

      <Button type="submit" variant="secondary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
