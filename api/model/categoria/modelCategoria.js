const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
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
