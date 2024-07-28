import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { TbArrowsTransferDown } from "react-icons/tb";
import { BsFileEarmarkRuled } from "react-icons/bs";
import "./NavigationBar.css"; // Importe o arquivo CSS

export default function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="d-flex align-items-center"
        >
          <img src="./logo.png" alt="JUBA Logo" className="navbar-logo" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <BsGraphUpArrow className="mb-1 me-1" /> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/categorias">
                  <CiShoppingTag className="mb-1" size={20} /> Categorias
                </Nav.Link>
                <Nav.Link as={Link} to="/transacoes">
                  <TbArrowsTransferDown className="mb-1" /> Transações
                </Nav.Link>
                <Nav.Link as={Link} to="/relatorios">
                  <BsFileEarmarkRuled className="me-1 mb-1" />
                  Relatórios
                </Nav.Link>
                <Nav.Link onClick={logout}>Sair</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registro
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
