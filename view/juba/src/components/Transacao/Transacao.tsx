import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TransacaoModal from './components/TransacaoModal';
import TransacaoTable from './components/TransacaoTable';
import Alert from '../utils/Alert';
import useAlert from '../../utils/useAlert';

interface Transacao {
  id: number;
  idUsuario: number;
  data: string;
  tipo: string;
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
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    loadTransacoes();
    loadCategorias();
  }, []);

  useEffect(() => {
    calcularTotais();
  }, [transacoes]);

  const loadTransacoes = async () => {
    try {
      const response = await api.get('/transacoes/all');
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
      const response = await api.get(`/transacoes/id/${transacaoId}`);
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

  const calcularTotais = () => {
    const totalReceitas = transacoes
      .filter(transacao => transacao.tipo === "2")
      .reduce((total, transacao) => total + transacao.valor, 0);

    const totalDespesas = transacoes
      .filter(transacao => transacao.tipo === "1")
      .reduce((total, transacao) => total + transacao.valor, 0);

    setTotalReceitas(totalReceitas);
    setTotalDespesas(totalDespesas);
  };

  const calcularSaldo = () => {
    return totalReceitas - totalDespesas;
  };

  return (
    <div className="container mt-5">
      <Alert show={alert.show} message={alert.message} variant={alert.variant} onClose={hideAlert} />
      <h2>Listagem de Transações</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary mb-3" onClick={handleShowModal}>Nova Transação</button>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Receitas</h5>
              <p className="card-text">R$ {totalReceitas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Despesas</h5>
              <p className="card-text">R$ {totalDespesas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Saldo</h5>
              <p className="card-text">R$ {calcularSaldo().toFixed(2)}</p>
            </div>
          </div>
        </div>
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
