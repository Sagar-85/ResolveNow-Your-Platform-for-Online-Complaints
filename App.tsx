import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ComplaintProvider } from './contexts/ComplaintContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintDetail from './pages/ComplaintDetail';
import Header from './components/Header';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/submit" element={user ? <SubmitComplaint /> : <Navigate to="/login" />} />
        <Route path="/complaint/:id" element={user ? <ComplaintDetail /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <Router>
          <AppContent />
        </Router>
      </ComplaintProvider>
    </AuthProvider>
  );
}

export default App;