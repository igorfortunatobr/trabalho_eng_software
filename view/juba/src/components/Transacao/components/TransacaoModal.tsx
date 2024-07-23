import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../../../services/api';
import { FaTrash } from 'react-icons/fa';

interface Categoria {
  id: number;
  nome: string;
}

interface CategoriaTransacao {
  idCategoria: string;
  nome: string;
  valor: number;
}

interface Transacao {
  id: number;
  idUsuario: number;
  data: string;
  tipo: string;
  valor: number;
  categorias: CategoriaTransacao[];
}

interface TransacaoModalProps {
  showModal: boolean;
  handleHideModal: () => void;
  loadTransacoes: () => void;
  categorias: Categoria[];
  selectedTransacao: Transacao | null;
  showAlert: (message: string, variant: 'success' | 'danger' | 'warning' | 'info') => void;
}

const TransacaoModal: React.FC<TransacaoModalProps> = ({
  showModal,
  handleHideModal,
  loadTransacoes,
  categorias,
  selectedTransacao,
  showAlert
}) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [valor, setValor] = useState('');
  const [data, setData] = useState(getCurrentDate());
  const [tipo, setTipo] = useState("1");
  const [categoriaTransacoes, setCategoriaTransacoes] = useState<CategoriaTransacao[]>([]);
  const [novaCategoriaId, setNovaCategoriaId] = useState('');
  const [novaCategoriaValor, setNovaCategoriaValor] = useState('');
  

  useEffect(() => {
    if (selectedTransacao) {
      setValor(selectedTransacao.valor.toString());
      setData(selectedTransacao.data.split('T')[0]); // Ajuste para exibir a data corretamente
      setTipo(selectedTransacao.tipo);
      setCategoriaTransacoes(selectedTransacao.categorias.map(ct => ({
        idCategoria: ct.idCategoria,
        nome: ct.nome,
        valor: ct.valor
      })));
    } else {
      resetForm();
    }
  }, [selectedTransacao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transacaoPayload = { data, valor: parseFloat(valor), tipo };
    const payload = {
      transacao: transacaoPayload,
      categorias: categoriaTransacoes
    };

    try {
      if (selectedTransacao) {
        await api.put(`/transacoes/id/${selectedTransacao.id}`, payload);
        showAlert('Transação atualizada com sucesso', 'success');
      } else {
        await api.post('/transacoes', payload);
        showAlert('Transação adicionada com sucesso', 'success');
      }

      resetForm();
      handleHideModal();
      loadTransacoes();
    } catch (error) {
      showAlert('Erro ao salvar transação', 'danger');
    }
  };

  const handleAddCategoria = () => {
    const novaCategoria: CategoriaTransacao = {
      idCategoria: novaCategoriaId,
      nome: categorias.find((c: Categoria) => c.id === parseInt(novaCategoriaId))?.nome || '',
      valor: parseFloat(novaCategoriaValor),
    };
    const novasCategorias = [...categoriaTransacoes, novaCategoria];
    setCategoriaTransacoes(novasCategorias);
    setNovaCategoriaId('');
    setNovaCategoriaValor('');
    atualizarValorTransacao(novasCategorias);
  };

  const handleRemoveCategoria = (idCategoria: string) => {
    const novasCategorias = categoriaTransacoes.filter(ct => ct.idCategoria !== idCategoria);
    setCategoriaTransacoes(novasCategorias);
    atualizarValorTransacao(novasCategorias);
  };

  const atualizarValorTransacao = (categorias: CategoriaTransacao[]) => {
    const novoValor = categorias.reduce((total, ct) => total + ct.valor, 0);
    setValor(novoValor.toString());
  };

  const resetForm = () => {
    setValor('');
    setData(getCurrentDate());
    setTipo("1");
    setCategoriaTransacoes([]);
  };

  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedTransacao ? 'Editar Transação' : 'Nova Transação'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="valor">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              value={valor}
              placeholder='0,00'
              readOnly
              disabled
              required
            />
          </Form.Group>
          <Form.Group controlId="data">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="despesa"
                label="Despesa"
                value={"1"}
                checked={tipo === "1"}
                onChange={() => setTipo("1")}
              />
              <Form.Check
                type="radio"
                id="receita"
                label="Receita"
                value={"2"}
                checked={tipo === "2"}
                onChange={() => setTipo("2")}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="novaCategoria">
            <Form.Label>Adicionar Categoria</Form.Label>
            <Form.Control
              as="select"
              value={novaCategoriaId}
              onChange={e => setNovaCategoriaId(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria: Categoria) => (
                <option key={categoria.id} value={categoria.id.toString()}>{categoria.nome}</option>
              ))}
            </Form.Control>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              placeholder='0,00'
              value={novaCategoriaValor}
              onChange={e => setNovaCategoriaValor(e.target.value)}
              required
            />
            <Button onClick={handleAddCategoria} className="mt-2">Adicionar Categoria</Button>
          </Form.Group>
          <h5 className="mt-4">Categorias</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categoriaTransacoes.map((categoriaTransacao: CategoriaTransacao) => (
                <tr key={categoriaTransacao.idCategoria}>
                  <td>{categoriaTransacao.nome}</td>
                  <td>{categoriaTransacao.valor}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveCategoria(categoriaTransacao.idCategoria)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default TransacaoModal;
