require('dotenv').config();
const express = require('express');
const sequelize = require('./database/database');
const usuarioRoutes = require('./api/routes/usuarioRoutes');
const categoriaRoutes = require('./api/routes/categoriaRoutes');
const transacaoRoutes = require('./api/routes/transacaoRoutes');
const authRoutes = require('./api/routes/auth/authRoutes');
const ENVIRONMENT = require('./api/environment/environment')

const { verificarToken } = require('./api/middleware/authMiddleware');

//const categoriaTransacaoRoutes = require('./api/routes/categoriaTransacaoRoutes');

global.ENVIRONMENT = ENVIRONMENT;

const app = express();
app.use(express.json());

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Middleware para verificar token JWT em todas as rotas
app.use(verificarToken);

// Rotas
app.use('/categorias', categoriaRoutes);
app.use('/transacoes', transacaoRoutes);
//app.use('/categoria-transacoes', categoriaTransacaoRoutes);

// Sincronização do modelo com o banco de dados e inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT_NODE, () => {
      console.log('Servidor rodando em http://localhost:' + process.env.PORT_NODE);
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
