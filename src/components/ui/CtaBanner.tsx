import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/constants";

export function CtaBanner({
  title,
  description,
  quoteHref = "/cote-seu-voo",
  quoteLabel = "Cote seu voo",
  whatsappMessage = "Olá! Vim pelo site da AirMedPlan e gostaria de mais informações.",
}: {
  title: string;
  description?: string;
  quoteHref?: string;
  quoteLabel?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="border-t border-[#d9e2f0] bg-[#f4f8ff] py-24 md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-balance max-w-2xl font-heading text-3xl font-medium leading-[1.15] tracking-tight text-[#002b60] sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-pretty max-w-xl text-base leading-relaxed text-[#5a6f92] md:text-lg">
                {description}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button href={quoteHref} variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right">
                {quoteLabel}
              </Button>
              <Button
                href={whatsappHref(whatsappMessage)}
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon />}
              >
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
