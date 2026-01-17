import React from "react";
import {
  Trophy,
  FileText,
  CheckCircle2,
  Upload,
  Target,
  Award,
} from "lucide-react";

/**
 * Final компонент - Final-СС (финальная стратегическая сессия)
 * VERSION 2.0 - читает из content.finalCC
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Final({ id = "final-cc", content }) {
  const finalCC = content?.finalCC || {};

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Award size={32} className="section-icon" />
          <h2>{finalCC?.title || "Final-СС: Подведение итогов"}</h2>
          <p className="section-subtitle">
            {finalCC?.subtitle || "Защита результатов и планирование следующего цикла"}
          </p>
        </div>

        {/* Обзор */}
        {finalCC?.overview && (
          <div className="finalcc-overview fade-in">
            <p>{finalCC.overview}</p>
          </div>
        )}

        {/* 3 блока */}
        <div className="finalcc-grid fade-in">
          
          {/* БЛОК 1: Что сдаём */}
          {finalCC?.deliverables && (
            <div className="finalcc-card">
              <div className="finalcc-card-header">
                <div className="finalcc-icon">
                  <FileText size={24} />
                </div>
                <h3>{finalCC.deliverables.title || "Что сдаём"}</h3>
              </div>
              {finalCC.deliverables.items && finalCC.deliverables.items.length > 0 && (
                <ul className="finalcc-list">
                  {finalCC.deliverables.items.map((item, idx) => (
                    <li key={idx} className="finalcc-list-item">
                      <CheckCircle2 size={18} className="finalcc-list-icon" />
                      <div className="finalcc-list-content">
                        <div className="finalcc-item-name">{item.name}</div>
                        {item.description && (
                          <div className="finalcc-item-desc">{item.description}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* БЛОК 2: Чек-лист перед сдачей */}
          {finalCC?.checklist && (
            <div className="finalcc-card">
              <div className="finalcc-card-header">
                <div className="finalcc-icon">
                  <Upload size={24} />
                </div>
                <h3>{finalCC.checklist.title || "Чек-лист перед сдачей"}</h3>
              </div>
              {finalCC.checklist.items && finalCC.checklist.items.length > 0 && (
                <ul className="finalcc-checklist">
                  {finalCC.checklist.items.map((item, idx) => (
                    <li key={idx} className="finalcc-checklist-item">
                      <CheckCircle2 size={16} className="finalcc-checklist-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* БЛОК 3: Критерии зачёта */}
          {finalCC?.criteria && (
            <div className="finalcc-card highlight">
              <div className="finalcc-card-header">
                <div className="finalcc-icon">
                  <Trophy size={24} />
                </div>
                <h3>{finalCC.criteria.title || "Критерии зачёта"}</h3>
              </div>
              {finalCC.criteria.items && finalCC.criteria.items.length > 0 && (
                <ul className="finalcc-criteria">
                  {finalCC.criteria.items.map((item, idx) => (
                    <li key={idx} className="finalcc-criteria-item">
                      <Target size={16} className="finalcc-criteria-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Результат */}
        {finalCC?.outcome && (
          <div className="finalcc-outcome fade-in">
            <div className="finalcc-outcome-header">
              <Award size={24} className="finalcc-outcome-icon" />
              <h3>{finalCC.outcome.title || "Результат Final-СС"}</h3>
            </div>
            <p className="finalcc-outcome-text">{finalCC.outcome.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}