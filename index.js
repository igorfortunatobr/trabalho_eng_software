require('dotenv').config();
const express = require('express');
const sequelize = require('./database/database');
const usuarioRoutes = require('./api/routes/usuarioRoutes');
const categoriaRoutes = require('./api/routes/categoriaRoutes');
const transacaoRoutes = require('./api/routes/transacaoRoutes');
const authRoutes = require('./api/routes/auth/authRoutes');
const ENVIRONMENT = require('./api/environment/environment')
const UTILS = require('./api/environment/utils')

const { verificarToken } = require('./api/middleware/authMiddleware');

//const categoriaTransacaoRoutes = require('./api/routes/categoriaTransacaoRoutes');

global.ENVIRONMENT = ENVIRONMENT;
global.UTILS = UTILS;

const app = express();
app.use(express.json());

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({ message: 'Erro de chave estrangeira. Verifique as dependências.' });
  } else if (err instanceof ValidationError) {
    return res.status(400).json({ message: 'Erro de validação. Verifique os dados enviados.' });
  } else {
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


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
