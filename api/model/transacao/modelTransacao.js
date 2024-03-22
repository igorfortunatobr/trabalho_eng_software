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
});

module.exports = Transacao;
