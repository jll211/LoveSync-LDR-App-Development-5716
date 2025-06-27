import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import { format, differenceInDays } from 'date-fns';

const { FiArrowLeft, FiHeart, FiCalendar, FiTrendingUp, FiShare, FiPlus, FiStar } = FiIcons;

const Timeline = () => {
  const navigate = useNavigate();
  const { user, partner, memories, relationshipData } = useApp();
  const [selectedMemory, setSelectedMemory] = useState(null);

  const daysTogether = differenceInDays(new Date(), relationshipData.startDate);

  const handleShare = (memory) => {
    if (navigator.share) {
      navigator.share({
        title: `${memory.title} - LoveSync`,
        text: `${user?.name} and ${partner?.name}: ${memory.title}`,
        url: window.location.origin
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <SafeIcon icon={FiArrowLeft} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Our Timeline</h1>
                <p className="text-sm text-gray-600">{daysTogether} days together</p>
              </div>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100">
              <SafeIcon icon={FiPlus} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Relationship Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 text-3xl mb-4">
              <span>{user?.avatar}</span>
              <SafeIcon icon={FiHeart} className="text-pink-500" />
              <span>{partner?.avatar}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.name} & {partner?.name}
            </h2>
            <p className="text-gray-600">
              Together since {format(relationshipData.startDate, 'MMMM d, yyyy')}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-600 mb-1">{daysTogether}</div>
              <div className="text-xs text-gray-600">Days Together</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">{relationshipData.conflictsResolved}</div>
              <div className="text-xs text-gray-600">Conflicts Resolved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600 mb-1">{relationshipData.completedRituals}</div>
              <div className="text-xs text-gray-600">Rituals Completed</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={index}
              onShare={() => handleShare(memory)}
              onClick={() => setSelectedMemory(memory)}
            />
          ))}
        </div>

        {/* Add Memory Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-3xl shadow-lg mt-6 flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Memory</span>
        </motion.button>
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onShare={() => handleShare(selectedMemory)}
        />
      )}
    </div>
  );
};

const MemoryCard = ({ memory, index, onShare, onClick }) => {
  const getIcon = () => {
    switch (memory.type) {
      case 'milestone':
        return FiHeart;
      case 'achievement':
        return FiStar;
      case 'photo':
        return FiCalendar;
      default:
        return FiHeart;
    }
  };

  const getColor = () => {
    switch (memory.type) {
      case 'milestone':
        return 'from-pink-400 to-rose-500';
      case 'achievement':
        return 'from-yellow-400 to-orange-500';
      case 'photo':
        return 'from-blue-400 to-indigo-500';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
    >
      <div className="bg-white rounded-3xl p-6 shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getColor()} flex items-center justify-center`}>
            <SafeIcon icon={getIcon()} className="text-white" />
          </div>
          <button
            onClick={onShare}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <SafeIcon icon={FiShare} />
          </button>
        </div>
        
        <h3 className="font-bold text-gray-800 mb-2">{memory.title}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {format(memory.date, 'MMMM d, yyyy')}
        </p>
        
        {memory.image && (
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-32 object-cover rounded-2xl mb-3"
          />
        )}
        
        {memory.description && (
          <p className="text-sm text-gray-700">{memory.description}</p>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="w-full mt-4 bg-gray-100 text-gray-600 py-2 rounded-2xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const MemoryModal = ({ memory, onClose, onShare }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{memory.title}</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          ×
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">
        {format(memory.date, 'EEEE, MMMM d, yyyy')}
      </p>
      
      {memory.image && (
        <img
          src={memory.image}
          alt={memory.title}
          className="w-full h-48 object-cover rounded-2xl mb-4"
        />
      )}
      
      {memory.description && (
        <p className="text-gray-700 mb-6">{memory.description}</p>
      )}
      
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShare}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiShare} />
          <span>Share</span>
        </motion.button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default Timeline;