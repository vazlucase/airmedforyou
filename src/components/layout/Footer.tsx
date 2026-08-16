import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Clock3 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT, NAV_ITEMS, SITE, whatsappHref } from "@/lib/constants";
import logoWhite from "@/assets/images/logo-white.svg";

const SERVICES_LINKS = [
  { label: "UTI Aérea", href: "/uti-aerea" },
  { label: "Voos Executivos", href: "/voos-executivos" },
  { label: "ClubMed", href: "/clubmed" },
  { label: "Cote seu Voo", href: "/cote-seu-voo" },
];

const INSTITUTIONAL_LINKS = [
  { label: "Sobre", href: "/sobre" },
  { label: "Conhecer Mais", href: "/conhecer-mais" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Banda 1 — Fale Conosco + formulário */}
      <div className="border-t border-hairline bg-paper py-20 md:py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
              Fale Conosco
            </h2>
            <p className="text-pretty mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Estamos aqui para ajudá-lo com quaisquer perguntas.
            </p>

            <ul className="mt-9 flex flex-col gap-5">
              <li>
                <a
                  href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-ink"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-whatsapp-deep" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-accent">
                    +55 {CONTACT.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneDigits}`} className="group flex items-center gap-3 text-ink">
                  <Phone className="size-4 shrink-0" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-accent">
                    {CONTACT.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 text-ink">
                  <Mail className="size-4 shrink-0" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-accent">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink">
                <MapPin className="mt-1 size-4 shrink-0" />
                <span className="text-[0.95rem] leading-relaxed">
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2} — {CONTACT.city}/{CONTACT.state}
                </span>
              </li>
              <li className="flex items-center gap-3 text-ink">
                <Clock3 className="size-4 shrink-0" />
                <span className="text-[0.95rem]">{CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </Container>
      </div>

      {/* Banda 2 — Navegação escura */}
      <div className="bg-[#0a1220] py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
            <div className="flex flex-col gap-5">
              <Image src={logoWhite} alt={SITE.name} className="h-8 w-auto" />
              <p className="max-w-xs text-pretty text-sm leading-relaxed text-white/65">
                {SITE.description}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-teal-300 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-teal-300" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/65">
                  {CONTACT.hours}
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Serviços
              </h4>
              <ul className="flex flex-col gap-3">
                {SERVICES_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-teal-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Institucional
              </h4>
              <ul className="flex flex-col gap-3">
                {INSTITUTIONAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-teal-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Navegação
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-teal-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Banda 3 — Barra legal */}
      <div className="border-t border-white/10 bg-[#08101c] py-5">
        <Container className="flex flex-col gap-3 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} {SITE.legalName}. Todos os direitos reservados.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            ANAC <span>·</span> ANVISA <span>·</span> CRM
            <span className="hidden md:inline">·</span>
            <Link
              href="/politica-de-privacidade"
              className="hidden underline-offset-2 transition-colors hover:text-teal-300 hover:underline md:inline"
            >
              Política de Privacidade
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}