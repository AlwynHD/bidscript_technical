'use client';

import React from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import PokemonNode from './PokemonNode';
import EvolutionMethod from './EvolutionMethod';
import type { TreeNode } from '@/lib/evolution-tree-builder';

interface SimpleBranchingEvolutionProps {
  root: TreeNode;
  onPokemonClick: (id: number) => void;
}

const SimpleBranchingEvolution: React.FC<SimpleBranchingEvolutionProps> = ({ 
  root, 
  onPokemonClick 
}) => {
  const renderNode = (node: TreeNode, depth = 0): JSX.Element => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <PokemonNode
            pokemon={node.pokemon}
            isCurrent={node.isCurrent}
            onClick={onPokemonClick}
            size={depth === 0 ? 'lg' : 'md'}
          />
        </div>
        
        {node.children.length > 0 && (
          <>
            {node.children.length === 1 ? (
              <>
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <EvolutionMethod method={node.children[0].method} />
                </div>
                {renderNode(node.children[0], depth + 1)}
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-col gap-4">
                  {node.children.map((child) => (
                    <div key={child.pokemon.id} className="flex items-center gap-2">
                      <div className="flex flex-col items-center">
                        <EvolutionMethod method={child.method} />
                        <PokemonNode
                          pokemon={child.pokemon}
                          isCurrent={child.isCurrent}
                          onClick={onPokemonClick}
                        />
                      </div>
                      {child.children.length > 0 && renderNode(child, depth + 1)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return <div className="flex justify-center">{renderNode(root)}</div>;
};

export default SimpleBranchingEvolution;