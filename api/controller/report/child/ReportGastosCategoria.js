const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportGastosCategoria extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { '$transacao.idUsuario$': this.userId };

        if (this.filtro) {
            // Adicione lógica para processar os filtros aqui
            Object.assign(whereClause, this.filtro);
        }

        const gastosPorCategoria = await CategoriaTransacao.findAll({
            include: [Categoria],
            attributes: [
                'idCategoria',
                [sequelize.fn('SUM', sequelize.col('valor')), 'totalGasto']
            ],
            where: whereClause,
            group: ['idCategoria']
        });
        return this.gerarPDF(gastosPorCategoria);
    }

    montarConteudo(doc, data) {
        doc.fontSize(16).text('Relatório de Gastos por Categoria');
        data.forEach(item => {
            doc.fontSize(12).text(`Categoria: ${item.categoria.nome} - Total Gasto: ${item.dataValues.totalGasto}`);
        });
    }
}

module.exports = {ReportGastosCategoria};