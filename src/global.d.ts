/**
 * Type for Electron API exposed via preload (contextBridge).
 */

export interface ElectronAPI {
  fetchPokemonList: (offset: number, limit: number) => Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }>;
  fetchPokemon: (idOrName: string | number) => Promise<unknown>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
