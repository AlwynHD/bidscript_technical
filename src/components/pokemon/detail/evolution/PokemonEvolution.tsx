'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { useEvolutionTree } from '@/hooks/useEvolutionTree';
import LinearEvolution from './LinearEvolution';
import SimpleBranchingEvolution from './SimpleBranchingEvolution';
import ComplexBranchingEvolution from './ComplexBranchingEvolution';
import type { Pokemon } from '@/types/pokemon';
import type { TreeNode } from '@/lib/evolution-tree-builder';

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({ pokemon }) => {
  const router = useRouter();
  const { treeData, loading, error } = useEvolutionTree(pokemon.id);

  const handlePokemonClick = (pokemonId: number) => {
    if (pokemonId !== pokemon.id) {
      router.push(`/pokemon/${pokemonId}`);
    }
  };

  // Flatten tree for linear layout
  const flattenTree = (node: TreeNode): TreeNode[] => {
    const result: TreeNode[] = [node];
    if (node.children.length === 1) {
      result.push(...flattenTree(node.children[0]));
    }
    return result;
  };

  // Determine if tree has complex branching (like Eevee)
  const hasComplexBranching = (node: TreeNode): boolean => {
    return node.children.length > 4 || 
           node.children.some(child => child.children.length > 2);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Evolution Chain</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !treeData || treeData.totalMembers <= 1) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Evolution Chain</h2>
            <Sparkles className="w-4 h-4 text-muted-foreground" />
          </div>
          <Badge variant="outline" className="text-xs">
            {treeData.layout === 'complex' ? 'Complex' : 
             treeData.layout === 'branching' ? 'Branching' : 'Linear'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="py-4 overflow-x-auto">
          {treeData.layout === 'linear' && treeData.roots[0] ? (
            <LinearEvolution
              nodes={flattenTree(treeData.roots[0])}
              onPokemonClick={handlePokemonClick}
            />
          ) : (
            <div className="space-y-6">
              {treeData.roots.map((root, index) => (
                <div key={index}>
                  {treeData.roots.length > 1 && (
                    <div className="text-xs text-muted-foreground mb-2">
                      Evolution Line {index + 1}
                    </div>
                  )}
                  {hasComplexBranching(root) ? (
                    <ComplexBranchingEvolution
                      root={root}
                      onPokemonClick={handlePokemonClick}
                    />
                  ) : (
                    <SimpleBranchingEvolution
                      root={root}
                      onPokemonClick={handlePokemonClick}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-3 border-t">
          {treeData.totalMembers} Pokémon in this evolution family
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonEvolution;