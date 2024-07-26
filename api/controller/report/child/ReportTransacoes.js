const { Sequelize, Op } = require('sequelize');
const Transacao = require('../../../model/transacao/modelTransacao');
const { RelatorioStrategy } = require('../base/ReportStrategy');

class ReportTransacoes extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { idUsuario: this.userId };

        if (this.filtro) {
            // Adicionar filtro de data se dataInicio e dataFim forem fornecidos
            if (this.filtro.dataInicio && this.filtro.dataFim) {
                whereClause.data = {
                    [Op.between]: [
                        Sequelize.fn('DATE', this.filtro.dataInicio),
                        Sequelize.fn('DATE', this.filtro.dataFim)
                    ]
                };
            }
            if (this.filtro.tipoTransacao)
                whereClause.tipo = this.filtro.tipoTransacao;
        }

        const transacoes = await Transacao.findAll({ where: whereClause });
        return this.gerarPDF(transacoes);
    }

    adicionarCorpo(doc, data) {
        const headers = ['ID', 'Descrição', 'Valor (R$)', 'Tipo', 'Data'];
        const rows = data.map(transacao => [
            transacao.id,
            transacao.descricao,
            transacao.valor.toFixed(2),
            global.ENVIRONMENT.TRANSACTION_TYPES[transacao.tipo],
            global.UTILS.formatDateTime(transacao.data)
        ]);

        // Calcular o total dos valores, considerando o tipo
        const total = data.reduce((acc, transacao) => {
            const valor = parseFloat(transacao.valor);
            return transacao.tipo === '1' ? acc - valor : acc + valor;
        }, 0);

        // Adicionar a linha do total ao final das linhas
        rows.push(['', 'Total:', total.toFixed(2), '', '']);

        this.desenharTabela(doc, headers, rows, 50, 150, 30);
    }
}

module.exports = { ReportTransacoes };
