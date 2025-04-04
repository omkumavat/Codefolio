import React from "react"
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings
} from "lucide-react"

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/compare", icon: BarChart2, label: "Compare Candidates" },
    { path: "/dashboard/candidates", icon: Users, label: "Candidates" },
    { path: "/dashboard/settings", icon: Settings, label: "Settings" }
  ]

  return (
<aside
  className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 overflow-hidden ${
    isOpen ? "w-64" : "w-0"
  }`}
>
  <div className="py-4">
    {menuItems.map(item => (
      <NavLink
        key={item.path}
        to={item.path}
        end
        className={({ isActive }) =>
          `flex items-center px-4 py-3 ${
            isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
          }${isActive && !isOpen && " py-0"}`
        }
      >
        <item.icon className="h-5 w-5" />
        <span className={`ml-4 ${!isOpen && "hidden"}`}>{item.label}</span>
      </NavLink>
    ))}
  </div>
</aside>

  )
}

export default Sidebar
