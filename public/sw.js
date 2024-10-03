
const CACHE_NAME = 'appShell8';
const DYNAMIC_CACHE = 'dinamico-v1';
const urlsToCache = [
  '/img/musho.jpg',
  '/',
  '/css/style.css',
  '/img/error.jpg'
];

// Instalación del Service Worker y cacheo de los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting(); // Activa inmediatamente el SW sin esperar
      })
      .catch(error => {
        console.error('Error al cachear los recursos durante la instalación:', error);
      })
  );
});

// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      return self.clients.claim(); // Toma el control de las páginas lo antes posible
    })
  );
});

// Interceptar solicitudes y manejar el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(respuesta => {
        if (!respuesta || respuesta.status !== 200 || respuesta.type !== 'basic') {
          return respuesta;
        }

        // Clonar la respuesta
        const respuestaClonada = respuesta.clone();

        // Abrir el caché dinámico y almacenar la respuesta
        caches.open(DYNAMIC_CACHE)
          .then(cache => {
            cache.put(event.request, respuestaClonada);
          });

        return respuesta;
      })
      .catch(() => {
        // Si la red falla, intentar obtener del caché
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            } else {
              // Retornar la imagen de error para solicitudes de imágenes
              if (event.request.destination === 'image') {
                return caches.match('/img/error.jpg');
              }
              // Para otras solicitudes, podrías retornar una página de error personalizada
              return caches.match('/');
            }
          });
      })
  );
});
