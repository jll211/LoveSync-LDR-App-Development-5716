import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [relationshipData, setRelationshipData] = useState({
    startDate: null,
    conflictsResolved: 0,
    currentStreak: 0,
    dailyCheckInStreak: 0,
    completedRituals: 0
  });
  const [dailyCheckIn, setDailyCheckIn] = useState({
    user: null,
    partner: null,
    date: null
  });
  const [currentRitual, setCurrentRitual] = useState(null);
  const [messages, setMessages] = useState([]);
  const [memories, setMemories] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const mockUser = {
      id: uuidv4(),
      name: 'Alex',
      email: 'alex@example.com',
      avatar: '👨‍💻',
      timezone: 'America/New_York'
    };
    
    const mockPartner = {
      id: uuidv4(),
      name: 'Jordan',
      email: 'jordan@example.com',
      avatar: '👩‍💼',
      timezone: 'Europe/London'
    };

    setUser(mockUser);
    setPartner(mockPartner);
    
    // Initialize relationship data
    setRelationshipData({
      startDate: new Date('2023-06-15'),
      conflictsResolved: 47,
      currentStreak: 23,
      dailyCheckInStreak: 15,
      completedRituals: 8
    });

    // Set current ritual
    setCurrentRitual({
      id: 1,
      title: 'Daily Gratitude',
      description: 'Share one thing you\'re grateful for about your partner',
      duration: '7 days',
      progress: { user: true, partner: false },
      category: 'Appreciation'
    });

    // Mock messages
    setMessages([
      {
        id: 1,
        senderId: mockUser.id,
        content: 'Good morning beautiful! ☀️',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      {
        id: 2,
        senderId: mockPartner.id,
        content: 'Morning love! Hope you have an amazing day 💕',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text'
      }
    ]);

    // Mock memories
    setMemories([
      {
        id: 1,
        title: 'First Video Call',
        date: new Date('2023-06-15'),
        type: 'milestone',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Conflict Resolved',
        date: new Date(),
        type: 'achievement',
        description: 'Successfully used Cool Down mode'
      }
    ]);
  }, []);

  const addMessage = (content, type = 'text') => {
    const newMessage = {
      id: uuidv4(),
      senderId: user.id,
      content,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const updateDailyCheckIn = (emotion, description) => {
    setDailyCheckIn(prev => ({
      ...prev,
      user: { emotion, description },
      date: new Date().toDateString()
    }));
  };

  const resolveCoolDown = () => {
    setRelationshipData(prev => ({
      ...prev,
      conflictsResolved: prev.conflictsResolved + 1,
      currentStreak: prev.currentStreak + 1
    }));
  };

  const completeRitual = () => {
    setRelationshipData(prev => ({
      ...prev,
      completedRituals: prev.completedRituals + 1
    }));
  };

  const addMemory = (memory) => {
    setMemories(prev => [...prev, { ...memory, id: uuidv4() }]);
  };

  const value = {
    user,
    partner,
    isPremium,
    setIsPremium,
    relationshipData,
    dailyCheckIn,
    updateDailyCheckIn,
    currentRitual,
    setCurrentRitual,
    messages,
    addMessage,
    memories,
    addMemory,
    resolveCoolDown,
    completeRitual
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};