// Service Worker for AFOQT Study Console
// Provides offline caching and PWA functionality

const CACHE_NAME = 'afoqt-quest-v111';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './assets/libs/anime.min.js',
  './db.js',
  './patch-loader.js',
  './manifest.json',
  './Test Content/patches/Patch_18.json',
  './Test Content/patches/Patch_19.json',
  './Test Content/patches/Patch_20.json',
  './Test Content/patches/Patch_21.json',
  './Test Content/patches/Patch_22.json',
  './Test Content/patches/patch_23_physical_science_topic_framework.json',
  './Test Content/patches/patch_24.json',
  './Test Content/full_afoqt_practice_test_config_v1.json',
  './Test Content/table_reading_table_component_spec.json',
  './Test Content/Table Reading/table_reading_beginner_part1.json',
  './Test Content/Table Reading/table_reading_beginner_part2.json',
  './Test Content/Table Reading/table_reading_advanced_part1.json',
  './Test Content/Table Reading/table_reading_advanced_part2.json',
  './Test Content/Table Reading/table_reading_expert_part1.json',
  './Test Content/Table Reading/table_reading_expert_part2.json'
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
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Special handling for Test Content JSON files - cache-first with network update
  if (url.pathname.includes('/Test Content/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Always try to fetch from network for updates
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              // Update cache with fresh content
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Network failed - return cached if available, otherwise throw
            if (cachedResponse) {
              return cachedResponse;
            }
            throw new Error('No network and no cached response available');
          });
          
          // Return cached immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      }).catch((error) => {
        console.error('Failed to serve JSON content for', url.pathname, ':', error);
        // Return a basic error response with specific URL
        return new Response(JSON.stringify({ 
          error: 'Content unavailable',
          url: url.pathname 
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }
  
  // Standard cache-first strategy for other resources
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
