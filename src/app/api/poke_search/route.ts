import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon, SearchFilters, PokemonResponse } from '@/types/pokemon';

const typedPokemonData = pokemonData as Pokemon[];

//Search and Filter Pokemon API
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Pagination settings
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  // Parse multiple types from query params
  const typesParam = searchParams.get('types');
  const selectedTypes = typesParam ? typesParam.split(',') : [];
  
  // Filters
  const filters: SearchFilters = {
    query: searchParams.get('query') || undefined,
    types: selectedTypes.length > 0 ? selectedTypes as any : undefined,
  };

  let filteredPokemon = [...typedPokemonData];

  // Apply search query (name and ability)
  if (filters.query) {
    const query = filters.query.toLowerCase().trim();
    filteredPokemon = filteredPokemon.filter(pokemon => {
      // Search name
      const nameMatch = pokemon.name.english.toLowerCase().includes(query);
      
      // Search abilities
      const abilityMatch = pokemon.profile.ability.some(([name]) => 
        name.toLowerCase().includes(query)
      );
      
      return nameMatch || abilityMatch;
    });
  }

  // Apply multiple type filters
  if (filters.types && filters.types.length > 0) {
    filteredPokemon = filteredPokemon.filter(pokemon => {
      // Check if Pokemon has ALL selected types
      return filters.types!.every(selectedType => 
        pokemon.type.includes(selectedType)
      );
      
    });
  }

  // Calculate pagination
  const total = filteredPokemon.length;
  const offset = (page - 1) * limit;
  const paginatedPokemon = filteredPokemon.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  // Prepare response
  const response: PokemonResponse = {
    pokemon: paginatedPokemon,
    total,
    page,
    limit,
    hasMore
  };
  
  return Response.json(response);
}