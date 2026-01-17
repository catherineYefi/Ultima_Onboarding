import React from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

/**
 * Rules компонент - правила программы ULTIMA
 * VERSION 2.0 - читает из content.rules
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Rules({ id = "rules", content }) {
  const rules = content?.rules || {};

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Shield size={32} className="section-icon" />
          <h2>{rules?.title || "Правила ULTIMA"}</h2>
          <p className="section-subtitle">
            {rules?.subtitle || "Регламент и дисциплина программы"}
          </p>
        </div>

        {/* БЛОК 1: Принципы */}
        {rules?.principles && rules.principles.length > 0 && (
          <div className="rules-principles fade-in">
            <h3 className="rules-block-title">
              <CheckCircle size={24} className="rules-block-icon" />
              Принципы работы
            </h3>
            <div className="rules-principles-grid">
              {rules.principles.map((principle, idx) => (
                <div key={idx} className="rules-principle-card">
                  <div className="rules-principle-number">{idx + 1}</div>
                  <p className="rules-principle-text">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* БЛОК 2: Правила дисциплины */}
        {rules?.discipline && (
          <div className="rules-discipline fade-in">
            <h3 className="rules-block-title">
              <AlertTriangle size={24} className="rules-block-icon" />
              {rules.discipline.title || "Правила дисциплины"}
            </h3>
            {rules.discipline.items && rules.discipline.items.length > 0 && (
              <ul className="rules-list">
                {rules.discipline.items.map((item, idx) => (
                  <li key={idx} className="rules-list-item">
                    <span className="rules-list-number">{idx + 1}</span>
                    <span className="rules-list-text">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* БЛОК 3: Последствия нарушений */}
        {rules?.consequences && (
          <div className="rules-consequences fade-in">
            <h3 className="rules-block-title">
              <XCircle size={24} className="rules-block-icon" />
              {rules.consequences.title || "Последствия нарушений"}
            </h3>
            {rules.consequences.items && rules.consequences.items.length > 0 && (
              <ul className="rules-consequences-list">
                {rules.consequences.items.map((item, idx) => (
                  <li key={idx} className="rules-consequence-item">
                    <XCircle size={18} className="rules-consequence-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Кнопка полных правил (если есть ссылка) */}
        {rules?.fullRulesLink && (
          <div className="rules-cta fade-in">
            <button
              className="cta-button primary"
              onClick={() => window.open(rules.fullRulesLink, '_blank', 'noopener,noreferrer')}
            >
              Открыть полные правила
            </button>
          </div>
        )}
      </div>
    </section>
  );
}