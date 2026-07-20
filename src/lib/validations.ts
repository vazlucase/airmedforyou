import { z } from "zod";

export const quoteFormSchema = z
  .object({
    requestType: z.enum(["emergencia", "transferencia", "executivo", "clubmed"], {
      message: "Selecione o tipo de solicitação.",
    }),
    origin: z.string(),
    destination: z.string(),
    tripType: z.enum(["so-ida", "ida-e-volta"]),
    preferredDate: z.string(),
    patientMobility: z
      .enum(["autonomo", "cadeira-de-rodas", "leito", "uti"])
      .nullish(),
    passengers: z.string(),
    notes: z.string().max(500, "Máximo de 500 caracteres."),
    fullName: z.string().trim().min(3, "Informe seu nome completo."),
    phone: z.string().trim().min(14, "Informe um telefone com DDD válido."),
    email: z.string(),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.requestType !== "clubmed") {
      if (!data.origin || data.origin.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["origin"],
          message: "Informe a cidade ou aeroporto de origem.",
        });
      }
      if (!data.destination || data.destination.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["destination"],
          message: "Informe a cidade ou aeroporto de destino.",
        });
      }
    }

    if (data.email && data.email.trim() !== "") {
      const check = z.string().email().safeParse(data.email.trim());
      if (!check.success) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "E-mail inválido." });
      }
    }

    if (data.consent !== true) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "É necessário concordar com o uso dos dados para prosseguir.",
      });
    }
  });

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;

/** Campos avaliados em cada etapa do assistente — usados com trigger() do react-hook-form. */
export const STEP_FIELDS = {
  0: ["requestType"],
  1: ["origin", "destination", "tripType", "preferredDate", "patientMobility", "passengers"],
  2: ["notes"],
  3: ["fullName", "phone", "email", "consent"],
} as const;

export const contactFormSchema = z
  .object({
    fullName: z.string().trim().min(3, "Informe seu nome completo."),
    phone: z.string().trim().min(14, "Informe um telefone com DDD válido."),
    email: z.string(),
    subject: z.string().trim().min(3, "Informe o assunto."),
    message: z.string().trim().min(10, "Escreva uma mensagem um pouco mais detalhada."),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.email && data.email.trim() !== "") {
      const check = z.string().email().safeParse(data.email.trim());
      if (!check.success) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "E-mail inválido." });
      }
    }
    if (data.consent !== true) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "É necessário concordar com o uso dos dados para prosseguir.",
      });
    }
  });

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
