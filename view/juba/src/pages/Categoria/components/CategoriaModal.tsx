import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../../services/api";
import Alert from "../../../components/utils/Alert";
import useAlert from "../../../utils/useAlert";

interface Categoria {
  id: number;
  nome: string;
}

interface CategoriaModalProps {
  showModal: boolean;
  handleHideModal: () => void;
  loadCategorias: () => void;
  selectedCategoria: Categoria | null;
  showAlert: (
    message: string,
    variant: "success" | "danger" | "warning" | "info",
  ) => void;
}
export default function CategoriaModal(props: CategoriaModalProps) {
  const { showModal, handleHideModal, loadCategorias, selectedCategoria } =
    props;

  const [nome, setNome] = useState("");
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    if (selectedCategoria) {
      setNome(selectedCategoria.nome);
    } else {
      setNome("");
    }
  }, [selectedCategoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) {
      showAlert("Preencha o nome da categoria", "warning");
      return;
    }
    try {
      if (selectedCategoria) {
        await api.put(`/categorias/${selectedCategoria.id}`, { nome });
        showAlert("Categoria atualizada com sucesso", "success");
      } else {
        await api.post("/categorias", { nome });
        showAlert("Categoria adicionada com sucesso", "success");
      }

      setNome("");
      handleHideModal();
      hideAlert();
      loadCategorias();
    } catch (error) {
      showAlert("Erro ao salvar categoria", "danger");
    }
  };

  function closeModal() {
    setNome("");
    handleHideModal();
    hideAlert();
  }

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedCategoria ? "Editar Categoria" : "Nova Categoria"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          show={alert.show}
          message={alert.message}
          variant={alert.variant}
          onClose={hideAlert}
        />{" "}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nome">
            <Form.Label>Nome da Categoria</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
