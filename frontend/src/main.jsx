import { StrictMode } from 'react'


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './context/authContext';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>


)
