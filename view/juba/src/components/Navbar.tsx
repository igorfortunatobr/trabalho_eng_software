import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        MyApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
          <Nav.Link as={Link} to="/transacoes">Transações</Nav.Link>
          <Nav.Link as={Link} to="/relatorio">Relatório</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Registro</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
