import React from "react";
import { Calendar } from "lucide-react";

export default function CycleTimeline({ content }) {
  return (
    <section id="cycle" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <Calendar size={32} className="section-icon" />
          <h2>Цикл ULTIMA 9.0</h2>
          <p className="section-subtitle">6 месяцев системной работы</p>
        </div>
        <div className="timeline fade-in">
          {content.sections.cycle.stages.map((phase, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-number">{idx + 1}</div>
              <div className="timeline-content">
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
