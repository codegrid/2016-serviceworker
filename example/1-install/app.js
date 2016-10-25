const name = '[Browser]';

if ('serviceWorker' in navigator) {
  console.log('%s Service Workerに対応しています。', name);

  const options = {
    scope: './'
  };

  navigator.serviceWorker.register('./service-worker.js', options)
    .then((registration) => {
      console.log('%s Service Workerが登録されました。', name, registration);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.warn('%s Service Workerに対応していません。', name);
}
