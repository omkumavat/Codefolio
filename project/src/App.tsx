import  { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ContestSection from './pages/ContestSection'
import LeetCode from './Profiles/LeetCode';

// Create theme context
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
          <main className="flex-grow pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:username/leetcode" element={<LeetCode />} />
            </Routes>
          </main>
        </div>
    </ThemeContext.Provider>
    

  );
}
          {/* // <Loader/>
    // <ContestSection/> */}

   

          export default App;
