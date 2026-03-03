import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../../api/pokemonApi';
import { pokemonKeys } from '../../api/queryKeys';

const DEFAULT_PAGE_SIZE = 24;

interface UsePokemonListOptions {
  offset?: number;
  limit?: number;
}

export function usePokemonList(options: UsePokemonListOptions = {}) {
  const offset = options.offset ?? 0;
  const limit = options.limit ?? DEFAULT_PAGE_SIZE;

  return useQuery({
    queryKey: pokemonKeys.list(offset, limit),
    queryFn: () => fetchPokemonList(offset, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
