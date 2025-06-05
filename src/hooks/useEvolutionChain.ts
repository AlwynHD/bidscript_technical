import { useState, useEffect } from 'react';
import type { EvolutionChainResponse, EvolutionChainNode } from '@/types/pokemon';

interface UseEvolutionChainReturn {
  evolutionChain: EvolutionChainNode[];
  loading: boolean;
  error: string | null;
  currentPokemonIndex: number;
}

export function useEvolutionChain(pokemonId: number, format: 'flat' | 'tree' = 'flat'): UseEvolutionChainReturn {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChainNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/evolution/${pokemonId}?format=${format}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch evolution chain');
        }
        
        const data: EvolutionChainResponse = await response.json();
        setEvolutionChain(data.evolutionChain);
        
        // Find current pokemon index in the chain
        const currentIndex = data.evolutionChain.findIndex(pokemon => pokemon.id === pokemonId);
        setCurrentPokemonIndex(currentIndex >= 0 ? currentIndex : 0);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setEvolutionChain([]);
        setCurrentPokemonIndex(0);
      } finally {
        setLoading(false);
      }
    }

    if (pokemonId) {
      fetchEvolutionChain();
    }
  }, [pokemonId, format]);

  return { 
    evolutionChain, 
    loading, 
    error, 
    currentPokemonIndex 
  };
}