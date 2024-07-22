import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Public/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Public/Register';
import CategoriaCRUD from './components/Categoria/Categoria';
import TransacaoCRUD from './components/Transacao/Transacao';
import Relatorios from './components/Relatorios';
import NavigationBar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <NavigationBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
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
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
