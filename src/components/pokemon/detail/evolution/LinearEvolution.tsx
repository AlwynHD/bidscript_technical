'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import PokemonNode from './PokemonNode';
import EvolutionMethod from './EvolutionMethod';
import type { TreeNode } from '@/lib/evolution-tree-builder';

interface LinearEvolutionProps {
  nodes: TreeNode[];
  onPokemonClick: (id: number) => void;
}

const LinearEvolution: React.FC<LinearEvolutionProps> = ({ 
  nodes, 
  onPokemonClick 
}) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {nodes.map((node, index) => (
        <React.Fragment key={node.pokemon.id}>
          <PokemonNode
            pokemon={node.pokemon}
            isCurrent={node.isCurrent}
            onClick={onPokemonClick}
          />
          {index < nodes.length - 1 && (
            <div className="flex flex-col items-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <EvolutionMethod method={nodes[index + 1].method} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LinearEvolution;