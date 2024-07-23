import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
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
    <div className="register-container d-flex flex-column">
      <div className="register-content d-flex flex-grow-1">
        <div className="register-left d-flex flex-column align-items-center justify-content-center">
          <div className="logo">
            <img src="./logo.png" alt="JUBA Logo" className="navbar-logo" />
          </div>
          <h2>Assuma o controle de suas finanças de forma definitiva</h2>
          <h1>Cuidar do seu dinheiro pode ser simples. Com o Mobills, você organiza e planeja sua vida financeira em um único lugar.</h1>
        </div>
        <div className="register-right d-flex flex-column align-items-center justify-content-center">
          <h2>Cadastrar uma nova conta</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formNome" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Digite o seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="Digite o seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Confirme a sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 btn-register">
              Criar conta
            </Button>
            <button className="btn btn-link" onClick={() => navigate('/login')}>
              Voltar para o Login
            </button>
          </Form>
        </div>
      </div>
      <footer className="footer mt-auto">
        © 2024 Direitos Reservados | Juba - Gestão Financeira
      </footer>
    </div>
  );
};

export default Register;
