import React, { useState } from 'react';
import './Login.css'; // CSS 스타일시트를 포함

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);  // 로그인/회원가입 상태 관리

  const handleToggle = () => {
    setIsLogin(!isLogin);  // 로그인/회원가입 전환
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                checked={!isLogin}
                onChange={handleToggle}
              />
              <label htmlFor="reg-log"></label>

              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  {/* 카드 전면 (로그인 폼) */}
                  <div className={`card-front ${isLogin ? 'show' : ''}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#" className="btn mt-4">
                          submit
                        </a>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">Forgot your password?</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 카드 후면 (회원가입 폼) */}
                  <div className={`card-back ${!isLogin ? 'show' : ''}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#" className="btn mt-4">
                          submit
                        </a>
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
