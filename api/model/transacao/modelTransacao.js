const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tipo: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, 
{
    tableName: 'transacao',
    timestamps: true // Adicionando os campos createdAt e updatedAt
});


module.exports = Transacao;
