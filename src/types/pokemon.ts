export interface PokemonName {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export interface PokemonStats {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

export interface PokemonEvolution {
  next?: [string, string][]; // Array of [id, method] pairs
  prev?: [string, string][]; // Array of [id, method] pairs
}
export type PokemonAbility = [string, string]; // [ability_name, is_hidden_ability]

export interface PokemonProfile {
  height: string;
  weight: string;
  egg: string[];
  ability: PokemonAbility[];
  gender: string;
}

export interface PokemonImage {
  sprite: string;
  thumbnail: string;
  hires: string;
}

export interface Pokemon {
  id: number;
  name: PokemonName;
  type: string[];
  base: PokemonStats;
  species: string;
  description: string;
  evolution: PokemonEvolution;
  profile: PokemonProfile;
  image: PokemonImage;
}

export type PokemonType = 
  | "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice"
  | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" 
  | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy";

export interface SearchFilters {
  query?: string;
  types?: PokemonType[];}

export interface PokemonResponse {
  pokemon: Pokemon[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}




export interface EvolutionChainNode {
  id: number;
  name: string;
  image: string;
  sprite: string;
  types: string[];
  evolutionMethod: string | null;
  evolvesTo: EvolutionChainNode[];
}

export interface EvolutionChainResponse {
  pokemonId: number;
  pokemonName: string;
  format: 'flat' | 'tree';
  evolutionChain: EvolutionChainNode[];
}