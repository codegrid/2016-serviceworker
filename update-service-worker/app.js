const name = '[Browser]';

if ('serviceWorker' in navigator) {
  const options = {
    scope: './'
  };

  navigator.serviceWorker.register('./service-worker.js', options)
    .then(registration => {

      registration.addEventListener('updatefound', (event) => {
        console.info('%s Service Workerの更新を検知しました。', name, event);
      });

      let serviceWorker;

      if (registration.installing) {
        serviceWorker = registration.installing;
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
      } else if (registration.active) {
        serviceWorker = registration.active;
      }

      if (serviceWorker) {
        console.log('%s Service Workerは [%s] 状態です。', name, serviceWorker.state);
        serviceWorker.addEventListener('statechange', (event) => {
          console.log('%s Service Workerが [%s] 状態に遷移しました。', name, event.target.state);
        });
      }
    })
    .catch(error => {
      console.error('%s Service Workerの登録に失敗しました。', name, error);
    });
} else {
  console.warn('%s Service Workerに対応していません。', name);
}
