// src/components/pokemon/detail/PokemonStats.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Shield, Zap, Eye, Sword } from 'lucide-react';
import StatBar from './StatBar';
import type { Pokemon } from '@/types/pokemon';

interface PokemonStatsProps {
  pokemon: Pokemon;
}

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  // Check if base stats exist
  if (!pokemon.base) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">Base Stats</h2>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground text-center py-4 text-sm">
            Base stats not available for this Pokémon
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalStats = Object.values(pokemon.base).reduce((sum, stat) => sum + stat, 0);

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Base Stats</h2>
          <span className="text-sm text-muted-foreground font-medium">
            Total: {totalStats}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatBar label="HP" value={pokemon.base.HP} icon={Heart} />
        <StatBar label="Attack" value={pokemon.base.Attack} icon={Sword} />
        <StatBar label="Defense" value={pokemon.base.Defense} icon={Shield} />
        <StatBar label="Sp. Attack" value={pokemon.base["Sp. Attack"]} icon={Eye} />
        <StatBar label="Sp. Defense" value={pokemon.base["Sp. Defense"]} icon={Shield} />
        <StatBar label="Speed" value={pokemon.base.Speed} icon={Zap} />
      </CardContent>
    </Card>
  );
}