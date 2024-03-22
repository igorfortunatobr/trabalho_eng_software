const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{
    tableName: 'categoria',
    timestamps: true // Adicionando os campos createdAt e updatedAt
});

module.exports = Categoria;
