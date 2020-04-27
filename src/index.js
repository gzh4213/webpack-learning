console.log('hello')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      console.log('service-worker registed')
    }).catch(err => {
      console.log('service-worker register error')
    })
}