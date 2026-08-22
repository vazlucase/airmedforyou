import { z } from "zod";

const QUOTE_REQUEST_TYPES = ["emergencia", "transferencia", "executivo"] as const;
type QuoteRequestTypeValue = (typeof QUOTE_REQUEST_TYPES)[number];

const quoteRequestTypeSchema = z.custom<QuoteRequestTypeValue>(
  (value) =>
    typeof value === "string" &&
    QUOTE_REQUEST_TYPES.includes(value as QuoteRequestTypeValue),
  { message: "Selecione o tipo de solicitação." }
);

export const quoteFormSchema = z
  .object({
    requestType: quoteRequestTypeSchema,
    origin: z.string().trim().max(120, "Máximo de 120 caracteres."),
    destination: z.string().trim().max(120, "Máximo de 120 caracteres."),
    tripType: z.enum(["percurso"]),
    patientMobility: z.enum(["autonomo", "cadeira-de-rodas", "leito", "uti"]).nullish(),
    passengers: z.string(),
    notes: z.string().trim().max(500, "Máximo de 500 caracteres."),
    fullName: z
      .string()
      .trim()
      .min(3, "Informe seu nome completo.")
      .max(100, "Máximo de 100 caracteres."),
    phone: z.string().trim().refine(
      (v) => v.replace(/\D/g, "").length === 11,
      "Informe um telefone celular com DDD (11 dígitos)."
    ),
    preferredDate: z.string(),
    email: z.string().trim().max(254, "Máximo de 254 caracteres."),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
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

    if (data.passengers !== "" && !/^(0|[1-9]|1[0-2])$/.test(data.passengers.trim())) {
      ctx.addIssue({
        code: "custom",
        path: ["passengers"],
        message: "Informe um número entre 0 e 12.",
      });
    }

    if (
      data.preferredDate !== "" &&
      new Date(`${data.preferredDate}T23:59:59`) < new Date()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredDate"],
        message: "A data desejada precisa ser futura.",
      });
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

/**
 * Tipo do estado interno do assistente: `requestType` começa vazio (null) para
 * que nenhuma opção apareça pré-selecionada, então o visitante escolhe de verdade.
 */
export type QuoteFormState = Omit<QuoteFormSchema, "requestType"> & {
  requestType: QuoteFormSchema["requestType"] | null;
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
