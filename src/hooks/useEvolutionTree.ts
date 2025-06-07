import { useState, useEffect } from 'react';
import type { EvolutionTreeData } from '@/lib/evolution-tree-builder';

interface UseEvolutionTreeReturn {
  treeData: EvolutionTreeData | null;
  loading: boolean;
  error: string | null;
}

export function useEvolutionTree(pokemonId: number): UseEvolutionTreeReturn {
  const [treeData, setTreeData] = useState<EvolutionTreeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvolutionTree() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/evolution/${pokemonId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch evolution tree');
        }
        
        const data = await response.json();
        setTreeData(data.tree);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTreeData(null);
      } finally {
        setLoading(false);
      }
    }

    if (pokemonId) {
      fetchEvolutionTree();
    }
  }, [pokemonId]);

  return { treeData, loading, error };
}