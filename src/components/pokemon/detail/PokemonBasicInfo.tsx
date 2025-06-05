// src/components/pokemon/detail/PokemonBasicInfo.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pokemon } from '@/types/pokemon';

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

interface PokemonBasicInfoProps {
  pokemon: Pokemon;
}

export default function PokemonBasicInfo({ pokemon }: PokemonBasicInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="text-center space-y-2">
          {/* ID and Name grouped together */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-mono">
              #{pokemon.id.toString().padStart(3, '0')}
            </div>
            <h1 className="text-xl font-bold">{pokemon.name.english}</h1>
          </div>
          
          {/* Species and Types grouped together */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              {pokemon.species}
            </div>
            <div className="flex justify-center gap-1">
              {pokemon.type.map((type) => (
                <Badge
                  key={type}
                  className={`text-white text-xs font-medium ${typeColors[type] || 'bg-gray-400'}`}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Multilingual Names */}
        <div className="grid grid-cols-1 gap-1 text-xs">
          <div className="flex justify-between">
            <span className="font-medium">Japanese:</span>
            <span className="text-muted-foreground">{pokemon.name.japanese}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">French:</span>
            <span className="text-muted-foreground">{pokemon.name.french}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Chinese:</span>
            <span className="text-muted-foreground">{pokemon.name.chinese}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}