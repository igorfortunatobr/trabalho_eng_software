import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import api from "../../services/api";
import "./Cadastro.css";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import IsDesktop from "../../utils/isDesktop";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const navigate = useNavigate();
  const desktop = IsDesktop();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError({ message: "", show: false });

    if (password !== confirmPassword) {
      setError({ show: true, message: "As senhas não coincidem." });
      return;
    }

    try {
      const response = await api.post("/usuarios/register", {
        nome,
        email,
        senha: password,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      } else {
        throw new Error("Falha no registro.");
      }
    } catch (error) {
      setError({
        show: true,
        message: "Ocorreu um erro ao registrar. Tente novamente.",
      });
    }
  }

  const formCard = () => (
    <Card className="w-75 rounded-4 fw-bold">
      <Card.Body>
        <CustomAlert
          message={error.message}
          type="danger"
          show={error.show}
          dismissible={true}
          onClose={() => setError({ message: "", show: false })}
        />
        <Form onSubmit={handleRegister} className="text-start">
          <Form.Group controlId="formNome" className="mt-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirmação de senha</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="warning"
              className="mt-4 mb-3 w-50 rounded-5 btn-register"
            >
              <b>Criar conta</b>
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const presentation = () => (
    <Container>
      <img src="./logo-cadastro.png" alt="JUBA Logo" className="my-5 pt-5 w-50" />
      <h2 className="impact-text text-tam">
        Assuma o controle de suas finanças de forma definitiva!
      </h2>
      <h4 className="fw-light mt-4 mb-5 text-tam">
        Cuidar do seu dinheiro pode ser simples. Com o Juba, você organiza e
        planeja sua vida financeira em um único lugar.
      </h4>
    </Container>
  );

  return (
    <>
      {!desktop ? (
        <Row className="altura">
          <Col className="bg-yellow w-50 d-flex flex-column align-items-center text-center">
            {presentation()}
          </Col>
          <Col className="bg-purple w-50 ">
            <Container>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center my-5">
                  Cadastre-se em nosso sistema!
                </h2>
                {formCard()}
                <button
                  className="btn btn-link text-dark"
                  onClick={() => navigate("/login")}
                >
                  Voltar para o Login
                </button>
              </div>
            </Container>
          </Col>
        </Row>
      ) : (
        <Col className="altura">
          <div className="bg-yellow d-flex flex-column align-items-center text-center">
            {presentation()}
          </div>
          <div className="bg-purple">
            <Container>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center my-5">
                  Cadastre-se em nosso sistema!
                </h2>
                {formCard()}
                <button
                  className="btn btn-link text-dark"
                  onClick={() => navigate("/login")}
                >
                  Voltar para o Login
                </button>
              </div>
            </Container>
          </div>
        </Col>
      )}
    </>
  );
}
