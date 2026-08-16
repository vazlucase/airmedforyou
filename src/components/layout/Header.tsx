"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { NAV_PRIMARY, NAV_MORE, CONTACT, whatsappHref } from "@/lib/constants";
import logoWhite from "@/assets/images/logo-white.svg";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const pathname = usePathname();
  const moreRef = React.useRef<HTMLDivElement>(null);
  const moreButtonRef = React.useRef<HTMLButtonElement>(null);

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
    if (!mobileOpen && !moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, moreOpen]);

  // Fecha o menu "Mais" ao clicar fora
  React.useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a1220]/95 backdrop-blur-md"
      >
        <div className="relative mx-auto flex h-[4.5rem] w-full max-w-[1250px] items-center justify-between gap-4 px-5 md:px-10">
          {/* Hamburger (mobile) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-md text-white transition-opacity duration-200 hover:opacity-75 lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="navegacao-mobile"
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <>
                <span className="block h-[2px] w-[26px] bg-white" />
                <span className="block h-[2px] w-[26px] bg-white" />
                <span className="block h-[2px] w-[26px] bg-white" />
              </>
            )}
          </button>

          {/* Logo (esquerda — desktop) */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center py-1"
            aria-label="AirMedPlan — início"
          >
            <Image
              src={logoWhite}
              alt="AirMedPlan"
              className="h-6 w-auto sm:h-7 md:h-8"
              priority
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.9rem] font-medium text-white/80 transition-colors duration-200 hover:text-white",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive(item.href) && "text-white after:scale-x-100"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Menu "Mais" */}
            <div ref={moreRef} className="relative">
              <button
                ref={moreButtonRef}
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={cn(
                  "flex items-center gap-1 text-[0.9rem] font-medium text-white/80 transition-colors duration-200 hover:text-white",
                  NAV_MORE.some((m) => isActive(m.href)) && "text-white"
                )}
              >
                Mais
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    moreOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {moreOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-hairline bg-white p-1.5 shadow-elevated"
                    role="menu"
                  >
                    {NAV_MORE.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "block rounded-lg px-4 py-2.5 text-[0.9rem] text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-ink",
                          isActive(item.href) && "bg-mist font-medium text-ink"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTAs à direita */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <a
              href={`tel:${CONTACT.phoneDigits}`}
              className="hidden items-center gap-2 text-[0.9rem] font-medium text-white/70 transition-colors hover:text-white md:flex"
            >
              <Phone className="size-4" fill="currentColor" strokeWidth={0} />
              {CONTACT.phoneDisplay}
            </a>
            <Link
              href="/cote-seu-voo"
              className="hidden rounded-full bg-white px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0a1220] transition-all duration-300 hover:bg-white/90 active:scale-[0.97] sm:inline-flex"
            >
              Cote seu Voo
            </Link>
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
            className="fixed inset-0 z-[60] bg-black/60"
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
                <span className="text-lg font-semibold text-ink">Menu</span>
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
                {NAV_PRIMARY.concat(NAV_MORE).map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "rounded-lg px-4 py-3 text-[0.95rem] transition-colors",
                        active
                          ? "bg-mist font-medium text-ink"
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
                  className="flex items-center justify-center gap-2 rounded-full border border-hairline-strong px-5 py-3 text-sm font-medium text-ink"
                >
                  <Phone className="size-4" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="whatsapp-gradient flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
                >
                  <WhatsAppIcon className="size-4" />
                  Falar no WhatsApp
                </a>
                <Link
                  href="/cote-seu-voo"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white"
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