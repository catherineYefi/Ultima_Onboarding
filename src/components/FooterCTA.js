import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function FooterCTA({ id = "footer", content, scrollToSection, setActiveTab }) {
  return (
    <section id={id} className="section footer-cta">
      <div className="container">
        <div className="footer-cta-content fade-in">
          <h2>Готовы начать?</h2>
          <p>Используйте инструменты подготовки для достижения результата</p>
          <div className="footer-actions">
            <a
              href={content.links.booster.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button primary large"
              aria-label="Открыть Pre-Ultima Booster в новой вкладке"
            >
              Перейти к Pre-Ultima Booster
              <ExternalLink size={20} aria-hidden="true" />
            </a>
            <button
              onClick={() => {
                scrollToSection("ai-mentor-block");
                setActiveTab("ai-mentor");
              }}
              className="cta-button secondary large"
              aria-label="Перейти к разделу AI-наставник"
            >
              Перейти к AI-наставнику
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
