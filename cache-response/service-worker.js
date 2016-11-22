const name = '[Worker]';
const cacheName = 'v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './logo-cache.svg'
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
