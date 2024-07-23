const { Sequelize, Op } = require('sequelize');
const CategoriaTransacao = require('../../../model/categoriaTransacao/modelCategoriaTransacao');
const Transacao = require('../../../model/transacao/modelTransacao');
const Categoria = require('../../../model/categoria/modelCategoria');
const sequelize = require('../../../../database/database');

const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportGastosCategoria extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { '$transacao.idUsuario$': this.userId };
        const whereClauseTransacao = {...whereClause};
        

         if (this.filtro) {
            // Adicionar filtro de data se dataInicio e dataFim forem fornecidos
            if (this.filtro.dataInicio && this.filtro.dataFim) {
                whereClauseTransacao.data = {
                    [Op.between]: [
                        Sequelize.fn('DATE', this.filtro.dataInicio),
                        Sequelize.fn('DATE', this.filtro.dataFim)
                    ],
                };
            }
        }

        const gastosPorCategoria = await CategoriaTransacao.findAll({
            include: [
                {
                    model: Transacao,
                    as: 'Transacao',
                    attributes: ['data', 'tipo'], // Campos que você deseja retornar
                    where: whereClauseTransacao
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