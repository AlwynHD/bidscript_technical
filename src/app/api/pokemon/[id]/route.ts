// src/app/api/pokemon/[id]/route.ts
import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon } from '@/types/pokemon';

const typedPokemonData = pokemonData as Pokemon[];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Convert id to number for comparison
  const pokemonId = parseInt(id);
  
  if (isNaN(pokemonId)) {
    return Response.json({ error: 'Invalid Pokemon ID' }, { status: 400 });
  }
  
  // Find Pokemon by ID
  const pokemon = typedPokemonData.find(p => p.id === pokemonId);
  
  if (!pokemon) {
    return Response.json({ error: 'Pokemon not found' }, { status: 404 });
  }
  
  return Response.json(pokemon);
}