import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ARTICLES } from "@/lib/constants";

export function ArticlesPreview() {
  return (
    <section className="bg-canvas py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="CONHECER MAIS"
            title="Entenda melhor cada etapa do cuidado."
            className="md:max-w-lg"
          />
          <Reveal delay={0.1}>
            <Link
              href="/conhecer-mais"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#002b60]/35 px-5 py-2.5 text-sm font-medium text-[#002b60] transition-colors hover:border-[#002b60] hover:bg-[#f4f8ff]"
            >
              Ver todos os conteúdos
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.08}>
              <Link
                href={`/conhecer-mais#${article.slug}`}
                className="group flex h-full flex-col justify-between rounded-[20px] border border-[#d9e2f0] bg-canvas p-8 transition-all duration-300 hover:shadow-card hover:border-[#b7c8e4]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-[5px] bg-[#d2e3fb] text-[#002b60]">
                      <BookOpen className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-[0.1em] text-[#5a6f92]">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-balance mt-6 font-heading text-xl font-semibold leading-snug text-[#002b60]">
                    {article.title}
                  </h3>
                  <p className="text-pretty mt-3 text-sm leading-relaxed text-[#5a6f92]">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span className="text-[#5a6f92]">{article.readTime} de leitura</span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#002b60]">
                    Continuar lendo
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
