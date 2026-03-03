/**
 * Custom protocol pokemon-img: serves sprites via main process (optional proxy/cache).
 */

import { protocol } from 'electron';
import { getPokemonSprite } from '../services/api/pokemonApi';
import { PROTOCOL_SCHEME_SPRITE } from '../config/constants';

const spriteCache = new Map<string, { body: ArrayBuffer; contentType: string }>();

function parseSpriteId(requestUrl: string): string {
  const raw = requestUrl.replace(/^pokemon-img:\/\//, '').replace(/\/$/, '').trim();
  return /^\d+$/.test(raw) ? raw : '0';
}

export function registerSpriteProtocol(): void {
  protocol.handle(PROTOCOL_SCHEME_SPRITE, async (request: { url: string }) => {
    const id = parseSpriteId(request.url);
    const cached = spriteCache.get(id);
    if (cached) {
      return new Response(cached.body, {
        headers: { 'Content-Type': cached.contentType },
      });
    }
    try {
      const { body, contentType } = await getPokemonSprite(id);
      spriteCache.set(id, { body, contentType });
      return new Response(body, { headers: { 'Content-Type': contentType } });
    } catch {
      return new Response(null, { status: 404 });
    }
  });
}
