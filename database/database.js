const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('bd_engsoftware', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql'
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
