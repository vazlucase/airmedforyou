"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, CONTACT, whatsappHref } from "@/lib/constants";
import logo from "@/assets/images/logo.svg";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  const solid = scrolled || mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-3 mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-[var(--ease-fluid)] md:mx-6 md:mt-4 md:px-6",
          solid ? "glass shadow-soft" : "bg-transparent"
        )}
      >
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-2 py-1"
          aria-label="AirMedPlan — início"
        >
          <Image
            src={logo}
            alt="AirMedPlan"
            className={cn(
              "h-6 w-auto transition-[filter] duration-500 md:h-7",
              solid ? "" : "brightness-0 invert"
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                  solid
                    ? active
                      ? "bg-ink-50 text-ink-500"
                      : "text-ink-400 hover:bg-ink-500/5 hover:text-ink-500"
                    : active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a
            href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex size-10 items-center justify-center rounded-full transition-colors duration-300",
              solid ? "bg-whatsapp/10 text-whatsapp-dark hover:bg-whatsapp/15" : "bg-white/10 text-white hover:bg-white/20"
            )}
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="size-[1.15rem]" strokeWidth={2} />
          </a>
          <Link
            href="/cote-seu-voo"
            className="inline-flex h-10 items-center justify-center rounded-full bg-red-500 px-5 text-[0.9rem] font-medium text-white shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-red-600 active:scale-[0.96]"
          >
            Cote seu Voo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
            solid ? "text-ink-500" : "text-white"
          )}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-3 mt-2 flex flex-col gap-1 rounded-3xl p-3 shadow-elevated lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "rounded-2xl px-4 py-3 text-[0.95rem] font-medium text-ink-500 transition-colors",
                  pathname === item.href ? "bg-ink-50" : "hover:bg-ink-500/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-1 flex flex-col gap-2 border-t border-ink-500/10 pt-3">
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp/10 px-5 text-[0.9rem] font-medium text-whatsapp-dark"
              >
                <MessageCircle className="size-4" />
                Falar no WhatsApp
              </a>
              <Link
                href="/cote-seu-voo"
                onClick={closeMobileMenu}
                className="inline-flex h-11 items-center justify-center rounded-full bg-red-500 px-5 text-[0.9rem] font-medium text-white shadow-[var(--shadow-button)]"
              >
                Cote seu Voo
              </Link>
              <a
                href={`tel:${CONTACT.phoneDigits}`}
                onClick={closeMobileMenu}
                className="px-4 py-1 text-center text-sm text-ink-400"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
