// Emergency minimal service worker: do not cache, simply forward requests
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  // Always attempt network first; do not serve cached index
  event.respondWith(fetch(event.request).catch(() => {
    // As a last resort return a minimal fallback page for navigation requests
    if (event.request.mode === 'navigate') {
      return new Response('<!doctype html><meta charset="utf-8"><title>Offline</title><body><p>Offline (no cache)</p></body>', {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    return new Response(null, { status: 503 });
  }));
});
