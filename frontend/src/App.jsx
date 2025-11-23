import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import InterviewPage from './pages/InterviewPage'
import ReportsPage from './pages/ReportsPage'
import FAQPage from './pages/FAQPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
