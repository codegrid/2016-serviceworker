const name = '[Worker]';

self.addEventListener('install', (event) => {
  console.log('%s Service Workerのinstallイベントが発生しました。', name, event);
  event.waitUntil(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('インストール成功');
    }, 5000);
  }));
});
