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
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Atualização do usuário
router.put('/', verificarToken, async (req, res) => {
    try {
      const { id } = req.userId; // ID do usuário autenticado
      const { nome, email } = req.body;
  
      // Verificar se o usuário está tentando editar a si mesmo
      if (req.params.id !== id.toString()) {
        return res.status(403).json({ message: 'Você só pode editar seu próprio perfil' });
      }

      // Criar o usuário no banco de dados
      const userData = {
        nome: nome,
        email: email,
      }
  
      // Atualizar os dados do usuário
      await Usuario.update(userData, { where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Atualização da senha do usuário
router.put('/changePassword', verificarToken, async (req, res) => {
    try {
      const { id } = req.userId; // ID do usuário autenticado
      const { senha } = req.body;

      if (!senha) res.status(400).json({message: 'Não foi informada nenhuma senha para alteração.'})
  
      // Verificar se o usuário está tentando editar a si mesmo
      if (req.params.id !== id.toString()) {
        return res.status(403).json({ message: 'Você só pode editar seu próprio perfil' });
      }

      // Criptografar a senha
      const hashedSenha = await bcrypt.hash(senha || "", 10);

      // Criar o usuário no banco de dados
      const userData = {
        senha: hashedSenha
      }
  
      // Atualizar os dados do usuário
      await Usuario.update(userData, { where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

/*router.get('/', async (req, res) => {
    try {
    const usuarios = await Usuario.findAll({
        attributes: { exclude: ['senha'] }
        });
    res.json(usuarios);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
    }
});*/

module.exports = router;
