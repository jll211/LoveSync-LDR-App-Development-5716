import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';

const { FiArrowLeft, FiStar, FiCheck, FiHeart, FiTrendingUp, FiShield } = FiIcons;

const PremiumUpgrade = () => {
  const navigate = useNavigate();
  const { setIsPremium } = useApp();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$4.99',
      period: 'per month',
      savings: null
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$39.99',
      period: 'per year',
      savings: 'Save 33%'
    }
  ];

  const features = [
    {
      icon: FiHeart,
      title: 'Unlimited Ritual Library',
      description: '50+ psychology-based challenges vs 3 per month',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Advanced Analytics',
      description: 'Track relationship progress and conflict resolution trends',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: FiStar,
      title: 'Personalized Rituals',
      description: 'Custom challenges based on your psychology profile',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: FiShield,
      title: 'Priority Support',
      description: 'Get help faster with dedicated premium support',
      color: 'from-green-400 to-emerald-500'
    }
  ];

  const handleUpgrade = () => {
    // Simulate purchase
    setIsPremium(true);
    localStorage.setItem('lovesync_premium', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/settings')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <SafeIcon icon={FiArrowLeft} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Premium Upgrade</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-4"
          >
            ⭐
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Unlock Your Relationship's Full Potential
          </h2>
          <p className="text-gray-600 text-lg">
            Get unlimited access to psychology-based rituals and advanced insights
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <SafeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
            Choose Your Plan
          </h3>
          
          <div className="space-y-4 mb-6">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{plan.name}</div>
                    <div className="text-sm text-gray-600">{plan.period}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{plan.price}</div>
                    {plan.savings && (
                      <div className="text-sm text-green-600 font-medium">{plan.savings}</div>
                    )}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && (
                      <SafeIcon icon={FiCheck} className="text-white text-sm" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
          >
            Start Premium Now
          </motion.button>
        </div>

        {/* Free vs Premium Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
            Free vs Premium
          </h3>
          
          <div className="space-y-4">
            <ComparisonRow
              feature="Daily Check-ins"
              free={true}
              premium={true}
            />
            <ComparisonRow
              feature="Cool Down Mode"
              free={true}
              premium={true}
            />
            <ComparisonRow
              feature="Ritual Challenges"
              free="3 per month"
              premium="Unlimited"
            />
            <ComparisonRow
              feature="Relationship Analytics"
              free={false}
              premium={true}
            />
            <ComparisonRow
              feature="Personalized Rituals"
              free={false}
              premium={true}
            />
            <ComparisonRow
              feature="Priority Support"
              free={false}
              premium={true}
            />
          </div>
        </div>

        {/* Terms */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By upgrading, you agree to our Terms of Service and Privacy Policy.
            Cancel anytime from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
};

const ComparisonRow = ({ feature, free, premium }) => (
  <div className="flex items-center justify-between py-2">
    <div className="font-medium text-gray-800">{feature}</div>
    <div className="flex items-center space-x-8">
      <div className="text-center w-20">
        {typeof free === 'boolean' ? (
          free ? (
            <SafeIcon icon={FiCheck} className="text-green-500 mx-auto" />
          ) : (
            <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto"></div>
          )
        ) : (
          <span className="text-sm text-gray-600">{free}</span>
        )}
      </div>
      <div className="text-center w-20">
        {typeof premium === 'boolean' ? (
          premium ? (
            <SafeIcon icon={FiCheck} className="text-purple-500 mx-auto" />
          ) : (
            <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto"></div>
          )
        ) : (
          <span className="text-sm text-purple-600 font-medium">{premium}</span>
        )}
      </div>
    </div>
  </div>
);

export default PremiumUpgrade;