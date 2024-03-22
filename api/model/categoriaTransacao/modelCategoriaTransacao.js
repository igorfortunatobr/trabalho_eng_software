const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const CategoriaTransacao = sequelize.define('CategoriaTransacao', {
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, 
{
    tableName: 'categoriatransacao'
});

module.exports = CategoriaTransacao;
