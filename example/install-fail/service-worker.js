const name = '[Worker]';

self.addEventListener('install', (event) => {
  console.log('%s Service Workerのinstallイベントが発生しました。', name, event);
  event.waitUntil(new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('%s インストール失敗。', name);
      reject('インストール失敗');
    }, 5000);
  }));
});
