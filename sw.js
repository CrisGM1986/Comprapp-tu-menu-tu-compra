const CACHE='comprapp-shell-v2';
const FILES=['./','index.html','styles.css','recipes.js','app.js','features.js','manifest.webmanifest','assets/icon.svg','assets/captura-arroz.png','assets/captura-platos.png','assets/captura-cenas.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('comprapp-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request))) });
