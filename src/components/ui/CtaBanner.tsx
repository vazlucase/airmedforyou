import { MessageCircle, ArrowRight } from "lucide-react";
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
    <section className="bg-white py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-ink-500 px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="text-balance max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-pretty max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                {description}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button href={quoteHref} variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right">
                {quoteLabel}
              </Button>
              <Button
                href={whatsappHref(whatsappMessage)}
                variant="glass"
                size="lg"
                icon={<MessageCircle />}
                className="text-white [&:hover]:bg-white/15"
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
