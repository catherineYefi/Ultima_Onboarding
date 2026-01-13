import React from "react";
import { Flag } from "lucide-react";

export default function Final({ content }) {
  return (
    <section id="final" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <Flag size={32} className="section-icon" />
          <h2>Финал цикла</h2>
          <p className="section-subtitle">Подведение итогов и планирование</p>
        </div>
        <div className="section-block fade-in">
          <p>{content.sections.final.description}</p>
        </div>
      </div>
    </section>
  );
}
