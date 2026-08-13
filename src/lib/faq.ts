export interface FaqCategory {
  id: string;
  label: string;
  description: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "uti-aerea",
    label: "UTI Aérea",
    description:
      "Remoção aeromédica, regulação, equipamentos e critérios de transporte.",
    items: [
      {
        question: "Quanto tempo leva para uma aeronave decolar após o acionamento?",
        answer:
          "Após a conclusão da regulação médica — que avalia as condições clínicas junto à equipe do hospital de origem — a preparação da missão e a decolagem ocorrem, em média, em até 2 horas. Em emergências com triagem prioritária, buscamos encurtar ao máximo esse tempo.",
      },
      {
        question: "A UTI aérea atende pacientes pediátricos e neonatais?",
        answer:
          "Sim. Nossas equipes e aeronaves são preparadas para atender adultos, pediátricos e neonatais, com incubadoras de transporte, equipamentos e protocolos específicos para cada faixa etária.",
      },
      {
        question: "O que é o protocolo bed-to-bed?",
        answer:
          "É a garantia de continuidade assistencial do leito de origem até o leito de destino: a equipe médica assume o paciente no hospital de saída, mantém a estabilidade durante todo o deslocamento e segue o prontuário ao hospital de chegada, sem interrupção do cuidado.",
      },
      {
        question: "Quais equipamentos a aeronave possui?",
        answer:
          "As aeronaves são homologadas como UTI móvel e contam com ventilador mecânico, monitores multiparâmetro, bombas de infusão, aspirador, O2 de reserva e reanimador, além de itens específicos conforme o perfil clínico do paciente.",
      },
      {
        question: "Vocês realizam remoções internacionais?",
        answer:
          "Sim. Realizamos remoções aeromédicas nacionais e internacionais, com toda a logística de autorizações, tripulação, equipe médica e documentação coordenada pela nossa central de regulação.",
      },
      {
        question: "Quem acompanha o paciente durante o voo?",
        answer:
          "Segundo o quadro clínico, a bordo vão médico e/ou enfermeiro especializados em transporte aeromédico, além da tripulação aérea. Em quadros de maior complexidade, reforçamos a equipe e os equipamentos.",
      },
    ],
  },
  {
    id: "voos-executivos",
    label: "Voos Executivos",
    description:
      "Fretamento de aeronaves para viagens corporativas e particulares.",
    items: [
      {
        question: "Como funciona o fretamento de um voo executivo?",
        answer:
          "Você informa rota, data e horário desejados, e nossa equipe monta a aeronave adequada ao número de passageiros e à distância. Confirmada a viagem, cuidamos do plano de voo, tripulação e apoio em solo.",
      },
      {
        question: "Qual o tamanho da frota e das aeronaves?",
        answer:
          "Trabalhamos com uma malha de aeronaves homologadas e operadas com os mais altos padrões de segurança, desde jatos executivos de médio porte até aeronaves capazes de percorrer grandes distâncias. A escolha se dá conforme a rota e o número de passageiros.",
      },
      {
        question: "O voo executivo pode ser usado para traslados de equipes?",
        answer:
          "Sim, é comum para comitivas corporativas, equipes técnicas e eventos. Montamos esquemas de itinerário (ida e volta múltiplas escalas) com a mesma pontualidade e rigor operacional das missões médicas.",
      },
      {
        question: "Quem cuida da segurança e da documentação?",
        answer:
          "Toda a operação é conduzida por operador aéreo regular com tripulação homologada, sob supervisão da ANAC. A documentação do voo, plano de voo e liberações são providenciados pela nossa equipe operacional.",
      },
    ],
  },
  {
    id: "clubmed",
    label: "ClubMed",
    description:
      "Clube de benefícios em saúde, bem-estar e lazer para você e sua família.",
    items: [
      {
        question: "O que é o ClubMed?",
        answer:
          "É um clube de benefícios que reúne assistência de urgência, telemedicina e vantagens em saúde, bem-estar e lazer, pensado para cuidar da sua rotina — não apenas das emergências.",
      },
      {
        question: "O ClubMed substitui um plano de saúde?",
        answer:
          "Não. O ClubMed complementa um plano de saúde tradicional, agregando assistência de urgência, telemedicina e benefícios, mas não substitui a cobertura médica convencional.",
      },
      {
        question: "Como funcionam os benefícios de bem-estar e lazer?",
        answer:
          "Os membros têm acesso a uma rede de parceiros com descontos e vantagens em academias, bem-estar, alimentação saudável e lazer, além de serviços de assistência e telemedicina.",
      },
      {
        question: "Quem pode aderir ao ClubMed?",
        answer:
          "Pessoas físicas e famílias, com planos que atendem também dependentes. As condições e a cobertura variam conforme o tipo de adesão escolhida.",
      },
    ],
  },
  {
    id: "cotacao",
    label: "Cotação e Pagamento",
    description:
      "Orçamentos, formas de pagamento e o atendimento comercial.",
    items: [
      {
        question: "Como faço uma cotação de remoção aeromédica?",
        answer:
          "Você pode solicitar pelo formulário no site, pelo assistente de cotação ou pelo WhatsApp 24 horas. Nossa central analisa o caso, verifica as condições clínicas e logísticas e envia uma proposta sem compromisso.",
      },
      {
        question: "Quais informações são necessárias para o orçamento?",
        answer:
          "Geralmente pedimos: local de origem e destino, data e horário, condições clínicas do paciente (para remoções) e número de passageiros / bagagens (para executivos). Quanto mais detalhes, mais preciso o orçamento.",
      },
      {
        question: "Quais formas de pagamento são aceitas?",
        answer:
          "Geralmente aceitamos PIX, transferência bancária e cartão de crédito, e detalhamos condições específicas de pagamento na proposta. Para remoções emergenciais, orientamos a combinar o cronograma com a operação.",
      },
      {
        question: "A cotação tem algum custo ou compromisso?",
        answer:
          "A cotação é gratuita e sem compromisso. Você só decide após receber a proposta completa, com as condições e prazos.",
      },
    ],
  },
  {
    id: "operacao",
    label: "Operação e Segurança",
    description:
      "Certificações, horários de atendimento e processo operacional.",
    items: [
      {
        question: "A AirMedPlan é certificada?",
        answer:
          "Sim. Operamos sob supervisão da ANAC, com equipe médica habilitada e protocolos alinhados às normas da ANVISA e certificações do corpo clínico (CRM). É o padrão exigido para aviação executiva e remoção aeromédica.",
      },
      {
        question: "O atendimento funciona 24 horas?",
        answer:
          "Sim. Nossa central de regulação e atendimento está disponível 24 horas por dia, todos os dias do ano, incluindo feriados e finais de semana.",
      },
      {
        question: "Em quais regiões a AirMedPlan atende?",
        answer:
          "Atendemos em todo o território nacional e também em operações internacionais, com base em Belém (Pará) e cobertura por frota própria e parceiros homologados em todo o país.",
      },
      {
        question: "Como é feita a regulação médica no momento do acionamento?",
        answer:
          "Ao acionar, nossa central contacta o hospital e a equipe assistente para coletar dados clínicos, estabiliza as condições para transporte e define o esquema operacional — equipe, aeronave e equipamentos mais adequados ao caso.",
      },
    ],
  },
];