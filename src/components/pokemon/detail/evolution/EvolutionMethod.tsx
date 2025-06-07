'use client';

import React from 'react';

interface EvolutionMethodProps {
  method?: string;
}

const EvolutionMethod: React.FC<EvolutionMethodProps> = ({ method }) => {
  if (!method) return null;
  
  return (
    <div className="text-[10px] text-muted-foreground text-center max-w-[80px] mx-auto">
      {method}
    </div>
  );
};

export default EvolutionMethod;