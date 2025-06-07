import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pokemon } from '@/types/pokemon';
import { typeColors } from '@/types/pokemon';

interface PokemonBasicInfoProps {
  pokemon: Pokemon;
}

// Shows Basic Info of a Pokemon
export default function PokemonBasicInfo({ pokemon }: PokemonBasicInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="text-center space-y-2">
          {/* ID and Name */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-mono">
              #{pokemon.id.toString().padStart(3, '0')}
            </div>
            <h1 className="text-xl font-bold">{pokemon.name.english}</h1>
          </div>
          
          {/* Species and Types */}
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