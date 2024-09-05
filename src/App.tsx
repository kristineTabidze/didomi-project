import { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { Sidebar } from './components/Sidebar'
import { ConsentForm } from './pages/ConsentForm'
const CollectedConsents = lazy(() => import('./pages/CollectedConsents')) // INFO: We don't have many data right now to use lazy loading but it will be useful in the future. When app increases we can also use react-virtualized for only visible rows in the table

const App = () => {
  return (
    <Router>
      <div className="grid grid-cols-[1fr_3fr]">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/give-consent" />} />{' '}
          <Route path="/give-consent" element={<ConsentForm />} />
          <Route
            path="/consents"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <CollectedConsents />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
