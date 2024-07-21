const Transacao = require('../../../model/transacao/modelTransacao');

const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportTransacoes extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { idUsuario: this.userId };

        if (this.filtro) {
            Object.assign(whereClause, this.filtro);
        }

        const transacoes = await Transacao.findAll({ where: whereClause });
        return this.gerarPDF(transacoes);
    }

    adicionarCorpo(doc, data) {
        const headers = ['ID', 'Valor (R$)', 'Tipo', 'Data'];
        const rows = data.map(transacao => [
            transacao.id,
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
        rows.push(['Total:', total.toFixed(2), '', '']);

        this.desenharTabela(doc, headers, rows, 50, 150, 30);
    }
}

module.exports = {ReportTransacoes};