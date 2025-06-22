import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, ChevronDown, ChevronRight, Circle, CheckCircle2
} from 'lucide-react';

// Dummy data for modules and assignments
const dummyModules = [
  {
    id: 1,
    name: 'Python',
    description: 'Introduction | Input | Loops | ',
    release: '8 May 2025',
    deadline: '15 May 2025 2:12 AM',
    assignments: [
      {
        id: 101,
        title: 'Print Newton School',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/qvjvx0kfal9k",
      },
      {
        id: 102,
        title: 'Print Date and Name',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/ta49c3v4glg1",
      },
      {
        id: 103,
        title: 'Print Variables',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/1h89evdu2es8",
      },
      {
        id: 104,
        title: 'Print Datatype',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/a4lujypewwwk",
      },
      {
        id: 105,
        title: 'Print Datatype',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/osk11r3kfv7x",
      },
      {
        id: 106,
        title: 'Variable Reassignment',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/ygpxbni02uyf",
      },
      {
        id: 107,
        title: 'Calculate and Print Age',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/3vsih5dz20w5",
      },
      {
        id: 108,
        title: 'Arithmetic Transformation Challenge',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/zjjhzanh5jgx",
      },
      {
        id: 109,
        title: 'Personalized Message Generation',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/eyeabh96h2nn",
      },
      {
        id: 110,
        title: 'Even or Odd Checker',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/06j8dmr2oaol",
      },
      {
        id: 111,
        title: 'Grade Calculator',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/7ce5yj3296uk",
      },
      {
        id: 112,
        title: 'Month-if else',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/6cs2v44gprq8",
      },
      {
        id: 113,
        title: 'Print Day of Week',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/rr6keacob8b4",
      },
      {
        id: 114,
        title: 'Calculate area - Function',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/tqkbg2rfxosi",
      },
      {
        id: 115,
        title: 'Calling Print Function',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/ocoz726lpdyq",
      },
      {
        id: 116,
        title: 'Area of Circle',
        difficulty: 'easy',
        xp: 10,
        topics: ['Hello World in Python'],
        solvedBy: 1123,
        solvedPercent: 81,
        link: "https://my.newtonschool.co/playground/code/ng6f0z72rhql",
      },
    ],
  },
];
const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

function Assignments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(dummyModules.map(m => m.id));

  // Progress calculation (dummy)
  const totalAssignments = dummyModules.reduce((acc, m) => acc + m.assignments.length, 0);
  const solvedAssignments = 6; // dummy value
  const progress = Math.round((solvedAssignments / totalAssignments) * 100);

  // Filtered modules by search
  const filteredModules = dummyModules.map(module => ({
    ...module,
    assignments: module.assignments.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(module => module.assignments.length > 0);

  const toggleExpand = (id) => {
    setExpanded(expanded =>
      expanded.includes(id)
        ? expanded.filter(e => e !== id)
        : [...expanded, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
            <p className="text-gray-500 text-sm">Finish your pending assignments to improve your placement score</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Filters and Progress */}
      <div className="max-w-5xl mx-auto px-4 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search assignment questions"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Subject</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Status</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Difficulty</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Module</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Past Interview Questions</button>
          <button className="px-2 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">More Filters +</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Solved</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">{progress}%</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="text-xs text-gray-400">{solvedAssignments}/{totalAssignments} Solved</span>
          </div>
        </div>
      </div>

      {/* Assignment Groups */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-gray-50 grid grid-cols-12 gap-2 px-4 py-2 text-xs font-semibold text-gray-500">
            <div className="col-span-4">Status / Questions</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">XP Earned</div>
            <div className="col-span-3">Topics</div>
            <div className="col-span-1 text-center">Solved By</div>
          </div>
          {filteredModules.map(module => (
            <div key={module.id}>
              {/* Module Header */}
              <button
                className="w-full flex items-center gap-2 px-4 py-3 bg-white border-b hover:bg-gray-50 transition"
                onClick={() => toggleExpand(module.id)}
              >
                {expanded.includes(module.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <span className="font-bold text-gray-800 text-base">{module.name}</span>
                <span className="text-gray-400 text-xs ml-2">{module.description}</span>
                <span className="ml-auto text-xs text-gray-400">Release: {module.release} • Deadline: {module.deadline}</span>
              </button>
              <AnimatePresence initial={false}>
                {expanded.includes(module.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {module.assignments.map(a => (
                      <div
                        key={a.id}
                        className="grid grid-cols-12 gap-2 px-4 py-3 border-b last:border-b-0 bg-white hover:bg-blue-50 transition"
                      >
                        <div className="col-span-4 flex items-center gap-2">
                          {a.solvedPercent > 80 ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300" />
                          )}
                          <span className="font-medium text-gray-800">{a.title}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[a.difficulty]}`}>{a.difficulty}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-700 font-medium">0/{a.xp}</span>
                        </div>
                        <div className="col-span-3 flex flex-wrap gap-1">
                          {a.topics.map(topic => (
                            <span key={topic} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic}</span>
                          ))}
                        </div>
                        <div className="col-span-1 text-center text-gray-500 text-xs flex flex-col items-center gap-1">
                          <span>{a.solvedBy} <span className="text-blue-500 font-bold">({a.solvedPercent}%)</span></span>
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition"
                          >
                            Solve
                          </a>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Assignments; 
