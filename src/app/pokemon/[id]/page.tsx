// src/app/pokemon/[id]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { usePokemonDetail } from '@/hooks/usePokemonDetails';
import { useFavorites } from '@/context/FavoritesContext';

// Import all the modular components
import PokemonImage from '@/components/pokemon/detail/PokemonImage';
import PokemonBasicInfo from '@/components/pokemon/detail/PokemonBasicInfo';
import PokemonDescription from '@/components/pokemon/detail/PokemonDescription';
import PokemonStats from '@/components/pokemon/detail/PokemonStats';
import PokemonProfile from '@/components/pokemon/detail/PokemonProfile';
import PokemonEvolution from '@/components/pokemon/detail/PokemonEvolution';
import LoadingSkeleton from '@/components/pokemon/detail/LoadingSkeleton';
import PokemonError from '@/components/pokemon/detail/PokemonError';

import { useRouter } from 'next/navigation';

export default function PokemonDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const { pokemon, loading, error } = usePokemonDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !pokemon) {
    return <PokemonError id={id} error={error || 'Pokemon not found'} />;
  }

  const favorite = isFavorite(pokemon.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Back Button and Favorite Button */}
        <div className="mb-4 flex items-center justify-between">
          <Button 
            variant="outline" 
            className="gap-2 hover:cursor-pointer" 
            size="sm" 
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pokédex
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFavorite(pokemon.id)}
            className="gap-2"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                favorite ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            {favorite ? 'Favorited' : 'Add to Favorites'}
          </Button>
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left Column - Image & Basic Info */}
          <div className="space-y-4">
            <PokemonImage pokemon={pokemon} />
            <PokemonBasicInfo pokemon={pokemon} />
          </div>

          {/* Middle Column - Stats & Description */}
          <div className="space-y-4">
            <PokemonStats pokemon={pokemon} />
            <PokemonDescription pokemon={pokemon} />
          </div>

          {/* Right Column - Profile & Evolution */}
          <div className="space-y-4">
            <PokemonProfile pokemon={pokemon} />
            <PokemonEvolution pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
}