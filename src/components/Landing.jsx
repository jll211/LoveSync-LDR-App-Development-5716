import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiMessageCircle, FiTrendingUp, FiShield, FiStar } = FiIcons;

const Landing = ({ onAuth }) => {
  const handleAuth = () => {
    localStorage.setItem('lovesync_auth', 'true');
    onAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >
            💕
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Love<span className="text-pink-600">Sync</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            The first LDR app that prevents relationship conflicts
          </p>
          
          <p className="text-lg text-gray-500 mb-8">
            Real-time conflict resolution + psychology-based rituals for couples
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAuth}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey Together
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={FiHeart}
            title="Cool Down Mode"
            description="90-second guided conflict resolution with breathing exercises"
            color="from-red-400 to-pink-500"
          />
          <FeatureCard
            icon={FiMessageCircle}
            title="Daily Check-ins"
            description="Emotional awareness with smart partner insights"
            color="from-blue-400 to-indigo-500"
          />
          <FeatureCard
            icon={FiTrendingUp}
            title="Ritual Challenges"
            description="50+ psychology-based activities to strengthen your bond"
            color="from-green-400 to-emerald-500"
          />
          <FeatureCard
            icon={FiShield}
            title="Secure & Private"
            description="End-to-end encrypted communication for couples"
            color="from-purple-400 to-violet-500"
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">10K+</div>
              <div className="text-gray-600">Couples Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Conflicts Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">4.9</div>
              <div className="text-gray-600 flex items-center justify-center">
                <SafeIcon icon={FiStar} className="text-yellow-400 mr-1" />
                App Store Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-8">Join thousands of couples who've transformed their relationships</p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <TestimonialCard
              name="Sarah & Mike"
              text="Prevented our biggest fight with the Cool Down feature!"
              location="New York ↔ London"
            />
            <TestimonialCard
              name="Emma & David"
              text="The daily rituals brought us closer than ever"
              location="LA ↔ Tokyo"
            />
            <TestimonialCard
              name="Lisa & Alex"
              text="47 conflicts resolved and counting! 💪"
              location="Berlin ↔ Sydney"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAuth}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
      <SafeIcon icon={icon} className="text-white text-xl" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, text, location }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-2xl p-6 shadow-lg max-w-sm"
  >
    <p className="text-gray-700 mb-4 italic">"{text}"</p>
    <div className="text-sm">
      <div className="font-semibold text-gray-800">{name}</div>
      <div className="text-gray-500">{location}</div>
    </div>
  </motion.div>
);

export default Landing;