import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useTheme } from "../App"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "../Context/AuthProvider"

const GitHubModal1 = ({ isModalOpen, setToast, setIsModalOpen }) => {
  const { currentUser } = useAuth()
  const { isDarkMode } = useTheme()
  const [username, setUsername] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [notValid, setNotValid] = useState("")
  const [iShow, setIsShow] = useState(false)

  const handleVerify = async () => {
    setNotValid("")
    setIsShow(true)
    if (username.trim() === "") {
      setNotValid("Please enter a valid username.")
      setIsShow(false)
      setToast({
        success: false,
        text: "Please enter a valid username."
      })
      return
    }

    setToast({
      success: true,
      text: "Verifying your GitHub account..."
    })
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/github/add-github-basics/`,
        {
          username: username,
          email: currentUser?.email
        }
      )
      if (response.data.success) {
        setToast({
          success: true,
          text: "Your GitHub account has been successfully verified."
        })
        setIsModalOpen(false)
        window.location.reload()
      } else {
        setIsShow(false)
        setToast({
          success: false,
          text: "Failed to verify your GitHub account. Please try again later."
        })
      }
    } catch (error) {
      setIsShow(false)
      setToast({
        success: false,
        text: "Failed to verify your GitHub account. Please try again later."
      })
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute right-4 top-4 p-1 rounded-full ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </button>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Add GitHub Account
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    GitHub Username
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your username"
                      disabled={isVerifying}
                    />
                    {iShow ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      <button
                        onClick={handleVerify}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isVerifying}
                      >
                        {isVerifying ? "Verifying..." : "Verify"}
                      </button>
                    )}
                  </div>
                  {notValid && (
                    <p className="text-red-500 text-sm mt-2">{notValid}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default GitHubModal1
