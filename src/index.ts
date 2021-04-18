

import { runBrowser } from '@aelea/core'
import { $Main } from './pages/$Main'


runBrowser({ rootNode: document.body })(
  $Main({})
)

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', {
    scope: '.'
  }).then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope)
  }, function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err)
  })
}

