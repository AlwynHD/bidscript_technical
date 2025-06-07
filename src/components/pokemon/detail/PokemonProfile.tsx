// src/components/pokemon/detail/PokemonProfile.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pokemon } from '@/types/pokemon';

interface PokemonProfileProps {
  pokemon: Pokemon;
}
// Show Gender of Pokemon
const parseGender = (genderString: string) => {
  // Handle common gender formats
  if (genderString.includes('Genderless') || genderString.includes('genderless')) {
    return { type: 'genderless', male: 0, female: 0 };
  }
  
  // Handle "87.5:12.5" format
  if (genderString.includes(':')) {
    const [maleStr, femaleStr] = genderString.split(':');
    const male = parseFloat(maleStr);
    const female = parseFloat(femaleStr);
    return { type: 'binary', male, female };
  }
  
  // Extract percentages from other formats
  const maleMatch = genderString.match(/(\d+(?:\.\d+)?)%?\s*male/i);
  const femaleMatch = genderString.match(/(\d+(?:\.\d+)?)%?\s*female/i);
  
  if (maleMatch || femaleMatch) {
    const male = maleMatch ? parseFloat(maleMatch[1]) : 0;
    const female = femaleMatch ? parseFloat(femaleMatch[1]) : 0;
    return { type: 'binary', male, female };
  }
  
  // Default fallback
  return { type: 'unknown', male: 50, female: 50, original: genderString };
};

export default function PokemonProfile({ pokemon }: PokemonProfileProps) {
  // Check if profile data exists
  if (!pokemon.profile) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">Profile</h2>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground text-center py-4 text-sm">
            Profile data not available for this Pokémon
          </p>
        </CardContent>
      </Card>
    );
  }

  const genderData = parseGender(pokemon.profile.gender);

  return (
    <Card>
      <CardHeader className="">
        <h2 className="text-lg font-semibold">Profile</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Physical Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Height</span>
            <p className="text-sm text-muted-foreground font-mono">{pokemon.profile.height}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Weight</span>
            <p className="text-sm text-muted-foreground font-mono">{pokemon.profile.weight}</p>
          </div>
        </div>
        
        {/* Gender with symbols only */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-foreground">Gender Ratio</span>
          {genderData.type === 'genderless' ? (
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">⚪ Genderless</span>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-blue-600">♂</span>
                <span className="font-medium">{genderData.male}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-pink-600">♀</span>
                <span className="font-medium">{genderData.female}%</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Egg Groups */}
        {pokemon.profile.egg && pokemon.profile.egg.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Egg Groups</span>
            <div className="flex gap-1 flex-wrap">
              {pokemon.profile.egg.map((group) => (
                <Badge key={group} variant="outline" className="text-xs">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Abilities */}
        {pokemon.profile.ability && pokemon.profile.ability.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Abilities</span>
            <div className="flex flex-wrap gap-1">
              {pokemon.profile.ability.map(([name, isHidden], index) => (
                <Badge 
                  key={index}
                  variant={isHidden === 'true' ? 'default' : 'secondary'}
                  className={`text-xs ${isHidden === 'true' ? 'bg-amber-500  text-white' : ''}`}
                >
                  {name}
                  {isHidden === 'true' && ' ★'}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}