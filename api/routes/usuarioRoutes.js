const express = require('express');
const Usuario = require('../model/usuario/modelUsuario');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    delete usuario.dataValues.senha;
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
        attributes: { exclude: ['senha'] }
      });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
