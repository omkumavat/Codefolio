import React,{useState,createContext,useContext,useEffect} from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import CompareCandidate from "./pages/CompareCandidate"
import ComparisonResultPage from "./components/CompareCandidates/ComparisonResultPage"
import AllCoders from "./pages/AllCoders"


export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

function App() {

    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("isDarkMode")
      return savedTheme ? JSON.parse(savedTheme) : false
    })
  
    // Update localStorage whenever isDarkMode changes
    useEffect(() => {
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))
      document.documentElement.classList.toggle("dark", isDarkMode)
    }, [isDarkMode])
  
    const toggleTheme = () => {
      console.log(isDarkMode);
      setIsDarkMode(prev => !prev)
    }
  

  return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="all-coders" element={<AllCoders />} />
          <Route path="compare" element={<CompareCandidate />} />
          <Route path="compare/result/:username1/:username2" element={<ComparisonResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
