/**
 * Pistas de pouso / aeródromos regionais comuns em operações aeromédicas.
 * A operação da AirMedPlan é homologada para operar em aeródromos públicos e
 * privados — esta lista é apenas uma referência visual (a central de regulação
 * confirma a pista adequada para cada rota; o texto livre continua aceito).
 */

export interface AirstripItem {
  name: string;
  city: string;
  state: string;
}

export const AIRSTRIPS: AirstripItem[] = [
  // ── Região Norte ────────────────────────────────────────────────────
  { name: "Aeródromo de Monte Dourado — Amburana", city: "Almeirim", state: "PA" },
  { name: "Aeródromo de Breves", city: "Breves", state: "PA" },
  { name: "Aeródromo de Portel", city: "Portel", state: "PA" },
  { name: "Aeródromo de Barcarena", city: "Barcarena", state: "PA" },
  { name: "Aeródromo de Chaves", city: "Chaves", state: "PA" },
  { name: "Aeródromo de Curralinho", city: "Curralinho", state: "PA" },
  { name: "Aeródromo de Salvaterra", city: "Salvaterra", state: "PA" },
  { name: "Aeródromo de Oriximiná", city: "Oriximiná", state: "PA" },
  { name: "Aeródromo de Alenquer", city: "Alenquer", state: "PA" },
  { name: "Aeródromo de Jacareacanga", city: "Jacareacanga", state: "PA" },
  { name: "Aeródromo de Novo Progresso", city: "Novo Progresso", state: "PA" },
  { name: "Aeródromo de Xinguara", city: "Xinguara", state: "PA" },
  { name: "Aeródromo de Mocajuba", city: "Mocajuba", state: "PA" },
  { name: "Aeródromo de Oiapoque", city: "Oiapoque", state: "AP" },
  { name: "Aeródromo de São Gabriel da Cachoeira", city: "São Gabriel da Cachoeira", state: "AM" },
  { name: "Aeródromo de Fonte Boa", city: "Fonte Boa", state: "AM" },
  { name: "Aeródromo de Juruena", city: "Juruena", state: "MT" },
  { name: "Aeródromo de Aripuanã", city: "Aripuanã", state: "MT" },
  { name: "Aeródromo de Vilhena", city: "Vilhena", state: "RO" },
  { name: "Aeródromo de Cacoal", city: "Cacoal", state: "RO" },
  // ── Sudeste ─────────────────────────────────────────────────────────
  { name: "Aeródromo de Juiz de Fora — Serrinha", city: "Juiz de Fora", state: "MG" },
  { name: "Aeródromo de Itajubá", city: "Itajubá", state: "MG" },
  { name: "Aeródromo de Poços de Caldas", city: "Poços de Caldas", state: "MG" },
  { name: "Aeródromo de Águas de Lindóia", city: "Águas de Lindóia", state: "SP" },
  { name: "Aeródromo de Jundiaí", city: "Jundiaí", state: "SP" },
  { name: "Aeródromo de Campinas — Amarais", city: "Campinas", state: "SP" },
  { name: "Aeródromo de São Carlos", city: "São Carlos", state: "SP" },
  { name: "Aeródromo de Marília", city: "Marília", state: "SP" },
  { name: "Aeródromo de Campo Mourão", city: "Campo Mourão", state: "PR" },
  { name: "Aeródromo de Francisco Beltrão", city: "Francisco Beltrão", state: "PR" },
];

export const AIRSTRIP_COUNT = AIRSTRIPS.length;

/**
 * Cidades com pistas de pouso sugeridas como dica de contexto no assistente
 * (deduplicadas por cidade/estado, na ordem da base).
 */
export function airstripHintCities(max = 4): string[] {
  const seen = new Set<string>();
  const cities: string[] = [];
  for (const strip of AIRSTRIPS) {
    const key = `${strip.city}/${strip.state}`;
    if (!seen.has(key)) {
      seen.add(key);
      cities.push(strip.city);
    }
    if (cities.length === max) break;
  }
  return cities;
}