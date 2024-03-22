const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');

const Transacao = sequelize.define('Transacao', {
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
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
