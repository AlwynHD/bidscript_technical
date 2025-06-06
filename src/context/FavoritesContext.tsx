// src/context/FavoritesContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Pokemon } from '@/types/pokemon';

interface FavoritesContextType {
  favorites: Set<number>;
  addFavorite: (pokemonId: number) => void;
  removeFavorite: (pokemonId: number) => void;
  toggleFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'pokemon-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(new Set(parsedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const addFavorite = (pokemonId: number) => {
    setFavorites(prev => new Set(prev).add(pokemonId));
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.delete(pokemonId);
      return newFavorites;
    });
  };

  const toggleFavorite = (pokemonId: number) => {
    if (favorites.has(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.has(pokemonId);
  };

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        toggleFavorite, 
        isFavorite, 
        clearFavorites,
        favoritesCount: favorites.size
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}