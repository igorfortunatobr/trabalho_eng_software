const CategoriaTransacao = require('../../../model/categoriaTransacao/modelCategoriaTransacao');
const Transacao = require('../../../model/transacao/modelTransacao');
const Categoria = require('../../../model/categoria/modelCategoria');

const {RelatorioStrategy} = require('../base/ReportStrategy');

class ReportTransacaoCategoria extends RelatorioStrategy {
    async gerarRelatorio() {
        const whereClause = { idUsuario: this.userId };

        const categoriaId = this.filtro.idCategoria;

        const transacoesCategorias = await CategoriaTransacao.findAll({
            where: { idCategoria: categoriaId },
            include: [
                {
                    model: Transacao,
                    as: 'Transacao',
                    attributes: ['id', 'data', 'tipo', 'valor'], // Campos que você deseja retornar
                    where: whereClause
                },
                {
                    model: Categoria,
                    as: 'Categoria',
                    attributes: ['nome'], // Campos que você deseja retornar
                    where: whereClause
                }
            ]
        });

        return this.gerarPDF(transacoesCategorias);
    }

    adicionarCorpo(doc, data) {
        // Verifique a estrutura dos dados
        data.map(item => [
            console.log(item.Transacao.dataValues.data)
        ]);

        this.subtitulo = `Trasações da categoria "${data[0].Categoria.dataValues.nome}"`;

        const headers = ['Transação ID', 'Data', 'Valor (R$)'];
        const rows = data.map(item => [
            item.Transacao ? item.Transacao.dataValues.id : 'N/A', // Protege contra undefined
            item.Transacao ? global.UTILS.formatDateTime(item.Transacao.dataValues.data) : 'N/A', // Protege contra undefined
            item.Transacao ? item.Transacao.dataValues.valor.toFixed(2) : 'N/A', // Protege contra undefined
        ]);

        this.desenharTabela(doc, headers, rows);
    }
}

module.exports = {ReportTransacaoCategoria};