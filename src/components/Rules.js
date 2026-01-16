import React from "react";

export default function Rules() {
  return (
    <section id="rules" className="section container">
      <h2 className="section-title">Правила ULTIMA</h2>

      <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(102, 126, 234, 0.2)', display: 'inline-block' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Регламент и дисциплина</h3>
        <button 
          className="cta-button primary" 
          onClick={() => window.open('https://vagabond-cadmium-aba.notion.site/Ultima-277308771f1a806ca33cf2ae29092b8b?source=copy_link', '_blank', 'noopener,noreferrer')}
        >
          Открыть правила
        </button>
      </div>
    </section>
  );
}
