import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import './Login.css';

const LoginSignUp = () => {
  const navigate = useNavigate();

  console.log('컴포넌트 마운트'); // 컴포넌트 마운트 확인

  useEffect(() => {
    console.log('useEffect 실행'); // useEffect 실행 확인

    const checkAuthAndRedirect = async () => {
      try {
        // 서버에 인증 상태 확인 요청
        const response = await authService.checkAuthStatus();
        console.log('Auth status response:', response);

        if (response && response.isAuthenticated) {
          console.log('인증됨, 홈으로 이동');
          navigate('/home', { replace: true });
        } else {
          console.log('인증 안됨');
        }
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '', // name -> username으로 변경
    email: '',
    password: '',
    intro: '', // 추가
    imageFile: null, // 추가
    admin: false, // 추가
    adminToken: '', // 추가
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(''); // 상태 전환 시 에러 초기화
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
        console.log('Login Response:', response);
  
        if (response.status === 200) {
          console.log('로그인 성공, 쿠키:', document.cookie);
          navigate('/home');
        }
      } else {
        await authService.register({
          username: formData.username, // name -> username으로 변경
          email: formData.email,
          password: formData.password,
          intro: formData.intro,
          imageFile: formData.imageFile,
          admin: false,
          adminToken: '',
        });
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.message || '인증에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='section'>
      <div className='container'>
        <div className='row full-height justify-content-center'>
          <div className='col-12 text-center align-self-center py-5'>
            <div className='section pb-5 pt-5 pt-sm-2 text-center'>
              <h6 className='mb-0 pb-3'>
                <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              </h6>
              <input
                className='checkbox'
                type='checkbox'
                id='reg-log'
                name='reg-log'
                checked={!isLogin}
                onChange={handleToggle}
              />
              <label htmlFor='reg-log'></label>

              <div className='card-3d-wrap mx-auto'>
                <div className='card-3d-wrapper'>
                  <div className={`card-front ${isLogin ? 'show' : ''}`}>
                    <div className='center-wrap'>
                      <div className='section text-center'>
                        <h4 className='mb-4 pb-3'>Log In</h4>
                        <form onSubmit={handleSubmit}>
                          <div className='form-group'>
                            <input
                              type='email'
                              name='email'
                              className='form-style'
                              placeholder='Your Email'
                              id='logemail'
                              autoComplete='off'
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='form-group mt-2'>
                            <input
                              type='password'
                              name='password'
                              className='form-style'
                              placeholder='Your Password'
                              id='logpass'
                              autoComplete='off'
                              value={formData.password}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type='submit'
                            className='btn mt-4'
                            disabled={loading}
                          >
                            {loading ? 'Loading...' : 'Submit'}
                          </button>
                        </form>
                        {error && <p className='error mt-3'>{error}</p>}
                      </div>
                    </div>
                  </div>

                  <div className={`card-back ${!isLogin ? 'show' : ''}`}>
                    <div className='center-wrap'>
                      <div className='section text-center'>
                        <h4 className='mb-4 pb-3'>Sign Up</h4>
                        <form onSubmit={handleSubmit}>
                          <div className='form-group'>
                            <input
                              type='text'
                              name='username'
                              className='form-style'
                              placeholder='Your Username'
                              id='logname'
                              autoComplete='off'
                              value={formData.username}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='form-group mt-2'>
                            <input
                              type='email'
                              name='email'
                              className='form-style'
                              placeholder='Your Email'
                              id='logemail'
                              autoComplete='off'
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className='form-group mt-2'>
                            <input
                              type='password'
                              name='password'
                              className='form-style'
                              placeholder='Your Password'
                              id='logpass'
                              autoComplete='off'
                              value={formData.password}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type='submit'
                            className='btn mt-4'
                            disabled={loading}
                          >
                            {loading ? 'Loading...' : 'Submit'}
                          </button>
                        </form>
                        {error && <p className='error mt-3'>{error}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
