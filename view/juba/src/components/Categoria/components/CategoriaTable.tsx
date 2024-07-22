import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Categoria {
  id: number;
  nome: string;
}

interface CategoriaTableProps {
  categorias: Categoria[];
  handleEdit: (categoria: Categoria) => void;
  handleDelete: (id: number) => void;
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({
  categorias,
  handleEdit,
  handleDelete
}) => (
  <table className="table mt-3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {categorias.map((categoria: Categoria) => (
        <tr key={categoria.id}>
          <td>{categoria.id}</td>
          <td>{categoria.nome}</td>
          <td>
            <button className="btn btn-warning mx-2" onClick={() => handleEdit(categoria)}>
              <FaEdit />
            </button>
            <button className="btn btn-danger mx-2" onClick={() => handleDelete(categoria.id)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CategoriaTable;
