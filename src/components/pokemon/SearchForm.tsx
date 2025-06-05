'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import type { SearchFilters, PokemonType } from '@/types/pokemon';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
  loading?: boolean;
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

export default function SearchForm({ onSearch, onReset, loading }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedDropdownType, setSelectedDropdownType] = useState<string>('all');

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({});
    setSelectedDropdownType('all');
    onReset();
  };

  const handleTypeChange = (value: string) => {
    setSelectedDropdownType(value);
    
    let newFilters: SearchFilters;
    
    if (value === 'all') {
      newFilters = { ...filters, types: [] };
      setFilters(newFilters);
      onSearch(newFilters); // Trigger search with cleared types
      return;
    }
    
    const type = value as PokemonType;
    const currentTypes = filters.types || [];
    
    // Don't add if already selected or if we already have 2 types
    if (currentTypes.includes(type) || currentTypes.length >= 2) {
      return;
    }
    
    newFilters = {
      ...filters,
      types: [...currentTypes, type]
    };
    
    setFilters(newFilters);
    onSearch(newFilters); // Trigger search with new type added
  };

  const removeType = (typeToRemove: PokemonType) => {
    const updatedTypes = filters.types?.filter(type => type !== typeToRemove);
    const newFilters = { ...filters, types: updatedTypes };
    
    setFilters(prev => ({
      ...prev,
      types: prev.types?.filter(type => type !== typeToRemove)
    }));
    
    onSearch(newFilters); // Auto-search when type is removed
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectedTypes = filters.types || [];
  const availableTypes = pokemonTypes.filter(type => !selectedTypes.includes(type));
  
  // Check if we have active filters
  const hasActiveFilters = !!(filters.query?.trim()) || selectedTypes.length > 0;

  return (
    <Card className="mb-8">
      <CardContent className="p-4 sm:p-6">
        {/* Mobile-first responsive grid */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4 mb-4">
          {/* Search Query - Full width on mobile, 2 cols on desktop */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium">Search Pokemon</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                value={filters.query || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder="Search by name or ability..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type Filter</label>
            <Select
              value={selectedDropdownType}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {availableTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
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

        {/* Selected Types */}
        {selectedTypes.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Selected Types (Max 2)</label>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map(type => (
                <Badge
                  key={type}
                  className={`
                    text-white text-sm font-medium cursor-pointer
                    ${typeColors[type]} hover:opacity-80 pr-1
                  `}
                  onClick={() => removeType(type)}
                >
                  {type}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Stack on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button onClick={handleSearch} disabled={loading} className="w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
          
          {hasActiveFilters && (
            <>
              <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>

            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}