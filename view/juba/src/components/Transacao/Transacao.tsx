import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TransacaoModal from './components/TransacaoModal';
import TransacaoTable from './components/TransacaoTable';
import Alert from '../Alert';
import useAlert from '../../utils/useAlert';

interface Transacao {
  id: number;
  idUsuario: number;
  data: string;
  tipo: number;
  valor: number;
  categorias: CategoriaTransacao[];
}

interface CategoriaTransacao {
  idCategoria: string;
  nome: string;
  valor: number;
}

const TransacaoCRUD: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedTransacao, setSelectedTransacao] = useState<Transacao | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    loadTransacoes();
    loadCategorias();
  }, []);

  const loadTransacoes = async () => {
    try {
      const response = await api.get('/transacoes');
      setTransacoes(response.data);
    } catch (error) {
      showAlert('Erro ao carregar transações', 'danger');
    }
  };

  const loadCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      showAlert('Erro ao carregar categorias', 'danger');
    }
  };

  const handleEdit = async (transacaoId: number) => {
    try {
      const response = await api.get(`/transacoes/${transacaoId}`);
      setSelectedTransacao(response.data);
      setShowModal(true);
    } catch (error) {
      showAlert('Erro ao carregar transação', 'danger');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/transacoes/${id}`);
      loadTransacoes();
    } catch (error) {
      showAlert('Erro ao excluir transação', 'danger');
    }
  };

  const handleShowModal = () => {
    setSelectedTransacao(null);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Alert show={alert.show} message={alert.message} variant={alert.variant} onClose={hideAlert} />
      <h2>Listagem de Transações</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary mb-3" onClick={handleShowModal}>Nova Transação</button>
      </div>
      <TransacaoTable 
        transacoes={transacoes} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
      <TransacaoModal 
        showModal={showModal} 
        handleHideModal={handleHideModal} 
        loadTransacoes={loadTransacoes}
        categorias={categorias}
        selectedTransacao={selectedTransacao} 
        showAlert={showAlert}
      />
    </div>
  );
};

export default TransacaoCRUD;
