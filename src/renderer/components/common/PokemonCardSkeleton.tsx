import React from 'react';

export default function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-amber-200/30 bg-amber-50/50 p-4 dark:border-amber-800/30 dark:bg-slate-800/50">
      <div className="h-28 w-28 animate-pulse rounded-full bg-amber-200/50 dark:bg-slate-600/50" />
      <div className="mt-2 h-5 w-24 animate-pulse rounded bg-amber-200/50 dark:bg-slate-600/50" />
    </div>
  );
}
