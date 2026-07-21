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
        "fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-elevated transition-all duration-300 hover:bg-whatsapp-dark active:scale-95 md:bottom-8 md:right-8",
        className
      )}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </Link>
  );
}
