"use client";

import * as React from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT, whatsappHref } from "@/lib/constants";

export function WhatsAppFab() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass w-[min(88vw,320px)] overflow-hidden rounded-3xl p-1.5 shadow-elevated"
          >
            <div className="flex items-start justify-between gap-2 rounded-[1.35rem] bg-ink-500 p-4 text-white">
              <div>
                <p className="text-sm font-semibold">AirMedPlan</p>
                <p className="mt-0.5 text-xs text-white/60">Normalmente responde em minutos</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Fechar"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-3.5">
              <p className="text-pretty px-1 pb-3 text-sm leading-relaxed text-ink-400">
                Olá 👋 Precisa de UTI Aérea, voo executivo ou quer conhecer o ClubMed? Fale
                agora com nossa equipe.
              </p>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
              >
                <MessageCircle className="size-4" />
                Iniciar conversa
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgba(52,175,35,0.6)] transition-colors hover:bg-whatsapp-dark"
        aria-label={open ? "Fechar chat do WhatsApp" : `Falar no WhatsApp: ${CONTACT.whatsappDisplay}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
