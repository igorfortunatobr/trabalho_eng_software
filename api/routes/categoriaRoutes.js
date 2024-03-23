const express = require('express');
const Categoria = require('../model/categoria/modelCategoria');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado

    const categoriaData = { ...req.body, idUsuario: userId };
    const categoria = await Categoria.create(categoriaData);
    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    
    const categorias = await Categoria.findAll({ where: { idUsuario: userId } });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
