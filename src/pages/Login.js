import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import LoginSignUp from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function LoginPage() {
  return (
    <div>
      <Header />
      <div className='login-container'>
        <LoginSignUp />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
