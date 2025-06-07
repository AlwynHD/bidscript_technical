'use client';

import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import type { SearchFilters, PokemonType } from '@/types/pokemon';

interface SearchFormProps {
  filters: SearchFilters;
  selectedDropdownType: string;
  onQueryChange: (query: string) => void;
  onTypeChange: (value: string) => void;
  onRemoveType: (type: PokemonType) => void;
  onReset: () => void;
  loading?: boolean;
  autoSearching?: boolean; // Add this prop
}

const pokemonTypes: PokemonType[] = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic',
  'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

const typeColors: Record<string, string> = {
  Normal: 'bg-gray-400 hover:bg-gray-500',
  Fire: 'bg-red-500 hover:bg-red-600',
  Water: 'bg-blue-500 hover:bg-blue-600',
  Electric: 'bg-yellow-400 hover:bg-yellow-500',
  Grass: 'bg-green-500 hover:bg-green-600',
  Ice: 'bg-blue-200 hover:bg-blue-300',
  Fighting: 'bg-red-700 hover:bg-red-800',
  Poison: 'bg-purple-500 hover:bg-purple-600',
  Ground: 'bg-yellow-600 hover:bg-yellow-700',
  Flying: 'bg-indigo-400 hover:bg-indigo-500',
  Psychic: 'bg-pink-500 hover:bg-pink-600',
  Bug: 'bg-green-400 hover:bg-green-500',
  Rock: 'bg-yellow-800 hover:bg-yellow-900',
  Ghost: 'bg-purple-700 hover:bg-purple-800',
  Dragon: 'bg-indigo-700 hover:bg-indigo-800',
  Dark: 'bg-gray-800 hover:bg-gray-900',
  Steel: 'bg-gray-500 hover:bg-gray-600',
  Fairy: 'bg-pink-300 hover:bg-pink-400',
};

export default function SearchForm({
  filters,
  selectedDropdownType,
  onQueryChange,
  onTypeChange,
  onRemoveType,
  onReset,
  loading,
  autoSearching,
}: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wasAutoSearchingRef = useRef(false);

  const selectedTypes = filters.types || [];
  const availableTypes = pokemonTypes.filter((t) => !selectedTypes.includes(t));
  const hasActiveFilters = !!(filters.query?.trim()) || selectedTypes.length > 0;

  // Track when auto-searching starts and ends to maintain focus
  useEffect(() => {
    if (autoSearching && !wasAutoSearchingRef.current) {
      // Auto-search just started
      wasAutoSearchingRef.current = true;
    } else if (!autoSearching && wasAutoSearchingRef.current) {
      // Auto-search just finished - restore focus if the input was active
      wasAutoSearchingRef.current = false;
      if (inputRef.current && document.activeElement !== inputRef.current) {
        // Small delay to ensure the DOM has updated
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }
  }, [autoSearching]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  const handleReset = () => {
    onReset();
    // Focus the input after reset
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4 mb-4">
          {/* NAME/QUERY INPUT */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium">Search Pokémon</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                ref={inputRef}
                type="text"
                value={filters.query || ''}
                onChange={handleQueryChange}
                placeholder="Search by name or ability..."
                className="pl-10"
                disabled={loading}
              />
              {autoSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Search updates automatically as you type
              {autoSearching && <span className="text-blue-500"> • Searching...</span>}
            </p>
          </div>

          {/* TYPE DROPDOWN */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type Filter</label>
            <Select
              value={selectedDropdownType}
              onValueChange={(val) => onTypeChange(val)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
                {selectedTypes.length >= 2 && (
                  <SelectItem value="max" disabled>
                    Max 2 types selected
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* DISPLAY SELECTED TYPE BADGES */}
        {selectedTypes.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Selected Types (Max 2)
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => (
                <Badge
                  key={type}
                  className={`
                    text-white text-sm font-medium cursor-pointer
                    ${typeColors[type]} hover:opacity-80 pr-1
                  `}
                  onClick={() => onRemoveType(type)}
                >
                  {type}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CLEAR FILTERS BUTTON */}
        {hasActiveFilters && (
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto"
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}