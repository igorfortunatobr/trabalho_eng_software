import React, { useEffect, useState, useCallback } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import api from '../services/api';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useAlert from '../utils/useAlert';
import Alert from './Alert';

ChartJS.register(ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ChartDataLabels);

const Dashboard: React.FC = () => {
  const [receitasDespesasMensais, setReceitasDespesasMensais] = useState({ receitas: [], despesas: [] });
  const [quantidadeTransacoesData, setQuantidadeTransacoesData] = useState([]);
  const [valorTransacoesData, setValorTransacoesData] = useState([]);
  const { alert, showAlert, hideAlert } = useAlert();

  const fetchData = useCallback(async () => {
    try {
      const receitasDespesasResponse = await api.get('/transacoes/relacao-receitas-despesas-mensal');
      setReceitasDespesasMensais(receitasDespesasResponse.data);

      const quantidadeTransacoesResponse = await api.get('/transacoes/quantidade-transacoes-categoria');
      setQuantidadeTransacoesData(quantidadeTransacoesResponse.data);

      const valorTransacoesResponse = await api.get('/transacoes/valor-total-transacoes-categoria');
      setValorTransacoesData(valorTransacoesResponse.data);
    } catch (error) {
      showAlert('Erro ao carregar dados do dashboard', 'danger');
    }
  }, [showAlert]);

  useEffect(() => {
    fetchData();
  }, [
    
  ]);

  const receitasDespesasChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Receitas',
        data: receitasDespesasMensais.receitas,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235)', // Cor quase transparente
        borderColor: '#36a2eb',
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: receitasDespesasMensais.despesas,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132)', // Cor quase transparente
        borderColor: '#ff6384',
        tension: 0.4,
      },
    ],
  };

  const categoriasQuantitativoData = {
    labels: quantidadeTransacoesData.map((cat: any) => cat.nome),
    datasets: [
      {
        label: 'Quantidade de Transações',
        data: quantidadeTransacoesData.map((cat: any) => cat.quantidade),
        backgroundColor: quantidadeTransacoesData.map((_, i) => `hsl(${(i * 30) % 360}, 70%, 50%)`),
      },
    ],
  };

  const categoriasQualitativoData = {
    labels: valorTransacoesData.map((cat: any) => cat.nome),
    datasets: [
      {
        label: 'Valor Total em R$',
        data: valorTransacoesData.map((cat: any) => cat.valor),
        backgroundColor: valorTransacoesData.map((_, i) => `hsl(${(i * 30) % 360}, 70%, 50%)`),
      },
    ],
  };

  const categoriasQuantitativoOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value: number, context: any) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  return (
    <div className="container mt-5">
      <Alert show={alert.show} message={alert.message} variant={alert.variant} onClose={hideAlert} />
      <h2>Dashboard</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={fetchData}>Atualizar</button>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <h3>Receitas vs Despesas (Mensal)</h3>
          <Line data={receitasDespesasChartData} />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6 mb-3">
          <h3>Transações por Categoria (Quantidade)</h3>
          <Pie data={categoriasQuantitativoData} options={categoriasQuantitativoOptions} />
        </div>
        <div className="col-md-6 mb-3">
          <h3>Transações por Categoria (Valor)</h3>
          <Bar data={categoriasQualitativoData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
