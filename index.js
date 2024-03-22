const express = require('express');
const sequelize = require('./database/database');
const usuarioRoutes = require('./api/routes/usuarioRoutes');
const categoriaRoutes = require('./api/routes/categoriaRoutes');
const transacaoRoutes = require('./api/routes/transacaoRoutes');
//const categoriaTransacaoRoutes = require('./api/routes/categoriaTransacaoRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/transacoes', transacaoRoutes);
//app.use('/categoria-transacoes', categoriaTransacaoRoutes);

// Sincronização do modelo com o banco de dados e inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log('Servidor rodando em http://localhost:3001');
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
