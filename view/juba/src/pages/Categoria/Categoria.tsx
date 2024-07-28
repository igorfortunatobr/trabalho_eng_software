import React, { useState, useEffect } from "react";
import api from "../../services/api";
import CategoriaModal from "./components/CategoriaModal";
import CategoriaTable from "./components/CategoriaTable";
import useAlert from "../../utils/useAlert";
import Alert from "../../components/utils/Alert";
import Template from "../../components/Template/Template";
import { Col, Row } from "react-bootstrap";

interface Categoria {
  id: number;
  nome: string;
}

export default function CategoriaCRUD() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      showAlert("Erro ao carregar categorias", "danger");
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
      showAlert("Categoria excluída com sucesso", "success");
    } catch (error) {
      showAlert(
        "Não foi possível excluir a categoria. Verifique se ela não está sendo utilizada em alguma transação, não é possível excluir categorias que estão sendo utilizadas!",
        "danger",
      );
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
    <Template>
      <div className="container mt-5">
        <Alert
          show={alert.show}
          message={alert.message}
          variant={alert.variant}
          onClose={hideAlert}
        />{" "}
        <Row>
          <Col>
            <h2>Listagem de Categorias</h2>
          </Col>
          <Col>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary" onClick={handleShowModal}>
                Nova Categoria
              </button>
            </div>
          </Col>
        </Row>
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
    </Template>
  );
}
