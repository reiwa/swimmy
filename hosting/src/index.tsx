import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './firebase/initializeApp'
import './index.css'
import { register } from './serviceWorker'

render(<App />, document.getElementById('root'))

register({
  onUpdate(registration) {
    if (!registration.waiting) return

    registration.waiting.addEventListener('statechange', listener)

    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  },
})

const listener = async (
  event: Event & {
    target: (Partial<ServiceWorker> & EventTarget) | null
  }
) => {
  if (!event.target || event.target.state !== 'activated') return

  window.location.reload()
}

if (module.hot) {
  module.hot.accept()
}
