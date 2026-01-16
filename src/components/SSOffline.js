import React from "react";
import { MapPin } from "lucide-react";

export default function SSOffline({ id = "ss-offline", content }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header fade-in">
          <MapPin size={32} className="section-icon" />
          <h2>Стратегическая сессия (офлайн)</h2>
          <p className="section-subtitle">2 дня работы с трекером и группой</p>
        </div>
        <div className="card fade-in">
          <p>{content.sections.ssOffline.format}</p>
          <h3>Результаты СС:</h3>
          <ul>
            {content.sections.ssOffline.results.map((result, idx) => (
              <li key={idx}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
