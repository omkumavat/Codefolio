import React from "react"
import { Activity, Users, Code2, GitPullRequest } from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Candidates",
      value: "156",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Comparisons",
      value: "12",
      icon: Activity,
      color: "bg-green-500"
    },
    { title: "Code Reviews", value: "48", icon: Code2, color: "bg-purple-500" },
    {
      title: "Pending Reviews",
      value: "8",
      icon: GitPullRequest,
      color: "bg-yellow-500"
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
