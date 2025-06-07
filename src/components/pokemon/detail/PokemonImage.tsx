// src/components/pokemon/detail/PokemonImage.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Pokemon } from '@/types/pokemon';

interface PokemonImageProps {
  pokemon: Pokemon;
}
// Pokemon Image Card
export default function PokemonImage({ pokemon }: PokemonImageProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <Image
              src={pokemon.image.hires}
              alt={pokemon.name.english}
              fill
              className="object-contain"
              priority
              onError={(e) => {
                e.currentTarget.src = pokemon.image.sprite;
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}