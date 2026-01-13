import React from "react";
import { RefreshCw } from "lucide-react";

export default function MainCycle({ content }) {
  return (
    <section id="main-cycle" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <RefreshCw size={32} className="section-icon" />
          <h2>Основной цикл работы</h2>
          <p className="section-subtitle">6 месяцев системного внедрения</p>
        </div>
        <div className="cards-grid fade-in">
          {content.sections.mainCycle.rhythm.map((item, idx) => (
            <div key={idx} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
