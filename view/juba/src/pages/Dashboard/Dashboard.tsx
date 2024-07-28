import React, { useEffect, useState, useCallback } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { Line, Pie } from "react-chartjs-2";
import api from "../../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useAlert from "../../utils/useAlert";
import Alert from "../../components/utils/Alert";
import Template from "../../components/Template/Template";
import { Button, Col, Row } from "react-bootstrap";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels,
);

export default function Dashboard() {
  const [receitasDespesasMensais, setReceitasDespesasMensais] = useState({
    receitas: [],
    despesas: [],
  });
  const [quantidadeTransacoesData, setQuantidadeTransacoesData] = useState([]);
  const [valorTransacoesData, setValorTransacoesData] = useState([]);
  const { alert, showAlert, hideAlert } = useAlert();

  const fetchData = useCallback(async () => {
    try {
      const receitasDespesasResponse = await api.get(
        "/transacoes/relacao-receitas-despesas-mensal",
      );
      setReceitasDespesasMensais(receitasDespesasResponse.data);

      const quantidadeTransacoesResponse = await api.get(
        "/transacoes/quantidade-transacoes-categoria",
      );
      setQuantidadeTransacoesData(quantidadeTransacoesResponse.data);

      const valorTransacoesResponse = await api.get(
        "/transacoes/valor-total-transacoes-categoria",
      );
      setValorTransacoesData(valorTransacoesResponse.data);
    } catch (error) {
      showAlert("Erro ao carregar dados do dashboard", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    fetchData();
  }, []);

  const receitasDespesasChartData = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Receitas",
        data: receitasDespesasMensais.receitas,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Cor quase transparente
        borderColor: "#36a2eb",
        tension: 0.4,
      },
      {
        label: "Despesas",
        data: receitasDespesasMensais.despesas,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Cor quase transparente
        borderColor: "#ff6384",
        tension: 0.4,
      },
    ],
  };

  const categoriasQuantitativoData = {
    labels: quantidadeTransacoesData.map((cat: any) => cat.nome),
    datasets: [
      {
        label: "Quantidade de Transações",
        data: quantidadeTransacoesData.map((cat: any) => cat.quantidade),
        backgroundColor: quantidadeTransacoesData.map(
          (_, i) => `hsl(${(i * 30) % 360}, 70%, 50%)`,
        ),
      },
    ],
  };

  const categoriasQualitativoData = {
    labels: valorTransacoesData.map((cat: any) => cat.nome),
    datasets: [
      {
        label: "Valor Total em R$",
        data: valorTransacoesData.map((cat: any) => cat.valor),
        backgroundColor: valorTransacoesData.map(
          (_, i) => `hsl(${(i * 30) % 360}, 70%, 50%)`,
        ),
      },
    ],
  };

  const categoriasQuantitativoOptions = {
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value: number, context: any) => {
          return value > 0 ? context.chart.data.labels[context.dataIndex] : "";
        },
      },
    },
  };

  const categoriasQualitativoOptions = {
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value: number, context: any) => {
          return value > 0 ? context.chart.data.labels[context.dataIndex] : "";
        },
      },
    },
  };

  return (
    <Template>
      <div className="container mt-5">
        <Alert
          show={alert.show}
          message={alert.message}
          variant={alert.variant}
          onClose={hideAlert}
        />
        <Row className="d-flex align-items-center">
          <Col>
            <h2>Dashboard</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={fetchData}>
              {" "}
              <div className="d-flex align-content-center">
                <LuRefreshCcw className="m-2 p-0" />{" "}
                <p className="m-0 mt-1 me-2 p-0">Atualizar</p>
              </div>
            </Button>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mb-3"></div>
        <div className="row">
          <div className="card">
            <div className="col-md-12 mb-3">
              <h3 className="mt-3">Receitas vs Despesas (Mensal)</h3>
              <Line data={receitasDespesasChartData} />
            </div>
          </div>
        </div>
        <div className="card mt-5 p-4">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3">
              <h3 className="text-center">
                Transações por Categoria (Quantidade)
              </h3>
              <Pie
                data={categoriasQuantitativoData}
                options={categoriasQuantitativoOptions}
              />
            </div>
            <div className="col-md-6 mb-3">
              <h3 className="text-center">Transações por Categoria (Valor)</h3>
              <Pie
                data={categoriasQualitativoData}
                options={categoriasQualitativoOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
