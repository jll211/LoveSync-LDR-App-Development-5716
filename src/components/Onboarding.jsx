import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiCalendar, FiGlobe, FiUserPlus, FiCheck } = FiIcons;

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerEmail: '',
    relationshipStart: '',
    userTimezone: '',
    partnerTimezone: ''
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      localStorage.setItem('lovesync_onboarded', 'true');
      onComplete();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return true; // Welcome step
      case 2:
        return formData.partnerName && formData.partnerEmail;
      case 3:
        return formData.relationshipStart;
      case 4:
        return formData.userTimezone && formData.partnerTimezone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {i < step ? <SafeIcon icon={FiCheck} className="text-sm" /> : i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <WelcomeStep key="welcome" onNext={handleNext} />
          )}
          {step === 2 && (
            <PartnerStep
              key="partner"
              formData={formData}
              onInputChange={handleInputChange}
              onNext={handleNext}
              isComplete={isStepComplete()}
            />
          )}
          {step === 3 && (
            <RelationshipStep
              key="relationship"
              formData={formData}
              onInputChange={handleInputChange}
              onNext={handleNext}
              isComplete={isStepComplete()}
            />
          )}
          {step === 4 && (
            <TimezoneStep
              key="timezone"
              formData={formData}
              onInputChange={handleInputChange}
              onNext={handleNext}
              isComplete={isStepComplete()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WelcomeStep = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-3xl p-8 shadow-lg text-center"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-6xl mb-6"
    >
      💕
    </motion.div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">
      Welcome to LoveSync!
    </h1>
    <p className="text-gray-600 mb-8">
      Let's set up your relationship profile so we can help you and your partner stay connected and resolve conflicts together.
    </p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold"
    >
      Get Started
    </motion.button>
  </motion.div>
);

const PartnerStep = ({ formData, onInputChange, onNext, isComplete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-3xl p-8 shadow-lg"
  >
    <div className="text-center mb-6">
      <SafeIcon icon={FiUserPlus} className="text-4xl text-pink-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Invite Your Partner
      </h2>
      <p className="text-gray-600">
        We'll send them an invitation to join LoveSync
      </p>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Partner's Name
        </label>
        <input
          type="text"
          value={formData.partnerName}
          onChange={(e) => onInputChange('partnerName', e.target.value)}
          placeholder="Enter their name"
          className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Partner's Email
        </label>
        <input
          type="email"
          value={formData.partnerEmail}
          onChange={(e) => onInputChange('partnerEmail', e.target.value)}
          placeholder="Enter their email"
          className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext}
      disabled={!isComplete}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Send Invitation
    </motion.button>
  </motion.div>
);

const RelationshipStep = ({ formData, onInputChange, onNext, isComplete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-3xl p-8 shadow-lg"
  >
    <div className="text-center mb-6">
      <SafeIcon icon={FiCalendar} className="text-4xl text-pink-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        When did you start dating?
      </h2>
      <p className="text-gray-600">
        This helps us track your relationship milestones
      </p>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Relationship Start Date
      </label>
      <input
        type="date"
        value={formData.relationshipStart}
        onChange={(e) => onInputChange('relationshipStart', e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNext}
      disabled={!isComplete}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Continue
    </motion.button>
  </motion.div>
);

const TimezoneStep = ({ formData, onInputChange, onNext, isComplete }) => {
  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="text-center mb-6">
        <SafeIcon icon={FiGlobe} className="text-4xl text-pink-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Set Your Timezones
        </h2>
        <p className="text-gray-600">
          This helps us coordinate your activities
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Timezone
          </label>
          <select
            value={formData.userTimezone}
            onChange={(e) => onInputChange('userTimezone', e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select your timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partner's Timezone
          </label>
          <select
            value={formData.partnerTimezone}
            onChange={(e) => onInputChange('partnerTimezone', e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select partner's timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!isComplete}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Complete Setup
      </motion.button>
    </motion.div>
  );
};

export default Onboarding;