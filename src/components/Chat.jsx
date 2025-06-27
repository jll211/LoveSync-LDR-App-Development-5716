import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';

const { FiArrowLeft, FiSend, FiHeart, FiSmile, FiCamera, FiMic } = FiIcons;

const Chat = () => {
  const navigate = useNavigate();
  const { user, partner, messages, addMessage } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const emojis = ['❤️', '😘', '🥰', '😊', '😍', '🤗', '💕', '💖', '🌹', '✨'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      addMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmoji(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col">
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
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{partner?.avatar}</div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{partner?.name}</h1>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === user?.id}
            user={user}
            partner={partner}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-t border-gray-200 p-4"
        >
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl p-2 hover:bg-gray-100 rounded-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <SafeIcon icon={FiSmile} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <SafeIcon icon={FiCamera} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <SafeIcon icon={FiMic} />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SafeIcon icon={FiSend} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isOwn, user, partner }) => {
  const sender = isOwn ? user : partner;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-end space-x-2 max-w-[70%] ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className="text-lg">{sender?.avatar}</div>
        <div
          className={`p-3 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              : 'bg-white text-gray-800 shadow-sm'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <div className={`text-xs mt-1 ${isOwn ? 'text-pink-100' : 'text-gray-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;