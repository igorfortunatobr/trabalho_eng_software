require('dotenv').config();
const express = require('express');
const sequelize = require('./database/database');
const usuarioController = require('./api/controller/usuarioController');
const categoriaController = require('./api/controller/categoriaController');
const transacaoController = require('./api/controller/transacaoController');
const authController = require('./api/controller/auth/authController');
const relatorioController = require('./api/controller/relatorioController')
const ENVIRONMENT = require('./api/environment/environment')
const UTILS = require('./api/environment/utils')
const cors = require("cors");

const { verificarToken } = require('./api/middleware/authMiddleware');

//const categoriaTransacaoController = require('./api/controller/categoriaTransacaoController');

global.ENVIRONMENT = ENVIRONMENT;
global.UTILS = UTILS;

const app = express();

// * CORS - no origin define os sites que podem acessar a API (não aceita localhost)
app.use(
  cors({
    // origin: [
    //   "https://testes-siaweb.ddns.net/",
    //   "https://siaweb.criareti.com.br/",
    // ],
  }),
);

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

// Rotas publicas
app.use('/usuarios', usuarioController);

// Rotas de autenticação
app.use('/auth', authController);

////////////////////////////////////////////////////////
// Middleware para verificar token JWT em todas as rotas
app.use(verificarToken);
////////////////////////////////////////////////////////

// Rotas privadas
app.use('/categorias', categoriaController);
app.use('/transacoes', transacaoController);
app.use('/relatorio', relatorioController);

// Sincronização do modelo com o banco de dados e inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT_NODE, () => {
      console.log('Servidor rodando em http://localhost:' + process.env.PORT_NODE);
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
