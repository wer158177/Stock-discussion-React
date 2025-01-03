// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './styles/global.css';
import MainPage from './pages/MainPage';
import ProfileEdit from './pages/Profile/ProfileEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
