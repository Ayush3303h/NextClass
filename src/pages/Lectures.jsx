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
      title: "Python Function, Fn def/Calling a fn, Return statement, Arguments and parameter",
      date: "Sep 23, 2024",
      duration: "1:30:00",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "https://d3dyfaf3iutrxo.cloudfront.net/file/course/video_session/whiteboard/74d46abd557444d28a6d325e964bfd69.pdf"
    },
    {
      id: 102,
      title: "Nested if-else, Python operators, Python logical Operators, And, Or, Not",
      date: "Sep 11, 2024",
      duration: "1:30:04",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "/dummy_notes/lecture_102_notes.pdf"
    },
    {
      id: 103,
      title: "Comparison operators, Precedence and Associativity, Conditional Statements, Pyth ...",
      date: "Sep 9, 2024",
      duration: "1:30:04",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "/dummy_notes/lecture_103_notes.pdf"
    },
    {
      id: 104,
      title: "Type Casting in Python, Python Input, Input() function, Input() for different da ...",
      date: "Sep 4, 2024",
      duration: "1:30:04",
      notesIncluded: false,
      xp: 30,
      totalXp: 30,
      status: "pending",
      notesUrl: "/dummy_notes/lecture_104_notes.pdf"
    },
    {
      id: 105,
      title: "Python variables, Assignment operator, Primitive Datatypes, Int, Float, Str, Boo ...",
      date: "Sep 2, 2024",
      duration: "1:30:04",
      notesIncluded: true,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "/dummy_notes/lecture_105_notes.pdf"
    },
     {
      id: 106,
      title: "Python Introduction, Print function in python, Hello World in Python, Comments i ...",
      date: "Aug 29, 2024",
      duration: "1:14:24",
      notesIncluded: false,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "/dummy_notes/lecture_106_notes.pdf"
    },
     {
      id: 107,
      title: "Computer Language Introduction, Flow Chart, Binary, HLL VS LLL, Compiler and Int ...",
      date: "Aug 27, 2024",
      duration: "0:58:03",
      notesIncluded: false,
      xp: 30,
      totalXp: 30,
      status: "completed",
      notesUrl: "/dummy_notes/lecture_107_notes.pdf"
    }
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