self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fidorla-v18').then(cache => {
      return cache.addAll(['./', './index.html', './manifest.json']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
