import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a AirMedPlan coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
};

const SECTIONS = [
  {
    title: "1. Quem somos",
    body: `Esta Política de Privacidade descreve como a ${SITE.legalName} ("AirMedPlan", "nós") coleta, usa, armazena e protege dados pessoais de visitantes e usuários deste site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).`,
  },
  {
    title: "2. Quais dados coletamos",
    body: "Coletamos apenas os dados que você nos fornece voluntariamente ao preencher formulários de cotação ou contato: nome completo, telefone, e-mail (quando informado) e detalhes da solicitação (como origem, destino, data desejada e informações relevantes sobre o caso). Não coletamos dados sensíveis de saúde além do estritamente necessário para viabilizar o atendimento, e o preenchimento desses campos é sempre opcional.",
  },
  {
    title: "3. Para que usamos seus dados",
    body: "Utilizamos os dados coletados exclusivamente para: (i) responder à sua solicitação de cotação ou contato; (ii) viabilizar a operação de remoção aeromédica, voo executivo ou associação ao ClubMed, quando aplicável; e (iii) cumprir obrigações legais ou regulatórias. Não utilizamos seus dados para fins de publicidade direcionada nem os vendemos a terceiros.",
  },
  {
    title: "4. Base legal",
    body: "O tratamento dos seus dados é fundamentado no seu consentimento, fornecido ao marcar a caixa de concordância nos formulários deste site, e no legítimo interesse da AirMedPlan em responder a solicitações de atendimento e cotação.",
  },
  {
    title: "5. Compartilhamento de dados",
    body: 'Ao optar por enviar um formulário, seus dados são formatados em uma mensagem e você é direcionado ao WhatsApp para envio — nesse momento, o processamento da mensagem passa a ser regido também pela política de privacidade do WhatsApp/Meta. Podemos compartilhar dados com hospitais, equipes médicas e prestadores parceiros estritamente quando necessário para viabilizar a operação solicitada.',
  },
  {
    title: "6. Armazenamento e segurança",
    body: "Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acesso não autorizado, perda ou alteração. Os dados são mantidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou obrigações legais aplicáveis.",
  },
  {
    title: "7. Seus direitos",
    body: "Conforme os artigos 17 a 22 da LGPD, você pode solicitar a qualquer momento: confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou desatualizados, anonimização ou eliminação de dados desnecessários, portabilidade de dados e revogação do consentimento. Para exercer esses direitos, entre em contato pelos canais abaixo.",
  },
  {
    title: "8. Cookies",
    body: "Este site não utiliza cookies de rastreamento ou publicidade. Eventuais cookies técnicos, estritamente necessários ao funcionamento do site, não são utilizados para identificar ou perfilar usuários.",
  },
  {
    title: "9. Alterações desta política",
    body: "Esta política pode ser atualizada periodicamente para refletir melhorias em nossas práticas ou mudanças na legislação. A data da última atualização estará sempre indicada ao final desta página.",
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="bg-white py-20 pt-40 md:py-28 md:pt-48">
      <Container className="max-w-3xl">
        <span className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-red-500">
          LGPD
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-500 sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-ink-300">Última atualização: julho de 2026</p>

        <div className="mt-12 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-ink-500">{section.title}</h2>
              <p className="text-pretty mt-3 leading-relaxed text-ink-400">{section.body}</p>
            </div>
          ))}

          <div className="rounded-3xl bg-mist-50 p-6">
            <h2 className="text-lg font-semibold text-ink-500">Fale com nosso encarregado de dados</h2>
            <p className="mt-3 leading-relaxed text-ink-400">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em
              contato pelo e-mail{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-ink-500 underline underline-offset-2">
                {CONTACT.email}
              </a>{" "}
              ou pelo telefone {CONTACT.phoneDisplay}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
