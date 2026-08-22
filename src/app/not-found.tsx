import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-canvas pt-32">
      <Container className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-mist text-ink-muted">
          <PlaneTakeoff className="size-7" strokeWidth={1.5} />
        </span>
        <p className="mt-6 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Erro 404
        </p>
        <h1 className="text-balance mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl font-heading">
          Essa rota não está no plano de voo.
        </h1>
        <p className="text-pretty mt-4 max-w-md leading-relaxed text-ink-muted">
          A página que você procura não existe ou foi movida. Vamos te levar de volta para um
          destino conhecido.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-white transition-all hover:bg-accent-strong active:scale-[0.96] sm:w-auto"
          >
            Voltar para a home
          </Link>
          <a
            href={whatsappHref("Olá! Cheguei a uma página que não encontrei no site da AirMedPlan e preciso de ajuda.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-accent/35 px-7 py-3 text-sm font-semibold text-accent transition-colors hover:bg-paper sm:w-auto"
          >
            <WhatsAppIcon className="size-4" />
            Falar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
