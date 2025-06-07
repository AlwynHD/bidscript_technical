import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Pokemon } from '@/types/pokemon';

interface PokemonDescriptionProps {
  pokemon: Pokemon;
}

export default function PokemonDescription({ pokemon }: PokemonDescriptionProps) {
  return (
    <Card>
      <CardHeader className="">
        <h2 className="text-lg font-bold">Description</h2>
      </CardHeader>
      <CardContent className="">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {pokemon.description}
        </p>
      </CardContent>
    </Card>
  );
}