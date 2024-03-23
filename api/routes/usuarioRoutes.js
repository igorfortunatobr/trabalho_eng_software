const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario/modelUsuario');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Criptografar a senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        // Criar o usuário no banco de dados
        const usuario = await Usuario.create({
        nome,
        email,
        senha: hashedSenha
        });

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
