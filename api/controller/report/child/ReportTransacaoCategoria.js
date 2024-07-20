const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportTransacaoCategoria extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { '$transacao.idUsuario$': this.userId };

        if (this.filtro) {
            // Adicione lógica para processar os filtros aqui
            Object.assign(whereClause, this.filtro);
        }

        const transacoesCategorias = await CategoriaTransacao.findAll({
            include: [
                { model: Categoria },
                { model: Transacao, where: whereClause }
            ]
        });
        return this.gerarPDF(transacoesCategorias);
    }

    montarConteudo(doc, data) {
        doc.fontSize(16).text('Relatório de Transações por Categoria');
        data.forEach(item => {
            doc.fontSize(12).text(`Categoria: ${item.categoria.nome} - Transação ID: ${item.transacao.id} - Valor: ${item.valor}`);
        });
    }
}

module.exports = {ReportTransacaoCategoria};