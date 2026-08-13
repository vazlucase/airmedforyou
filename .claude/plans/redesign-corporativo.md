# Redesign corporativo AirMedPlan — direção "Editorial clínico claro"

## Objetivo
Refazer por completo o visual do site (estilo atual "Liquid Glass": pills arredondadas,
header flutuante, glassmorphism, gradientes, Raleway/Poppins) para uma identidade
**institucional/editorial clínica** — branco, neutros frios, serif para títulos, linhas
finas, tipografia forte e arejada. Escopo: **todas as páginas** + **FAQ completo** novo.
Aplicação do protocolo do Sistema Elite v6.0 (modo RETROFIT + qualidade 9.5+ em 9 dimensões).

---

## 1. 📊 Diagnóstico (estado atual)

**Stack:** Next.js 16 · React 19 · TS strict · Tailwind v4 (`@theme` em `globals.css`) · Motion · lucide · next/font (Raleway/Poppins).

**Design atual:** paleta navy + vermelho puro; raios de 12–40px e `pill`; botões redondos; header flutuante com blur; `glass`/`amapil-overlay`; títulos sans.

**Estrutura existente:**
- `layout.tsx` (Header · Footer · WhatsAppFab, JSON-LD) / `components/layout/*`
- Home: `Hero` (carrossel) · `StatsStrip` · `ServicesOverview` · `AboutEcosystem` · `QuoteSection` (wizard) · `ArticlesPreview`
- Páginas: `/uti-aerea`, `/voos-executivos`, `/clubmed`, `/sobre`, `/conhecer-mais`, `/contato`, `/cote-seu-voo`, `/politica-de-privacidade`, `/not-found`
- UI kit: `Button, Badge, Container, SectionHeading, Reveal, StatCounter, FeatureGrid, ProcessSteps, Accordion, CtaBanner, PageHero, WhatsAppFab`
- Wizard de cotação multi-etapas + redirecionamento WhatsApp **já funciona** — manter funcionamento, só restilizar.
- FAQ existe parcialmente (uso do `Accordion` em `AboutEcosystem`), mas **sem página/área FAQ dedicada**.

**Pontos de melhoria além do visual:**
- FAQ completo e indexável com Schema.org `FAQPage` (SEO).
- Consistência de acessibilidade (contraste AA, hierarquia de headings, estados).
- Design system sem classes de efeito decorativo (glass/overlay) no lugar de tokens semânticos.

---

## 2. 🏗️ Plano de Execução (onda única: design system → layout → páginas)

### 2.1 — Design System (base de tudo)
- **Fontes** (`layout.tsx` + `@theme`): trocar Raleway/Poppins por **Fraunces** (serif p/ títulos) + **Inter** (body/UI), via `next/font/google`, variáveis `--font-display` e `--font-sans` (mantém `font-heading`).
- **`globals.css`** reescrito com tokens **editorial clínico**:
  - Superfícies: branco `#FFFFFF`, canvas `#FAF9F6`, alt `#F1F3EE`, tinta `#1B2320`, secundária `#55605C`, muted `#848F8A`, hairlines `#E4E7E0`.
  - Acentos: **teal clínico** `#0E7A6A` (primário), **carmim** `#B3271E` (urgência), tom apoio `#1F6FB2` (confiança) + neutros.
  - Raios enxutos: `xs 4 / sm 8 / md 10 / lg 14 / xl 18` — **remover `pill` de botões** (botões retangulares; pills só p/ micro-etiquetas).
  - Sombras: `shadow-hairline`, `shadow-card` suave, `shadow-elevated` discreto.
  - Manter keyframes (`fade-in-*`), easing fluido e `prefers-reduced-motion` (já existem).
  - Remover/reduzir `.glass`, `.amapil-overlay`, `.hex-bg`.

### 2.2 — Primitivas UI (`components/ui/*`)
- `Button`: variantes primário (teal), secundário (outline hairline), ghost, `urgent` (carmim) — raio menor, tamanhos `md/lg`/etc., estados focus/hover/active/disabled.
- `Badge`, `Container`, `SectionHeading`, `Reveal`, `StatCounter`, `FeatureGrid`, `ProcessSteps`, `Accordion`, `CtaBanner`: alinhar à escala editorial e à tipografia serif (eyebrows com tracking largo, títulos oversized).

### 2.3 — Layout (`Header`, `Footer`, `WhatsAppFab`, `PageHero`)
- **Header**: abandonar o "float glass" → **barra fina embeizada** no topo com hairline inferior, fundo levemente translúcido, nav limpa, estado ativo com etiqueta/subregular clínica; CTA "Cote seu Voo" retangular teal; menu mobile limpo.
- **Footer**: editorial, colunas, selo de certificações, contato 24h, hairline.
- **PageHero**: título serif + eyebrow/breadcrumb + imagem editorial com vinheta sutil.

### 2.4 — Home (reposicionar seção a seção)
- **Hero**: carrossel mantido em tom editorial — overlay limpo, headline serif, CTA retangular, indicadores finos.
- **StatsStrip**: números serif com hairline.
- **ServicesOverview**: cards editoriais (imagem + hairline + texto), sem pill.
- **AboutEcosystem**: editorial de duas colunas, com card do Comte. Tadeu.
- **QuoteSection**: wizard mantido, em superfície neutra com bom contraste, botões retangulares.
- **ArticlesPreview**: links editoriais.
- **FAQ (NOVO)**: bloco dedicado + páginas — `Accordion` com 20+ perguntas por categoria (UTI Aérea, Voos Executivos, ClubMed, Cotação/Pagamento, Operação), com `FAQ.Organization` JSON-LD, âncoras/breadcrumb no menu e footer.

### 2.5 — Páginas internas (`/uti-aerea`, `/voos-executivos`, `/clubmed`, `/sobre`, `/conhecer-mais`, `/contato`, `/cote-seu-voo`)
- Reestruturar cada uma com `PageHero`/`FeatureGrid`/`ProcessSteps`/`CtaBanner` já refatorados; microcopy revisado e específico.

---

## 3. ✅ Qualidade 9.5+ (checklists do Sistema Elite)
- **Design/UX**: design tokens, hierarquia, tipografia (serif + escala), espaçamento, estados, touch ≥44px, horário (`prefers-reduced-motion`).
- **Acessibilidade**: contraste AA (4.5:1), H1→H2→H3 sem pular, focus visíveis, skip link, navegação por teclado, formulários com `label` + `autocomplete`.
- **SEO**: `FAQ.Organization` JSON-LD, `meta`/`OG` por página, `sitemap`, headings semânticos.
- **Performance**: `next/image`, font `display: swap`, sem animação pesada no corpo.
- **Código/QA**: refactor limpo, wizard intacto, `npm run build` e `lint` aprovando.
- **Portão de segurança**: inputs valdif (Zod já), sem segredos, contato público s/ PII não essencial, nomes/queries vazias — coerente.

---

## 4. 📦 Arquivos a alterar/criar
- **Alterar:** `src/app/globals.css`, `src/app/layout.tsx`, todas as páginas `src/app/**/page.tsx`, `src/components/**`, `src/lib/constants.ts`, `src/types/index.ts`.
- **Criar:** `src/app/faq/page.tsx` (ou bloco), `src/components/faq/*`, dados em `src/lib/faq.ts`, rota adicionada ao menu/footer.
- **Validar:** `npm run build` (e `npm run lint`).

---

## 5. 📋 Entregáveis
Redesign completo em um tom editorial clínico, consistente em todas as páginas, FAQ completo funcional e indexável, build passando (`npm run build`), foco em acessibilidade/performance (notas 9.5+ da skill).