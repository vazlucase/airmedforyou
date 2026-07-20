import heroEmergencia from "@/assets/images/hero-emergencia.jpg";
import suporteUti from "@/assets/images/suporte-uti.jpg";
import heroExecutive from "@/assets/images/hero-executive.jpg";
import heroClub from "@/assets/images/hero-club.jpg";
import operacaoResgate from "@/assets/images/operacao-resgate.jpg";

import type {
  ArticleSummary,
  FaqItem,
  HeroSlide,
  NavItem,
  ServiceSummary,
  StatItem,
} from "@/types";

export const SITE = {
  name: "AirMedPlan",
  legalName: "AirMedPlan Remoção Aeromédica",
  tagline: "UTI Aérea, voos executivos e o clube que cuida da sua vida.",
  url: "https://www.airmedplan.com.br",
  description:
    "AirMedPlan realiza remoção aeromédica (UTI aérea) 24 horas em todo o Brasil, voos executivos sob medida e o ClubMed — um clube de benefícios para você e sua família.",
  locale: "pt_BR",
};

/**
 * Número de WhatsApp e telefone da AirMedPlan.
 * Configuráveis via variáveis de ambiente (.env) — veja .env.example.
 * Caso a variável não esteja definida, um valor de fallback é usado.
 */
export const CONTACT = {
  whatsappDigits:
    process.env.NEXT_PUBLIC_WHATSAPP_DIGITS ?? "5591974009540",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "(91) 97400-9540",
  phoneDigits: process.env.NEXT_PUBLIC_PHONE_DIGITS ?? "+5591335353053",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(91) 3353-3053",
  email: "contato@airmedplan.com.br",
  addressLine1: "Rodovia BR-316, 1762 — Ed. Next Office",
  addressLine2: "Torre 01, Loja 02 — Térreo, ao lado do Shopping Castanheira",
  city: "Ananindeua",
  state: "PA",
  hours: "Atendimento 24 horas, todos os dias",
};

export function whatsappHref(message: string, digits = CONTACT.whatsappDigits) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "UTI Aérea", href: "/uti-aerea" },
  { label: "Voos Executivos", href: "/voos-executivos" },
  { label: "ClubMed", href: "/clubmed" },
  { label: "Conhecer Mais", href: "/conhecer-mais" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const FOOTER_LINKS: NavItem[] = [
  ...NAV_ITEMS,
  { label: "Cote seu Voo", href: "/cote-seu-voo" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

/** Slides do hero rotativo da Home — imagem + frase trocam juntas a cada 6s */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "emergencia",
    eyebrow: "UTI AÉREA · 24 HORAS",
    title: "Cada minuto importa. Estamos no ar em minutos.",
    subtitle:
      "Remoção aeromédica de alta complexidade, do leito de origem ao leito de destino, em qualquer lugar do Brasil.",
    image: heroEmergencia,
    imageAlt: "Equipe médica embarcando paciente em maca em jato de remoção aeromédica",
    ctaLabel: "Cotar remoção agora",
    ctaHref: "/cote-seu-voo",
  },
  {
    id: "suporte",
    eyebrow: "SUPORTE AVANÇADO À VIDA",
    title: "Uma UTI completa a 41 mil pés de altitude.",
    subtitle:
      "Ventilação mecânica, monitorização contínua e equipe médica dedicada durante todo o voo.",
    image: suporteUti,
    imageAlt: "Cabine de aeronave equipada como UTI aérea, com maca e monitores",
    ctaLabel: "Conhecer a UTI Aérea",
    ctaHref: "/uti-aerea",
  },
  {
    id: "executivo",
    eyebrow: "VOOS EXECUTIVOS",
    title: "Sua agenda não espera. Seu voo, sob medida.",
    subtitle:
      "Fretamento executivo com a mesma pontualidade e segurança que aplicamos a cada missão médica.",
    image: heroExecutive,
    imageAlt: "Interior de jato executivo com poltronas de couro",
    ctaLabel: "Cotar voo executivo",
    ctaHref: "/voos-executivos",
  },
  {
    id: "clubmed",
    eyebrow: "CLUBMED",
    title: "Benefícios que vão muito além da saúde.",
    subtitle:
      "Assistência 24h, vantagens em saúde, bem-estar e lazer para você e quem você ama.",
    image: heroClub,
    imageAlt: "Área de piscina de resort com prédios ao fundo",
    ctaLabel: "Conhecer o ClubMed",
    ctaHref: "/clubmed",
  },
];

export const STATS: StatItem[] = [
  { value: 7500, suffix: "+", label: "remoções aeromédicas realizadas" },
  { value: 24, suffix: "h", label: "disponibilidade, todos os dias do ano" },
  { value: 27, label: "estados atendidos em todo o Brasil" },
  { value: 3, label: "certificações — ANAC, ANVISA e CRM" },
];

export const SERVICES: ServiceSummary[] = [
  {
    slug: "uti-aerea",
    eyebrow: "REMOÇÃO AEROMÉDICA",
    title: "UTI Aérea em todo o Brasil",
    description:
      "Aeronaves homologadas como UTI móvel, equipe médica especializada e protocolo bed-to-bed para transferências de alta complexidade — 24 horas, todos os dias.",
    href: "/uti-aerea",
    image: heroEmergencia,
    imageAlt: "Equipe médica embarcando paciente em jato de remoção aeromédica",
  },
  {
    slug: "voos-executivos",
    eyebrow: "AVIAÇÃO EXECUTIVA",
    title: "Voos executivos sob medida",
    description:
      "Fretamento de aeronaves para viagens corporativas e particulares, com a agilidade e o rigor operacional de quem vive de precisão.",
    href: "/voos-executivos",
    image: heroExecutive,
    imageAlt: "Interior de jato executivo com poltronas de couro",
  },
  {
    slug: "clubmed",
    eyebrow: "CLUBE DE BENEFÍCIOS",
    title: "ClubMed: viver melhor, todos os dias",
    description:
      "Assistência médica de urgência, telemedicina e vantagens exclusivas em saúde, bem-estar e lazer para você e sua família.",
    href: "/clubmed",
    image: heroClub,
    imageAlt: "Área de lazer de resort com piscina",
  },
];

export const ARTICLES: ArticleSummary[] = [
  {
    slug: "como-funciona-uma-remocao-aeromedica",
    title: "Como funciona uma remoção aeromédica, do início ao fim",
    excerpt:
      "Do primeiro contato à chegada ao hospital de destino: entenda cada etapa da regulação médica, logística e voo.",
    readTime: "6 min",
    category: "UTI Aérea",
  },
  {
    slug: "quando-a-uti-aerea-e-indicada",
    title: "Quando a UTI aérea é a opção certa?",
    excerpt:
      "Distância, urgência e complexidade clínica: os critérios que definem quando o transporte aéreo é o mais seguro.",
    readTime: "5 min",
    category: "UTI Aérea",
  },
  {
    slug: "o-que-e-o-clubmed",
    title: "O que é o ClubMed e como ele funciona",
    excerpt:
      "Assistência 24h, telemedicina e benefícios de bem-estar: como o clube protege sua rotina — não só as emergências.",
    readTime: "4 min",
    category: "ClubMed",
  },
];

export const OPERATION_IMAGE = {
  src: operacaoResgate,
  alt: "Aeronave de resgate e equipe de operações aéreas em base do Comando de Operações Aéreas",
};

export const FAQS: FaqItem[] = [
  {
    question: "Quanto tempo leva para uma aeronave decolar após o acionamento?",
    answer:
      "Em média, a preparação da missão e a decolagem ocorrem em até 2 horas após a conclusão da regulação médica, que avalia as condições clínicas do paciente junto à equipe do hospital de origem.",
  },
  {
    question: "A UTI aérea atende pacientes pediátricos e neonatais?",
    answer:
      "Sim. Nossas equipes e aeronaves são preparadas para atendimento de pacientes adultos, pediátricos e neonatais, com equipamentos e protocolos específicos para cada faixa etária.",
  },
  {
    question: "Como funciona a cotação e o pagamento?",
    answer:
      "Você solicita a cotação pelo site ou WhatsApp, nossa equipe analisa o caso e envia um orçamento sem compromisso. Após a aprovação, a regulação médica é iniciada imediatamente.",
  },
  {
    question: "O que é o ClubMed e ele substitui um plano de saúde?",
    answer:
      "O ClubMed é um clube de benefícios com assistência de urgência, telemedicina e vantagens em saúde e bem-estar. Ele complementa — mas não substitui — um plano de saúde tradicional.",
  },
  {
    question: "Vocês atendem remoções internacionais?",
    answer:
      "Sim, realizamos remoções aeromédicas nacionais e internacionais, com toda a logística de autorizações, tripulação e equipe médica coordenada pela nossa central de regulação.",
  },
];
