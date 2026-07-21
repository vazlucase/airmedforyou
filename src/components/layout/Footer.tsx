import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock3, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { CONTACT, NAV_ITEMS, SITE, whatsappHref } from "@/lib/constants";
import logo from "@/assets/images/logo.svg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-0 hex-bg opacity-50" aria-hidden />
      <Container className="relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Image
              src={logo}
              alt={SITE.name}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-whatsapp opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-whatsapp" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
                {CONTACT.hours}
              </span>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Serviços
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/cote-seu-voo" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                  Cote seu Voo
                </Link>
              </li>
              <li>
                <Link href="/conhecer-mais" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                  Conhecer Mais
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Contato
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-white/70">
              <li>
                <a
                  href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors duration-200 hover:text-white"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneDigits}`} className="flex items-start gap-3 transition-colors duration-200 hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-navy-300" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 transition-colors duration-200 hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-navy-300" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy-300" />
                <span>
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2} — {CONTACT.city}/{CONTACT.state}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-navy-300" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} {SITE.legalName}. Todos os direitos reservados.</p>
          <p>Certificações ANAC · ANVISA · CRM</p>
        </div>
      </Container>
    </footer>
  );
}
