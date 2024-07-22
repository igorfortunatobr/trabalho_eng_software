import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CategoriaModal from './components/CategoriaModal';
import CategoriaTable from './components/CategoriaTable';
import useAlert from '../../utils/useAlert';
import Alert from '../Alert';

interface Categoria {
  id: number;
  nome: string;
}

const CategoriaCRUD: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      showAlert('Erro ao carregar categorias', 'danger');
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/categorias/${id}`);
      loadCategorias();
    } catch (error) {
      showAlert('Erro ao excluir categoria', 'danger');
    }
  };

  const handleShowModal = () => {
    setSelectedCategoria(null);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Alert show={alert.show} message={alert.message} variant={alert.variant} onClose={hideAlert} />
      <h2>Listagem de Categorias</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleShowModal}>Nova Categoria</button>
      </div>
      <CategoriaTable 
        categorias={categorias} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
      <CategoriaModal 
        showModal={showModal} 
        handleHideModal={handleHideModal} 
        loadCategorias={loadCategorias} 
        selectedCategoria={selectedCategoria} 
        showAlert={showAlert}
      />
    </div>
  );
};

export default CategoriaCRUD;
