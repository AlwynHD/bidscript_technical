import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon, EvolutionChainNode } from '@/types/pokemon';

const typedPokemonData = pokemonData as Pokemon[];

// Create a map for quick lookups by ID
const pokemonMap = new Map<number, Pokemon>();
typedPokemonData.forEach(pokemon => {
  pokemonMap.set(pokemon.id, pokemon);
});

// Function to build complete evolution chain
function buildEvolutionChain(startPokemonId: number): EvolutionChainNode[] {
  const visited = new Set<number>();
  
  // Find the base pokemon (the one with no prevolution)
  const basePokemon = findBasePokemon(startPokemonId);
  if (!basePokemon) return [];
  
  // Build chain starting from base
  function buildChainRecursive(pokemonId: number): EvolutionChainNode | null {
    if (visited.has(pokemonId)) return null;
    visited.add(pokemonId);
    
    const pokemon = pokemonMap.get(pokemonId);
    if (!pokemon) return null;
    
    const node: EvolutionChainNode = {
      id: pokemon.id,
      name: pokemon.name.english,
      image: pokemon.image.hires,
      sprite: pokemon.image.sprite,
      types: pokemon.type,
      evolutionMethod: null,
      evolvesTo: []
    };
    
    // Add evolution methods and next evolutions
    if (pokemon.evolution.next) {
      for (const [nextIdStr, method] of pokemon.evolution.next) {
        const nextId = parseInt(nextIdStr);
        const nextNode = buildChainRecursive(nextId);
        if (nextNode) {
          nextNode.evolutionMethod = method;
          node.evolvesTo.push(nextNode);
        }
      }
    }
    
    return node;
  }
  
  const rootNode = buildChainRecursive(basePokemon.id);
  return rootNode ? [rootNode] : [];
}

// Function to find the base pokemon in an evolution line
function findBasePokemon(pokemonId: number): Pokemon | null {
  const pokemon = pokemonMap.get(pokemonId);
  if (!pokemon) return null;
  
  // If no prev evolution, this is the base
  if (!pokemon.evolution.prev || pokemon.evolution.prev.length === 0) {
    return pokemon;
  }
  
  // Follow the prev evolution chain to find the base
  // Fix: pokemon.evolution.prev is [string, string][], so we need to get the first tuple, then the first element
  const firstPrevEvolution = pokemon.evolution.prev[0]; // This gets the [string, string] tuple
  const [prevIdStr] = firstPrevEvolution; // This destructures the tuple to get the ID
  const prevId = parseInt(prevIdStr);
  return findBasePokemon(prevId);
}

// Function to get flat evolution chain (linear representation)
function getFlatEvolutionChain(startPokemonId: number): EvolutionChainNode[] {
  const basePokemon = findBasePokemon(startPokemonId);
  if (!basePokemon) return [];
  
  const flatChain: EvolutionChainNode[] = [];
  const visited = new Set<number>();
  
  function addToFlatChain(pokemonId: number, method: string | null = null) {
    if (visited.has(pokemonId)) return;
    visited.add(pokemonId);
    
    const pokemon = pokemonMap.get(pokemonId);
    if (!pokemon) return;
    
    const node: EvolutionChainNode = {
      id: pokemon.id,
      name: pokemon.name.english,
      image: pokemon.image.hires,
      sprite: pokemon.image.sprite,
      types: pokemon.type,
      evolutionMethod: method,
      evolvesTo: []
    };
    
    flatChain.push(node);
    
    // Continue with next evolution (take first one for flat chain)
    if (pokemon.evolution.next && pokemon.evolution.next.length > 0) {
      const [nextIdStr, nextMethod] = pokemon.evolution.next[0];
      addToFlatChain(parseInt(nextIdStr), nextMethod);
    }
  }
  
  addToFlatChain(basePokemon.id);
  return flatChain;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pokemonId = parseInt(id);
    
    if (isNaN(pokemonId)) {
      return Response.json({ error: 'Invalid Pokemon ID' }, { status: 400 });
    }
    
    const pokemon = pokemonMap.get(pokemonId);
    if (!pokemon) {
      return Response.json({ error: 'Pokemon not found' }, { status: 404 });
    }
    
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'flat';
    
    let evolutionChain;
    if (format === 'tree') {
      evolutionChain = buildEvolutionChain(pokemonId);
    } else {
      evolutionChain = getFlatEvolutionChain(pokemonId);
    }
    
    return Response.json({
      pokemonId,
      pokemonName: pokemon.name.english,
      format,
      evolutionChain
    });
    
  } catch (error) {
    console.error('Evolution chain error:', error);
    return Response.json({ error: 'Failed to fetch evolution chain' }, { status: 500 });
  }
}