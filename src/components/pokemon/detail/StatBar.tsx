// src/components/pokemon/detail/StatBar.tsx
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  icon: React.ComponentType<{ className?: string }>;
}
// Stat Bar
export default function StatBar({ label, value, maxValue = 255, icon: Icon }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-foreground min-w-[2rem] text-right">
          {value}
        </span>
      </div>
    </div>
  );
}