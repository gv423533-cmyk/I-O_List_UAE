// Service worker — garante que o navegador reconheça o app como PWA
// instalável. Estratégia "rede primeiro": sempre busca a versão mais nova
// do app quando há internet, e só usa a cópia salva em cache como reserva
// se o dispositivo estiver offline. Isso evita o app "prender" numa versão
// antiga depois de uma atualização, como aconteceu antes com cache-first.

const CACHE_NAME = 'painel-canais-shell-v2';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Só intercepta requisições GET do próprio app (não do Firestore/Firebase,
  // que devem sempre ir direto pra rede para manter os dados em tempo real).
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Atualiza o cache com a versão mais nova sempre que consegue buscar na rede
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request)) // só usa cache se estiver offline
  );
});
