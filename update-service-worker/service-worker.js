const name = '[Worker]';

self.addEventListener('install', (event) => {
  console.log('%s インストール完了。', name);
});
