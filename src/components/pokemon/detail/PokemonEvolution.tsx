// src/components/pokemon/detail/PokemonEvolution.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Pokemon } from '@/types/pokemon';

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

export default function PokemonEvolution({ pokemon }: PokemonEvolutionProps) {
  if (!pokemon.evolution.next && !pokemon.evolution.prev) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-bold">Evolution</h2>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {pokemon.evolution.prev && (
          <div>
            <span className="font-medium text-xs block">Evolves from:</span>
            <div className="mt-1">
              {pokemon.evolution.prev.map(([name, method], index) => (
                <p key={index} className="text-muted-foreground text-xs">
                  {name} ({method})
                </p>
              ))}
            </div>
          </div>
        )}
        
        {pokemon.evolution.next && (
          <div>
            <span className="font-medium text-xs block">Evolves into:</span>
            <div className="mt-1">
              {pokemon.evolution.next.map(([name, method], index) => (
                <p key={index} className="text-muted-foreground text-xs">
                  {name} ({method})
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}