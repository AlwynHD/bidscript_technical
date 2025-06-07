import { useEffect, useRef } from 'react';
import type { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading?: boolean;
  loadingMore?: boolean;
  autoSearching?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  total?: number;
}

export default function PokemonGrid({ 
  pokemon, 
  loading, 
  loadingMore, 
  autoSearching,
  hasMore, 
  onLoadMore,
  total = 0
}: PokemonGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll implementation
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Load more when the sentinel comes into view
        if (entries[0].isIntersecting && onLoadMore) {
          onLoadMore();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadingMore, loading, onLoadMore]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <div className="flex justify-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // No Pokemon Found
  if (pokemon.length === 0 && !autoSearching) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="text-lg">No Pokémon found</p>
        <p className="text-sm mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count with Auto-Search Indicator */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {total} Pokémon Loaded
        </div>
        
        {autoSearching && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Searching...
          </div>
        )}
      </div>

      {/* Pokemon Grid with Smooth Transitions */}
      <div 
        className={`
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6
          transition-opacity duration-300 ease-in-out
          ${autoSearching ? 'opacity-75' : 'opacity-100'}
        `}
      >
        {pokemon.map((poke) => (
          <div
            key={poke.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <PokemonCard pokemon={poke} />
          </div>
        ))}
      </div>
      
      {/* Infinite Scroll Sentinel & Loading Indicator */}
      {hasMore && (
        <div 
          ref={sentinelRef}
          className="flex items-center justify-center py-8"
        >
          {loadingMore ? (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading more Pokemon...
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Scroll down to load more Pokemon
            </div>
          )}
        </div>
      )}
      
      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-3 animate-in fade-in duration-300">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <div className="flex justify-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && pokemon.length > 0 && (
        <div className="text-center py-8">
          <div className="text-sm text-muted-foreground">
            🎉 You've seen all {total} Pokemon! 
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Try adjusting your search to discover more
          </div>
        </div>
      )}
    </div>
  );
}