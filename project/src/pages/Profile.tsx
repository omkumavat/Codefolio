import React from 'react';
import { 
  Github, 
  MapPin, 
  Briefcase, 
  LinkedinIcon, 
  ChevronRight,
  Trophy,
  Calendar,
  Code,
  GitFork
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Profile() {
  const { isDarkMode } = useTheme();

  const platforms = [
    { 
      name: 'LeetCode',
      solved: 245,
      totalSubmissions: 542,
      rating: 1850,
      logo: '🔷',
      ratingHistory: [1600, 1650, 1720, 1780, 1850]
    },
    { 
      name: 'GeeksForGeeks',
      solved: 189,
      totalSubmissions: 412,
      rating: 1650,
      logo: '🟢',
      ratingHistory: [1400, 1480, 1550, 1600, 1650]
    },
    {
      name: 'CodeForces',
      solved: 156,
      totalSubmissions: 389,
      rating: 1450,
      logo: '🔴',
      ratingHistory: [1200, 1280, 1350, 1400, 1450]
    },
    {
      name: 'CodeChef',
      solved: 134,
      totalSubmissions: 298,
      rating: 1750,
      logo: '👨‍🍳',
      ratingHistory: [1500, 1580, 1650, 1700, 1750]
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: platforms.map(platform => ({
      label: platform.name,
      data: platform.ratingHistory,
      borderColor: 
        platform.name === 'LeetCode'
          ? '#60A5FA'
          : platform.name === 'GeeksForGeeks'
          ? '#34D399'
          : platform.name === 'CodeForces'
          ? '#F87171'
          : '#A78BFA',
      tension: 0.4
    }))
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#fff' : '#1F2937'
        }
      },
      title: {
        display: true,
        text: 'Rating Progress Across Platforms',
        color: isDarkMode ? '#fff' : '#1F2937'
      }
    },
    scales: {
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#1F2937'
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#1F2937'
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen mt-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute -inset-[100%] opacity-50 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20'
                : 'bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100'
            } blur-3xl animate-[move_20s_linear_infinite] transform -translate-x-full`}
          ></div>
          <div
            className={`absolute -inset-[100%] opacity-50 ${
              isDarkMode
                ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20'
                : 'bg-gradient-to-r from-indigo-100 via-blue-100 to-sky-100'
            } blur-3xl animate-[move_20s_linear_infinite_reverse] transform translate-x-full`}
          ></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-8">
          {/* On mobile, the layout stacks: Sidebar then Main Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-64 mb-8 lg:mb-0">
              <div
                className={`p-6 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60"
                      alt="Profile"
                      className="rounded-full w-full h-full object-cover border-4 border-sky-500 transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    John Doe
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    @johndoe
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                      size={18}
                    />
                    <span
                      className={isDarkMode ? 'text-white' : 'text-gray-800'}
                    >
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                      size={18}
                    />
                    <span
                      className={isDarkMode ? 'text-white' : 'text-gray-800'}
                    >
                      Software Engineer
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LinkedinIcon
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                      size={18}
                    />
                    <a
                      href="#"
                      className="text-sky-500 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                      size={18}
                    />
                    <a
                      href="#"
                      className="text-sky-500 hover:underline"
                    >
                      Github Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 lg:ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div
                  className={`p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800/50 backdrop-blur-sm'
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      Average Rating
                    </h3>
                    <Trophy className="text-yellow-500" />
                  </div>
                  <p
                    className={`text-3xl font-bold mt-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    1,675
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800/50 backdrop-blur-sm'
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      Active Days
                    </h3>
                    <Calendar className="text-sky-500" />
                  </div>
                  <p
                    className={`text-3xl font-bold mt-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    156
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800/50 backdrop-blur-sm'
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      Total Solved
                    </h3>
                    <Code className="text-green-500" />
                  </div>
                  <p
                    className={`text-3xl font-bold mt-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    724
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800/50 backdrop-blur-sm'
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      Contributions
                    </h3>
                    <GitFork className="text-purple-500" />
                  </div>
                  <p
                    className={`text-3xl font-bold mt-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    1.2k
                  </p>
                </div>
              </div>

              {/* Rating Graph */}
              <div
                className={`mb-8 p-6 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-800/50 backdrop-blur-sm'
                    : 'bg-white shadow-lg'
                }`}
              >
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Platform Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gray-800/50 backdrop-blur-sm'
                        : 'bg-white shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{platform.logo}</span>
                        <h3
                          className={`text-xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {platform.name}
                        </h3>
                      </div>
                      <ChevronRight
                        className={
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p
                          className={
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }
                        >
                          Problems Solved
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {platform.solved}
                        </p>
                      </div>
                      <div>
                        <p
                          className={
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }
                        >
                          Submissions
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {platform.totalSubmissions}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p
                          className={
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }
                        >
                          Rating
                        </p>
                        <p className="text-2xl font-bold text-sky-500">
                          {platform.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
