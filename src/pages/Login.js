import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.token) {
        navigate('/home');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <Login onSubmit={handleLogin} error={error} />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;