import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { ARTICLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conhecer Mais",
  description:
    "Entenda como funciona uma remoção aeromédica, quando a UTI aérea é indicada e o que é o ClubMed — conteúdos educativos da AirMedPlan.",
};

export default function ConhecerMaisPage() {
  return (
    <>
      <section className="bg-ink-900 pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <Reveal>
            <Badge tone="white">CONHECER MAIS</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance mt-5 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Entenda melhor cada etapa do cuidado.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Conteúdos pensados para esclarecer dúvidas comuns sobre remoção aeromédica e sobre
              o ClubMed — sem jargão desnecessário.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`#${article.slug}`}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-white"
              >
                {article.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container className="max-w-3xl">
          <article id="como-funciona-uma-remocao-aeromedica" className="scroll-mt-28">
            <Reveal>
              <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                <BookOpen className="size-5" strokeWidth={1.75} />
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-5 text-3xl font-semibold leading-tight tracking-tight text-ink-500 sm:text-4xl">
                Como funciona uma remoção aeromédica, do início ao fim
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-400">
                <p>
                  Uma remoção aeromédica começa muito antes da decolagem. Tudo se inicia com o
                  contato da família ou do hospital de origem com a nossa central, relatando o
                  quadro clínico do paciente. A partir daí, um médico regulador avalia as
                  informações junto à equipe assistente para entender a real necessidade de
                  suporte durante o voo.
                </p>
                <p>
                  Com o quadro clínico definido, a equipe de operações escolhe a aeronave e os
                  equipamentos adequados — que podem incluir ventilação mecânica, monitorização
                  contínua, bombas de infusão e, em casos neonatais, incubadora de transporte. Ao
                  mesmo tempo, é montada a equipe médica que acompanhará a missão, sempre composta
                  por profissionais com formação específica em transporte de pacientes críticos.
                </p>
                <p>
                  No momento do embarque, o paciente é transferido do leito hospitalar para a
                  aeronave com o mesmo cuidado de uma transferência intra-hospitalar, mantendo
                  todos os acessos, monitores e suporte já em uso. Durante o voo, a equipe médica
                  monitora continuamente os sinais vitais e está preparada para intervir a
                  qualquer momento — a cabine funciona, na prática, como uma UTI em movimento.
                </p>
                <p>
                  Ao chegar ao destino, o processo se repete de forma inversa: o paciente é
                  transferido para uma ambulância terrestre e conduzido até o hospital de
                  destino, onde nossa equipe realiza a passagem de caso diretamente com os
                  médicos que assumirão o tratamento, entregando um relatório completo de toda a
                  missão. Esse protocolo, conhecido como bed-to-bed (leito a leito), é o que
                  garante que a estabilidade clínica do paciente seja preservada em cada etapa.
                </p>
              </div>
            </Reveal>
          </article>

          <div className="my-16 h-px bg-ink-500/10" />

          <article id="quando-a-uti-aerea-e-indicada" className="scroll-mt-28">
            <Reveal>
              <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                <BookOpen className="size-5" strokeWidth={1.75} />
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-5 text-3xl font-semibold leading-tight tracking-tight text-ink-500 sm:text-4xl">
                Quando a UTI aérea é a opção certa?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-400">
                <p>
                  Nem toda transferência de paciente exige uma aeronave — mas alguns fatores
                  tornam a UTI aérea não apenas recomendável, e sim a opção mais segura
                  disponível. O primeiro deles é a distância: quando o transporte terrestre
                  levaria horas a mais do que o quadro clínico permite, o tempo ganho no ar pode
                  ser decisivo.
                </p>
                <p>
                  O segundo fator é a complexidade clínica. Pacientes que dependem de ventilação
                  mecânica, estão hemodinamicamente instáveis ou exigem monitorização contínua se
                  beneficiam do ambiente controlado de uma aeronave-UTI, com equipe médica
                  dedicada exclusivamente a eles — diferente de uma ambulância terrestre
                  compartilhando atenção com o trânsito e a estrada.
                </p>
                <p>
                  Também entra na conta o acesso geográfico. Em regiões como a Amazônia, onde
                  distâncias entre municípios podem ser de centenas de quilômetros sem malha
                  rodoviária direta, a aeronave muitas vezes é o único caminho viável entre o
                  hospital de origem e um centro de referência.
                </p>
                <p>
                  Por fim, há situações em que a urgência do quadro — um infarto, um AVC ou uma
                  complicação obstétrica grave, por exemplo — exige que o paciente chegue a um
                  centro de maior complexidade no menor tempo possível. Nesses casos, a decisão
                  pela UTI aérea costuma ser feita em conjunto entre a equipe assistente e nossos
                  médicos reguladores, sempre com base no quadro clínico apresentado.
                </p>
              </div>
            </Reveal>
          </article>

          <div className="my-16 h-px bg-ink-500/10" />

          <article id="o-que-e-o-clubmed" className="scroll-mt-28">
            <Reveal>
              <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                <BookOpen className="size-5" strokeWidth={1.75} />
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance mt-5 text-3xl font-semibold leading-tight tracking-tight text-ink-500 sm:text-4xl">
                O que é o ClubMed e como ele funciona
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-400">
                <p>
                  O ClubMed nasceu de uma constatação simples: emergências acontecem raramente,
                  mas o cuidado precisa existir todos os dias. Por isso, o ClubMed é um clube de
                  benefícios — não um plano de saúde — desenhado para acompanhar o dia a dia de
                  seus membros, e não apenas os momentos críticos.
                </p>
                <p>
                  Na prática, isso significa acesso a uma central de assistência de urgência
                  disponível 24 horas, consultas por telemedicina sempre que surgir uma dúvida ou
                  necessidade, e condições especiais em remoção aeromédica caso o pior venha a
                  acontecer. A esses benefícios de saúde, somam-se vantagens em bem-estar e lazer
                  com parceiros selecionados, ampliando o valor do clube para além do contexto
                  médico.
                </p>
                <p>
                  É importante entender o que o ClubMed não é: ele não substitui um plano de
                  saúde tradicional, nem cobre internações ou tratamentos continuados. Seu papel é
                  complementar — preencher a lacuna entre o dia a dia e as emergências, com um
                  time de resposta rápida por trás de cada acionamento.
                </p>
                <p>
                  Associar-se ao ClubMed é simples: basta falar com nossa equipe para entender qual
                  plano se encaixa melhor na sua realidade e na da sua família, sem burocracia
                  desnecessária.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/clubmed"
                className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                Conhecer os planos do ClubMed
                <ArrowRight className="size-3.5" />
              </Link>
            </Reveal>
          </article>
        </Container>
      </section>

      <CtaBanner
        title="Ainda tem dúvidas?"
        description="Fale diretamente com nossa equipe — respondemos rápido, todos os dias."
      />
    </>
  );
}
