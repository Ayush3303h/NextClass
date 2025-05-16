import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Dummy data (should match the IDs in Assignments.jsx)
const dummyAssignments = [
  {
    id: 101,
    title: 'Greetings User',
    description: 'Say hello to the user and display a welcome message.',
    difficulty: 'easy',
    xp: 10,
    topics: ['Working with "ref"s', 'Working with Fragments, portals, refs'],
    
  },
  {
    id: 102,
    title: 'APIsmith Challenge #04:Total Price of Products in a Given Category',
    description: 'Calculate the total price of products in a given category using API data.',
    difficulty: 'easy',
    xp: 10,
    topics: ['Promises', 'JavaScript Array', 'JavaScript Object', 'Data Fetching using JS'],
  },
  // ...add the rest as needed
];

function AssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const assignment = dummyAssignments.find(a => a.id === Number(id));

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Assignment Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-blue-600 hover:underline">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
        <div className="mb-4">{assignment.description}</div>
        <div className="flex gap-4 mb-4">
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">Difficulty: {assignment.difficulty}</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">XP: {assignment.xp}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Topics:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {assignment.topics.map(topic => (
              <span key={topic} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{topic}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 pb-8 flex justify-end">
        <a
          href="https://my.newtonschool.co/playground/newton-box/yb8zzpedacn9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition text-lg"
        >
          Solve Assignment
        </a>
      </div>
    </div>
  );
}

export default AssignmentDetail; 