/* Missão Qualidade 2026 · cache local e atualização online segura (v6).
   Conteúdo do evento: nunca é enviado a servidores; dados ficam em localStorage.
*/
const CACHE_NAME = 'missao-qualidade-salum-vale-v6-html-online-first';
const APP_SCOPE = self.registration.scope;
const HOME = new URL('./index.html', APP_SCOPE).href;
const SHELL = [
  HOME,
  new URL('./manifest.webmanifest', APP_SCOPE).href,
  new URL('./icon.svg', APP_SCOPE).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Bypass do cache HTTP: a instalação deve guardar a edição atual.
    await cache.addAll(SHELL.map(url => new Request(url, {cache:'reload'})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Remove caches anteriores do jogo sem tocar no localStorage (prêmios/tickets).
    await Promise.all(keys
      .filter(key => key.startsWith('missao-qualidade-salum-vale-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(APP_SCOPE).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);
      try {
        // ONLINE: nunca devolver HTML antigo sem tentar buscar a versão publicada.
        const latest = await fetch(request, {cache:'no-store', signal:controller.signal});
        if (latest.ok) {
          await cache.put(HOME, latest.clone());
          return latest;
        }
        throw new Error('HTTP ' + latest.status);
      } catch (_) {
        // OFFLINE ou rede ruim: conserva a última versão funcional.
        const offline = await cache.match(HOME);
        if (offline) return offline;
        return Response.error();
      } finally {
        clearTimeout(timeout);
      }
    })());
    return;
  }

  // Recursos estáticos: cache local primeiro, rede somente se faltar.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
