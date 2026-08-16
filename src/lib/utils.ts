import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes condicionais (clsx) e resolve conflitos do Tailwind
 * (tailwind-merge), evitando classes duplicadas/concorrentes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um número de telefone brasileiro para exibição: (91) 99101-4152
 */
export function formatPhoneDisplay(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  const withoutCountry = clean.startsWith("55") ? clean.slice(2) : clean;
  const ddd = withoutCountry.slice(0, 2);
  const rest = withoutCountry.slice(2);
  if (rest.length === 9) {
    return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  }
  return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
}

/**
 * Aplica máscara de telefone brasileiro progressivamente enquanto o usuário digita.
 */
export function maskPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Máscara com preservação de caret: `maskPhoneInput` com reposicionamento do
 * cursor após a remascaração. Retorna o texto mascarado e a posição onde o
 * caret deve ficar — evita o "teleporte" do cursor para o fim ao editar o
 * meio do número (ex.: corrigir o 4º dígito).
 */
export function maskPhoneCaret(
  value: string,
  selectionStart: number | null
): { masked: string; caret: number } {
  const masked = maskPhoneInput(value);
  const digitsBefore = value.slice(0, selectionStart ?? 0).replace(/\D/g, "").length;
  let caret = masked.length;
  let seen = 0;
  for (let i = 0; i < masked.length; i++) {
    const ch = masked[i];
    if (ch && /\d/.test(ch)) {
      seen++;
      if (seen === digitsBefore) {
        caret = i + 1;
        break;
      }
    }
  }
  return { masked, caret };
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
