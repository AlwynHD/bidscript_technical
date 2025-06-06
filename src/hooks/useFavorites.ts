// hooks/useFavorites.ts
'use client';

import { useState, useEffect } from 'react';
import type { Pokemon } from '@/types/pokemon';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pokemon-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites(prev => [...prev, pokemon]);
  };

  const removeFavorite = (pokemonId: number | string) => {
    setFavorites(prev => prev.filter(p => p.id !== pokemonId));
  };

  const isFavorite = (pokemonId: number | string) => {
    return favorites.some(p => p.id === pokemonId);
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}