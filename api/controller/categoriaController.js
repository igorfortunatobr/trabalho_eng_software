const express = require('express');
const Categoria = require('../model/categoria/modelCategoria');
const sequelize = require('../../database/database');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado

    const categoriaData = { ...req.body, idUsuario: userId };
    const categoria = await Categoria.create(categoriaData);
    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.put('/:id', async (req, res) => {
  let transaction;
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const categoriaId = req.params.id;
    const categoriaData = { ...req.body, id: categoriaId };

    // Iniciar uma transação
    transaction = await sequelize.transaction();

    // Verificar se a transação pertence ao usuário autenticado
    const categoria = await Categoria.findOne({ where: { id: categoriaId, idUsuario: userId } });

    if (!categoria) {
      await transaction.rollback();
      return res.status(403).json({ message: 'Você só pode editar suas próprias categorias.' });
    }

    // Atualizar os dados da categoria
    await Categoria.update(categoriaData, { where: { id: categoriaId, idUsuario: userId }, transaction });

    // Commit da transação se tudo ocorrer bem
    await transaction.commit();

    res.status(201).json(categoriaData);
  } catch (error) {
    console.error(error);
    // Rollback da transação em caso de erro
    if (transaction) {
      await transaction.rollback();
    }
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    
    const categorias = await Categoria.findAll({ where: { idUsuario: userId } });
    res.json(categorias);
  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const categoriaId = req.params.id;

    // Verificar se a transação pertence ao usuário
    const categoria = await Categoria.findOne({ where: { id: categoriaId, idUsuario: userId } });
    if (!categoria) {
      return res.status(403).json({ message: 'Você só pode excluir suas próprias categorias' });
    }

    await Categoria.destroy({ where: { id: categoriaId, idUsuario: userId } });

  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
})

module.exports = router;
