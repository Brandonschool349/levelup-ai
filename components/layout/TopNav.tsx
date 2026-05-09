'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { VisualTheme } from './DynamicThemeWrapper';

interface TopNavProps {
  visualTheme: VisualTheme;
}

const navStyles: Record<VisualTheme, string> = {
  'cyber-hacker': 'bg-zinc-950/80 border-b border-green-500/30 backdrop-blur-md',
  'kids-fun': 'bg-white/60 border-b-4 border-yellow-400 backdrop-blur-xl shadow-lg rounded-b-3xl mx-2 mt-2',
  'minimalist': 'bg-white/80 border-b border-gray-200 backdrop-blur-sm',
};

export default function TopNav({ visualTheme }: TopNavProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-end transition-all duration-700",
        navStyles[visualTheme]
      )}
    >
      <ul className="flex items-center gap-8 font-semibold text-sm md:text-base">
        <li className="cursor-pointer hover:opacity-70 transition-opacity">Generar</li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity">Explorar</li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity">Mi Perfil</li>
      </ul>
    </nav>
  );
}
