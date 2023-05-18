import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthenticationProvider} from './hooks/authentication'
import router from './router'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationProvider router={router}>
    <RouterProvider router={router} />
    </AuthenticationProvider>
  </React.StrictMode>,
)