import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import CategoriaCRUD from './components/CategoriaCRUD';
import TransacaoCRUD from './components/TransacaoCRUD';
import Relatorios from './components/Relatorios';
import NavigationBar from './components/Navbar';

const App: React.FC = () => {
  const isAuthenticated = () => {
    console.log("ESTÁ AUTENTICADO.")
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/categorias" element={isAuthenticated() ? <CategoriaCRUD /> : <Navigate to="/login" />} />
          <Route path="/transacoes" element={isAuthenticated() ? <TransacaoCRUD /> : <Navigate to="/login" />} />
          <Route path="/relatorios" element={isAuthenticated() ? <Relatorios /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
