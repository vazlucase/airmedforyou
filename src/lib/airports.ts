/**
 * Base de referência de aeroportos e pistas de pouso do Brasil.
 *
 * Usada pelo assistente de cotação para sugerir locais enquanto o usuário
 * digita — aeroportos com código IATA e aeródromos/pistas regionais (muitas
 * vezes o único caminho viável em remoções na Amazônia).
 *
 * A lista não é exaustiva: o campo de texto continua aceitando qualquer
 * local digitado livremente (helipontos, pistas privadas etc.).
 */

export interface AirportItem {
  /** Código IATA (vazio quando o aeródromo não possui código oficial). */
  code: string;
  name: string;
  city: string;
  state: string;
  /** true = aeroporto comercial principal; false = pista/aeródromo regional */
  main: boolean;
  type: "airport" | "aerodrome";
}

/** Texto exibido na mensagem do WhatsApp quando o local é selecionado. */
export function formatLocation(item: AirportItem): string {
  if (item.type === "airport") {
    return `${item.name}${item.code ? ` (${item.code})` : ""}`;
  }
  return `${item.name} (${item.city}/${item.state})`;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

interface Scored {
  item: AirportItem;
  score: number;
}

function scoreItem(item: AirportItem, query: string): number | null {
  const code = item.code.toLowerCase();
  const city = normalize(item.city);
  const name = normalize(item.name);
  const state = item.state.toLowerCase();

  if (code && code === query) return 100;
  if (code && code.startsWith(query)) return 80;
  if (city.startsWith(query)) return 60 + (item.main ? 5 : 0);
  if (name.startsWith(query)) return 55 + (item.main ? 4 : 0);
  if (city.includes(query)) return 38 + (item.main ? 3 : 0);
  if (name.includes(query)) return 32 + (item.main ? 2 : 0);
  if (state.startsWith(query)) return 20;
  if (`${city} ${state}`.includes(query)) return 15;
  return null;
}

/** Busca cidades/aeroportos/pistas por nome, cidade, estado ou código IATA. */
export function searchLocations(query: string, limit = 8): AirportItem[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  return AIRPORTS.map((item) => {
    const base = scoreItem(item, q);
    return base === null ? null : { item, score: base };
  })
    .filter((s): s is Scored => s !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

/* ------------------------------------------------------------------ */
/* Dados: aeroportos principais (IATA) + aeródromos regionais (sem code) */
/* ------------------------------------------------------------------ */

const AIRPORTS: AirportItem[] = [
  // ── Norte — PA / AP / AM ────────────────────────────────────────────
  { code: "BEL", name: "Aeroporto Internacional de Belém — Val-de-Cans", city: "Belém", state: "PA", main: true, type: "airport" },
  { code: "STM", name: "Aeroporto de Santarém — Maestro Wilson Fonseca", city: "Santarém", state: "PA", main: true, type: "airport" },
  { code: "MAB", name: "Aeroporto de Marabá", city: "Marabá", state: "PA", main: true, type: "airport" },
  { code: "CKS", name: "Aeroporto de Carajás", city: "Parauapebas", state: "PA", main: true, type: "airport" },
  { code: "ATM", name: "Aeroporto de Altamira", city: "Altamira", state: "PA", main: true, type: "airport" },
  { code: "ITB", name: "Aeroporto de Itaituba", city: "Itaituba", state: "PA", main: true, type: "airport" },
  { code: "TUR", name: "Aeroporto de Tucuruí", city: "Tucuruí", state: "PA", main: true, type: "airport" },
  { code: "OBI", name: "Aeroporto de Óbidos", city: "Óbidos", state: "PA", main: true, type: "airport" },
  { code: "CDJ", name: "Aeroporto de Conceição do Araguaia", city: "Conceição do Araguaia", state: "PA", main: true, type: "airport" },
  { code: "SXO", name: "Aeroporto de São Félix do Xingu", city: "São Félix do Xingu", state: "PA", main: false, type: "airport" },
  { code: "OIA", name: "Aeroporto de Ourilândia do Norte", city: "Ourilândia do Norte", state: "PA", main: false, type: "airport" },
  { code: "RDC", name: "Aeroporto de Redenção", city: "Redenção", state: "PA", main: false, type: "airport" },
  { code: "PTQ", name: "Aeroporto de Porto de Moz", city: "Porto de Moz", state: "PA", main: false, type: "airport" },
  { code: "SFK", name: "Aeroporto de Soure", city: "Soure", state: "PA", main: false, type: "airport" },

  { code: "", name: "Aeródromo de Monte Dourado — Amburana", city: "Almeirim", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Barcarena", city: "Barcarena", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Breves", city: "Breves", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Portel", city: "Portel", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Salvaterra", city: "Salvaterra", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Chaves", city: "Chaves", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Curralinho", city: "Curralinho", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Oriximiná", city: "Oriximiná", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Alenquer", city: "Alenquer", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Jacareacanga", city: "Jacareacanga", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Novo Progresso", city: "Novo Progresso", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Xinguara", city: "Xinguara", state: "PA", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Mocajuba", city: "Mocajuba", state: "PA", main: false, type: "aerodrome" },

  { code: "MCP", name: "Aeroporto Internacional de Macapá — Alberto Alcolumbre", city: "Macapá", state: "AP", main: true, type: "airport" },
  { code: "", name: "Aeródromo de Oiapoque", city: "Oiapoque", state: "AP", main: false, type: "aerodrome" },

  { code: "MAO", name: "Aeroporto Internacional Eduardo Gomes", city: "Manaus", state: "AM", main: true, type: "airport" },
  { code: "TFF", name: "Aeroporto de Tefé", city: "Tefé", state: "AM", main: true, type: "airport" },
  { code: "CIZ", name: "Aeroporto de Coari", city: "Coari", state: "AM", main: true, type: "airport" },
  { code: "PIN", name: "Aeroporto de Parintins — Júlio Belém", city: "Parintins", state: "AM", main: true, type: "airport" },
  { code: "TBT", name: "Aeroporto de Tabatinga", city: "Tabatinga", state: "AM", main: true, type: "airport" },
  { code: "ITA", name: "Aeroporto de Itacoatiara", city: "Itacoatiara", state: "AM", main: true, type: "airport" },
  { code: "MNX", name: "Aeroporto de Manicoré", city: "Manicoré", state: "AM", main: false, type: "airport" },
  { code: "HUW", name: "Aeroporto de Humaitá", city: "Humaitá", state: "AM", main: true, type: "airport" },
  { code: "LBR", name: "Aeroporto de Lábrea", city: "Lábrea", state: "AM", main: false, type: "airport" },
  { code: "ERN", name: "Aeroporto de Eirunepé", city: "Eirunepé", state: "AM", main: false, type: "airport" },
  { code: "BAZ", name: "Aeroporto de Barcelos", city: "Barcelos", state: "AM", main: false, type: "airport" },
  { code: "", name: "Aeródromo de São Gabriel da Cachoeira", city: "São Gabriel da Cachoeira", state: "AM", main: false, type: "aerodrome" },
  { code: "", name: "Aeródromo de Fonte Boa", city: "Fonte Boa", state: "AM", main: false, type: "aerodrome" },

  { code: "BVB", name: "Aeroporto Internacional de Boa Vista — Atlas Brasil Cantanhede", city: "Boa Vista", state: "RR", main: true, type: "airport" },
  { code: "PVH", name: "Aeroporto Internacional de Porto Velho — Governador Jorge Teixeira", city: "Porto Velho", state: "RO", main: true, type: "airport" },
  { code: "RBR", name: "Aeroporto Internacional de Rio Branco — Plácido de Castro", city: "Rio Branco", state: "AC", main: true, type: "airport" },
  { code: "CRZ", name: "Aeroporto de Cruzeiro do Sul", city: "Cruzeiro do Sul", state: "AC", main: true, type: "airport" },

  { code: "PMW", name: "Aeroporto de Palmas — Brigadeiro Lysias Rodrigues", city: "Palmas", state: "TO", main: true, type: "airport" },
  { code: "AUX", name: "Aeroporto de Araguaína", city: "Araguaína", state: "TO", main: true, type: "airport" },
  { code: "GRP", name: "Aeroporto de Gurupi", city: "Gurupi", state: "TO", main: true, type: "airport" },

  // ── Nordeste ───────────────────────────────────────────────────────
  { code: "SLZ", name: "Aeroporto Internacional de São Luís — Mal. Cunha Machado", city: "São Luís", state: "MA", main: true, type: "airport" },
  { code: "IMP", name: "Aeroporto de Imperatriz — Prefeito Renato Moreira", city: "Imperatriz", state: "MA", main: true, type: "airport" },
  { code: "BRB", name: "Aeroporto de Barreirinhas", city: "Barreirinhas", state: "MA", main: false, type: "airport" },

  { code: "THE", name: "Aeroporto de Teresina — Senador Petrônio Portella", city: "Teresina", state: "PI", main: true, type: "airport" },
  { code: "PHB", name: "Aeroporto de Parnaíba — Prefeito Dr. João Silva Filho", city: "Parnaíba", state: "PI", main: true, type: "airport" },

  { code: "FOR", name: "Aeroporto Internacional de Fortaleza — Pinto Martins", city: "Fortaleza", state: "CE", main: true, type: "airport" },
  { code: "JDO", name: "Aeroporto de Juazeiro do Norte — Orlando Bezerra de Menezes", city: "Juazeiro do Norte", state: "CE", main: true, type: "airport" },
  { code: "CMC", name: "Aeroporto de Camocim", city: "Camocim", state: "CE", main: false, type: "airport" },

  { code: "NAT", name: "Aeroporto Internacional de Natal — Aluízio Alves", city: "Natal", state: "RN", main: true, type: "airport" },
  { code: "MVF", name: "Aeroporto de Mossoró — Dix-Sept Rosado", city: "Mossoró", state: "RN", main: true, type: "airport" },

  { code: "JPA", name: "Aeroporto Internacional de João Pessoa — Presidente Castro Pinto", city: "João Pessoa", state: "PB", main: true, type: "airport" },
  { code: "CPV", name: "Aeroporto de Campina Grande — Presidente João Suassuna", city: "Campina Grande", state: "PB", main: true, type: "airport" },

  { code: "REC", name: "Aeroporto Internacional do Recife — Guararapes", city: "Recife", state: "PE", main: true, type: "airport" },
  { code: "PNZ", name: "Aeroporto de Petrolina — Senador Nilo Coelho", city: "Petrolina", state: "PE", main: true, type: "airport" },
  { code: "CAU", name: "Aeroporto de Caruaru — Oscar Laranjeiras", city: "Caruaru", state: "PE", main: true, type: "airport" },
  { code: "FEN", name: "Aeroporto de Fernando de Noronha — Gov. Carlos Wilson", city: "Fernando de Noronha", state: "PE", main: false, type: "airport" },

  { code: "MCZ", name: "Aeroporto Internacional de Maceió — Zumbi dos Palmares", city: "Maceió", state: "AL", main: true, type: "airport" },
  { code: "AJU", name: "Aeroporto Internacional de Aracaju — Santa Maria", city: "Aracaju", state: "SE", main: true, type: "airport" },

  { code: "SSA", name: "Aeroporto Internacional de Salvador — Dep. Luís Eduardo Magalhães", city: "Salvador", state: "BA", main: true, type: "airport" },
  { code: "BPS", name: "Aeroporto de Porto Seguro", city: "Porto Seguro", state: "BA", main: true, type: "airport" },
  { code: "IOS", name: "Aeroporto de Ilhéus — Jorge Amado", city: "Ilhéus", state: "BA", main: true, type: "airport" },
  { code: "VDC", name: "Aeroporto de Vitória da Conquista — Glauber Rocha", city: "Vitória da Conquista", state: "BA", main: true, type: "airport" },
  { code: "BRA", name: "Aeroporto de Barreiras", city: "Barreiras", state: "BA", main: true, type: "airport" },
  { code: "LEC", name: "Aeroporto de Lençóis — Horácio de Mattos", city: "Lençóis", state: "BA", main: false, type: "airport" },
  { code: "PAV", name: "Aeroporto de Paulo Afonso", city: "Paulo Afonso", state: "BA", main: false, type: "airport" },

  // ── Centro-Oeste ───────────────────────────────────────────────────
  { code: "BSB", name: "Aeroporto Internacional de Brasília — Presidente Juscelino Kubitschek", city: "Brasília", state: "DF", main: true, type: "airport" },
  { code: "GYN", name: "Aeroporto Internacional de Goiânia — Santa Genoveva", city: "Goiânia", state: "GO", main: true, type: "airport" },
  { code: "CLV", name: "Aeroporto de Caldas Novas", city: "Caldas Novas", state: "GO", main: true, type: "airport" },
  { code: "RVD", name: "Aeroporto de Rio Verde", city: "Rio Verde", state: "GO", main: true, type: "airport" },

  { code: "CGB", name: "Aeroporto Internacional de Cuiabá — Mal. Rondon", city: "Cuiabá", state: "MT", main: true, type: "airport" },
  { code: "AFL", name: "Aeroporto de Alta Floresta", city: "Alta Floresta", state: "MT", main: true, type: "airport" },
  { code: "ROO", name: "Aeroporto de Rondonópolis — Maestro Marinho Franco", city: "Rondonópolis", state: "MT", main: true, type: "airport" },
  { code: "OPS", name: "Aeroporto de Sinop", city: "Sinop", state: "MT", main: true, type: "airport" },

  { code: "CGR", name: "Aeroporto Internacional de Campo Grande", city: "Campo Grande", state: "MS", main: true, type: "airport" },
  { code: "DOU", name: "Aeroporto de Dourados — Francisco de Matos Pereira", city: "Dourados", state: "MS", main: true, type: "airport" },
  { code: "CMG", name: "Aeroporto de Corumbá", city: "Corumbá", state: "MS", main: true, type: "airport" },

  // ── Sudeste ────────────────────────────────────────────────────────
  { code: "CNF", name: "Aeroporto Internacional de Belo Horizonte — Confins", city: "Belo Horizonte", state: "MG", main: true, type: "airport" },
  { code: "PLU", name: "Aeroporto de Belo Horizonte — Pampulha", city: "Belo Horizonte", state: "MG", main: true, type: "airport" },
  { code: "UDI", name: "Aeroporto de Uberlândia — Ten. Cel. Aviador César Bombonato", city: "Uberlândia", state: "MG", main: true, type: "airport" },
  { code: "UBA", name: "Aeroporto de Uberaba — Mário de Almeida Franco", city: "Uberaba", state: "MG", main: true, type: "airport" },
  { code: "MOC", name: "Aeroporto de Montes Claros — Mário Ribeiro", city: "Montes Claros", state: "MG", main: true, type: "airport" },
  { code: "GVR", name: "Aeroporto de Governador Valadares", city: "Governador Valadares", state: "MG", main: true, type: "airport" },
  { code: "IPN", name: "Aeroporto de Ipatinga — Usiminas", city: "Ipatinga", state: "MG", main: true, type: "airport" },

  { code: "GIG", name: "Aeroporto Internacional do Rio de Janeiro — Galeão", city: "Rio de Janeiro", state: "RJ", main: true, type: "airport" },
  { code: "SDU", name: "Aeroporto do Rio de Janeiro — Santos Dumont", city: "Rio de Janeiro", state: "RJ", main: true, type: "airport" },
  { code: "MEA", name: "Aeroporto de Macaé", city: "Macaé", state: "RJ", main: true, type: "airport" },
  { code: "CFB", name: "Aeroporto de Cabo Frio", city: "Cabo Frio", state: "RJ", main: false, type: "airport" },

  { code: "GRU", name: "Aeroporto Internacional de São Paulo — Guarulhos", city: "São Paulo", state: "SP", main: true, type: "airport" },
  { code: "CGH", name: "Aeroporto de São Paulo — Congonhas", city: "São Paulo", state: "SP", main: true, type: "airport" },
  { code: "VCP", name: "Aeroporto Internacional de Viracopos", city: "Campinas", state: "SP", main: true, type: "airport" },
  { code: "SJK", name: "Aeroporto de São José dos Campos", city: "São José dos Campos", state: "SP", main: true, type: "airport" },
  { code: "RAO", name: "Aeroporto de Ribeirão Preto — Dr. Leite Lopes", city: "Ribeirão Preto", state: "SP", main: true, type: "airport" },
  { code: "SJP", name: "Aeroporto de São José do Rio Preto", city: "São José do Rio Preto", state: "SP", main: true, type: "airport" },
  { code: "PPB", name: "Aeroporto de Presidente Prudente", city: "Presidente Prudente", state: "SP", main: true, type: "airport" },
  { code: "BAU", name: "Aeroporto de Bauru — Arealva", city: "Bauru", state: "SP", main: true, type: "airport" },

  { code: "CWB", name: "Aeroporto Internacional de Curitiba — Afonso Pena", city: "Curitiba", state: "PR", main: true, type: "airport" },
  { code: "LDB", name: "Aeroporto de Londrina — Gov. José Richa", city: "Londrina", state: "PR", main: true, type: "airport" },
  { code: "MGF", name: "Aeroporto de Maringá — Sílvio Name Júnior", city: "Maringá", state: "PR", main: true, type: "airport" },
  { code: "IGU", name: "Aeroporto Internacional de Foz do Iguaçu", city: "Foz do Iguaçu", state: "PR", main: true, type: "airport" },
  { code: "CAC", name: "Aeroporto de Cascavel — Adalberto Mendes da Silva", city: "Cascavel", state: "PR", main: true, type: "airport" },

  { code: "FLN", name: "Aeroporto Internacional de Florianópolis — Hercílio Luz", city: "Florianópolis", state: "SC", main: true, type: "airport" },
  { code: "JOI", name: "Aeroporto de Joinville — Lauro Carneiro de Loyola", city: "Joinville", state: "SC", main: true, type: "airport" },
  { code: "NVT", name: "Aeroporto Internacional de Navegantes — Min. Victor Konder", city: "Navegantes", state: "SC", main: true, type: "airport" },
  { code: "XAP", name: "Aeroporto de Chapecó — Serafin Enoss Bertaso", city: "Chapecó", state: "SC", main: true, type: "airport" },
  { code: "CCM", name: "Aeroporto de Criciúma — Diomício Freitas", city: "Criciúma", state: "SC", main: true, type: "airport" },

  { code: "POA", name: "Aeroporto Internacional de Porto Alegre — Salgado Filho", city: "Porto Alegre", state: "RS", main: true, type: "airport" },
  { code: "CXJ", name: "Aeroporto de Caxias do Sul — Hugo Cantergiani", city: "Caxias do Sul", state: "RS", main: true, type: "airport" },
  { code: "PFB", name: "Aeroporto de Passo Fundo — Lauro Kurtz", city: "Passo Fundo", state: "RS", main: true, type: "airport" },
  { code: "PET", name: "Aeroporto de Pelotas", city: "Pelotas", state: "RS", main: true, type: "airport" },
  { code: "URG", name: "Aeroporto de Uruguaiana — Rubem Berta", city: "Uruguaiana", state: "RS", main: true, type: "airport" },
];

/** Exportado para testes e extensão futura (ex.: campos de busca externa). */
export const AIRPORT_COUNT = AIRPORTS.length;

export { AIRPORTS };