import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import MobileScanner from './MobileScanner.tsx'
import AttendanceLog from './AttendanceLog.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mobile" element={<MobileScanner />} />
        <Route path="/logs" element={<AttendanceLog />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)