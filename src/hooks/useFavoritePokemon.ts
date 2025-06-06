// src/hooks/useFavoritePokemon.ts
import { useState, useEffect } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import type { Pokemon } from '@/types/pokemon';

interface UseFavoritePokemonReturn {
  favoritePokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFavoritePokemon(): UseFavoritePokemonReturn {
  const { favorites } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    if (favorites.size === 0) {
      setFavoritePokemon([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Batch fetch with error handling for individual failures
      const results = await Promise.allSettled(
        Array.from(favorites).map(id =>
          fetch(`/api/pokemon/${id}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch Pokemon ${id}`);
            return res.json();
          })
        )
      );

      const successfulPokemon = results
        .filter((result): result is PromiseFulfilledResult<Pokemon> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      setFavoritePokemon(successfulPokemon);

      // Report any failures
      const failedCount = results.filter(r => r.status === 'rejected').length;
      if (failedCount > 0) {
        console.warn(`Failed to fetch ${failedCount} favorite Pokemon`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return { 
    favoritePokemon, 
    loading, 
    error, 
    refetch: fetchFavorites 
  };
}