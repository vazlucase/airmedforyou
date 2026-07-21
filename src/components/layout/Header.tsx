"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, CONTACT, whatsappHref } from "@/lib/constants";
import logo from "@/assets/images/logo.svg";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-4 mt-4 flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-[var(--ease-fluid)] md:mx-8 md:mt-5 md:px-7",
          scrolled || mobileOpen || !isHome
            ? "bg-white shadow-soft"
            : "bg-white/10 backdrop-blur-sm"
        )}
      >
        {/* Logo */}
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
              "h-7 w-auto transition-all duration-500 md:h-8",
              scrolled || mobileOpen || !isHome ? "" : "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.9rem] font-medium transition-all duration-300",
                  scrolled || !isHome
                    ? active
                      ? "bg-navy-100 text-navy-800"
                      : "text-granite-600 hover:bg-granite-50 hover:text-navy-800"
                    : active
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={`tel:${CONTACT.phoneDigits}`}
            className={cn(
              "flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors",
              scrolled || !isHome ? "text-navy-600 hover:text-navy-800" : "text-white/80 hover:text-white"
            )}
          >
            <Phone className="size-3.5" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-9 items-center justify-center rounded-full bg-whatsapp text-white transition-all duration-300 hover:bg-whatsapp-dark"
            aria-label="Falar no WhatsApp"
          >
            <WhatsAppIcon className="size-4" />
          </a>
          <Link
            href="/cote-seu-voo"
            className="inline-flex h-9 items-center justify-center rounded-full bg-red-500 px-5 text-[0.85rem] font-medium text-white shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-red-600 active:scale-[0.96]"
          >
            Cote seu Voo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
            scrolled || !isHome ? "text-navy-800" : "text-white"
          )}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 flex flex-col gap-1 rounded-3xl bg-white p-4 shadow-elevated lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "rounded-2xl px-4 py-3 text-[0.95rem] font-medium text-granite-700 transition-colors",
                  pathname === item.href ? "bg-navy-50 text-navy-800" : "hover:bg-granite-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-granite-200 pt-4">
              <a
                href={`tel:${CONTACT.phoneDigits}`}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-navy-50 px-5 py-3 text-sm font-medium text-navy-700"
              >
                <Phone className="size-4" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp/10 px-5 py-3 text-sm font-medium text-whatsapp-dark"
              >
                <WhatsAppIcon className="size-4" />
                Falar no WhatsApp
              </a>
              <Link
                href="/cote-seu-voo"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-button)]"
              >
                Cote seu Voo
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
