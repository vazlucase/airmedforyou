import { z } from "zod";

export const quoteFormSchema = z
  .object({
    requestType: z.enum(["emergencia", "transferencia", "executivo", "clubmed"], {
      message: "Selecione o tipo de solicitação.",
    }),
    origin: z.string(),
    destination: z.string(),
    tripType: z.enum(["percurso"]),
    patientMobility: z.enum(["autonomo", "cadeira-de-rodas", "leito", "uti"]).nullish(),
    passengers: z.string().refine(
      (v) => v === "" || /^(0|[1-9]|1[0-2])$/.test(v.trim()),
      "Informe um número entre 0 e 12."
    ),
    notes: z.string().max(500, "Máximo de 500 caracteres."),
    fullName: z.string().trim().min(3, "Informe seu nome completo."),
    phone: z.string().trim().refine(
      (v) => v.replace(/\D/g, "").length === 11,
      "Informe um telefone celular com DDD (11 dígitos)."
    ),
    preferredDate: z.string().refine(
      (v) => v === "" || new Date(`${v}T23:59:59`) >= new Date(),
      "A data desejada precisa ser futura."
    ),
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

/** Campos avaliados em cada seção do assistente — fonte única usada com trigger() do react-hook-form. */
export const SECTION_FIELDS: { 0: (keyof QuoteFormSchema)[]; 1: (keyof QuoteFormSchema)[]; 2: (keyof QuoteFormSchema)[] } = {
  0: ["requestType"],
  1: ["origin", "destination", "preferredDate", "patientMobility", "passengers", "notes"],
  2: ["fullName", "phone", "email", "consent"],
};

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
