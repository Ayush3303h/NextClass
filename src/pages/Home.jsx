import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <motion.h1
        className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to EduTech
      </motion.h1>
      <motion.p
        className="text-xl text-white/80 mb-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Your modern learning companion
      </motion.p>
      <div className="flex gap-4">
        {currentUser ? (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg text-lg transition-all hover:bg-blue-100"
            onClick={() => navigate('/profile')}
          >
            Go to Profile
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg text-lg transition-all hover:bg-blue-100"
            onClick={() => navigate('/login')}
          >
            Get Started
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default Home; 