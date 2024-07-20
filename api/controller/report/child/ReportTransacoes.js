const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportTransacoes extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { idUsuario: this.userId };

        if (this.filtro) {
            // Adicione lógica para processar os filtros aqui
            Object.assign(whereClause, this.filtro);
        }

        const transacoes = await Transacao.findAll({ where: whereClause });
        return this.gerarPDF(transacoes);
    }

    montarConteudo(doc, data) {
        doc.fontSize(16).text('Relatório de Transações');
        data.forEach(transacao => {
            doc.fontSize(12).text(`ID: ${transacao.id} - Usuário: ${transacao.idUsuario} - Valor: ${transacao.valor} - Tipo: ${transacao.tipo}`);
        });
    }
}

module.exports = {ReportTransacoes};