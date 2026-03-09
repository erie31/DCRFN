const CACHE_NAME = 'rfn-calculator-v2';
const ASSETS = [
    'index.html',
    'styles.css',
    'app.js',
    'data.js',
    'manifest.json',
    'https://fonts.googleapis.com/css2?family=MedievalSharp&family=Metamorphous&family=Outfit:wght@300;400;600&display=swap',
    'https://www.transparenttextures.com/patterns/dark-leather.png',
    'https://www.transparenttextures.com/patterns/textured-paper.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
            );
        })
    );
});

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
