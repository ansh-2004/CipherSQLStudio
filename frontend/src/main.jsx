import { StrictMode } from 'react'
import ReactDOM ,{ createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
