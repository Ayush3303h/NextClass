import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  FileText, 
  LogOut, 
  Upload,
  PieChart
} from 'lucide-react';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [stats, setStats] = useState({
    lectureAttendance: 85,
    completedAssignments: 12,
    totalAssignments: 15
  });

  const progressVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 }
  };

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
            <span className="text-xl font-bold">EduTech</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Upload Assignment Card */}
          <motion.div
            className="card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Assignment</h3>
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <label className="flex flex-col items-center px-4 py-6 bg-blue-50 text-blue rounded-lg tracking-wide border border-blue-200 cursor-pointer hover:bg-blue-100">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z" />
              </svg>
              <span className="mt-2 text-sm text-gray-600">Select a file</span>
              <input type='file' className="hidden" />
            </label>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}

export default Dashboard;