/**
 * Preload: exposes safe API to renderer via contextBridge (IPC only).
 */

import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from './ipc/channels';

contextBridge.exposeInMainWorld('electronAPI', {
  fetchPokemonList: (offset: number, limit: number) =>
    ipcRenderer.invoke(IPC_CHANNELS.POKEMON_LIST, offset, limit),
  fetchPokemon: (idOrName: string | number) =>
    ipcRenderer.invoke(IPC_CHANNELS.POKEMON_DETAIL, idOrName),
});
