import React, { useState } from 'react';
import { login } from '../services/authService';
import '../styles/pages/loginpage.css';
import loginbackground from '../assets/images/loginbackground.png';
import userIcon from '../assets/icons/user_icon.png';
import passwordIcon from '../assets/icons/password_icon.png';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await login(username, password);
      localStorage.setItem('token', token); // Store the token in local storage
      onLogin({ username });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="left-half">
        <img src={loginbackground} alt="loginbackground" className="login-image" />
      </div>
      <div className="right-half">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-container">
          <img src={userIcon} alt="User Icon" className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <img src={passwordIcon} alt="Password Icon" className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

// Before