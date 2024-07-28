import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Categoria {
  id: number;
  nome: string;
}

interface CategoriaTableProps {
  categorias: Categoria[];
  handleEdit: (categoria: Categoria) => void;
  handleDelete: (id: number) => void;
}

export default function CategoriaTable(props: CategoriaTableProps) {
  const { categorias, handleEdit, handleDelete } = props;

  return (
    <Table className="table mt-3 w-100 h-100" hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th className="text-end">Ações</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria: Categoria) => (
          <tr className="align-items-center" key={categoria.id}>
            <td className="col-2 pt-3">{categoria.id}</td>
            <td className="col-8 pt-3">{categoria.nome}</td>
            <td className="text-end">
              <Button
                className="btn-warning p-2"
                onClick={() => handleEdit(categoria)}
              >
                <FaEdit className="mb-1 ms-1 p-0" size={20} />
              </Button>
              <Button
                className="btn-danger mx-2"
                onClick={() => handleDelete(categoria.id)}
              >
                <FaTrash className="my-1  p-0" size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
