import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon, SearchFilters, PokemonResponse } from '@/types/pokemon';

const typedPokemonData = pokemonData as unknown as Pokemon[];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  // Filters
  const filters: SearchFilters = {
    query: searchParams.get('query') || undefined,
    type: searchParams.get('type') as any || undefined,
  };

  let filteredPokemon = [...typedPokemonData];

  // Apply search query (name and ability)
  if (filters.query) {
    const query = filters.query.toLowerCase().trim();
    filteredPokemon = filteredPokemon.filter(pokemon => {
      // Search in name
      const nameMatch = pokemon.name.english.toLowerCase().includes(query);
      
      // Search in abilities
      const abilities = pokemon.profile.ability.flatMap(abilityObj => 
        Object.values(abilityObj).filter(Boolean)
      );
      const abilityMatch = abilities.some(ability => 
        ability.toLowerCase().includes(query)
      );
      
      return nameMatch || abilityMatch;
    });
  }

  // Apply type filter
  if (filters.type) {
    filteredPokemon = filteredPokemon.filter(pokemon => 
      pokemon.type.includes(filters.type!)
    );
  }

  // Calculate pagination
  const total = filteredPokemon.length;
  const offset = (page - 1) * limit;
  const paginatedPokemon = filteredPokemon.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  const response: PokemonResponse = {
    pokemon: paginatedPokemon,
    total,
    page,
    limit,
    hasMore
  };

  return Response.json(response);
}