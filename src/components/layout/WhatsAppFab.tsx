"use client";

import * as React from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { whatsappHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.";

export function WhatsAppFab({ className }: { className?: string }) {
  return (
    <Link
      href={whatsappHref(WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-whatsapp-deep text-white shadow-[0_4px_24px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:translate-x-1 hover:brightness-110 active:scale-95 md:bottom-8 md:right-8 lg:flex",
        className
      )}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </Link>
  );
}
