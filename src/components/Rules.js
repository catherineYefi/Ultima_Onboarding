import React from "react";
import { ChevronDown, ChevronUp, Shield } from "lucide-react";

export default function Rules({ content, openAccordions, toggleAccordion }) {
  return (
    <section id="rules" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <Shield size={32} className="section-icon" />
          <h2>Правила работы в ULTIMA</h2>
          <p className="section-subtitle">Стандарты и дисциплина</p>
        </div>

        {/* Principles */}
        <div className="section-block fade-in">
          <h3>Принципы ULTIMA</h3>
          <ul>
            {content.sections.rules.principles.map((principle, idx) => (
              <li key={idx}>{principle}</li>
            ))}
          </ul>
        </div>

        {/* Discipline Accordion */}
        <div className="accordion-container fade-in">
          <h3>Дисциплина</h3>
          {content.sections.rules.discipline.map((rule, idx) => (
            <div key={idx} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(idx)}
              >
                <span>{rule.title}</span>
                {openAccordions[idx] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openAccordions[idx] && (
                <div className="accordion-content">
                  <p>{rule.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
