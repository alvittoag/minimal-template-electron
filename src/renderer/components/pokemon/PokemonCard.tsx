import React from 'react';
import { getPokemonImageUrl, getPokemonImageUrlFallback } from '../../api/pokemonApi';
import type { PokemonListItem } from '../../../shared/types/pokemon';

interface PokemonCardProps {
  item: PokemonListItem;
  onClick: () => void;
}

function getIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];
  return Number.parseInt(id, 10) || 0;
}

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-amber-100 text-amber-800',
  fire: 'bg-orange-400 text-white',
  water: 'bg-blue-400 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  ice: 'bg-cyan-200 text-gray-800',
  fighting: 'bg-red-600 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-700 text-white',
  flying: 'bg-indigo-300 text-gray-900',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-700 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-slate-400 text-gray-900',
  fairy: 'bg-pink-300 text-gray-900',
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? 'bg-gray-400 text-white';
}

export default function PokemonCard({ item, onClick }: PokemonCardProps) {
  const id = getIdFromUrl(item.url);
  const name = item.name.replace(/-/g, ' ');
  const imageUrl = getPokemonImageUrl(id);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center rounded-2xl border-2 border-amber-200/50 bg-gradient-to-b from-amber-50 to-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:border-amber-800/50 dark:from-slate-800 dark:to-slate-900 dark:hover:border-amber-600"
    >
      <span className="absolute right-3 top-3 text-xs font-bold text-amber-600/80 dark:text-amber-400/80">
        #{id}
      </span>
      <div className="relative h-28 w-28 transition-transform group-hover:scale-110">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain drop-shadow-md"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getPokemonImageUrlFallback(id);
          }}
        />
      </div>
      <h3 className="mt-2 text-center font-bold capitalize text-slate-800 dark:text-slate-100">
        {name}
      </h3>
    </button>
  );
}
