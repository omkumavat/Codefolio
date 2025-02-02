import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Users, Target, Rocket, Award, Star, TrendingUp, Brain, Zap, Trophy } from 'lucide-react';
import { useTheme } from '../App';
import ContestSection from './ContestSection';import Navbar from '../components/Navbar';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isDarkMode } = useTheme();

  return (
    <>
    <Navbar />
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen flex items-center justify-center text-white relative overflow-hidden ${
          isDarkMode ? 'bg-gray-100' : 'bg-gradient-to-br from-white-500'
        }`}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Tech Background"
            className={`w-full h-full object-cover ${isDarkMode ? 'opacity-1000' : 'opacity-100'}`}
          />
        </div>
       
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Unite Your Coding Journey
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8"
          >
            One platform to showcase all your competitive programming profiles
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-colors transform ${
              isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-black-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            Get Started
          </motion.button>
          
        </div >
      </motion.section>
      <div className="py-8">
      <ContestSection/>
      </div>
      
      {/* Platforms Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            className={`text-4xl font-bold text-center mb-16 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Supported Platforms
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "LeetCode",
                icon: <Code />,
                description: "Master algorithmic problems and prepare for technical interviews.",
                stats: [
                  { label: "Problems", value: "2200+" },
                  { label: "Active Users", value: "2M+" }
                ]
              },
              {
                title: "CodeForces",
                icon: <Trophy />,
                description: "Participate in competitive programming contests.",
                stats: [
                  { label: "Contests", value: "1000+" },
                  { label: "Global Rank", value: "Available" }
                ]
              },
              {
                title: "CodeChef",
                icon: <Brain />,
                description: "Join coding competitions and learn from a vibrant community.",
                stats: [
                  { label: "Monthly Contests", value: "3+" },
                  { label: "Difficulty Levels", value: "All" }
                ]
              },
              {
                title: "GeeksforGeeks",
                icon: <Brain />,
                description: "Join coding competitions and learn from a vibrant community.",
                stats: [
                  { label: "Monthly Contests", value: "3+" },
                  { label: "Difficulty Levels", value: "All" }
                ]
              },
              {
                title: "Github",
                icon: <Brain />,
                description: "Join coding competitions and learn from a vibrant community.",
                stats: [
                  { label: "Monthly Contests", value: "3+" },
                  { label: "Difficulty Levels", value: "All" }
                ]
              }
            ].map((platform, index) => (
              <PlatformCard key={index} {...platform} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            className={`text-4xl font-bold text-center mb-16 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Why Choose DevProfiles?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star />,
                title: "Unified Dashboard",
                description: "Access all your coding profiles in one place."
              },
              {
                icon: <TrendingUp />,
                title: "Progress Tracking",
                description: "Monitor your improvement across platforms."
              },
              {
                icon: <Users />,
                title: "Community Support",
                description: "Connect with fellow programmers."
              },
              {
                icon: <Zap />,
                title: "Career Growth",
                description: "Showcase your skills to potential employers."
              }
            ].map((benefit, index) => (
              <BenefitCard key={index} {...benefit} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-500 to-blue-600'
      }`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "100K+", label: "Problems Solved" },
              { value: "3", label: "Platforms" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-6 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gray-800 bg-opacity-50' 
                    : 'bg-white/10 backdrop-blur-sm'
                }`}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

const PlatformCard = ({ title, icon, description, stats, isDarkMode }: any) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      rotateY: 5,
      z: 50,
      boxShadow: "0 20px 30px rgba(0,0,0,0.2)"
    }}
    className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-100 transform ${
      isDarkMode 
        ? 'bg-gray-800 text-white border border-white' 
        : 'bg-white text-gray-900'
    }`}
  >
    <div className="text-blue-500 mb-4 text-3xl">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
      {description}
    </p>
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat: any, index: number) => (
        <div key={index} className="text-center">
          <div className="font-bold">{stat.value}</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);


const BenefitCard = ({ icon, title, description, isDarkMode }: any) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      z: 50
    }}
    className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 text-white border border-white' 
        : 'bg-gray-50 text-gray-900'
    }`}
  >
    <div className="text-blue-500 mb-4 text-3xl">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
  </motion.div>
);

export default Home;