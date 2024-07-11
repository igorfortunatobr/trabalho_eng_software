const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Transacao = require('../transacao/modelTransacao'); // Importe o modelo Transacao aqui
const Categoria = require('../categoria/modelCategoria'); // Importe o modelo Categoria aqui

const CategoriaTransacao = sequelize.define('CategoriaTransacao', {
    idTransacao: {
        type: DataTypes.INTEGER, // Tipo deve corresponder ao tipo de dado na tabela transacao
        allowNull: false,
        primaryKey: true
    },
    idCategoria: {
        type: DataTypes.INTEGER, // Tipo deve corresponder ao tipo de dado na tabela categoria
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, 
{
    tableName: 'categoriatransacao',
    timestamps: true // Adicionando os campos createdAt e updatedAt
});

// Defina as associações com os modelos Transacao e Categoria
CategoriaTransacao.belongsTo(Transacao, { foreignKey: 'idTransacao', onDelete: 'CASCADE' });
CategoriaTransacao.belongsTo(Categoria, { foreignKey: 'idCategoria', onDelete: 'CASCADE' });

module.exports = CategoriaTransacao;
