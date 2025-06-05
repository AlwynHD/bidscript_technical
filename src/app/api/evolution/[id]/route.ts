import { NextRequest } from 'next/server';
import pokemonData from '@/data/pokedex.json';
import type { Pokemon, EvolutionChainNode } from '@/types/pokemon';

const typedPokemonData = pokemonData as Pokemon[];

// Create a map for quick lookups by ID
const pokemonMap = new Map<number, Pokemon>();
typedPokemonData.forEach(pokemon => {
  pokemonMap.set(pokemon.id, pokemon);
});

// Helper function to normalize evolution data to consistent format
function normalizeEvolutionData(evolutionData: any): [string, string][] {
  if (!evolutionData) return [];
  
  // If it's already an array of arrays like [["12", "Level 10"]]
  if (Array.isArray(evolutionData) && evolutionData.length > 0 && Array.isArray(evolutionData[0])) {
    return evolutionData as [string, string][];
  }
  
  // If it's a single tuple like ["10", "Level 7"]
  if (Array.isArray(evolutionData) && evolutionData.length === 2 && typeof evolutionData[0] === 'string') {
    return [evolutionData as [string, string]];
  }
  
  return [];
}

// Function to find the base pokemon by going backwards through prev
function findBasePokemon(pokemonId: number, visited = new Set<number>()): Pokemon | null {
  // Prevent infinite loops
  if (visited.has(pokemonId)) return null;
  visited.add(pokemonId);

  const pokemon = pokemonMap.get(pokemonId);
  if (!pokemon) return null;
  
  // Normalize prev evolution data
  const prevEvolutions = normalizeEvolutionData(pokemon.evolution.prev);
  
  // If no prev evolution, this is the base
  if (prevEvolutions.length === 0) {
    return pokemon;
  }
  
  // Go to the first previous evolution
  const [prevIdStr] = prevEvolutions[0];
  const prevId = parseInt(prevIdStr);
  return findBasePokemon(prevId, visited);
}

// Function to build evolution chain by going forward through next
function buildEvolutionChainFromBase(basePokemonId: number): EvolutionChainNode[] {
  const chain: EvolutionChainNode[] = [];
  const visited = new Set<number>();
  
  function addToChain(pokemonId: number, evolutionMethod: string | null = null) {
    // Prevent infinite loops
    if (visited.has(pokemonId)) return;
    visited.add(pokemonId);
    
    const pokemon = pokemonMap.get(pokemonId);
    if (!pokemon) return;
    
    // Create the node
    const node: EvolutionChainNode = {
      id: pokemon.id,
      name: pokemon.name.english,
      image: pokemon.image.hires,
      sprite: pokemon.image.sprite,
      types: pokemon.type,
      evolutionMethod: evolutionMethod,
      evolvesTo: []
    };
    
    chain.push(node);
    
    // Normalize next evolution data
    const nextEvolutions = normalizeEvolutionData(pokemon.evolution.next);
    
    // Follow the first next evolution (for linear chain)
    if (nextEvolutions.length > 0) {
      const [nextIdStr, nextMethod] = nextEvolutions[0];
      const nextId = parseInt(nextIdStr);
      addToChain(nextId, nextMethod);
    }
  }
  
  addToChain(basePokemonId);
  return chain;
}

// Function to build tree structure (for complex evolutions like Eevee)
function buildEvolutionTree(basePokemonId: number): EvolutionChainNode {
  const visited = new Set<number>();
  
  function buildNode(pokemonId: number): EvolutionChainNode | null {
    // Prevent infinite loops
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
      evolutionMethod: null, // Will be set by parent
      evolvesTo: []
    };
    
    // Normalize next evolution data
    const nextEvolutions = normalizeEvolutionData(pokemon.evolution.next);
    
    // Add all next evolutions
    for (const [nextIdStr, method] of nextEvolutions) {
      const nextId = parseInt(nextIdStr);
      const childNode = buildNode(nextId);
      if (childNode) {
        childNode.evolutionMethod = method;
        node.evolvesTo.push(childNode);
      }
    }
    
    return node;
  }
  
  return buildNode(basePokemonId)!;
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
    
    // Find the base of the evolution line
    const basePokemon = findBasePokemon(pokemonId);
    if (!basePokemon) {
      return Response.json({ error: 'Could not find base Pokemon' }, { status: 500 });
    }
    
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'flat';
    
    let evolutionChain;
    if (format === 'tree') {
      const treeRoot = buildEvolutionTree(basePokemon.id);
      evolutionChain = [treeRoot];
    } else {
      evolutionChain = buildEvolutionChainFromBase(basePokemon.id);
    }
    
    return Response.json({
      pokemonId,
      pokemonName: pokemon.name.english,
      basePokemonId: basePokemon.id,
      basePokemonName: basePokemon.name.english,
      format,
      evolutionChain
    });
    
  } catch (error) {
    console.error('Evolution chain error:', error);
    return Response.json({ error: 'Failed to fetch evolution chain' }, { status: 500 });
  }
}