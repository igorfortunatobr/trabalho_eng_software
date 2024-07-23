import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';

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

interface TransacaoTableProps {
  transacoes: Transacao[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TransacaoTable: React.FC<TransacaoTableProps> = ({
  transacoes,
  handleEdit,
  handleDelete
}) => (
  <table className="table mt-3">
    <thead>
      <tr>
        <th>Número</th>
        <th>Valor (R$)</th>
        <th>Tipo</th>
        <th>Data</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {transacoes.map((transacao: Transacao) => (
        <tr key={transacao.id}>
          <td>{transacao.id}</td>
          <td>{transacao.valor.toFixed(2)}</td>
          <td>{transacao.tipo === "1" ? <Badge bg="danger">Despesa</Badge> : <Badge bg="success">Receita</Badge>}</td>
          <td>{new Date(transacao.data).toLocaleDateString()}</td>
          <td>
            <button className="btn btn-warning mx-2" onClick={() => handleEdit(transacao.id)}><FaEdit /></button>
            <button className="btn btn-danger mx-2" onClick={() => handleDelete(transacao.id)}><FaTrash /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransacaoTable;
