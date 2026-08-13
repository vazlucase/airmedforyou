import { PhoneCall } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { CONTACT } from "@/lib/constants";
import { emergencyCallHref, emergencyWhatsAppLink } from "@/lib/whatsapp";

export function EmergencyBanner() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[20px] bg-[#002b60] p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
      <div className="flex items-start gap-4">
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-white/20 opacity-60" />
          <PhoneCall className="relative size-5" strokeWidth={2} />
        </span>
        <div>
          <p className="font-heading text-xl font-semibold">É uma emergência agora?</p>
          <p className="mt-1 text-sm leading-snug text-[#f8f8ff]/75">
            Não preencha o formulário — fale direto com a nossa central,{" "}
            {CONTACT.hours.toLowerCase()}.
          </p>
        </div>
      </div>
      <div className="flex w-full shrink-0 gap-2.5 sm:w-auto">
        <a
          href={emergencyCallHref()}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:flex-none"
        >
          <PhoneCall className="size-4" />
          Ligar agora
        </a>
        <a
          href={emergencyWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-gradient inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white transition-all hover:brightness-105 sm:flex-none"
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
