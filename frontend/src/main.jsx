import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { startBookingRetryManager } from './services/bookingRetryService'

// Start the booking retry manager on app initialization
startBookingRetryManager()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
