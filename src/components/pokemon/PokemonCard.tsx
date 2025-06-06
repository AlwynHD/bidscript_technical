import type { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  Normal: 'bg-gray-400 hover:bg-gray-500',
  Fire: 'bg-red-500 hover:bg-red-600',
  Water: 'bg-blue-500 hover:bg-blue-600',
  Electric: 'bg-yellow-400 hover:bg-yellow-500',
  Grass: 'bg-green-500 hover:bg-green-600',
  Ice: 'bg-blue-200 hover:bg-blue-300',
  Fighting: 'bg-red-700 hover:bg-red-800',
  Poison: 'bg-purple-500 hover:bg-purple-600',
  Ground: 'bg-yellow-600 hover:bg-yellow-700',
  Flying: 'bg-indigo-400 hover:bg-indigo-500',
  Psychic: 'bg-pink-500 hover:bg-pink-600',
  Bug: 'bg-green-400 hover:bg-green-500',
  Rock: 'bg-yellow-800 hover:bg-yellow-900',
  Ghost: 'bg-purple-700 hover:bg-purple-800',
  Dragon: 'bg-indigo-700 hover:bg-indigo-800',
  Dark: 'bg-gray-800 hover:bg-gray-900',
  Steel: 'bg-gray-500 hover:bg-gray-600',
  Fairy: 'bg-pink-300 hover:bg-pink-400',
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const handlePokemonClick = (id: string | number) => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer" onClick={() => handlePokemonClick(pokemon.id)}>      <CardHeader className="pb-2">
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
                ${typeColors[type] || 'bg-gray-400 hover:bg-gray-500'}
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