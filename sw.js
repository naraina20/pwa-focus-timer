// ✅ PWA Timer Service Worker with Offline Cache + Notifications

const CACHE_NAME = 'pwa-timer-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/ringtone.wav',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];


// Install event – cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate event – clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  event.waitUntil(self.clients.claim());
});

// Fetch event – serve from cache or fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        }).catch(() => caches.match('/index.html'))
      );
    })
  );
});

// Handle postMessage to show notifications
self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'show-notification') {
    const title = data.title || 'PWA Timer';
    const body = data.body || '';
    self.registration.showNotification(title, {
      body,
      tag: 'pwa-timer',
      renotify: true,
      actions: [
        { action: 'snooze', title: 'Snooze 1m' },
        { action: 'stop', title: 'Stop' }
      ]
    });
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  const action = event.action;
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) {
        clientList[0].focus();
        clientList[0].postMessage({ type: 'notification-action', action });
      } else {
        clients.openWindow('/').then(win => {
          // Optional: send message after open
        });
      }
    })
  );
});
