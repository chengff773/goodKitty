import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entry from './components/entry'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Entry />
  </StrictMode>,
)
