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
      navigate('/');
    } catch (error) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">LOGO</div>
        <h1>Texto de impacto chamativo</h1>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
        <button className="btn btn-link" onClick={() => navigate('/register')}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
