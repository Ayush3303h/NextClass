import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Classmates = () => {
  const navigate = useNavigate();
  const [classmateEmails, setClassmateEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data - replace with actual fetch from your backend
  const dummyEmails = [
    'student1@example.com',
    'student2@example.com',
    'student3@example.com',
    'student4@example.com',
    'student5@example.com',
  ];

  useEffect(() => {
    // In a real application, you would fetch the list of user emails from your backend here.
    // The backend would use the Firebase Admin SDK to list users.
    // Example placeholder for fetching:
    /*
    const fetchClassmateEmails = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/listUsers'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setClassmateEmails(data.emails); // Assuming your API returns an object with an 'emails' array
      } catch (err) {
        setError(err.message);
        console.error('Error fetching classmates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClassmateEmails();
    */

    // Using dummy data for now
    const loadDummyEmails = () => {
      setLoading(true);
      setTimeout(() => {
        setClassmateEmails(dummyEmails);
        setLoading(false);
      }, 500); // Simulate network delay
    };

    loadDummyEmails();

  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">Classmates</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Classmates</h1>
          <p className="text-gray-600 mt-2">List of registered classmates.</p>
        </motion.div>

        {/* Back Button */}
         <button
          onClick={handleBackToDashboard}
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" />
          Back to Dashboard
        </button>

        {/* Classmates List */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
        >
          {loading && <p className="text-gray-600">Loading classmates...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && classmateEmails.length === 0 && (
            <p className="text-gray-600">No classmates found.</p>
          )}
          {!loading && !error && classmateEmails.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {classmateEmails.map((email, index) => (
                <li key={index} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{email}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Classmates; 