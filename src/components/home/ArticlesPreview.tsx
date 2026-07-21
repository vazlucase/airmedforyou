import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ARTICLES } from "@/lib/constants";

export function ArticlesPreview() {
  return (
    <section className="bg-white py-24 md:py-32">
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
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy-200 px-5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
            >
              Ver todos os conteúdos
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.08}>
              <Link
                href={`/conhecer-mais#${article.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-navy-100 bg-navy-50 p-7 transition-all duration-300 hover:bg-navy-100 hover:shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-full bg-white text-navy-600">
                      <BookOpen className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-[0.1em] text-granite-400">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-balance mt-6 text-xl font-semibold leading-snug text-navy-900 font-heading">
                    {article.title}
                  </h3>
                  <p className="text-pretty mt-3 text-sm leading-relaxed text-granite-600">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span className="text-granite-400">{article.readTime} de leitura</span>
                  <span className="inline-flex items-center gap-1 font-medium text-navy-600">
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
