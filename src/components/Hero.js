import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ content, scrollToSection }) {
  return (
    <section id="hero" className="section hero-section">
      <div className="container">
        <div className="hero-content fade-in">
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Набор открыт • Старт январь 2025</span>
          </div>

          <h1 className="hero-title">{content.hero.title}</h1>
          <p className="hero-subtitle">{content.hero.subtitle}</p>

          {/* Accent Block */}
          <div className="hero-accent">
            <span>6 месяцев</span>
            <span className="accent-divider">•</span>
            <span>2 стратегические сессии</span>
            <span className="accent-divider">•</span>
            <span>Еженедельный ритм</span>
            <span className="accent-divider">•</span>
            <span>3 ММ в течение года</span>
          </div>

          <div className="hero-bullets">
            {content.hero.bullets.map((bullet, idx) => (
              <div key={idx} className="hero-bullet">
                {bullet}
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <button
              onClick={() => scrollToSection("prep-ss")}
              className="cta-button primary large"
              aria-label="Начать подготовку к программе ULTIMA"
            >
              Начать подготовку
              <ArrowRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
