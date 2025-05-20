import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import UserProvider from './Context/userContex.jsx'
import GoalsContext from './Context/goalsContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline>
      <UserProvider>
        <GoalsContext>
          <App />
          <Toaster />
        </GoalsContext>
      </UserProvider>
    </CssBaseline>
  </StrictMode>,
)
