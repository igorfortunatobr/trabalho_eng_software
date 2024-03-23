const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST_MYSQL,
  dialect: 'mysql',
  define: {
    timestamps: true // Ativar timestamps globalmente
  }
});

// Testar a conexão
async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

testarConexao();

module.exports = sequelize;
