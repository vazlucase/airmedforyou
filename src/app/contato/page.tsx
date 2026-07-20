import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT, whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a AirMedPlan pelo WhatsApp, telefone ou formulário. Atendimento 24 horas, todos os dias, em Belém e em todo o Brasil.",
};

export default function ContatoPage() {
  const mapsQuery = encodeURIComponent(`${CONTACT.addressLine1}, ${CONTACT.city} - ${CONTACT.state}`);

  return (
    <>
      <section className="bg-ink-900 pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <Reveal>
            <Badge tone="white">FALE CONOSCO</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance mt-5 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Estamos disponíveis 24 horas, todos os dias.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              Para emergências, use o WhatsApp ou o telefone. Para as demais solicitações, o
              formulário abaixo chega direto na nossa equipe.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist-50 py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Reveal>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-ink-500/8 bg-white p-5 transition-colors hover:border-whatsapp/30 hover:bg-whatsapp/5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp-dark">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-300">WhatsApp</p>
                  <p className="text-[1.05rem] font-medium text-ink-500">{CONTACT.whatsappDisplay}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`tel:${CONTACT.phoneDigits}`}
                className="flex items-center gap-4 rounded-3xl border border-ink-500/8 bg-white p-5 transition-colors hover:border-ink-500/20"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-300">Telefone</p>
                  <p className="text-[1.05rem] font-medium text-ink-500">{CONTACT.phoneDisplay}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 rounded-3xl border border-ink-500/8 bg-white p-5 transition-colors hover:border-ink-500/20"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-300">E-mail</p>
                  <p className="text-[1.05rem] font-medium text-ink-500">{CONTACT.email}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-3xl border border-ink-500/8 bg-white p-5 transition-colors hover:border-ink-500/20"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-300">Endereço</p>
                  <p className="text-[1.05rem] font-medium leading-snug text-ink-500">
                    {CONTACT.addressLine1}
                    <br />
                    {CONTACT.addressLine2}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 rounded-3xl bg-ink-500 p-5 text-white">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-white/60">Horário</p>
                  <p className="text-[1.05rem] font-medium">{CONTACT.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
