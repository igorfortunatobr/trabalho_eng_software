const express = require('express');
const bcrypt = require('bcrypt');

const {ReportTransacoes} = require('./report/child/ReportTransacoes');
const {ReportTransacaoCategoria} = require('./report/child/ReportTransacaoCategoria');
const {ReportGastosCategoria} = require('./report/child/ReportGastosCategoria');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userId = req.userId; // ID do usuário autenticado
        const tipoRelatorio = req.query.tipo;
        const filtro = req.body;
        let strategy;

        switch (tipoRelatorio) {
            case 'transacoes':
                strategy = new ReportTransacoes(userId, filtro);
                break;
            case 'transacaoCategoria':
                strategy = new ReportTransacaoCategoria(userId, filtro);
                break;
            case 'gastosCategoria':
                strategy = new ReportGastosCategoria(userId, filtro);
                break;
            default:
                throw new Error('Tipo de relatório inválido');
        }
    
        const relatorioBase64 = await strategy.gerarRelatorio();

        res.status(200).json(relatorioBase64);

    } catch (error) {
        global.UTILS.handleSequelizeError(error, res);
    }
});