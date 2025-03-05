import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the username
      const { username } = JSON.parse(atob(token.split('.')[1]));
      setUser({ username });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setUser(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <Route path="/home">
          {user ? <HomePage user={user} onLogout={handleLogout} /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;