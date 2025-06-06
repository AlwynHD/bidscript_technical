// src/app/api/pokemon/[id]/route.ts
import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon } from '@/types/pokemon';

const typedPokemonData = pokemonData as Pokemon[];
// Returns information of a Pokemon by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const pokemonId = parseInt(id);
  
  if (isNaN(pokemonId)) {
    return Response.json({ error: 'Invalid Pokemon ID' }, { status: 400 });
  }
  
  // Search Pokemon with ID
  const pokemon = typedPokemonData.find(p => p.id === pokemonId);
  
  // Error Handling
  if (!pokemon) {
    return Response.json({ error: 'Pokemon not found' }, { status: 404 });
  }
  
  return Response.json(pokemon);
}