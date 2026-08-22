import { CONTACT, whatsappHref } from "@/lib/constants";
import type { QuoteFormSchema } from "@/lib/validations";

const REQUEST_TYPE_LABEL: Record<QuoteFormSchema["requestType"], string> = {
  emergencia: "UTI Aérea - Emergência",
  transferencia: "UTI Aérea - Transferência agendada",
  executivo: "Voo Executivo",
};

const TRIP_TYPE_LABEL: Record<QuoteFormSchema["tripType"], string> = {
  percurso: "Percurso",
};

const MOBILITY_LABEL: Record<Exclude<QuoteFormSchema["patientMobility"], undefined | null>, string> = {
  autonomo: "Autônomo(a), sem restrições",
  "cadeira-de-rodas": "Necessita cadeira de rodas",
  leito: "Necessita maca / leito",
  uti: "Necessita suporte de UTI",
};

/**
 * Monta a mensagem final formatada para o WhatsApp a partir dos dados
 * coletados no assistente de cotação (QuoteWizard).
 */
export function buildQuoteMessage(values: QuoteFormSchema): string {
  const lines: string[] = [];

  lines.push("Olá! Gostaria de uma cotação com a AirMedPlan.");
  lines.push("");
  lines.push(`*Tipo de solicitação:* ${REQUEST_TYPE_LABEL[values.requestType]}`);

  lines.push(`*Origem:* ${values.origin}`);
  lines.push(`*Destino:* ${values.destination}`);
  lines.push(`*Percurso:* ${TRIP_TYPE_LABEL[values.tripType]}`);
  if (values.preferredDate) {
    lines.push(`*Data desejada:* ${formatDateBR(values.preferredDate)}`);
  }
  if (values.requestType !== "executivo" && values.patientMobility) {
    lines.push(`*Paciente:* ${MOBILITY_LABEL[values.patientMobility]}`);
  }
  if (values.passengers) {
    lines.push(
      `*${values.requestType === "executivo" ? "Passageiros" : "Acompanhantes"}:* ${values.passengers}`
    );
  }

  if (values.notes?.trim()) {
    lines.push(`*Observações:* ${values.notes.trim()}`);
  }

  lines.push("");
  lines.push(`*Nome:* ${values.fullName}`);
  lines.push(`*Telefone:* ${values.phone}`);
  if (values.email?.trim()) {
    lines.push(`*E-mail:* ${values.email.trim()}`);
  }

  return lines.join("\n");
}

export function buildQuoteWhatsAppLink(values: QuoteFormSchema): string {
  return whatsappHref(buildQuoteMessage(values));
}

/** Link rápido de WhatsApp com uma mensagem curta e contextual (usado em CTAs soltos pelo site). */
export function quickWhatsAppLink(context: string): string {
  return whatsappHref(`Olá! Vim pelo site da AirMedPlan e quero falar sobre: ${context}.`);
}

export function emergencyWhatsAppLink(): string {
  return whatsappHref(
    "EMERGÊNCIA: preciso de UTI Aérea agora. Podem me chamar imediatamente?"
  );
}

export function emergencyCallHref(): string {
  return `tel:${CONTACT.phoneDigits}`;
}

function formatDateBR(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function buildContactMessage(values: {
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): string {
  const lines = [
    "Olá! Vim pelo formulário de contato do site da AirMedPlan.",
    "",
    `*Assunto:* ${values.subject}`,
    `*Mensagem:* ${values.message}`,
    "",
    `*Nome:* ${values.fullName}`,
    `*Telefone:* ${values.phone}`,
  ];
  if (values.email?.trim()) lines.push(`*E-mail:* ${values.email.trim()}`);
  return lines.join("\n");
}

export function buildContactWhatsAppLink(values: {
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): string {
  return whatsappHref(buildContactMessage(values));
}
