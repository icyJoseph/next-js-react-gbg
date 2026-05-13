export const SUPPORTED_POKEMON = 251;

const POKE_API_BASE =
  process.env.NEXT_PUBLIC_POKE_API_BASE ?? "https://pokeapi.co";

export const specieEP = `${POKE_API_BASE}/api/v2/pokemon-species`;
export const pokeEp = `${POKE_API_BASE}/api/v2/pokemon`;
