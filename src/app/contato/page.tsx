import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
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
      <section className="bg-[#002b60] pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <Reveal>
            <h1 className="text-balance max-w-xl font-heading text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
              Estamos disponíveis 24 horas, todos os dias.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-[#f8f8ff]/75 md:text-lg">
              Para emergências, use o WhatsApp ou o telefone. Para as demais solicitações, o
              formulário abaixo chega direto na nossa equipe.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f4f8ff] py-24 md:py-32">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            <Reveal>
              <a
                href={whatsappHref("Olá! Vim pelo site da AirMedPlan e gostaria de falar com um atendente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[20px] border border-[#d9e2f0] bg-white p-5 transition-all hover:border-[#b7c8e4] hover:shadow-card"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25d366]/10 text-[#128c7e]">
                  <WhatsAppIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#5a6f92]">WhatsApp</p>
                  <p className="text-[1.05rem] font-medium text-[#002b60]">
                    +55 {CONTACT.whatsappDisplay}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`tel:${CONTACT.phoneDigits}`}
                className="flex items-center gap-4 rounded-[20px] border border-[#d9e2f0] bg-white p-5 transition-all hover:border-[#b7c8e4] hover:shadow-card"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d2e3fb] text-[#002b60]">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#5a6f92]">Telefone</p>
                  <p className="text-[1.05rem] font-medium text-[#002b60]">{CONTACT.phoneDisplay}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 rounded-[20px] border border-[#d9e2f0] bg-white p-5 transition-all hover:border-[#b7c8e4] hover:shadow-card"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d2e3fb] text-[#002b60]">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#5a6f92]">E-mail</p>
                  <p className="text-[1.05rem] font-medium text-[#002b60]">{CONTACT.email}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-[20px] border border-[#d9e2f0] bg-white p-5 transition-all hover:border-[#b7c8e4] hover:shadow-card"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d2e3fb] text-[#002b60]">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#5a6f92]">Endereço</p>
                  <p className="text-[1.05rem] font-medium leading-snug text-[#002b60]">
                    {CONTACT.addressLine1}
                    <br />
                    {CONTACT.addressLine2}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 rounded-[20px] bg-[#002b60] p-5 text-white">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#97c3ff]">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#f8f8ff]/60">Horário</p>
                  <p className="text-[1.05rem] font-medium">{CONTACT.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[20px] border border-[#d9e2f0] bg-white p-7 shadow-card md:p-9">
              <h2 className="font-heading text-2xl font-medium text-[#002b60]">
                Envie sua mensagem
              </h2>
              <p className="mt-2 text-sm text-[#5a6f92]">
                Preencha o formulário e você será direcionado ao WhatsApp para finalizar.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}