import React from "react";

export default function Rules() {
  return (
    <section id="rules" className="section container">
      <h2 className="section-title">Правила</h2>
      <p className="section-subtitle">
        Коротко — режим неизбежности и прозрачность. Подробно — нажми кнопку.
      </p>

      <button 
        className="cta-button primary" 
        onClick={() => window.open('https://vagabond-cadmium-aba.notion.site/Ultima-277308771f1a806ca33cf2ae29092b8b?source=copy_link', '_blank', 'noopener,noreferrer')}
      >
        Открыть правила
      </button>
    </section>
  );
}
