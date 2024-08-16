import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/Route.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
// import AuthProvider from './Providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <AuthProvider> */}
   <AuthProvider>
   <RouterProvider router={routes} />
   </AuthProvider>
   {/* </AuthProvider> */}
  </StrictMode>,
)
