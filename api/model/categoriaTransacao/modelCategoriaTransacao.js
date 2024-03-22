const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const CategoriaTransacao = sequelize.define('CategoriaTransacao', {
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, 
{
    tableName: 'categoriatransacao',
    timestamps: true // Adicionando os campos createdAt e updatedAt
});

module.exports = CategoriaTransacao;
