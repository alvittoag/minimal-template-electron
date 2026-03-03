/**
 * Content Security Policy: allow external images (img-src https:) and custom protocol.
 */

import { session } from 'electron';

export function setContentSecurityPolicy(): void {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.resourceType !== 'mainFrame') {
      callback({ responseHeaders: details.responseHeaders });
      return;
    }
    const cspHeader =
      details.responseHeaders['Content-Security-Policy']?.[0] ||
      details.responseHeaders['content-security-policy']?.[0] ||
      "default-src 'self' 'unsafe-inline' data:";
    const imgDirective = "img-src 'self' data: pokemon-img: https:";
    const newCsp = cspHeader.includes('img-src')
      ? cspHeader
      : `${cspHeader}; ${imgDirective}`;
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [newCsp],
      },
    });
  });
}
