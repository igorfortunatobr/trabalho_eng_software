const express = require('express');
const sequelize = require('../../database/database');
const Transacao = require('../model/transacao/modelTransacao');
const CategoriaTransacao = require('../model/categoriaTransacao/modelCategoriaTransacao');

const router = express.Router();

router.post('/', async (req, res) => {
  let transaction;
  try {
    // Iniciar uma transação
    transaction = await sequelize.transaction();
    
    // Criar a transação
    const transacao = await Transacao.create(req.body.transacao, { transaction });

    // Criar as categorias de transação
    const categorias = req.body.categorias.map(categoria => {
      return {
        valor: categoria.valor,
        idTransacao: transacao.id,
        idCategoria: categoria.idCategoria
      };
    });

    await CategoriaTransacao.bulkCreate(categorias, {
      fields: ['idTransacao', 'idCategoria', 'valor', 'createdAt', 'updatedAt'],
      transaction
    });
    

    console.log("PASSOU AQUI")

    // Commit da transação se tudo ocorrer bem
    await transaction.commit();

    res.status(201).json({ transacao, categorias });
  } catch (error) {
    // Rollback da transação em caso de erro
    if (transaction) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const transacoes = await Transacao.findAll();
    res.json(transacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
