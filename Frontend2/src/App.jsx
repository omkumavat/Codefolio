import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import CompareCandidate from "./pages/CompareCandidate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="compare" element={<CompareCandidate />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
