"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, CONTACT, whatsappHref } from "@/lib/constants";
import logoWhite from "@/assets/images/logo-white.svg";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Trava o scroll do body enquanto o menu abre
  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) {
      panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    } else {
      closeButtonRef.current?.focus();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Esc para fechar
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 bg-[#002b60]"
      >
        <div className="relative mx-auto flex h-[4.5rem] w-full max-w-[1250px] items-center justify-between gap-4 px-5 md:px-10">
          {/* Hamburger */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-md text-[#f5f5f5] transition-opacity duration-200 hover:opacity-75"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="navegacao-mobile"
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <>
                <span className="block h-[2px] w-[26px] bg-[#f5f5f5]" />
                <span className="block h-[2px] w-[26px] bg-[#f5f5f5]" />
                <span className="block h-[2px] w-[26px] bg-[#f5f5f5]" />
              </>
            )}
          </button>

          {/* Logo central */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-1"
            aria-label="AirMedPlan — início"
          >
            <Image
              src={logoWhite}
              alt="AirMedPlan"
              className="h-6 w-auto sm:h-7 md:h-8"
              priority
            />
          </Link>

          {/* CTAs à direita */}
          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <Link
              href="/cote-seu-voo"
              className="text-[0.95rem] font-normal uppercase tracking-[0.02em] text-white transition-transform duration-300 hover:translate-x-1 sm:text-base"
            >
              Cote seu Voo
            </Link>
            <a
              href={`tel:${CONTACT.phoneDigits}`}
              className="hidden items-center gap-2 rounded-full border border-white px-4 py-[7px] text-[0.95rem] font-normal uppercase tracking-[0.02em] text-white transition-transform duration-300 hover:translate-x-1 sm:flex"
            >
              <Phone className="size-3.5" fill="currentColor" strokeWidth={0} />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </motion.header>

      {/* Drawer menu — desliza da esquerda */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="navegacao-mobile"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={closeMobileMenu}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full w-[19rem] max-w-[85vw] flex-col overflow-y-auto bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
                <span className="font-heading text-lg text-ink">Menu</span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex size-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist"
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col px-3 py-4" aria-label="Navegação principal">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "rounded-md px-4 py-3 text-[0.95rem] transition-colors",
                        active
                          ? "bg-[#e0edff] font-medium text-[#002b60]"
                          : "text-ink-muted hover:bg-mist hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-2.5 border-t border-hairline px-6 py-6">
                <a
                  href={`tel:${CONTACT.phoneDigits}`}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#002b60] px-5 py-3 text-sm font-medium uppercase tracking-[0.02em] text-[#002b60]"
                >
                  <Phone className="size-4" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-medium text-white"
                >
                  <WhatsAppIcon className="size-4" />
                  Falar no WhatsApp
                </a>
                <Link
                  href="/cote-seu-voo"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-full bg-[#002b60] px-5 py-3 text-sm font-medium text-white"
                >
                  Cote seu Voo
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
