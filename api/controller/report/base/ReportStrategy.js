const PDFDocument = require('pdfkit');

class RelatorioStrategy {

    constructor(userId, filtro) {
        this.userId = userId;
        this.filtro = filtro;
    }

    async gerarRelatorio() {
        throw new Error('Método gerarRelatorio deve ser implementado');
    }

    async gerarPDF(data) {
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            return pdfData.toString('base64');
        });

        this.montarConteudo(doc, data);

        doc.end();
    }

    montarConteudo(doc, data) {
        throw new Error('Método montarConteudo deve ser implementado');
    }
}

module.exports = {RelatorioStrategy}