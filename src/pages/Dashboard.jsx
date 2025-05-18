import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  FileText, 
  LogOut, 
  Upload,
  PieChart,
  Calendar,
  Users,
  Bell,
  Code
} from 'lucide-react';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lectureAttendance: 85,
    completedAssignments: 12,
    totalAssignments: 15,
    upcomingClasses: 3
  });

  const progressVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 }
  };

  const menuItems = [
    {
      title: "Assignments",
      icon: <FileText className="w-6 h-6" />,
      onClick: () => navigate('/assignments'),
      color: "bg-blue-500"
    },
    {
      title: "Lectures",
      icon: <BookOpen className="w-6 h-6" />,
      onClick: () => navigate('/lectures'),
      color: "bg-indigo-500"
    },
    {
      title: "Schedule",
      icon: <Calendar className="w-6 h-6" />,
      onClick: () => {},
      color: "bg-green-500"
    },
    {
      title: "Classmates",
      icon: <Users className="w-6 h-6" />,
      onClick: () => navigate('/classmates'),
      color: "bg-purple-500"
    },
    {
      title: "Playground",
      icon: <Code className="w-6 h-6" />,
      onClick: () => window.open('https://my.newtonschool.co/playground/code/v0e8brt91ipl', '_blank'),
      color: "bg-orange-500"
    },
    {
      title: "Notifications",
      icon: <Bell className="w-6 h-6" />,
      onClick: () => {},
      color: "bg-yellow-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">NextClasses</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your courses today.</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.onClick}
              className={`p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2 ${item.color} text-white`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <motion.div
            className="card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Lecture Attendance</h3>
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {stats.lectureAttendance}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <motion.div
                  style={{ width: `${stats.lectureAttendance}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  initial="hidden"
                  animate="visible"
                  variants={progressVariants}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Assignments Card */}
          <motion.div
            className="card"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/assignments')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Assignments</h3>
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.completedAssignments}/{stats.totalAssignments}
            </div>
            <p className="text-gray-600 mt-2">Completed assignments</p>
          </motion.div>

          {/* Upcoming Classes Card */}
          <motion.div
            className="card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.upcomingClasses}
            </div>
            <p className="text-gray-600 mt-2">Classes today</p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}

export default Dashboard;