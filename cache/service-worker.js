const name = '[Worker]';
const cacheName = 'cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js'
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
