import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Public/login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Public/register/Register';
import CategoriaCRUD from './components/Categoria/Categoria';
import TransacaoCRUD from './components/Transacao/Transacao';
import Relatorios from './components/Relatorios/Relatorios';
import NavigationBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importe o arquivo CSS global

import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <NavigationBar />
      <div className="main-content">{children}</div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
             <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/categorias"
              element={
                <PrivateRoute>
                  <CategoriaCRUD />
                </PrivateRoute>
              }
            />
            <Route
              path="/transacoes"
              element={
                <PrivateRoute>
                  <TransacaoCRUD />
                </PrivateRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <PrivateRoute>
                  <Relatorios />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
