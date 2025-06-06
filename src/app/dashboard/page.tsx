'use client';

import { useState } from 'react';
import { usePokemon } from '@/hooks/usePokemonSearch';
import { useFavorites } from '@/hooks/useFavorites';
import SearchForm from '@/components/pokemon/SearchForm';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
export default function HomePage() {
  const { 
    pokemon, 
    loading, 
    loadingMore, 
    autoSearching,
    error, 
    total, 
    hasMore, 
    loadMore, 
    search, 
    resetSearch 
  } = usePokemon();

  const { favorites } = useFavorites();

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

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Pokémon</TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <SearchForm 
              onSearch={search} 
              onReset={resetSearch} 
              loading={loading || autoSearching}
            />

            {error && (
              <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <PokemonGrid 
              pokemon={pokemon}
              loading={loading}
              loadingMore={loadingMore}
              autoSearching={autoSearching}
              hasMore={hasMore}
              onLoadMore={loadMore}
              total={total}
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            {favorites.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No favorite Pokémon yet</p>
                <p className="text-sm mt-2">Click the heart icon on any Pokémon to add them to your favorites</p>
              </div>
            ) : (
              <PokemonGrid 
                pokemon={favorites}
                loading={false}
                total={favorites.length}
                hasMore={false}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}