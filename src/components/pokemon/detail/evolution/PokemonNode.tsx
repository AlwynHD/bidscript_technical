'use client';

import React from 'react';
import Image from 'next/image';
import type { TreeNode } from '@/lib/evolution-tree-builder';

const typeColors: Record<string, string> = {
  Normal: 'bg-gray-400',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-blue-200',
  Fighting: 'bg-red-700',
  Poison: 'bg-purple-500',
  Ground: 'bg-yellow-600',
  Flying: 'bg-indigo-400',
  Psychic: 'bg-pink-500',
  Bug: 'bg-green-400',
  Rock: 'bg-yellow-800',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-indigo-700',
  Dark: 'bg-gray-800',
  Steel: 'bg-gray-500',
  Fairy: 'bg-pink-300',
};

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
    <div
      className={`
        relative group cursor-pointer transition-all duration-200
        ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg scale-110' : 'hover:scale-105'}
      `}
      onClick={() => onClick(pokemon.id)}
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
      {isCurrent && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
      )}
    </div>
  );
};

export default PokemonNode;