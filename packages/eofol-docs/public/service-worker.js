const CACHE_NAME = "cache";
const CACHE_VERSION = "v1";

const urlsToCache = ["index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(`${CACHE_NAME}-${CACHE_VERSION}`)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
