// src/components/pokemon/PokemonCard.tsx
import type { Pokemon } from '@/types/pokemon';
import { typeColors } from '@/types/pokemon';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handlePokemonClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking favorite button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/pokemon/${pokemon.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer relative" 
      onClick={handlePokemonClick}
    >
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 w-8 h-8 z-10"
        onClick={handleFavoriteClick}
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </Button>
      
      <CardHeader className="pb-2">
        <div className="text-sm text-muted-foreground font-mono text-center">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Pokemon Image */}
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <Image
              src={pokemon.image.hires}
              alt={pokemon.name.english}
              fill
              unoptimized
              className="object-contain group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.src = pokemon.image.sprite;
              }}
            />
          </div>
        </div>

        {/* Pokemon Name */}
        <h3 className="text-lg font-bold text-center mb-3">
          {pokemon.name.english}
        </h3>

        {/* Pokemon Types */}
        <div className="flex justify-center gap-1 mb-3 flex-wrap">
          {pokemon.type.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className={`
                text-white text-xs font-medium
                ${typeColors[type] || 'bg-gray-400 '}
              `}
            >
              {type}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}