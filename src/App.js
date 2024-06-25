import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/authService';
import Home from './components/pages/Home';
import Login from './components/Login';
import Dashboard from './components/pages/dashboard';
import Profile from './components/pages/Profile';
import User from './components/User/User';
import CreateUser from './components/User/createUser';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/navbar';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedLayout = () => {
  const { user } = useAuth();
  // console.log('Current user:', user); // Debug log

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app">
      <Header />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={user.roleId === '1' ? <User /> : <Navigate to="/" />} />
          <Route path="/user/createUser" element={user.roleId === '1' ? <CreateUser /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
