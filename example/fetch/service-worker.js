const name = '[Worker]';

self.addEventListener('fetch', event => {
  console.log('%s fetchイベントが発生しました。', name, event);
  const res = Response.error(404);
  console.log(res);
  event.respondWith(res);
});
