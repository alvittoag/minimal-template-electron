import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '../../api/pokemonApi';
import { pokemonKeys } from '../../api/queryKeys';

export function usePokemon(idOrName: string | number | null | undefined) {
  const enabled = idOrName != null && idOrName !== '';

  return useQuery({
    queryKey: pokemonKeys.detail(enabled ? idOrName : ''),
    queryFn: () => fetchPokemon(idOrName as string | number),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
