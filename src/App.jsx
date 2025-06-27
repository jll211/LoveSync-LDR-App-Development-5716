import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import CoolDown from './components/CoolDown';
import DailyCheckIn from './components/DailyCheckIn';
import RitualChallenge from './components/RitualChallenge';
import Chat from './components/Chat';
import Timeline from './components/Timeline';
import Onboarding from './components/Onboarding';
import Settings from './components/Settings';
import PremiumUpgrade from './components/PremiumUpgrade';

// Context
import { AppProvider } from './context/AppContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and onboarding status
    const auth = localStorage.getItem('lovesync_auth');
    const onboarded = localStorage.getItem('lovesync_onboarded');
    
    setIsAuthenticated(!!auth);
    setIsOnboarded(!!onboarded);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  !isAuthenticated ? (
                    <Landing onAuth={() => setIsAuthenticated(true)} />
                  ) : !isOnboarded ? (
                    <Navigate to="/onboarding" replace />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                } 
              />
              <Route 
                path="/onboarding" 
                element={
                  isAuthenticated && !isOnboarded ? (
                    <Onboarding onComplete={() => setIsOnboarded(true)} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated && isOnboarded ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/cooldown" 
                element={
                  isAuthenticated ? <CoolDown /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/checkin" 
                element={
                  isAuthenticated ? <DailyCheckIn /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/ritual" 
                element={
                  isAuthenticated ? <RitualChallenge /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/chat" 
                element={
                  isAuthenticated ? <Chat /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/timeline" 
                element={
                  isAuthenticated ? <Timeline /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  isAuthenticated ? <Settings /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/premium" 
                element={
                  isAuthenticated ? <PremiumUpgrade /> : <Navigate to="/" replace />
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;