import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import BottomNav from './BottomNav';

const { FiArrowLeft, FiUser, FiBell, FiShield, FiHeart, FiStar, FiLogOut, FiChevronRight } = FiIcons;

const Settings = () => {
  const navigate = useNavigate();
  const { user, partner, isPremium } = useApp();
  const [notifications, setNotifications] = useState({
    dailyCheckIn: true,
    coolDownRequests: true,
    ritualReminders: true,
    partnerActivity: false
  });

  const handleLogout = () => {
    localStorage.removeItem('lovesync_auth');
    localStorage.removeItem('lovesync_onboarded');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 pb-20">
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
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-4xl">{user?.avatar}</div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            {isPremium && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                <SafeIcon icon={FiStar} className="text-xs" />
                <span>Premium</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{partner?.avatar}</div>
                <div>
                  <div className="font-medium text-gray-800">{partner?.name}</div>
                  <div className="text-sm text-gray-600">Connected</div>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Premium Upgrade */}
        {!isPremium && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => navigate('/premium')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 shadow-lg mb-6 cursor-pointer"
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiStar} className="text-2xl" />
                <div>
                  <h3 className="font-bold">Upgrade to Premium</h3>
                  <p className="text-sm opacity-90">Unlock unlimited rituals & insights</p>
                </div>
              </div>
              <SafeIcon icon={FiChevronRight} />
            </div>
          </motion.div>
        )}

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <SettingsSection
            title="Notifications"
            icon={FiBell}
            color="from-blue-400 to-indigo-500"
          >
            <NotificationToggle
              label="Daily Check-in Reminders"
              description="Get reminded to complete your daily emotional check-in"
              enabled={notifications.dailyCheckIn}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, dailyCheckIn: enabled }))}
            />
            <NotificationToggle
              label="Cool Down Requests"
              description="Instant notifications when your partner requests a cool down"
              enabled={notifications.coolDownRequests}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, coolDownRequests: enabled }))}
            />
            <NotificationToggle
              label="Ritual Reminders"
              description="Weekly reminders for ritual challenges"
              enabled={notifications.ritualReminders}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, ritualReminders: enabled }))}
            />
            <NotificationToggle
              label="Partner Activity"
              description="Know when your partner is active in the app"
              enabled={notifications.partnerActivity}
              onChange={(enabled) => setNotifications(prev => ({ ...prev, partnerActivity: enabled }))}
            />
          </SettingsSection>

          {/* Privacy & Security */}
          <SettingsSection
            title="Privacy & Security"
            icon={FiShield}
            color="from-green-400 to-emerald-500"
          >
            <SettingsItem
              label="Data Privacy"
              description="Manage your data and privacy settings"
              onClick={() => {}}
            />
            <SettingsItem
              label="Block & Report"
              description="Safety tools and reporting options"
              onClick={() => {}}
            />
            <SettingsItem
              label="Export Data"
              description="Download your relationship data"
              onClick={() => {}}
            />
          </SettingsSection>

          {/* Relationship */}
          <SettingsSection
            title="Relationship"
            icon={FiHeart}
            color="from-pink-400 to-rose-500"
          >
            <SettingsItem
              label="Relationship Details"
              description="Update your relationship information"
              onClick={() => {}}
            />
            <SettingsItem
              label="Partner Settings"
              description="Manage partner connection"
              onClick={() => {}}
            />
            <SettingsItem
              label="Ritual Preferences"
              description="Customize your ritual experience"
              onClick={() => {}}
            />
          </SettingsSection>

          {/* Account */}
          <SettingsSection
            title="Account"
            icon={FiUser}
            color="from-gray-400 to-slate-500"
          >
            <SettingsItem
              label="Profile Settings"
              description="Update your profile information"
              onClick={() => {}}
            />
            <SettingsItem
              label="Help & Support"
              description="Get help or contact support"
              onClick={() => {}}
            />
            <SettingsItem
              label="About LoveSync"
              description="App version and information"
              onClick={() => {}}
            />
            <SettingsItem
              label="Sign Out"
              description="Sign out of your account"
              onClick={handleLogout}
              danger
            />
          </SettingsSection>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const SettingsSection = ({ title, icon, color, children }) => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
    <div className="p-6 pb-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} flex items-center justify-center`}>
          <SafeIcon icon={icon} className="text-white text-sm" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {children}
    </div>
  </div>
);

const SettingsItem = ({ label, description, onClick, danger = false }) => (
  <motion.button
    whileHover={{ backgroundColor: '#f9fafb' }}
    onClick={onClick}
    className="w-full px-6 py-4 text-left"
  >
    <div className={`font-medium ${danger ? 'text-red-600' : 'text-gray-800'} mb-1`}>
      {label}
    </div>
    <div className="text-sm text-gray-600">{description}</div>
  </motion.button>
);

const NotificationToggle = ({ label, description, enabled, onChange }) => (
  <div className="px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium text-gray-800 mb-1">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
          enabled ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-300'
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full shadow-sm"
        />
      </motion.button>
    </div>
  </div>
);

export default Settings;