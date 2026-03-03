/** Query key factory for TanStack Query (cache invalidation). */

export const pokemonKeys = {
  all: ['pokemon'] as const,
  lists: () => [...pokemonKeys.all, 'list'] as const,
  list: (offset: number, limit: number) =>
    [...pokemonKeys.lists(), offset, limit] as const,
  details: () => [...pokemonKeys.all, 'detail'] as const,
  detail: (idOrName: string | number) =>
    [...pokemonKeys.details(), idOrName] as const,
};
