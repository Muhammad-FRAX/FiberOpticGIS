import React, { useState } from 'react';
import { login } from '../services/authService';
import '../styles/pages/loginpage.css';
import logo from '../assets/images/loginlogo.png';

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
      <img src={logo} alt="Logo" className="login-image" /> {}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;