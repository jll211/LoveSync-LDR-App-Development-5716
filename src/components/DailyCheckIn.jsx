import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';

const { FiArrowLeft, FiHeart } = FiIcons;

const emotions = [
  { emoji: '😊', name: 'Happy', color: 'from-yellow-400 to-orange-500' },
  { emoji: '😔', name: 'Sad', color: 'from-blue-400 to-indigo-500' },
  { emoji: '😰', name: 'Stressed', color: 'from-red-400 to-pink-500' },
  { emoji: '😴', name: 'Tired', color: 'from-purple-400 to-indigo-500' },
  { emoji: '🤗', name: 'Loved', color: 'from-pink-400 to-rose-500' },
  { emoji: '😤', name: 'Frustrated', color: 'from-orange-400 to-red-500' },
  { emoji: '😌', name: 'Peaceful', color: 'from-green-400 to-emerald-500' },
  { emoji: '🤔', name: 'Thoughtful', color: 'from-gray-400 to-slate-500' }
];

const DailyCheckIn = () => {
  const navigate = useNavigate();
  const { user, partner, updateDailyCheckIn } = useApp();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setStep(2);
  };

  const handleSubmit = () => {
    updateDailyCheckIn(selectedEmotion, description);
    setStep(3);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
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
              <h1 className="text-xl font-bold text-gray-800">Daily Check-in</h1>
              <p className="text-sm text-gray-600">How are you feeling today?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <EmotionSelection
            emotions={emotions}
            onSelect={handleEmotionSelect}
            user={user}
          />
        )}
        
        {step === 2 && (
          <DescriptionStep
            selectedEmotion={selectedEmotion}
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
            user={user}
          />
        )}
        
        {step === 3 && (
          <CompletionStep
            selectedEmotion={selectedEmotion}
            description={description}
            user={user}
            partner={partner}
          />
        )}
      </div>
    </div>
  );
};

const EmotionSelection = ({ emotions, onSelect, user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md mx-auto"
  >
    <div className="text-center mb-8">
      <div className="text-4xl mb-4">{user?.avatar}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Hi {user?.name}!
      </h2>
      <p className="text-gray-600">
        Select the emotion that best describes how you're feeling right now
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {emotions.map((emotion, index) => (
        <motion.button
          key={emotion.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(emotion)}
          className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-3">{emotion.emoji}</div>
          <div className="font-semibold text-gray-800">{emotion.name}</div>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const DescriptionStep = ({ selectedEmotion, description, setDescription, onSubmit, user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md mx-auto"
  >
    <div className="text-center mb-8">
      <div className="text-4xl mb-4">{user?.avatar}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        You're feeling {selectedEmotion?.name}
      </h2>
      <div className="text-6xl mb-4">{selectedEmotion?.emoji}</div>
      <p className="text-gray-600">
        Tell us a bit more about what's on your mind
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What's making you feel this way? (optional)"
        className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="4"
      />
      
      <div className="text-xs text-gray-500 mb-4">
        💡 This helps your partner understand your day better
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        className={`w-full bg-gradient-to-r ${selectedEmotion?.color} text-white py-3 rounded-2xl font-semibold`}
      >
        Share with {user?.name}
      </motion.button>
    </div>
  </motion.div>
);

const CompletionStep = ({ selectedEmotion, description, user, partner }) => (
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
        {selectedEmotion?.emoji}
      </motion.div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Check-in Complete!
      </h2>
      
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="text-2xl">{user?.avatar}</div>
          <SafeIcon icon={FiHeart} className="text-pink-500" />
          <div className="text-2xl">{partner?.avatar}</div>
        </div>
        <p className="text-gray-600 text-sm">
          {partner?.name} will be notified about your check-in
        </p>
      </div>
      
      {description && (
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-gray-700 italic">"{description}"</p>
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        Redirecting to dashboard...
      </div>
    </div>
  </motion.div>
);

export default DailyCheckIn;