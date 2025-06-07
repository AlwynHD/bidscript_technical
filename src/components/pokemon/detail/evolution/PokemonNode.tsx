'use client';

import React from 'react';
import Image from 'next/image';
import type { TreeNode } from '@/lib/evolution-tree-builder';
import { typeColors } from '@/types/pokemon';

interface PokemonNodeProps {
  pokemon: TreeNode['pokemon'];
  isCurrent: boolean;
  onClick: (id: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const PokemonNode: React.FC<PokemonNodeProps> = ({ 
  pokemon, 
  isCurrent, 
  onClick, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    //Show Selected Pokemon in Tree
<div 
  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
    isCurrent 
      ? 'border-blue-500 shadow-lg ring-2 ring-primary/20 m-1'
      : 'border-border hover:border-primary/50'
  }`}
  onClick={() => onClick?.(pokemon.id)}
>
      <div className="text-center space-y-1 p-2">
        <div className={`relative ${sizeClasses[size]} mx-auto`}>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain"
            onError={(e) => {
              e.currentTarget.src = pokemon.sprite;
            }}
          />
        </div>
        <div className="text-xs font-medium">{pokemon.name}</div>
        <div className="flex justify-center gap-0.5">
          {pokemon.types.map((type) => (
            <div
              key={type}
              className={`w-2 h-2 rounded-full ${typeColors[type] || 'bg-gray-400'}`}
              title={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonNode;