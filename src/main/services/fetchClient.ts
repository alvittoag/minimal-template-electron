/**
 * Main-process HTTP client (electron-fetch).
 * Single client for all external HTTP; use in services only.
 */

import electronFetch, {
  type RequestInit as ElectronFetchInit,
  type Response as ElectronFetchResponse,
} from 'electron-fetch';

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export interface FetchClientOptions {
  timeout?: number;
  headers?: Record<string, string>;
  useElectronNet?: boolean;
}

export type FetchClient = (url: string, init?: ElectronFetchInit) => Promise<ElectronFetchResponse>;

export function createFetchClient(options: FetchClientOptions = {}): FetchClient {
  const {
    timeout = DEFAULT_TIMEOUT_MS,
    headers = {},
    useElectronNet = true,
  } = options;
  const defaultHeaders = { ...DEFAULT_HEADERS, ...headers };

  return (url: string, init?: ElectronFetchInit) => {
    const mergedHeaders = { ...defaultHeaders, ...(init?.headers as Record<string, string>) };
    return electronFetch(url, {
      ...init,
      headers: mergedHeaders,
      timeout,
      useElectronNet,
    });
  };
}

export const mainFetch = createFetchClient();

export async function fetchJson<T>(url: string, client: FetchClient = mainFetch): Promise<T> {
  const res = await client(url);
  if (!res.ok) {
    const text = await res.text();
    const suffix = text ? ` - ${text.slice(0, 200)}` : '';
    throw new Error(`HTTP ${res.status}: ${res.statusText}${suffix}`);
  }
  return res.json();
}
