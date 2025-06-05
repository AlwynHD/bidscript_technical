import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pokemon, SearchFilters, PokemonResponse } from '@/types/pokemon';

interface UsePokemonReturn {
  pokemon: Pokemon[];
  loading: boolean;
  loadingMore: boolean;
  autoSearching: boolean; // New: subtle loading for auto-search
  error: string | null;
  hasMore: boolean;
  total: number;
  currentPage: number;
  loadMore: () => void;
  search: (filters: SearchFilters, isManual?: boolean) => void;
  resetSearch: () => void;
}

export function usePokemon(): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [autoSearching, setAutoSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({});
  
  // Refs for debouncing
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const fetchPokemon = useCallback(async (
    page: number, 
    filters: SearchFilters = {}, 
    isNewSearch = false,
    isManual = false
  ) => {
    if (isNewSearch) {
      if (isManual) {
        // Manual search - show full loading
        setLoading(true);
        setPokemon([]);
      } else {
        // Auto search - just show subtle indicator
        setAutoSearching(true);
      }
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
          if (Array.isArray(value)) {
            if (value.length > 0) {
              searchParams.append(key, value.join(','));
            }
          } else {
            searchParams.append(key, value.toString());
          }
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
      setAutoSearching(false);
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((filters: SearchFilters, isManual = false) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // For non-text filters (like types), search immediately
    const hasTypeChanges = JSON.stringify(filters.types) !== JSON.stringify(activeFilters.types);
    const hasQueryChanges = filters.query !== activeFilters.query;
    
    if (hasTypeChanges && !hasQueryChanges) {
      // Types changed but query didn't - search immediately but smoothly
      fetchPokemon(1, filters, true, false);
      return;
    }

    // For text search, apply debouncing
    if (hasQueryChanges || isManual) {
      if (isManual) {
        // Manual search - immediate
        fetchPokemon(1, filters, true, true);
      } else {
        // Auto search - debounced
        debounceTimerRef.current = setTimeout(() => {
          fetchPokemon(1, filters, true, false);
        }, 300);
      }
    }
  }, [activeFilters, fetchPokemon]);

  // Load initial Pokemon on mount
  useEffect(() => {
    if (isInitialMount.current) {
      fetchPokemon(1, {}, true, false);
      isInitialMount.current = false;
    }
  }, [fetchPokemon]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    fetchPokemon(currentPage + 1, activeFilters, false, false);
  }, [hasMore, loadingMore, currentPage, activeFilters, fetchPokemon]);

  const search = useCallback((filters: SearchFilters, isManual = false) => {
    debouncedSearch(filters, isManual);
  }, [debouncedSearch]);

  const resetSearch = useCallback(() => {
    // Clear any pending debounced search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    fetchPokemon(1, {}, true, true);
  }, [fetchPokemon]);

  return {
    pokemon,
    loading,
    loadingMore,
    autoSearching,
    error,
    hasMore,
    total,
    currentPage,
    loadMore,
    search,
    resetSearch
  };
}