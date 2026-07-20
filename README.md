# AirMedPlan — site institucional

Site institucional da AirMedPlan (UTI Aérea, Voos Executivos e ClubMed), reconstruído em
**Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**, a partir da base HTML/CSS/JS
original, com novo sistema de design inspirado na linguagem visual da Apple ("Liquid
Glass"), performance como prioridade e um assistente de cotação multi-etapas totalmente
funcional com redirecionamento para o WhatsApp.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript (strict) |
| Estilo | Tailwind CSS v4 (tokens via `@theme` em `globals.css`) |
| Animação | Motion (sucessor do Framer Motion) |
| Formulários | react-hook-form + Zod |
| Ícones | lucide-react |
| Fontes | Geist Sans / Geist Mono (via `next/font`) |
| Imagens | `next/image` com `sharp` (AVIF/WebP automáticos) |

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros comandos:

```bash
npm run build       # build de produção
npm run start        # roda o build de produção
npm run lint          # ESLint
```

## Configuração rápida (dados do negócio)

Praticamente todo dado de contato/negócio vive em **`src/lib/constants.ts`**:

- `CONTACT` — número de WhatsApp, telefone, e-mail, endereço, horário de atendimento.
- `SITE` — nome, descrição, URL (usada em metadata/SEO/sitemap).
- `HERO_SLIDES` — os 4 slides do carrossel da home (imagem + frase + CTA).
- `SERVICES`, `STATS`, `ARTICLES`, `FAQS` — conteúdo das seções.

Trocar o número de WhatsApp, endereço ou textos institucionais não exige tocar em
nenhum componente — tudo referencia esse arquivo central.

## Estrutura

```
src/
├── app/                      # rotas (App Router)
│   ├── page.tsx               # Home
│   ├── uti-aerea/              # Remoção aeromédica
│   ├── voos-executivos/
│   ├── clubmed/
│   ├── cote-seu-voo/            # assistente de cotação (página dedicada)
│   ├── sobre/
│   ├── conhecer-mais/           # conteúdo educativo (3 artigos)
│   ├── contato/
│   ├── politica-de-privacidade/ # LGPD
│   ├── sitemap.ts / robots.ts / manifest.ts
│   └── globals.css              # design tokens (Tailwind v4 @theme)
├── components/
│   ├── layout/                # Header, Footer, PageHero, WhatsAppFab
│   ├── ui/                     # Button, Badge, Reveal, Accordion, FeatureGrid...
│   ├── home/                    # Hero (carrossel), seções da home
│   ├── quote/                    # QuoteWizard e suas etapas
│   └── contact/                   # formulário de contato
├── lib/                        # constants, whatsapp.ts (mensagens), validations (Zod), utils
├── types/                      # tipos de domínio compartilhados
└── assets/images/               # imagens otimizadas (a partir do material enviado)
```

## O que foi entregue

**Migração completa para React/Next.js**, mantendo a estrutura e o conteúdo da base
original (header, hero, serviços, sobre, cotação, footer), com o layout preservado e o
estilo elevado a um sistema de design consistente.

**Design "Apple-like"**: navegação em vidro fosco (glassmorphism/"Liquid Glass") que
se adapta ao rolar a página, tipografia Geist com hierarquia clara, botões em pílula
com feedback de pressão, cantos concêntricos generosos, animações fluidas com curva de
easing personalizada e respeito a `prefers-reduced-motion`.

**Hero rotativo na Home**: imagem de fundo e frase trocam juntas a cada 6 segundos,
com efeito Ken Burns sutil, barra de progresso por slide (estilo stories) e pausa
automática quando a aba não está visível. Usa as 4 fotos reais enviadas — cada uma
representando uma frente do negócio (emergência, UTI a bordo, voo executivo, ClubMed).

**Assistente de cotação (Cote seu Voo)** — totalmente funcional:
- 4 etapas (tipo de solicitação → rota/detalhes → observações → contato), com barra de
  progresso e validação em cada etapa (Zod).
- Pergunta o tipo de solicitação primeiro (emergência, transferência agendada, voo
  executivo, ClubMed) e adapta os campos seguintes — ClubMed não exige origem/destino.
- Banner de emergência fixo no topo com atalhos diretos para ligação e WhatsApp,
  sem precisar preencher formulário.
- Ao concluir, monta uma mensagem formatada com todos os dados e abre o WhatsApp
  automaticamente (`wa.me`) em uma nova aba — testado ponta a ponta.
- Disponível tanto como página dedicada (`/cote-seu-voo`, com contexto e FAQ) quanto
  embutido na Home.
- Suporta deep-link: `/cote-seu-voo?tipo=clubmed` pré-seleciona o tipo de solicitação.

**Páginas geradas** (novas, antes inexistentes): UTI Aérea, Voos Executivos, ClubMed,
Sobre, Conhecer Mais (3 artigos completos), Contato (com formulário próprio, também
integrado ao WhatsApp), Política de Privacidade (LGPD) e página 404 personalizada.

**Performance**: imagens de origem foram redimensionadas/recomprimidas (de até 3,2 MB
para ~200-400 KB) e são servidas via `next/image` com AVIF/WebP automáticos; fontes
carregadas via `next/font` (self-hosted, sem layout shift); a maior parte das páginas é
estática (prerendered); componentes interativos são isolados como Client Components,
mantendo o resto como Server Components.

**SEO/LGPD**: metadata completo (Open Graph, Twitter Card), JSON-LD (`MedicalBusiness`),
`sitemap.xml` e `robots.txt` gerados automaticamente, e uma Política de Privacidade
alinhada à LGPD para os formulários que coletam dados.

## Notas e próximos passos sugeridos

- **Testimonials**: não foram criados depoimentos fictícios de clientes — isso exige
  depoimentos reais autorizados pelos pacientes/clientes.
- **Frota e área de cobertura**: dá para virar páginas próprias quando houver fotos/dados
  reais da frota e do mapa de cobertura.
- **Contato**: o formulário de contato também redireciona para o WhatsApp (não há
  back-end/e-mail configurado). Se preferir receber por e-mail, dá para trocar por uma
  rota de API com um provedor tipo Resend.
- **Domínio/URL**: `SITE.url` em `constants.ts` está com um domínio placeholder —
  atualize para o domínio real antes de gerar o sitemap em produção.
