import React, { useEffect } from "react";
import "./LandingPage.css"; 
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    return (
        <div className="App">
            <header className="header">
                <div className="logo-lp">
                    <img src="./logo-cadastro.png" alt="JUBA Logo" className="logo-img"/>
                </div>
            </header>
            <section className="hero">
                <p className="impact-text">Transforme sua gestão financeira com facilidade. Controle total, decisões inteligentes.</p>
                <div className="buttons">
                <button className="btn" onClick={() => navigate("/login")}>Login</button>
                <button className="btn" onClick={() => navigate("/register")}>Criar conta</button>
                </div>
            </section>
            <section className="benefits">
                <div className="benefit-card">Vantagem 1</div>
                <div className="benefit-card">Vantagem 2</div>
                <div className="benefit-card">Vantagem 3</div>
            </section>
        </div>
    );
}