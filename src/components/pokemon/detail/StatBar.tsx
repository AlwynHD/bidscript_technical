// src/components/pokemon/detail/StatBar.tsx
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function StatBar({ label, value, maxValue = 255, icon: Icon }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs font-medium">{label}</span>
        </div>
        <span className="text-xs font-bold">{value}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}