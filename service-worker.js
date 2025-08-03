const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/style2.css",
  "/index.js",
  "/favicon.ico",
  "/manifest.json",
  "/images/Group 2345.png",
  "/images/Group 2372.png",
  "/images/Group 62.png"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
