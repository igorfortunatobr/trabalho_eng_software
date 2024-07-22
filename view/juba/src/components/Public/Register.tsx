import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import api from '../../services/api';
import './Register.css'; // Importe o arquivo CSS

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.post('/usuarios/register', {
        nome,
        email,
        senha: password
      });

      if (response.status === 200) {
        navigate('/login');
      } else {
        throw new Error('Falha no registro.');
      }
    } catch (error) {
      setError('Ocorreu um erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="logo">LOGO</div>
        <h1>Texto de impacto chamativo</h1>
      </div>
      <div className="register-right">
        <h2>Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Registrar
          </Button>
          <button className="btn btn-link" onClick={() => navigate('/login')}>
            Voltar
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
