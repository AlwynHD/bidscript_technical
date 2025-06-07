'use client';

import React from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import PokemonNode from './PokemonNode';
import EvolutionMethod from './EvolutionMethod';
import type { TreeNode } from '@/lib/evolution-tree-builder';

interface ComplexBranchingEvolutionProps {
  root: TreeNode;
  onPokemonClick: (id: number) => void;
}

const ComplexBranchingEvolution: React.FC<ComplexBranchingEvolutionProps> = ({ 
  root, 
  onPokemonClick 
}) => {
  const renderComplexBranch = (node: TreeNode) => {
    const childCount = node.children.length;
    const isEeveelike = childCount > 4; // Many evolutions from one base
    
    if (isEeveelike) {
      // Fan layout for many evolutions
      return (
        <div className="flex flex-col items-center gap-8">
          <PokemonNode
            pokemon={node.pokemon}
            isCurrent={node.isCurrent}
            onClick={onPokemonClick}
            size="lg"
          />
          
          <div className="relative">
            {/* Connection lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-muted-foreground/30" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-px bg-muted-foreground/30" />
            
            {/* Evolution grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6 pt-12">
              {node.children.map((child) => (
                <div key={child.pokemon.id} className="flex flex-col items-center gap-2">
                  <EvolutionMethod method={child.method} />
                  <PokemonNode
                    pokemon={child.pokemon}
                    isCurrent={child.isCurrent}
                    onClick={onPokemonClick}
                    size="md"
                  />
                  {/* Render further evolutions if any */}
                  {child.children.length > 0 && (
                    <div className="mt-4">
                      {child.children.map((grandchild) => (
                        <div key={grandchild.pokemon.id} className="flex flex-col items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-muted-foreground rotate-90" />
                          <EvolutionMethod method={grandchild.method} />
                          <PokemonNode
                            pokemon={grandchild.pokemon}
                            isCurrent={grandchild.isCurrent}
                            onClick={onPokemonClick}
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Regular branching (2-4 evolutions)
    return (
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center">
          <PokemonNode
            pokemon={node.pokemon}
            isCurrent={node.isCurrent}
            onClick={onPokemonClick}
            size="lg"
          />
        </div>
        
        {node.children.length > 0 && (
          <>
            <div className="flex items-center pt-8">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <div className="flex flex-col gap-4">
              {node.children.map((child) => (
                <div key={child.pokemon.id} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <EvolutionMethod method={child.method} />
                    <PokemonNode
                      pokemon={child.pokemon}
                      isCurrent={child.isCurrent}
                      onClick={onPokemonClick}
                    />
                  </div>
                  
                  {/* Render further evolutions */}
                  {child.children.length > 0 && (
                    <>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex gap-4">
                        {child.children.map((grandchild) => (
                          <div key={grandchild.pokemon.id} className="flex flex-col items-center">
                            <EvolutionMethod method={grandchild.method} />
                            <PokemonNode
                              pokemon={grandchild.pokemon}
                              isCurrent={grandchild.isCurrent}
                              onClick={onPokemonClick}
                              size="sm"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return <div className="flex justify-center">{renderComplexBranch(root)}</div>;
};

export default ComplexBranchingEvolution;