import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Template from "../../components/Template/Template";
import { FaUser } from "react-icons/fa";

interface User {
  name: string;
  email: string;
}

export default function Usuario() {
  const user = {
    name: "Ayron",
    lastName: "Sanfra",
    email: "ayron.email@gmail.com",
  };
  const [editMode, setEditMode] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  function updateUser(data: User) {
    console.log("Atualizando usuário", data);
  }

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(userData);
    setEditMode(false);
  };

  const handleEditMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(true);
  };

  return (
    <Template>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{"Perfil do Usuário"}</Card.Title>
                <FaUser size={100} className="d-block mx-auto my-5" />
                <Form className="text-start" onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label className="text-start">Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      readOnly={!editMode}
                      disabled={!editMode}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label className="text-start">Sobrenome</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      readOnly={!editMode}
                      disabled={!editMode}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      readOnly={!editMode}
                      disabled={!editMode}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center mt-4">
                    {editMode ? (
                      <Button variant="primary" type="submit">
                        Salvar
                      </Button>
                    ) : (
                      <Button
                        className="text-end"
                        variant="warning"
                        onClick={handleEditMode}
                      >
                        Editar
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Template>
  );
}
