import React, { useState } from 'react';
import api from '../services/api';
import {downloadPdf} from '../utils/downloadPDF'

const Relatorios: React.FC = () => {
  const [base64, setBase64] = useState('');

  const generateReport = async () => {
    try {
      const response = await api.post('/relatorio?tipo=transacoes');
      console.log(response.data)
      downloadPdf(response.data || "")
      /*const base64Data = Buffer.from(response.data, 'binary').toString('base64');
      setBase64(base64Data);*/
    } catch (error) {
      console.error('Erro ao gerar relatório', error);
    }
  };

  const downloadPDF = () => {
    const linkSource = `data:application/pdf;base64,${base64}`;
    const downloadLink = document.createElement('a');
    const fileName = 'relatorio.pdf';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Relatórios</h2>
        <button className="btn btn-primary" onClick={generateReport}>Gerar Relatório</button>
        {base64 && (
          <button className="btn btn-secondary ml-3" onClick={downloadPDF}>Baixar PDF</button>
        )}
      </div>
    </div>
  );
};

export default Relatorios;
