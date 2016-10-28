const name = '[Worker]';
const cacheName = 'v1';
const urlsToCache = [
  '/4-install-and-cache'
];

self.addEventListener('install', (event) => {
  console.log('%s Service Workerのinstallイベントが発生しました。', name, event);
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('%s Cacheオブジェクトを取得しました。', name);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('%s ファイルのキャッシュが完了しました。', name);
      })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('%s Service Workerのfetchイベントが発生しました。', name, event);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
