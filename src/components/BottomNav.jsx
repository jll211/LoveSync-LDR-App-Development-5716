import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiMessageCircle, FiHeart, FiCalendar, FiSettings } = FiIcons;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: FiHome, label: 'Home', path: '/dashboard' },
    { icon: FiMessageCircle, label: 'Chat', path: '/chat' },
    { icon: FiHeart, label: 'Rituals', path: '/ritual' },
    { icon: FiCalendar, label: 'Timeline', path: '/timeline' },
    { icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon 
                icon={item.icon} 
                className={`text-lg mb-1 ${isActive ? 'text-white' : ''}`} 
              />
              <span className={`text-xs font-medium ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;