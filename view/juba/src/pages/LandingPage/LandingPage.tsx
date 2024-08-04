import React, { useEffect } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="header">
        <div className="logo-lp">
          <img src="./logo-cadastro.png" alt="JUBA Logo" className="logo-img" />
        </div>
      </header>
      <section className="hero">
        <p className="impact-text">
          Transforme sua gestão financeira com facilidade. Controle total,
          decisões inteligentes.
        </p>
        <div className="buttons">
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn" onClick={() => navigate("/register")}>
            Criar conta
          </button>
        </div>
      </section>
      <section className="benefits">
        <div className="benefit-card">
          <b>Mais controle de seus gastos</b>
        </div>
        <div className="benefit-card">
          <b>Análise completa de transações</b>
        </div>
        <div className="benefit-card">
          <b>Categorização de despesas</b>
        </div>
      </section>
    </div>
  );
}
