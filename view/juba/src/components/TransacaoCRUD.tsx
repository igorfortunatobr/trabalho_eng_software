import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransacaoCRUD: React.FC = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    loadTransacoes();
    loadCategorias();
  }, []);

  const loadTransacoes = async () => {
    const response = await api.get('/transacoes');
    setTransacoes(response.data);
  };

  const loadCategorias = async () => {
    const response = await api.get('/categorias');
    setCategorias(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/transacoes', { categoriaId, valor });
    setCategoriaId('');
    setValor('');
    loadTransacoes();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/transacoes/${id}`);
    loadTransacoes();
  };

  return (
    <div className="container mt-5">
      <h2>CRUD de Transações</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select
            id="categoria"
            className="form-control"
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria: any) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
               </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            id="valor"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao: any) => (
            <tr key={transacao.id}>
              <td>{transacao.id}</td>
              <td>{transacao.Categoria.nome}</td>
              <td>{transacao.valor}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(transacao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransacaoCRUD;

