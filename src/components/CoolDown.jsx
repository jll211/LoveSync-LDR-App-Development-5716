import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import Confetti from 'react-confetti';

const { FiHeart, FiArrowLeft, FiCheck, FiShare } = FiIcons;

const CoolDown = () => {
  const navigate = useNavigate();
  const { user, partner, resolveCoolDown } = useApp();
  const [step, setStep] = useState(1);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingTimer, setBreathingTimer] = useState(4);
  const [userStatement, setUserStatement] = useState('');
  const [partnerStatement] = useState("I feel overwhelmed because I thought you weren't listening to me");
  const [showConfetti, setShowConfetti] = useState(false);

  // Breathing exercise timer
  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setBreathingTimer(prev => {
          if (prev <= 1) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 7;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 8;
            } else {
              setBreathingPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);

      const stepTimer = setTimeout(() => {
        setStep(2);
      }, 30000); // 30 seconds for demo (should be 90 seconds)

      return () => {
        clearInterval(interval);
        clearTimeout(stepTimer);
      };
    }
  }, [step, breathingPhase]);

  const handleComplete = () => {
    resolveCoolDown();
    setShowConfetti(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'LoveSync - Conflict Resolved!',
        text: 'We just resolved a conflict together using LoveSync! 💚',
        url: window.location.origin
      });
    } else {
      // Fallback for web
      navigator.clipboard.writeText('We just resolved a conflict together using LoveSync! 💚');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
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
              <h1 className="text-xl font-bold text-gray-800">Cool Down Mode</h1>
              <p className="text-sm text-gray-600">Step {step} of 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <BreathingStep
              phase={breathingPhase}
              timer={breathingTimer}
              user={user}
              partner={partner}
            />
          )}
          
          {step === 2 && (
            <StatementStep
              userStatement={userStatement}
              setUserStatement={setUserStatement}
              onNext={() => setStep(3)}
              user={user}
            />
          )}
          
          {step === 3 && (
            <EmpathyStep
              partnerStatement={partnerStatement}
              onComplete={handleComplete}
              onShare={handleShare}
              partner={partner}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BreathingStep = ({ phase, timer, user, partner }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center"
  >
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Let's breathe together
      </h2>
      <p className="text-gray-600 mb-2">
        {partner?.name} has been notified and is breathing with you
      </p>
      <div className="flex items-center justify-center space-x-4 text-2xl">
        <span>{user?.avatar}</span>
        <SafeIcon icon={FiHeart} className="text-red-400" />
        <span>{partner?.avatar}</span>
      </div>
    </div>

    {/* Breathing Circle */}
    <div className="mb-8 flex justify-center">
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1.2,
          opacity: phase === 'hold' ? 0.7 : 1
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-2xl"
      >
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">{timer}</div>
          <div className="text-lg capitalize">{phase}</div>
        </div>
      </motion.div>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        4-7-8 Breathing Technique
      </h3>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
          Inhale for 4 seconds
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
          Hold for 7 seconds
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
          Exhale for 8 seconds
        </div>
      </div>
    </div>
  </motion.div>
);

const StatementStep = ({ userStatement, setUserStatement, onNext, user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-md mx-auto"
  >
    <div className="text-center mb-8">
      <div className="text-4xl mb-4">{user?.avatar}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Express your feelings
      </h2>
      <p className="text-gray-600">
        Use "I" statements to share how you feel
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I feel...
        </label>
        <textarea
          value={userStatement}
          onChange={(e) => setUserStatement(e.target.value)}
          placeholder="I feel frustrated because..."
          className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
        />
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        💡 Tip: Focus on your emotions, not blame
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!userStatement.trim()}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </motion.button>
    </div>
  </motion.div>
);

const EmpathyStep = ({ partnerStatement, onComplete, onShare, partner }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-md mx-auto"
  >
    <div className="text-center mb-8">
      <div className="text-4xl mb-4">{partner?.avatar}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {partner?.name}'s perspective
      </h2>
      <p className="text-gray-600">
        Do you understand why they feel this way?
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <p className="text-gray-700 italic">"{partnerStatement}"</p>
      </div>
      
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiCheck} />
          <span>Yes, I understand</span>
        </motion.button>
        
        <button className="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold">
          I need more clarification
        </button>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="font-semibold text-gray-800 mb-4 text-center">
        🎉 Conflict Resolved!
      </h3>
      <p className="text-center text-gray-600 mb-4">
        Great job working through this together
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onShare}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2"
      >
        <SafeIcon icon={FiShare} />
        <span>Share Success</span>
      </motion.button>
    </div>
  </motion.div>
);

export default CoolDown;