import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Badge, Button } from "react-bootstrap";
import formatToCoin from "../../../utils/formatToCoin";

interface Transacao {
  id: number;
  idUsuario: number;
  data: string;
  tipo: string;
  valor: number;
  descricao: string;
  categorias: CategoriaTransacao[];
}

interface CategoriaTransacao {
  idCategoria: string;
  nome: string;
  valor: number;
}

interface TransacaoTableProps {
  transacoes: Transacao[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TransacaoTable: React.FC<TransacaoTableProps> = ({
  transacoes,
  handleEdit,
  handleDelete,
}) => (
  <table className="table mt-3">
    <thead>
      <tr>
        <th>Número</th>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Tipo</th>
        <th>Data</th>
        <th className="text-end">Ações</th>
      </tr>
    </thead>
    <tbody>
      {transacoes.map((transacao: Transacao) => (
        <tr key={transacao.id}>
          <td className="pt-3">{transacao.id}</td>
          <td className="pt-3">{transacao.descricao}</td>
          <td className=" pt-3">{formatToCoin(transacao.valor)}</td>
          <td className=" pt-3">
            {transacao.tipo === "1" ? (
              <Badge bg="danger">
                <p className="my-1 mx-1">Despesa</p>{" "}
              </Badge>
            ) : (
              <Badge bg="success">
                {" "}
                <p className="my-1 mx-1">Receita</p>{" "}
              </Badge>
            )}
          </td>
          <td className="pt-3">
            {new Date(transacao.data).toLocaleDateString()}
          </td>
          <td className="text-end">
            <Button
              className="btn-warning p-2"
              onClick={() => handleEdit(transacao.id)}
            >
              <FaEdit className="mb-1 ms-1 p-0" size={20} />
            </Button>
            <Button
              className="btn-danger mx-2"
              onClick={() => handleDelete(transacao.id)}
            >
              <FaTrash className="my-1 p-0" size={18} />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransacaoTable;
