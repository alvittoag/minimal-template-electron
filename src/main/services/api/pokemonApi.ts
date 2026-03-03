/** Main process: PokeAPI + sprite fetch (electron-fetch). */

import { fetchJson, mainFetch } from '../fetchClient';
import type { Pokemon, PokemonListResponse } from '../../../shared/types/pokemon';
import { POKEAPI_BASE, SPRITE_DEFAULT_BASE, SPRITE_OFFICIAL_BASE } from '../../config/constants';

export async function getPokemonList(
  offset: number,
  limit: number,
): Promise<PokemonListResponse> {
  const url = `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`;
  return fetchJson<PokemonListResponse>(url);
}

export async function getPokemonDetail(idOrName: string | number): Promise<Pokemon> {
  const url = `${POKEAPI_BASE}/pokemon/${idOrName}`;
  return fetchJson<Pokemon>(url);
}

export async function getPokemonSprite(
  id: string,
): Promise<{ body: ArrayBuffer; contentType: string }> {
  let res = await mainFetch(`${SPRITE_OFFICIAL_BASE}/${id}.png`);
  if (!res.ok) {
    res = await mainFetch(`${SPRITE_DEFAULT_BASE}/${id}.png`);
  }
  if (!res.ok) {
    throw new Error(`Sprite not found: ${id}`);
  }
  const body = await res.arrayBuffer();
  const contentType = res.headers.get('Content-Type') || 'image/png';
  return { body, contentType };
}
