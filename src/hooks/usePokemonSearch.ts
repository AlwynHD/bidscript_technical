import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, SearchFilters, PokemonResponse } from '@/types/pokemon';

interface UsePokemonReturn {
  pokemon: Pokemon[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  currentPage: number;
  loadMore: () => void;
  search: (filters: SearchFilters) => void;
  resetSearch: () => void;
}

export function usePokemon(): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({});

  const fetchPokemon = useCallback(async (
    page: number, 
    filters: SearchFilters = {}, 
    isNewSearch = false
  ) => {
    if (isNewSearch) {
      setLoading(true);
      setPokemon([]);
      setCurrentPage(1);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('page', page.toString());
      searchParams.append('limit', '20');
      
      // Add filters to search params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/poke_search?${searchParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }

      const data: PokemonResponse = await response.json();
      
      if (isNewSearch) {
        setPokemon(data.pokemon);
        setCurrentPage(1);
      } else {
        setPokemon(prev => [...prev, ...data.pokemon]);
        setCurrentPage(page);
      }
      
      setHasMore(data.hasMore);
      setTotal(data.total);
      setActiveFilters(filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Load initial Pokemon on mount
  useEffect(() => {
    fetchPokemon(1, {}, true);
  }, [fetchPokemon]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    fetchPokemon(currentPage + 1, activeFilters, false);
  }, [hasMore, loadingMore, currentPage, activeFilters, fetchPokemon]);

  const search = useCallback((filters: SearchFilters) => {
    fetchPokemon(1, filters, true);
  }, [fetchPokemon]);

  const resetSearch = useCallback(() => {
    fetchPokemon(1, {}, true);
  }, [fetchPokemon]);

  return {
    pokemon,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    currentPage,
    loadMore,
    search,
    resetSearch
  };
}