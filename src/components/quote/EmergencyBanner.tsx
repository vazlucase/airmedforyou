import { PhoneCall, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { emergencyCallHref, emergencyWhatsAppLink } from "@/lib/whatsapp";

export function EmergencyBanner() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-red-500/15 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
      <div className="flex items-start gap-3.5">
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-red-500 opacity-60" />
          <PhoneCall className="relative size-4" strokeWidth={2} />
        </span>
        <div>
          <p className="text-[0.95rem] font-semibold text-ink-500">É uma emergência agora?</p>
          <p className="text-sm leading-snug text-ink-400">
            Não preencha o formulário — fale direto com a nossa central, {CONTACT.hours.toLowerCase()}.
          </p>
        </div>
      </div>
      <div className="flex w-full shrink-0 gap-2.5 sm:w-auto">
        <a
          href={emergencyCallHref()}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink-500 px-5 text-sm font-medium text-white transition-colors hover:bg-ink-600 sm:flex-none"
        >
          <PhoneCall className="size-4" />
          Ligar agora
        </a>
        <a
          href={emergencyWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark sm:flex-none"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
