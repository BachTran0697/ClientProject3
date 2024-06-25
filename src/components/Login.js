import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

const Login = () => {
  const [logiN_NAME, setUser] = useState('');
  const [logiN_PASSWORD, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(logiN_NAME, logiN_PASSWORD);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Username"
        value={logiN_NAME}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={logiN_PASSWORD}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
