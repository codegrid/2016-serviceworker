const name = '[Worker]';
const cacheName = 'update-cache-response-v1';
const currentCacheNames = [
  cacheName
];
const urlsToCache = [
  './',
  './index.html',
  './app-v1.js',
  './logo-cache-v1.svg'
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

self.addEventListener('activate', (event) => {
  console.log('%s Service Workerのactivateイベントが発生しました。', name, event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const promises = cacheNames.map(cacheName => {
        if (currentCacheNames.indexOf(cacheName) === -1) {
          console.log('%s Cacheオブジェクト [%s] を削除します。', name, cacheName);
          return caches.delete(cacheName);
        }
      });
      return Promise.all(promises);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('%s Service Workerのfetchイベントが発生しました。 [%s]', name, event.request.url, event);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('%s キャッシュが見つかりました。 [%s]', name, response.url, response);
          return response;
        }
        console.log('%s キャッシュが見つかりませんでした。 [%s]', name, event.request.url);
        return fetch(event.request);
      })
  );
});
