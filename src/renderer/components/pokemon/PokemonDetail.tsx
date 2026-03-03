import React from 'react';
import { getPokemonImageUrl } from '../../api/pokemonApi';
import type { Pokemon } from '../../../shared/types/pokemon';
import { getTypeColor } from './PokemonCard';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  const imageUrl = getPokemonImageUrl(pokemon.id);
  const types = pokemon.types.map((t) => t.type.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-detail-title"
    >
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border-2 border-amber-200/60 bg-gradient-to-b from-amber-50 to-white shadow-2xl dark:border-amber-800/60 dark:from-slate-800 dark:to-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-600 shadow transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          aria-label="Tutup"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-12">
          <h2
            id="pokemon-detail-title"
            className="text-center text-2xl font-bold capitalize text-slate-800 dark:text-slate-100"
          >
            {pokemon.name.replace(/-/g, ' ')}
          </h2>
          <p className="text-center text-sm text-amber-600 dark:text-amber-400">#{pokemon.id}</p>

          <div className="my-4 flex justify-center">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="h-48 w-48 object-contain drop-shadow-lg"
            />
          </div>

          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <span
                key={type}
                className={`rounded-full px-3 py-1 text-sm font-semibold ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl bg-white/60 p-4 dark:bg-slate-800/60">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-xl bg-amber-100/80 p-2 dark:bg-slate-700/80">
                <span className="block font-medium text-amber-700 dark:text-amber-300">Tinggi</span>
                <span className="text-slate-700 dark:text-slate-200">{pokemon.height / 10} m</span>
              </div>
              <div className="rounded-xl bg-amber-100/80 p-2 dark:bg-slate-700/80">
                <span className="block font-medium text-amber-700 dark:text-amber-300">Berat</span>
                <span className="text-slate-700 dark:text-slate-200">{pokemon.weight / 10} kg</span>
              </div>
              <div className="rounded-xl bg-amber-100/80 p-2 dark:bg-slate-700/80">
                <span className="block font-medium text-amber-700 dark:text-amber-300">Base EXP</span>
                <span className="text-slate-700 dark:text-slate-200">{pokemon.base_experience}</span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-slate-700 dark:text-slate-200">Kemampuan</h4>
              <ul className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <li
                    key={a.ability.name}
                    className="rounded-lg bg-slate-200/80 px-2 py-1 text-sm capitalize text-slate-800 dark:bg-slate-600 dark:text-slate-100"
                  >
                    {a.ability.name.replace(/-/g, ' ')}
                    {a.is_hidden && ' (hidden)'}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-slate-700 dark:text-slate-200">Stats</h4>
              <ul className="space-y-2">
                {pokemon.stats.map((s) => (
                  <li key={s.stat.name} className="flex items-center gap-2">
                    <span className="w-24 shrink-0 capitalize text-slate-600 dark:text-slate-300">
                      {s.stat.name.replace(/-/g, ' ')}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                        style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-slate-700 dark:text-slate-200">
                      {s.base_stat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
