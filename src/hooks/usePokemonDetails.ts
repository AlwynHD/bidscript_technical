// src/hooks/usePokemonDetail.ts
import { useState, useEffect } from 'react';
import type { Pokemon } from '@/types/pokemon';

interface UsePokemonDetailReturn {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export function usePokemonDetail(id: string): UsePokemonDetailReturn {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/pokemon/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Pokemon not found');
          }
          throw new Error('Failed to fetch Pokemon');
        }
        
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return { pokemon, loading, error };
}