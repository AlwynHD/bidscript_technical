'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import type { Pokemon } from '@/types/pokemon';

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  Normal: 'bg-gray-400',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-blue-200',
  Fighting: 'bg-red-700',
  Poison: 'bg-purple-500',
  Ground: 'bg-yellow-600',
  Flying: 'bg-indigo-400',
  Psychic: 'bg-pink-500',
  Bug: 'bg-green-400',
  Rock: 'bg-yellow-800',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-indigo-700',
  Dark: 'bg-gray-800',
  Steel: 'bg-gray-500',
  Fairy: 'bg-pink-300',
};

export default function PokemonEvolution({ pokemon }: PokemonEvolutionProps) {
  const router = useRouter();
  const { evolutionChain, loading, error, currentPokemonIndex } = useEvolutionChain(pokemon.id);

  const handlePokemonClick = (pokemonId: number) => {
    router.push(`/pokemon/${pokemonId}`);
  };

  // Don't render if no evolution data or single pokemon
  if (!loading && (evolutionChain.length <= 1 || error)) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <h2 className="text-lg font-bold">Evolution Chain</h2>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Evolution Chain Display */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {evolutionChain.map((evo, index) => (
                <div key={evo.id} className="flex items-center gap-1 flex-shrink-0">
                  {/* Pokemon */}
                  <div 
                    className={`
                      relative group cursor-pointer transition-all duration-200
                      ${index === currentPokemonIndex 
                        ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg' 
                        : 'hover:scale-105'
                      }
                    `}
                    onClick={() => handlePokemonClick(evo.id)}
                  >
                    <div className="text-center space-y-1">
                      <div className="relative w-12 h-12 mx-auto">
                        <Image
                          src={evo.image}
                          alt={evo.name}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            e.currentTarget.src = evo.sprite;
                          }}
                        />
                      </div>
                      <div className="text-[10px] font-medium text-center leading-tight">
                        {evo.name}
                      </div>
                      <div className="flex justify-center gap-0.5">
                        {evo.types.slice(0, 2).map((type) => (
                          <div
                            key={type}
                            className={`
                              w-2 h-2 rounded-full
                              ${typeColors[type] || 'bg-gray-400'}
                            `}
                            title={type}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Current Pokemon Indicator */}
                    {index === currentPokemonIndex && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Evolution Arrow & Method */}
                  {index < evolutionChain.length - 1 && (
                    <div className="flex flex-col items-center gap-1 px-1">
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      {evolutionChain[index + 1].evolutionMethod && (
                        <div className="text-[8px] text-muted-foreground text-center max-w-[40px] leading-tight">
                          {evolutionChain[index + 1].evolutionMethod}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Evolution Summary */}
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              {evolutionChain.length} stage evolution line
              {currentPokemonIndex >= 0 && (
                <span className="ml-1">
                  (Stage {currentPokemonIndex + 1})
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}