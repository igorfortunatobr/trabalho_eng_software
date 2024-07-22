import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // Importe seu arquivo CSS

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, senha: password });
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo">
          <img src="./logo.png" alt="JUBA Logo" className="navbar-logo" />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Usuário</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Login</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <button className="btn btn-link" onClick={() => navigate('/register')}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
