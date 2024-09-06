import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Helmet } from 'react-helmet'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Helmet>
        <title>Didomi Project</title>
        <meta
          name="description"
          content="This is app where user fills the consent form and see the collected consents in the table."
        />
      </Helmet>
      <App />
    </React.StrictMode>
  )
})

reportWebVitals(console.log) // log the performance metrics to the console
