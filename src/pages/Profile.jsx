import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      {/* Cover Photo */}
      <motion.div
        className="w-full h-56 bg-gradient-to-r from-blue-500 to-purple-600 relative"
        initial={{ height: 0 }}
        animate={{ height: '14rem' }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
          {/* Avatar */}
          <motion.img
            src={`https://ui-avatars.com/api/?name=${currentUser?.email?.charAt(0).toUpperCase()}`}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
          />
        </div>
      </motion.div>
      {/* Profile Info */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {currentUser?.email?.split('@')[0] || 'User'}
        </h2>
        <p className="text-gray-500 mb-6">{currentUser?.email}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg text-lg transition-all hover:bg-blue-700"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Profile; 