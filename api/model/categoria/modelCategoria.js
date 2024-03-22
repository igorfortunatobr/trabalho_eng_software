const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{
    tableName: 'categoria'
});

module.exports = Categoria;
