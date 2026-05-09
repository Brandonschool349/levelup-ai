'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type VisualTheme = 'cyber-hacker' | 'kids-fun' | 'minimalist';

interface DynamicThemeWrapperProps {
  children: React.ReactNode;
  visualTheme: VisualTheme;
}

const themeStyles: Record<VisualTheme, string> = {
  // Usamos arbitrary variables de Tailwind para conectar con next/font/google
  'cyber-hacker': 'bg-zinc-950 text-green-400 font-[family-name:var(--font-space-mono)] selection:bg-green-500 selection:text-black',
  'kids-fun': 'bg-sky-100 text-rose-600 font-[family-name:var(--font-comic-neue)] selection:bg-yellow-300 selection:text-rose-800',
  'minimalist': 'bg-gray-50 text-gray-900 font-[family-name:var(--font-inter)] selection:bg-gray-900 selection:text-white',
};

export default function DynamicThemeWrapper({ 
  children, 
  visualTheme 
}: DynamicThemeWrapperProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-700 ease-in-out",
        themeStyles[visualTheme]
      )}
    >
      {children}
    </div>
  );
}
