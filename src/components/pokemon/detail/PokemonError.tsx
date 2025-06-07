import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PokemonErrorProps {
  id: string;
  error: string;
}
// SHows When Pokemon Does not Exist
export default function PokemonError({ id, error }: PokemonErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {error.includes('not found') ? 'Pokémon Not Found' : 'Error Loading Pokémon'}
        </h1>
        <p className="text-muted-foreground mb-6">
          {error.includes('not found') 
            ? `The Pokémon with ID ${id} could not be found.`
            : error
          }
        </p>
        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pokédex
          </Button>
        </Link>
      </div>
    </div>
  );
}