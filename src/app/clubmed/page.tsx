import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HeartHandshake,
  MessageCircle,
  Percent,
  PhoneCall,
  Plane,
  Sparkles,
  Stethoscope,
  Sun,
  Umbrella,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { quickWhatsAppLink } from "@/lib/whatsapp";
import heroClub from "@/assets/images/hero-club.jpg";

export const metadata: Metadata = {
  title: "ClubMed — Clube de Benefícios | AirMedPlan",
  description:
    "O ClubMed é o clube de benefícios da AirMedPlan: saúde, segurança e bem-estar para sua família — com vantagens em experiências como o Salinas Beach Resort. Fale com a gente.",
};

const BENEFITS = [
  {
    icon: PhoneCall,
    title: "Bem-estar e lazer",
    description: "Desfrute com a sua família de resorts de alto padrão durante as suas viagens.",
  },
  {
    icon: Stethoscope,
    title: "Assistência médica remota 24h",
    description: "Sua saúde em primeiro lugar, com a nossa plataforma de telemedicina disponível 24 horas.",
  },
  {
    icon: Percent,
    title: "Segurança com a nossa UTI Aérea",
    description: "A sua segurança e de quem você ama durante as viagens, com o suporte da nossa UTI Aérea 24h.",
  },
  {
    icon: Umbrella,
    title: "Renda extra",
    description: "Você aproveita os benefícios, compartilha uma solução que pode interessar outras pessoas e transforma indicações em uma nova fonte de renda.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado para a família toda",
    description: "Planos pensados para incluir dependentes, do jeito que a sua família precisa.",
  },
  {
    icon: Plane,
    title: "Conheça o ClubMed",
    description: "Fale com a nossa equipe e receba a apresentação completa do clube de benefícios.",
  },
];

/* Benefícios em experiências (seção do Salinas Beach Resort) */
const EXPERIENCE_POINTS = [
  "Vantagens em nosso resort à beira-mar no Pará",
  "Momentos para aproveitar com toda a família",
  "Rede de parceiros de bem-estar e lazer",
  "A segurança de uma equipe disponível 24h",
];

/* Como funciona — sempre caminhando para o contato */
const HOW_IT_WORKS = [
  {
    icon: MessageCircle,
    title: "Chame no WhatsApp",
    description: "Conte o que você procura para você e sua família, sem burocracia e sem compromisso.",
  },
  {
    icon: Users,
    title: "A gente apresenta a melhor opção",
    description: "Nossa equipe entende o seu momento e monta o plano ideal — com condições que cabem na sua rotina.",
  },
  {
    icon: Sun,
    title: "Você aproveita a vida",
    description: "Benefícios ativos no dia a dia, com a nossa equipe 24h sempre ao lado.",
  },
];

const CLUBMED_FAQS = FAQ_CATEGORIES.find((f) => f.id === "clubmed")?.items ?? [];

export default function ClubMedPage() {
  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* Hero — Salinas ao fundo, felicidade e prosperidade          */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#06131f] pt-32 md:pt-40">
        <Image
          src={heroClub}
          alt=""
          aria-hidden
          priority
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        {/* Véu escuro para legibilidade + transições suaves */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#06131f]/90 via-[#06131f]/70 to-[#06131f]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06131f] to-transparent"
        />

        <Container className="relative pb-20 pt-8 md:pb-28 md:pt-10">
          {/* Breadcrumb */}
          <nav aria-label="Trilha de navegação" className="text-sm text-white/80">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center text-white transition-opacity hover:opacity-70">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 text-white/35" />
              </li>
              <li>
                <Link href="/#servicos" className="inline-flex min-h-11 items-center text-white transition-opacity hover:opacity-70">
                  Serviços
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 text-white/35" />
              </li>
              <li aria-current="page">
                <strong className="font-semibold text-white">ClubMed</strong>
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-2xl md:mt-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-[#0a1220]/60 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-100">
                <Sparkles className="size-3.5" />
                Clube de benefícios AirMedPlan
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-balance mt-6 font-heading text-[clamp(2.1rem,6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(6,19,31,0.85)]">
                Felicidade{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  também se planeja.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                O ClubMed cuida da saúde da sua família, abre portas para viver experiências
                incríveis — como o Salinas Beach Resort — e está com você 24 horas por dia, para
                que os dias bons sejam sempre mais numerosos.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href={quickWhatsAppLink("ClubMed — quero conhecer os benefícios")}
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsAppIcon />}
                  className="w-full sm:w-auto"
                >
                  Quero conhecer o ClubMed
                </Button>
                <Button
                  href="#beneficios"
                  variant="outline"
                  size="lg"
                  className="w-full border-white/40 bg-white/80 text-[#0a1220] hover:border-white/60 hover:bg-white/90 active:bg-white/80 sm:w-auto"
                >
                  Ver os benefícios
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-5 text-sm text-white/85">
                Sem compromisso · resposta em poucos minutos
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {["Telemedicina 24h", "UTI Aérea ao seu lado", "Vantagens em lazer e bem-estar"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                      <Check className="size-4 shrink-0 text-amber-300" strokeWidth={2.5} />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
            <Reveal delay={0.36}>
              <p className="mt-10 text-xs tracking-wide text-white/80">
                Foto: Salinas Beach Resort · Salinópolis, Pará
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Benefícios — o clube no dia a dia                          */}
      {/* ---------------------------------------------------------- */}
      <section id="beneficios" className="scroll-mt-12 bg-canvas py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="O CLUBE"
              title="Mais que saúde: um clube para a sua vida inteira."
              description="Uma combinação poderosa: experiências em resorts, assistência 24h, segurança aeromédica e oportunidade de renda."
            />
            <Reveal>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
                O benefício que faz a diferença para a sua família, você descobre numa conversa
                rápida com a nossa equipe.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              const isCta = i === BENEFITS.length - 1;
              return (
                <Reveal key={benefit.title} delay={i * 0.05}>
                  {isCta ? (
                    /* Card de destaque — convite direto para a conversa */
                    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#0d1728] p-8 transition-all duration-300 hover:shadow-elevated">
                      <div
                        aria-hidden
                        className="absolute -right-16 -top-16 size-48 rounded-full bg-amber-300/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                      />
                      <div className="relative">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-400 text-[#241605]">
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-white">
                          {benefit.title}
                        </h3>
                        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/75">
                          {benefit.description}
                        </p>
                      </div>
                      <div className="relative mt-6">
                        <Button
                          href={quickWhatsAppLink("ClubMed — quero ver todos os benefícios")}
                          variant="whatsapp"
                          icon={<WhatsAppIcon />}
                          className="w-full"
                        >
                          Falar com a equipe
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Card padrão — premium e claro */
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas p-8 transition-all duration-300 hover:border-hairline-strong hover:shadow-elevated">
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent via-amber-300 to-amber-200 transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:scale-x-100"
                      />
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-white shadow-[0_4px_12px_rgba(0,43,96,0.18)] transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <span
                          aria-hidden
                          className="flex size-7 items-center justify-center rounded-full border border-hairline text-ink-faint opacity-0 transition-all duration-300 group-hover:opacity-100"
                        >
                          <ArrowRight className="size-3.5" strokeWidth={2} />
                        </span>
                      </div>
                      <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink">
                        {benefit.title}
                      </h3>
                      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
                        {benefit.description}
                      </p>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Experiência — felicidade com endereço (Salinas)            */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-mist py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-elevated ring-1 ring-black/5">
              <Image
                src={heroClub}
                alt="Piscina e área de lazer do Salinas Beach Resort, em Salinópolis (PA)"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-bottom"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-amber-800">
                Experiências para viver
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-4 font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
                Felicidade tem endereço: o Salinas Beach Resort.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty mt-5 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
                Associados do ClubMed acessam condições especiais em nosso resort em Salinópolis,
                no Pará — bem-estar, lazer e momentos inesquecíveis com a família. Porque cuidar da
                vida é também cuidar dos dias felizes.
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-col gap-3.5">
              {EXPERIENCE_POINTS.map((point, i) => (
                <Reveal key={point} delay={0.12 + i * 0.05}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-amber-800">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink">{point}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <div className="mt-9">
                <Button
                  href={quickWhatsAppLink("ClubMed — quero saber mais sobre os parceiros e o resort")}
                  variant="whatsapp"
                  icon={<WhatsAppIcon />}
                  className="w-full sm:w-auto"
                >
                  Quero aproveitar esses benefícios
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Como funciona — três passos até o primeiro contato          */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-canvas py-24 md:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="COMO FUNCIONA"
            title="Começar é mais simples do que você imagina."
            description="Sem formulários longos e sem burocracia: o primeiro passo é uma conversa."
          />
          <div className="mx-auto mt-14 max-w-4xl">
            <ProcessSteps steps={HOW_IT_WORKS} />
          </div>
          <div className="mt-14 flex justify-center">
            <Button
              href={quickWhatsAppLink("ClubMed — quero começar agora")}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon />}
              className="w-full sm:w-auto"
            >
              Começar agora
            </Button>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ — derruba objeções antes do CTA final                  */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-paper py-24 md:py-32">
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="PERGUNTAS FREQUENTES"
            title="O que você quer saber sobre o ClubMed"
          />
          <div className="mt-12">
            <Accordion items={CLUBMED_FAQS} />
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              Ficou alguma dúvida? A gente responde pelo WhatsApp, agora mesmo.
            </p>
            <Button
              href={quickWhatsAppLink("ClubMed — tenho dúvidas sobre o clube")}
              variant="outline"
              icon={<WhatsAppIcon />}
              className="w-full sm:w-auto"
            >
              Tirar dúvidas no WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* CTA final — escuro, espelhando o hero                      */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#06131f] py-24 md:py-32">
        <Image
          src={heroClub}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#06131f]/90 via-[#06131f]/70 to-[#06131f]/90"
        />
        <Container className="relative">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-balance max-w-2xl font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">
              Quer viver essa{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                felicidade
              </span>
              ?
            </h2>
            <p className="text-pretty max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Conte um pouco sobre você e nossa equipe apresenta o ClubMed ideal para a sua
              família — a primeira mensagem não custa nada.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={quickWhatsAppLink("ClubMed - quero conhecer melhor o clube")}
                size="lg"
                icon={<WhatsAppIcon />}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-[#241605] hover:brightness-105 focus-visible:outline-amber-300 sm:w-auto"
              >
                Quero conhecer o ClubMed
              </Button>
              <Button
                href="/clubmed#beneficios"
                variant="outline"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
                className="w-full border-white/40 bg-white/80 text-[#0a1220] hover:border-white/60 hover:bg-white/90 active:bg-white/80 sm:w-auto"
              >
                Ver benefícios
              </Button>
            </div>
            <p className="text-sm text-white/70">Atendimento 24 horas · Sem compromisso</p>
          </div>
        </Container>
      </section>
    </>
  );
}