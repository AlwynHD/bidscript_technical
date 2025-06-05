// src/components/pokemon/detail/PokemonProfile.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pokemon } from '@/types/pokemon';

interface PokemonProfileProps {
  pokemon: Pokemon;
}

export default function PokemonProfile({ pokemon }: PokemonProfileProps) {
  // Check if profile data exists
  if (!pokemon.profile) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-bold">Profile</h2>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground text-center py-4 text-sm">
            Profile data not available for this Pokémon
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-bold">Profile</h2>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium text-xs">Height:</span>
            <p className="text-muted-foreground text-xs">{pokemon.profile.height}</p>
          </div>
          <div>
            <span className="font-medium text-xs">Weight:</span>
            <p className="text-muted-foreground text-xs">{pokemon.profile.weight}</p>
          </div>
        </div>
        
        <div>
          <span className="font-medium text-xs">Gender:</span>
          <p className="text-muted-foreground text-xs">{pokemon.profile.gender}</p>
        </div>
        
        {/* Egg Groups - only show if they exist */}
        {pokemon.profile.egg && pokemon.profile.egg.length > 0 && (
          <div>
            <span className="font-medium text-xs block mb-1">Egg Groups:</span>
            <div className="flex gap-1 flex-wrap">
              {pokemon.profile.egg.map((group) => (
                <Badge key={group} variant="outline" className="text-xs h-5">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Abilities - only show if they exist */}
        {pokemon.profile.ability && pokemon.profile.ability.length > 0 && (
          <div>
            <span className="font-medium text-xs block mb-1">Abilities:</span>
            <div className="flex flex-wrap gap-1">
              {pokemon.profile.ability.map(([name, isHidden], index) => (
                <Badge 
                  key={index}
                  variant={isHidden === 'true' ? 'default' : 'secondary'}
                  className={`text-xs h-5 ${isHidden === 'true' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                >
                  {name}
                  {isHidden === 'true' && ' (H)'}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}