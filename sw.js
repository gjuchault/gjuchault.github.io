self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwa').then(cache => {
      return cache.addAll([
        '/',
        '/dist/Lora-Bold.eot',
        '/dist/Lora-Bold.ttf',
        '/dist/Lora-Bold.woff',
        '/dist/Lora-Bold.woff2',
        '/dist/Lora-Italic.eot',
        '/dist/Lora-Italic.ttf',
        '/dist/Lora-Italic.woff',
        '/dist/Lora-Italic.woff2',
        '/dist/Lora-Regular.eot',
        '/dist/Lora-Regular.ttf',
        '/dist/Lora-Regular.woff',
        '/dist/Lora-Regular.woff2',
        '/dist/SourceSansPro-ExtraLight.eot',
        '/dist/SourceSansPro-ExtraLight.ttf',
        '/dist/SourceSansPro-ExtraLight.woff',
        '/dist/SourceSansPro-ExtraLight.woff2',
        '/dist/SourceSansPro-Regular.eot',
        '/dist/SourceSansPro-Regular.ttf',
        '/dist/SourceSansPro-Regular.woff',
        '/dist/SourceSansPro-Regular.woff2',
        '/dist/build.js',
        '/dist/build.js.map',
        '/dist/icomoon.eot',
        '/dist/icomoon.svg',
        '/dist/icomoon.ttf',
        '/dist/icomoon.woff',
        '/dist/arena.png',
        '/dist/bot1.png',
        '/dist/bot2.png',
        '/dist/bot3.png',
        '/dist/buckutt.png',
        '/dist/enseack.png',
        '/dist/githubTravisCoveralls.png',
        '/dist/luis1.png',
        '/dist/luis2.png',
        '/dist/luis3.png',
        '/dist/nextio.png',
        '/dist/nf04.png',
        '/dist/pathfindingjs.png',
        '/dist/placehold.png',
        '/dist/schedulerjs.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
