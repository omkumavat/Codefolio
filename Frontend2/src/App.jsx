import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import CompareCandidate from "./pages/CompareCandidate"
import ComparisonResultPage from "./components/CompareCandidates/ComparisonResultPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="compare" element={<CompareCandidate />} />
          <Route path="compare/result/:username1/:username2" element={<ComparisonResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
