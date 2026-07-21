import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-white pt-32">
      <Container className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-navy-50 text-navy-400">
          <PlaneTakeoff className="size-7" strokeWidth={1.5} />
        </span>
        <p className="mt-6 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-granite-400">
          Erro 404
        </p>
        <h1 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl font-heading">
          Essa rota não está no plano de voo.
        </h1>
        <p className="text-pretty mt-4 max-w-md leading-relaxed text-granite-600">
          A página que você procura não existe ou foi movida. Vamos te levar de volta para um
          destino conhecido.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-red-500 px-7 text-sm font-medium text-white shadow-[var(--shadow-button)] transition-all hover:bg-red-600 active:scale-[0.96]"
          >
            Voltar para a home
          </Link>
          <a
            href={whatsappHref("Olá! Cheguei a uma página que não encontrei no site da AirMedPlan e preciso de ajuda.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy-200 px-7 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            <WhatsAppIcon className="size-4" />
            Falar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
