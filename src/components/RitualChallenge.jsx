import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';

const { FiArrowLeft, FiHeart, FiCheck, FiClock, FiStar } = FiIcons;

const rituals = [
  {
    id: 1,
    title: 'Daily Gratitude',
    description: 'Share one thing you\'re grateful for about your partner every day',
    duration: '7 days',
    category: 'Appreciation',
    difficulty: 'Easy',
    benefits: ['Increases positivity', 'Strengthens bond', 'Builds appreciation'],
    instructions: [
      'Think of something specific your partner did that you appreciate',
      'Write it down or say it out loud',
      'Share it with your partner through the app',
      'Take turns - one person shares each day'
    ]
  },
  {
    id: 2,
    title: 'Parallel Sunset',
    description: 'Watch the sunset together over video call, no matter the time difference',
    duration: '3 days',
    category: 'Connection',
    difficulty: 'Medium',
    benefits: ['Shared experiences', 'Romantic connection', 'Mindfulness'],
    instructions: [
      'Find sunset time in both your locations',
      'Schedule a video call for the earlier sunset',
      'Watch in comfortable silence together',
      'Share one word about how it made you feel'
    ]
  },
  {
    id: 3,
    title: 'Love Letter Week',
    description: 'Write and photograph handwritten love notes to each other',
    duration: '7 days',
    category: 'Romance',
    difficulty: 'Easy',
    benefits: ['Emotional intimacy', 'Tangible memories', 'Creative expression'],
    instructions: [
      'Write a short love note by hand each day',
      'Take a photo of your handwritten note',
      'Share the photo with your partner',
      'Keep the physical notes as keepsakes'
    ]
  }
];

const RitualChallenge = () => {
  const navigate = useNavigate();
  const { user, partner, currentRitual, completeRitual } = useApp();
  const [selectedRitual, setSelectedRitual] = useState(currentRitual || rituals[0]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    completeRitual();
    setCompleted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <SafeIcon icon={FiArrowLeft} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Ritual Challenge</h1>
              <p className="text-sm text-gray-600">Strengthen your bond together</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!showInstructions ? (
          <RitualOverview
            ritual={selectedRitual}
            user={user}
            partner={partner}
            onStart={() => setShowInstructions(true)}
            onSelectRitual={setSelectedRitual}
            rituals={rituals}
          />
        ) : completed ? (
          <CompletionScreen
            ritual={selectedRitual}
            user={user}
            partner={partner}
          />
        ) : (
          <RitualInstructions
            ritual={selectedRitual}
            user={user}
            partner={partner}
            onComplete={handleComplete}
            onBack={() => setShowInstructions(false)}
          />
        )}
      </div>
    </div>
  );
};

const RitualOverview = ({ ritual, user, partner, onStart, onSelectRitual, rituals }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-2xl mx-auto"
  >
    {/* Current Ritual */}
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{ritual.title}</h2>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiClock} className="text-gray-500" />
          <span className="text-sm text-gray-600">{ritual.duration}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{ritual.description}</p>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
          {ritual.category}
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {ritual.difficulty}
        </div>
      </div>
      
      {/* Progress */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Progress</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm">{user?.avatar}</div>
            <span className="text-sm text-gray-600">{user?.name}</span>
          </div>
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiCheck} className="text-white text-xs" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-sm">{partner?.avatar}</div>
            <span className="text-sm text-gray-600">{partner?.name}</span>
          </div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-2xl font-semibold"
      >
        Continue Ritual
      </motion.button>
    </div>

    {/* Benefits */}
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">Benefits</h3>
      <div className="space-y-2">
        {ritual.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <SafeIcon icon={FiStar} className="text-yellow-500" />
            <span className="text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Other Rituals */}
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="font-semibold text-gray-800 mb-4">Other Rituals</h3>
      <div className="space-y-3">
        {rituals.filter(r => r.id !== ritual.id).map((r) => (
          <motion.button
            key={r.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelectRitual(r)}
            className="w-full bg-gray-50 rounded-2xl p-4 text-left hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">{r.title}</div>
                <div className="text-sm text-gray-600">{r.description}</div>
              </div>
              <div className="text-xs text-gray-500">{r.duration}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

const RitualInstructions = ({ ritual, user, partner, onComplete, onBack }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md mx-auto"
  >
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">📝</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{ritual.title}</h2>
        <p className="text-gray-600">Follow these steps to complete today's ritual</p>
      </div>
      
      <div className="space-y-4 mb-6">
        {ritual.instructions.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-gray-700 text-sm">{instruction}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-purple-50 rounded-2xl p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{user?.avatar}</div>
          <SafeIcon icon={FiHeart} className="text-pink-500" />
          <div className="text-2xl">{partner?.avatar}</div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {partner?.name} will be notified when you complete this
        </p>
      </div>
      
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-2xl font-semibold"
        >
          Mark as Complete
        </motion.button>
        
        <button
          onClick={onBack}
          className="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold"
        >
          Back to Overview
        </button>
      </div>
    </div>
  </motion.div>
);

const CompletionScreen = ({ ritual, user, partner }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-md mx-auto text-center"
  >
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: 2 }}
        className="text-6xl mb-6"
      >
        🎉
      </motion.div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Ritual Complete!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Great job completing "{ritual.title}" today. Your bond grows stronger with each ritual!
      </p>
      
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="text-2xl">{user?.avatar}</div>
          <SafeIcon icon={FiHeart} className="text-pink-500" />
          <div className="text-2xl">{partner?.avatar}</div>
        </div>
        <p className="text-sm text-gray-600">
          {partner?.name} has been notified of your completion
        </p>
      </div>
      
      <div className="text-sm text-gray-500">
        Returning to dashboard...
      </div>
    </div>
  </motion.div>
);

export default RitualChallenge;