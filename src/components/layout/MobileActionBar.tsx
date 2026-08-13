"use client";

import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { CONTACT, whatsappHref } from "@/lib/constants";

const MESSAGE = "Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.";

/**
 * Barra de ação fixa no rodapé — apenas em mobile (< lg).
 * Caminho mais curto até o contato: Ligar · WhatsApp · Cotar.
 */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 bg-white shadow-[0_-1px_0_rgba(0,43,96,0.1)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid h-16 grid-cols-3">
        <a
          href={`tel:${CONTACT.phoneDigits}`}
          className="flex items-center justify-center gap-2 border-r border-hairline text-sm font-medium text-[#002b60] transition-colors active:bg-mist"
        >
          <Phone className="size-4" fill="currentColor" strokeWidth={0} />
          Ligar
        </a>
        <a
          href={whatsappHref(MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-r border-hairline text-sm font-medium text-[#002b60] transition-colors active:bg-mist"
        >
          <WhatsAppIcon className="size-4 text-[#25d366]" />
          WhatsApp
        </a>
        <Link
          href="/cote-seu-voo"
          className="flex items-center justify-center gap-2 bg-[#002b60] text-sm font-medium text-white transition-colors active:bg-teal-700"
        >
          <Send className="size-4" />
          Cotar
        </Link>
      </div>
    </div>
  );
}
