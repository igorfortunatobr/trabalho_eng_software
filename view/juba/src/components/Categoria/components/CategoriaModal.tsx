import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../../services/api';

interface Categoria {
  id: number;
  nome: string;
}

interface CategoriaModalProps {
  showModal: boolean;
  handleHideModal: () => void;
  loadCategorias: () => void;
  selectedCategoria: Categoria | null;
  showAlert: (message: string, variant: 'success' | 'danger' | 'warning' | 'info') => void;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({
  showModal,
  handleHideModal,
  loadCategorias,
  selectedCategoria,
  showAlert
}) => {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (selectedCategoria) {
      setNome(selectedCategoria.nome);
    } else {
      setNome('');
    }
  }, [selectedCategoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCategoria) {
        await api.put(`/categorias/${selectedCategoria.id}`, { nome });
        showAlert('Categoria atualizada com sucesso', 'success');
      } else {
        await api.post('/categorias', { nome });
        showAlert('Categoria adicionada com sucesso', 'success');
      }

      setNome('');
      handleHideModal();
      loadCategorias();
    } catch (error) {
      showAlert('Erro ao salvar categoria', 'danger');
    }
  };

  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedCategoria ? 'Editar Categoria' : 'Nova Categoria'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <Button variant="secondary" onClick={handleHideModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriaModal;
