
// Pokemon Name Information
export interface PokemonName {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

//Pokemon Base Statistics
export interface PokemonStats {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

// Pokemon Evolution Information (['id', 'method'])
export interface PokemonEvolution {
  next?: [string, string][]; 
  prev?: [string, string][];
}
// Pokemon Abilities '[ability_name, is_hidden_ability]'
export type PokemonAbility = [string, string]; // [ability_name, is_hidden_ability]


// Pokemon Profile Information
export interface PokemonProfile {
  height: string;
  weight: string;
  egg: string[];
  ability: PokemonAbility[];
  gender: string;
}

// Pokemon Image Information
export interface PokemonImage {
  sprite: string;
  thumbnail: string;
  hires: string;
}

// Pokemon Structure Information
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


// Pokemon Type Definitions
export type PokemonType = 
  | "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice"
  | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" 
  | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy";

// Search Filters for Pokemon
export interface SearchFilters {
  query?: string;
  types?: PokemonType[];
}

// Pokemon Response Structure
export interface PokemonResponse {
  pokemon: Pokemon[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

