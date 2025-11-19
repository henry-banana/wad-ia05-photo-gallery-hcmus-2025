import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css' // Quan trọng: Đảm bảo import CSS có Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode có thể khiến useEffect chạy 2 lần ở dev mode (không sao cả)
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)