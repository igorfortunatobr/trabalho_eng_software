const CategoriaTransacao = require('../../../model/categoriaTransacao/modelCategoriaTransacao');
const Transacao = require('../../../model/transacao/modelTransacao');
const Categoria = require('../../../model/categoria/modelCategoria');
const sequelize = require('../../../../database/database');

const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportGastosCategoria extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { '$transacao.idUsuario$': this.userId };

        if (this.filtro) {
            // Adicione lógica para processar os filtros aqui
            Object.assign(whereClause, this.filtro);
        }

        const gastosPorCategoria = await CategoriaTransacao.findAll({
            include: [
                {
                    model: Transacao,
                    as: 'Transacao',
                    attributes: ['data', 'tipo'], // Campos que você deseja retornar
                    where: whereClause
                },
                {
                    model: Categoria,
                    as: 'Categoria',
                    attributes: ['nome'], // Campos que você deseja retornar
                }
            ],
            attributes: [
                'idCategoria',
                [sequelize.fn('SUM', sequelize.col('CategoriaTransacao.valor')), 'totalGasto']
            ],
            where: whereClause,
            group: ['idCategoria']
        });
        return this.gerarPDF(gastosPorCategoria);
    }

    adicionarCorpo(doc, data) {

        const headers = ['Categoria', 'Total Gasto (R$)'];
        const rows = data.map(item => [
            item.Categoria.nome,
            item.dataValues.totalGasto.toFixed(2)
        ]);
        this.desenharTabela(doc, headers, rows);
    }
}

module.exports = {ReportGastosCategoria};