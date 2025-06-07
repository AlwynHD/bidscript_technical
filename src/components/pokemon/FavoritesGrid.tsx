'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { useFavoritePokemon } from '@/hooks/useFavoritePokemon';
import type { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritesGrid() {
  const { clearFavorites } = useFavorites();
  const { favoritePokemon, loading, error, refetch } = useFavoritePokemon();

  // If loading, show skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <div className="flex justify-center gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error Handling
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive mb-4">Error: {error}</p>
        <Button onClick={refetch} variant="outline" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  // If Favorites Check
  if (favoritePokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No favorite Pokémon yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Start adding your favorite Pokémon by clicking the heart icon on any Pokémon card
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with count and clear button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {favoritePokemon.length} Favorite Pokémon
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearFavorites}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favoritePokemon.map((pokemon: Pokemon) => (
          <div
            key={pokemon.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}
