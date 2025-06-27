import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import BottomNav from './BottomNav';

const { FiHeart, FiMessageCircle, FiTrendingUp, FiPauseCircle, FiCheckCircle, FiCalendar } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, partner, relationshipData, dailyCheckIn, currentRitual } = useApp();

  const today = new Date().toDateString();
  const hasCheckedInToday = dailyCheckIn.date === today && dailyCheckIn.user;
  const partnerCheckedIn = dailyCheckIn.date === today && dailyCheckIn.partner;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hi {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                {partner?.name} is in {partner?.timezone?.split('/')[1]}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{user?.avatar}</div>
              <div className="text-2xl">{partner?.avatar}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Emergency Cool Down Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/cooldown')}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg mb-6 flex items-center justify-center space-x-3"
        >
          <SafeIcon icon={FiPauseCircle} className="text-3xl" />
          <div className="text-left">
            <div className="text-xl font-bold">PAUSE</div>
            <div className="text-sm opacity-90">Request Cool Down</div>
          </div>
        </motion.button>

        {/* Relationship Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={FiTrendingUp}
            title="Conflicts Resolved"
            value={relationshipData.conflictsResolved}
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            icon={FiHeart}
            title="Current Streak"
            value={`${relationshipData.currentStreak} days`}
            color="from-pink-400 to-rose-500"
          />
        </div>

        {/* Daily Check-in Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Daily Check-in</h3>
            <SafeIcon icon={FiCheckCircle} className="text-blue-500 text-xl" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <CheckInStatus
              name="You"
              avatar={user?.avatar}
              completed={hasCheckedInToday}
              emotion={dailyCheckIn.user?.emotion}
            />
            <CheckInStatus
              name={partner?.name}
              avatar={partner?.avatar}
              completed={partnerCheckedIn}
              emotion={dailyCheckIn.partner?.emotion}
            />
          </div>
          
          {!hasCheckedInToday && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkin')}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-semibold"
            >
              Complete Check-in
            </motion.button>
          )}
        </motion.div>

        {/* Current Ritual Challenge */}
        {currentRitual && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Weekly Ritual</h3>
              <SafeIcon icon={FiCalendar} className="text-purple-500 text-xl" />
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">{currentRitual.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{currentRitual.description}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="text-sm">{user?.avatar}</div>
                  <div className={`w-3 h-3 rounded-full ${currentRitual.progress.user ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">{partner?.avatar}</div>
                  <div className={`w-3 h-3 rounded-full ${currentRitual.progress.partner ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ritual')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-2xl font-semibold"
            >
              Continue Ritual
            </motion.button>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <QuickActionCard
            icon={FiMessageCircle}
            title="Chat"
            subtitle="Send a message"
            onClick={() => navigate('/chat')}
            color="from-blue-400 to-indigo-500"
          />
          <QuickActionCard
            icon={FiHeart}
            title="Memories"
            subtitle="View timeline"
            onClick={() => navigate('/timeline')}
            color="from-pink-400 to-rose-500"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-2xl p-4 shadow-lg"
  >
    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-3`}>
      <SafeIcon icon={icon} className="text-white text-lg" />
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </motion.div>
);

const CheckInStatus = ({ name, avatar, completed, emotion }) => (
  <div className="text-center">
    <div className="text-2xl mb-2">{avatar}</div>
    <div className="text-sm font-medium text-gray-800 mb-1">{name}</div>
    {completed ? (
      <div className="text-xs text-green-600 flex items-center justify-center">
        <SafeIcon icon={FiCheckCircle} className="mr-1" />
        {emotion}
      </div>
    ) : (
      <div className="text-xs text-gray-400">Pending</div>
    )}
  </div>
);

const QuickActionCard = ({ icon, title, subtitle, onClick, color }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white rounded-2xl p-4 shadow-lg text-left"
  >
    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-3`}>
      <SafeIcon icon={icon} className="text-white text-lg" />
    </div>
    <div className="font-semibold text-gray-800 mb-1">{title}</div>
    <div className="text-sm text-gray-600">{subtitle}</div>
  </motion.button>
);

export default Dashboard;