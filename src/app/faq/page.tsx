import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "@/components/faq/FAQSection";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Dúvidas sobre remoção aeromédica (UTI aérea), voos executivos, ClubMed, cotação e operação da AirMedPlan. Respostas claras para você decidir com tranquilidade.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Perguntas frequentes — AirMedPlan",
    description:
      "Esclareça suas dúvidas sobre UTI aérea, voos executivos, ClubMed, cotação e operação da AirMedPlan.",
    url: `${SITE.url}/faq`,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqPage() {
  const totalQuestions = FAQ_CATEGORIES.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="border-b border-hairline bg-paper pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading
              align="center"
              eyebrow="Perguntas frequentes"
              title="Tudo o que você precisa saber antes de voar conosco."
              description="Reunimos aqui as respostas sobre UTI aérea, voos executivos, ClubMed, cotação e operação. Se sua dúvida não estiver listada, nossa central atende 24 horas pelo WhatsApp."
            />
            <p className="mt-6 text-sm font-medium text-ink-muted">
              {totalQuestions} respostas · atualizadas em {new Date().getFullYear()}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-canvas py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQSection />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ainda tem alguma dúvida?"
        description="Nossa equipe está disponível 24 horas para esclarecer qualquer questão e preparar sua cotação."
        whatsappMessage="Olá! Vim pela página de perguntas frequentes da AirMedPlan e tenho uma dúvida."
      />
    </>
  );
}