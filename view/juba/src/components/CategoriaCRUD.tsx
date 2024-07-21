import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CategoriaCRUD: React.FC = () => {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    const response = await api.get('/categorias');
    setCategorias(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/categorias', { nome });
    setNome('');
    loadCategorias();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/categorias/${id}`);
    loadCategorias();
  };

  return (
    <div className="container mt-5">
      <h2>CRUD de Categorias</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome da Categoria</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria: any) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(categoria.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaCRUD;
