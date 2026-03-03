/**
 * Renderer API: Electron → IPC; browser → Axios.
 */

import type { Pokemon, PokemonListResponse } from '../../shared/types/pokemon';

const SPRITE_OFFICIAL_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const SPRITE_DEFAULT_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';


function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    return typeof m === 'string' ? m : fallback;
  }
  return fallback;
}


export async function fetchPokemonList(
  offset = 0,
  limit = 20,
): Promise<PokemonListResponse> {
  try {
    return await window.electronAPI.fetchPokemonList(offset, limit);
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Gagal memuat daftar Pokémon'));
  }
}

export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  try {
    const data = await window.electronAPI.fetchPokemon(idOrName);
    return data as Pokemon;

  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Gagal memuat data Pokémon'));
  }
}

function safeId(id: number): number {
  return Number.isFinite(Number(id)) && Number(id) >= 0 ? Math.floor(Number(id)) : 0;
}

export function getPokemonImageUrl(id: number): string {
  return `${SPRITE_OFFICIAL_BASE}/${safeId(id)}.png`;
}

export function getPokemonImageUrlFallback(id: number): string {
  return `${SPRITE_DEFAULT_BASE}/${safeId(id)}.png`;
}
