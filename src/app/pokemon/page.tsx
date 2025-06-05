'use client';

import { usePokemon } from '@/hooks/usePokemonSearch';
import SearchForm from '@/components/pokemon/SearchForm';
import PokemonGrid from '@/components/pokemon/PokemonGrid';

export default function HomePage() {
  const { 
    pokemon, 
    loading, 
    loadingMore, 
    error, 
    total, 
    hasMore, 
    loadMore, 
    search, 
    resetSearch 
  } = usePokemon();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Pokédex
          </h1>
          <p className="text-muted-foreground">
            Discover and search through all Pokémon
          </p>
        </header>

        <SearchForm 
          onSearch={search} 
          onReset={resetSearch} 
          loading={loading} 
        />

        {error && (
          <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <PokemonGrid 
          pokemon={pokemon}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
          total={total}
        />
      </div>
    </div>
  );
}