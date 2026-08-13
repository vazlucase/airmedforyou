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
      <div className="bg-[#f5f5f5] py-20 md:py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-[#002b60] sm:text-4xl font-heading">
              Fale Conosco
            </h2>
            <p className="text-pretty mt-4 max-w-md text-base leading-relaxed text-[#002b60]">
              Estamos aqui para ajudá-lo com quaisquer perguntas.
            </p>

            <ul className="mt-9 flex flex-col gap-5">
              <li>
                <a
                  href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[#002b60]"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-teal-400">
                    +55 {CONTACT.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneDigits}`} className="group flex items-center gap-3 text-[#002b60]">
                  <Phone className="size-4 shrink-0" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-teal-400">
                    {CONTACT.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 text-[#002b60]">
                  <Mail className="size-4 shrink-0" />
                  <span className="text-[0.95rem] transition-colors duration-200 group-hover:text-teal-400">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#002b60]">
                <MapPin className="mt-1 size-4 shrink-0" />
                <span className="text-[0.95rem] leading-relaxed">
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2} — {CONTACT.city}/{CONTACT.state}
                </span>
              </li>
              <li className="flex items-center gap-3 text-[#002b60]">
                <Clock3 className="size-4 shrink-0" />
                <span className="text-[0.95rem]">{CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </Container>
      </div>

      {/* Banda 2 — Navegação navy */}
      <div className="bg-[#002b60] py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
            <div className="flex flex-col gap-5">
              <Image src={logoWhite} alt={SITE.name} className="h-8 w-auto" />
              <p className="max-w-xs text-pretty text-sm leading-relaxed text-[#f8f8ff]/70">
                {SITE.description}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-teal-300 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-teal-300" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#f8f8ff]/70">
                  {CONTACT.hours}
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-5 font-heading text-lg font-bold italic text-[#f8f8ff]">
                Serviços
              </h4>
              <ul className="flex flex-col gap-3">
                {SERVICES_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#f8f8ff]/80 transition-colors duration-200 hover:text-[#97c3ff]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 font-heading text-lg font-bold italic text-[#f8f8ff]">
                Institucional
              </h4>
              <ul className="flex flex-col gap-3">
                {INSTITUTIONAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#f8f8ff]/80 transition-colors duration-200 hover:text-[#97c3ff]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 font-heading text-lg font-bold italic text-[#f8f8ff]">
                Navegação
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#f8f8ff]/80 transition-colors duration-200 hover:text-[#97c3ff]"
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
      <div className="border-t border-white/25 bg-[#002b60] py-5">
        <Container className="flex flex-col gap-3 text-xs text-[#f8f8ff]/80 md:flex-row md:items-center md:justify-between">
          <p>© {year} {SITE.legalName}. Todos os direitos reservados.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            ANAC <span>·</span> ANVISA <span>·</span> CRM
            <span className="hidden md:inline">·</span>
            <Link
              href="/politica-de-privacidade"
              className="hidden underline-offset-2 transition-colors hover:text-[#97c3ff] hover:underline md:inline"
            >
              Política de Privacidade
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
