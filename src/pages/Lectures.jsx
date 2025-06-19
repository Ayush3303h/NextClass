import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight, PlayCircle, FileText, Bookmark, CheckCircle } from 'lucide-react';

const Lectures = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const pythonCourse = {
    id: 1,
    title: "Python",
    description: "Master Python programming from basics to advanced concepts",
    instructor: "Ayush",
    thumbnail: "src/HD wallpaper_ Python (programming), programming language, code.jpeg",
    topics: ["Python Basics", "Variables & Data Types", "Control Flow"],
    level: "Beginner"
  };

  const pythonLecturesData = [
    {
      id: 101,
      title: " Intro to Programming, Computational Thinking, Pseudocode",
      date: "jun 9, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/124MUikc78dNGRPioqgshhPKrEjqiMJ9I/view?usp=sharing"
    },
    {
      id: 102,
      title: " Flowcharts andFoundations",
      date: "jun 10, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1wH1UCZ_Od8WApj1apO_Pdi3-dn9gp81i/view?usp=sharing"
    },
    {
      id: 103,
      title: " Introduction To Python",
      date: "jun 11, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1fcCuidMOsBS6SFJUAgWY5XzD4UlY5G6N/view?usp=sharing"
    },
    {
      id: 104,
      title: " Newline Character,Sep,end operator",
      date: "jun 12, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1eOWAGNHJINJKLzBO8BOANL3qv9mF7jgQ/view?usp=sharing"
    },
    {
      id: 105,
      title: "Variables and Datatypes",
      date: "jun 13, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1UsjEPcvS25nVGGPr5UDJBCdNYGZHppG2/view?usp=sharing"
    },
    {
      id: 106,
      title: "User Input and Basic Operators",
      date: "jun 14, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1XDVOFzkQf1dFnbOE1eB4k_9uLC-fKekj/view?usp=sharing"
    },
    {
      id: 107,
      title: "Conditional Statements",
      date: "jun 19, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1w98_6yy57y0u10DcJ4bWIpE4oIVK24Pf/view?usp=sharing"
    },
    {
      id: 108,
      title: "Logical Operators: AND, OR, NOT",
      date: "jun 20, 2025",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://drive.google.com/file/d/1_Xe7CINMBxKO_OKCEEwlpi7_OiYW64nh/view?usp=sharing"
    },
  ];

  const handleStartLearningClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  const handleViewNotes = (notesUrl) => {
    window.open(notesUrl, '_blank');
  };

  const renderCourseCard = (course) => (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full md:w-64 h-48 md:h-auto">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <span className="text-white text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              {course.level}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.topics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Instructor: {course.instructor}</span>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
              onClick={() => handleStartLearningClick(course.id)}
            >
              Start Learning
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderLecturesList = (lectures) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        {/* Back Button */}
         <button
          onClick={handleBackToCourses}
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" />
          Back to Courses
        </button>

        {/* Lecture List */}
        <div className="divide-y divide-gray-200">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                 <PlayCircle className="w-6 h-6 text-gray-400" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{lecture.title}</h4>
                  <p className="text-sm text-gray-500">{`Sep P C • ${lecture.date} • ${lecture.duration} ${lecture.notesIncluded ? '• Notes Included' : ''}`}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {lecture.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                 <span className="text-yellow-600 font-semibold">{`${lecture.xp}/${lecture.totalXp} XP`}</span>
                <button
                   onClick={() => handleViewNotes(lecture.notesUrl)}
                   className="flex items-center text-gray-600 hover:text-gray-900"
                   title="View Notes"
                 >
                   <FileText className="w-5 h-5" />
                 </button>
                 <Bookmark className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" title="Bookmark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <span>Courses</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">{selectedCourseId ? pythonCourse.title : "Python"}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{selectedCourseId ? "Lectures" : "Python Programming"}</h1>
          <p className="text-gray-600 mt-2">{selectedCourseId ? "List of lectures for this course." : "Master Python programming from basics to advanced concepts"}</p>
        </motion.div>

        {selectedCourseId === null ? (
          renderCourseCard(pythonCourse)
        ) : (
          renderLecturesList(pythonLecturesData)
        )}
      </div>
    </div>
  );
};

export default Lectures; 