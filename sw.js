// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  // e.waitUntil((async () => {
  //   const cache = await caches.open(cacheName)
  //   console.log('[Service Worker] Caching all: app shell and content')
  //   await cache.addAll(contentToCache)
  // })())
})

let deferredPrompt

self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
})


// testing installable app
self.addEventListener('fetch', function (event) {
  // event.respondWith(async function () {
  //   try {
  //     var res = await fetch(event.request)
  //     var cache = await caches.open('cache')
  //     cache.put(event.request.url, res.clone())
  //     return res
  //   }
  //   catch (error) {
  //     return caches.match(event.request)
  //   }
  // }())
})