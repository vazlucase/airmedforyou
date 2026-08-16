import { PhoneCall } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { CONTACT } from "@/lib/constants";
import { emergencyCallHref, emergencyWhatsAppLink } from "@/lib/whatsapp";

export function EmergencyBanner() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl bg-[#0d1728] p-5 text-white sm:flex-row sm:items-center sm:justify-between md:p-7">
      <div className="flex items-start gap-4">
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-white/20 opacity-60" />
          <PhoneCall className="relative size-5" strokeWidth={2} />
        </span>
        <div>
          <p className="font-heading text-xl font-bold">É uma emergência agora?</p>
          <p className="mt-1 text-sm leading-snug text-white/70">
            Não preencha o formulário — fale direto com a nossa central,{" "}
            {CONTACT.hours.toLowerCase()}.
          </p>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
        <a
          href={emergencyCallHref()}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:flex-none sm:px-6"
        >
          <PhoneCall className="size-4" />
          Ligar agora
        </a>
        <a
          href={emergencyWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-gradient inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-all hover:brightness-105 sm:w-auto sm:flex-none sm:px-6"
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
