const name = '[Worker]';

self.addEventListener('install', (event) => {
  console.log('%s Service Workerのinstallイベントが発生しました。', name, event);
});
