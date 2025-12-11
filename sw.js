// Service Worker for AFOQT Study Console
// Provides offline caching and PWA functionality

const CACHE_NAME = 'afoqt-quest-v86';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './assets/libs/anime.min.js',
  './db.js',
  './patch-loader.js',
  './manifest.json',
  './Test Content/Patch_18.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - check version and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // First, check if new version is available
    fetch('./version-manifest.json', { cache: 'no-store' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Version manifest fetch failed');
      })
      .then((manifest) => {
        console.log('✓ Version manifest loaded:', manifest.cacheVersion);
        // Store the new version for comparison in app.js
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'VERSION_CHECK',
              manifest: manifest
            });
          });
        });
      })
      .catch((err) => {
        console.log('Version check failed (offline ok):', err);
      })
      .then(() => {
        // Clean up old caches
        return caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== CACHE_NAME) {
                console.log('Deleting old cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        });
      })
  );
  // Claim clients immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch((error) => {
          console.error('Fetch failed:', error);
          // Return offline page or cached version
          return caches.match('./index.html');
        });
      })
  );
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
