'use client';
import { useState, useEffect } from 'react';
import { usePokemon } from '@/hooks/usePokemonSearch';
import { useFavorites } from '@/context/FavoritesContext';
import SearchForm from '@/components/pokemon/SearchForm';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import FavoritesGrid from '@/components/pokemon/FavoritesGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import type { SearchFilters, PokemonType } from '@/types/pokemon';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const { favoritesCount } = useFavorites();

  // Global state for search filters
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedDropdownType, setSelectedDropdownType] = useState<string>('all');

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

  // When filters change, trigger the hook's search
  useEffect(() => {
    search(filters);
  }, [filters]);

  const handleReset = () => {
    setFilters({});
    setSelectedDropdownType('all');
    resetSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Pokédex</h1>
          <p className="text-muted-foreground">
            Discover and search through all Pokémon
          </p>
        </header>
        {/* Main and Favorites Tab */}
        <Tabs
          value={activeTab}
          onValueChange={(val: string) => setActiveTab(val as 'all' | 'favorites')}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="all">All Pokémon</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <SearchForm
              filters={filters}
              selectedDropdownType={selectedDropdownType}
              onQueryChange={(query) =>
                setFilters((f) => ({ ...f, query }))
              }
              onTypeChange={(typeValue) => {
                setSelectedDropdownType(typeValue);
                if (typeValue === 'all') {
                  setFilters((f) => ({ ...f, types: [] }));
                  return;
                }
                const type = typeValue as PokemonType;
                const currentTypes = filters.types || [];
                if (currentTypes.includes(type) || currentTypes.length >= 2) {
                  return;
                }
                setFilters((f) => ({
                  ...f,
                  types: [...(f.types || []), type],
                }));
              }}
              onRemoveType={(typeToRemove) => {
                setFilters((f) => ({
                  ...f,
                  types: (f.types || []).filter((t) => t !== typeToRemove),
                }));
              }}
              onReset={handleReset}
              loading={loading}
              autoSearching={autoSearching} // Pass the autoSearching prop
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

          <TabsContent value="favorites">
            <FavoritesGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}