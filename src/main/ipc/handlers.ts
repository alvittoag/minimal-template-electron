/** Registers all IPC handlers; call once from main entry. */

import { ipcMain } from 'electron';
import { getPokemonDetail, getPokemonList } from '../services/api/pokemonApi';
import { IPC_CHANNELS } from './channels';

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.POKEMON_LIST, async (_event, offset: number, limit: number) => {
    return getPokemonList(offset, limit);
  });

  ipcMain.handle(IPC_CHANNELS.POKEMON_DETAIL, async (_event, idOrName: string | number) => {
    return getPokemonDetail(idOrName);
  });
}
