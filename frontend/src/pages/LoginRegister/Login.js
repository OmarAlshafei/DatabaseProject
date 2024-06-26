import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.user)
        console.log(data.message)
        navigate('/dashboard', { state: { username: data.user.username, userType: data.user.userType, university_id: data.user.university_id, email: data.user.email } });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="box">
        <h2 className="form-title">Login</h2>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">Login</button>
          <button type="button" className="button" onClick={() => navigate('/register')}>Need an account? Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
