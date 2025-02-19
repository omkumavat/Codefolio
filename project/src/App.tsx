import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ContestSection from './pages/ContestSection'
import LeetCode from './Profiles/LeetCode';
import CodeChef from './Profiles/CodeChef';
import NotFound from './components/NotFound';
import ProtectedRoute from './Context/ProtectedRoute';
import GeeksforGeeks from './Profiles/GeeksforGeeks';
import GitHub from './Profiles/GitHub';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Codeforces from './Profiles/codeforces';
import { useAuth } from './Context/AuthProvider';

// Create theme context
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

function App() {

  const {currentUser}=useAuth();
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
            {
              !currentUser ? (
                <Route path="/login" element={<Login />} />
              ) : (
                <Route path="/" element={<Home />} />
              )
            }
            
           {
             !currentUser && (
              <Route path="/signup" element={<Signup />} />
            )
           }
            <Route path="/about" element={<About />} />
            <Route
              path="/user/:username/leetcode"
              element={<ProtectedRoute><LeetCode /></ProtectedRoute>}
            />
            <Route
              path="/user/:username/codechef"
              element={<ProtectedRoute><CodeChef /></ProtectedRoute>}
            />
            <Route
              path="/user/:username/geeksforgeeks"
              element={<ProtectedRoute><GeeksforGeeks /></ProtectedRoute>}
            />
            <Route
              path="/user/:username/github"
              element={<ProtectedRoute><GitHub /></ProtectedRoute>}
            />
            <Route
              path="/user/:username"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route
              path="/user/:username/edit"
              element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
            />
            <Route
              path="/user/:username/codeforces"
              element={<ProtectedRoute><Codeforces /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeContext.Provider>
    // <ContestSection/>

  );
}

export default App;
