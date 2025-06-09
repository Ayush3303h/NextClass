import React, { useState, useEffect, useRef } from 'react';
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
  Code,
  Video,
  X,
  MessageSquare,
  Users as UsersIcon,
  Maximize2,
  Minimize2,
  FileUp,
  CheckCircle,
  Clock
} from 'lucide-react';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lectureAttendance: 85,
    completedAssignments: 12,
    totalAssignments: 15,
    upcomingClasses: 1
  });
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [isInstructor] = useState(true); // This should come from your auth system
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', role: 'Instructor' },
    { id: 2, name: 'Alice Smith', role: 'Student' },
    { id: 3, name: 'Bob Johnson', role: 'Student' },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'John Doe', message: 'Welcome to the Python Programming class!', time: '10:00 AM' },
    { id: 2, user: 'Alice Smith', message: 'Hello everyone!', time: '10:01 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const chatRef = useRef(null);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          user: currentUser?.email?.split('@')[0] || 'You',
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    // Calculate score
    const score = Object.entries(quizAnswers).reduce((acc, [questionId, answer]) => {
      const question = currentQuiz.questions.find(q => q.id === parseInt(questionId));
      return acc + (question.correctAnswer === answer ? 1 : 0);
    }, 0);
    
    setQuizResults({
      score,
      total: currentQuiz.questions.length,
      percentage: (score / currentQuiz.questions.length) * 100
    });
  };

  const handleAnswerChange = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const quizData = JSON.parse(event.target.result);
          setCurrentQuiz(quizData);
          setQuizAnswers({});
          setQuizResults(null);
        } catch (error) {
          console.error('Error parsing quiz file:', error);
        }
      };
      reader.readAsText(file);
    }
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

          {/* Live Class Card */}
          <motion.div
            className="card cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowLiveClassModal(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Class</h3>
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">
              Python Programming
            </div>
            <p className="text-gray-600 mt-2">Click to join live session</p>
          </motion.div>
        </div>
      </main>

      {/* Live Class Modal */}
      {showLiveClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white rounded-xl ${isFullscreen ? 'fixed inset-4' : 'max-w-6xl w-full mx-4'} transition-all duration-300`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Python Programming Live Session</h2>
                <p className="text-sm text-gray-600">Instructor: John Doe • Time: 10:00 AM</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setShowLiveClassModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(100vh-200px)]">
              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Video Player */}
                <div className="flex-1 bg-gray-900 p-4">
                  <div className="relative rounded-lg overflow-hidden bg-gray-800 h-full">
                    <video
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                      src="https://example.com/lecture-video.mp4" // Replace with actual video source
                    />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Python Programming - Live Session</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-white p-4 border-t flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsChatOpen(!isChatOpen)}
                      className={`p-3 rounded-full ${isChatOpen ? 'bg-blue-500' : 'bg-gray-200'} hover:bg-opacity-80`}
                    >
                      <MessageSquare className={`w-6 h-6 ${isChatOpen ? 'text-white' : ''}`} />
                    </button>
                    <button
                      onClick={() => setIsQuizOpen(!isQuizOpen)}
                      className={`p-3 rounded-full ${isQuizOpen ? 'bg-green-500' : 'bg-gray-200'} hover:bg-opacity-80`}
                    >
                      <FileText className={`w-6 h-6 ${isQuizOpen ? 'text-white' : ''}`} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                      <UsersIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Sidebar */}
              {isChatOpen && (
                <div className="w-80 border-l flex flex-col">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Chat</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
                    {chatMessages.map((message) => (
                      <div key={message.id} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{message.user}</span>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{message.message}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Quiz Sidebar */}
              {isQuizOpen && (
                <div className="w-96 border-l flex flex-col">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Live Quiz</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {isInstructor ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Upload Quiz</h4>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept=".json"
                              onChange={handleQuizUpload}
                              className="hidden"
                            />
                            <div className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                              <FileUp className="w-4 h-4" />
                              <span>Upload</span>
                            </div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600">
                          Upload a JSON file with quiz questions in the following format:
                          <pre className="mt-2 bg-gray-100 p-2 rounded text-xs">
                            {`{
  "title": "Quiz Title",
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}`}
                          </pre>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {currentQuiz ? (
                          <>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium text-blue-900">{currentQuiz.title}</h4>
                              <p className="text-sm text-blue-700 mt-1">
                                {currentQuiz.questions.length} questions
                              </p>
                            </div>
                            
                            {quizResults ? (
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-green-900">Quiz Results</h4>
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="mt-2">
                                  <p className="text-2xl font-bold text-green-700">
                                    {quizResults.score}/{quizResults.total}
                                  </p>
                                  <p className="text-sm text-green-600">
                                    {quizResults.percentage.toFixed(1)}% correct
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <form onSubmit={handleQuizSubmit} className="space-y-6">
                                {currentQuiz.questions.map((question) => (
                                  <div key={question.id} className="space-y-2">
                                    <p className="font-medium">{question.question}</p>
                                    <div className="space-y-2">
                                      {question.options.map((option) => (
                                        <label
                                          key={option}
                                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                                        >
                                          <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={quizAnswers[question.id] === option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                            className="text-blue-600"
                                          />
                                          <span>{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <button
                                  type="submit"
                                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                  Submit Quiz
                                </button>
                              </form>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Waiting for quiz to start...</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default Dashboard;