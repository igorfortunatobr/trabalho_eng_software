import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import './NavigationBar.css'; // Importe o arquivo CSS

const NavigationBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
          <img src="./logo.png" alt="JUBA Logo" className="navbar-logo" /> {/* Substitua /path/to/logo.png pelo caminho real da sua logo */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
                <Nav.Link as={Link} to="/transacoes">Transações</Nav.Link>
                <Nav.Link as={Link} to="/relatorios">Relatório</Nav.Link>
                <Nav.Link onClick={logout}>Sair</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
