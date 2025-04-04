import React, { useState } from "react"
import { LogOut, Menu, ChevronDown, ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const showBackButton = location.pathname !== "/dashboard"

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 "
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-indigo-600">CodeVerse - Dashboard</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-semibold">C</span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    /* Handle logout */
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-red-500">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
