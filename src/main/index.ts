/**
 * Main process entry. App lifecycle, window, IPC, protocols, CSP.
 */

import { app, BrowserWindow, protocol } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import { PROTOCOL_SCHEME_SPRITE } from './config/constants';
import { registerIpcHandlers } from './ipc/handlers';
import { setContentSecurityPolicy } from './lib/csp';
import { registerSpriteProtocol } from './protocols/sprite';

protocol.registerSchemesAsPrivileged([
  { scheme: PROTOCOL_SCHEME_SPRITE, privileges: { standard: true, secure: true } },
]);

if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
  setContentSecurityPolicy();
  registerIpcHandlers();
  registerSpriteProtocol();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
