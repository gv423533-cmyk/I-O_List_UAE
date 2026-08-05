// Service worker mínimo — garante que o navegador reconheça o app como PWA
// instalável. Não faz cache agressivo de dados (o Firestore já cuida de
// sincronização e cache local dos dados via sua própria persistência),
// só armazena o "casco" estático do app para abrir mais rápido offline.

const CACHE_NAME = 'painel-canais-shell-v1';
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
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
