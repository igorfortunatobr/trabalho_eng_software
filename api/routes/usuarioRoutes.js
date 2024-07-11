const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario/modelUsuario');
const { verificarToken }  = require("../middleware/authMiddleware")


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Criptografar a senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        const userData = {
            nome: nome,
            email: email,
            senha: hashedSenha
        }

        // Criar o usuário no banco de dados
        const usuario = await Usuario.create(userData);

        delete usuario.dataValues.senha;
        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        global.UTILS.handleSequelizeError(error, res);
    }
});

// Atualização do usuário
router.put('/', verificarToken, async (req, res) => {
    try {
      const userId = req.userId; // ID do usuário autenticado
      const { nome } = req.body;

      // Criar o usuário no banco de dados
      const userData = {
        nome: nome,
      }
  
      // Atualizar os dados do usuário
      await Usuario.update(userData, { where: { id: userId } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      global.UTILS.handleSequelizeError(error, res);
    }
});

// Atualização da senha do usuário
router.put('/changePassword/', verificarToken, async (req, res) => {
    try {
      const userId = req.userId; // ID do usuário autenticado
      const { senha } = req.body;

      if (!senha) res.status(400).json({message: 'Não foi informada nenhuma senha para alteração.'})

      // Criptografar a senha
      const hashedSenha = await bcrypt.hash(senha || "", 10);

      // Criar o usuário no banco de dados
      const userData = {
        senha: hashedSenha
      }
  
      // Atualizar os dados do usuário
      await Usuario.update(userData, { where: { id: userId } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      global.UTILS.handleSequelizeError(error, res);
    }
});

router.get('/', verificarToken, async (req, res) => {
    try {
      const userId = req.userId; // ID do usuário autenticado

      const usuario = await Usuario.findOne(
        {
          attributes: { exclude: ['senha'] }
        },
        { 
          where: { id: userId } 
        }
      );
      
      res.json(usuario);
    } catch (error) {
      console.error(error);
      global.UTILS.handleSequelizeError(error, res);
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const { senha } = req.body;

    //const usuario = await Usuario.findOne({ where: { id: userId } });

    //bcrypt.compareSync(senha, usuario.senha)

    await Usuario.destroy({ where: { id: userId } });

  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
})

module.exports = router;
