const express = require('express');
const Transacao = require('../model/transacao/modelTransacao');
const CategoriaTransacao = require('../model/categoriaTransacao/modelCategoriaTransacao');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Criar a transação
    const transacao = await Transacao.create(req.body.transacao);

    // Criar as categorias de transação
    const categorias = req.body.categorias.map(categoria => {
      return {
        ...categoria,
        idTransacao: transacao.id
      };
    });
    await CategoriaTransacao.bulkCreate(categorias);

    res.status(201).json({ transacao, categorias });
  } catch (error) {
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
