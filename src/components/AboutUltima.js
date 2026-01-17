import React from "react";
import { BookOpen, Users, Crown, UserCheck, Clipboard, Calendar, Repeat } from "lucide-react";

/**
 * AboutUltima компонент - подробная информация о программе
 * VERSION 2.0 - с формулой неизбежности, циклом и ритмом
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function AboutUltima({ id = "about-program", content }) {
  const about = content?.aboutProgram || {};
  const formula = about?.formula || {};
  const formulaComponents = formula?.components || [];

  // Иконки для компонентов формулы
  const formulaIcons = {
    tracker: <Crown size={32} />,
    leader: <UserCheck size={32} />,
    group: <Users size={32} />,
    assistant: <Clipboard size={32} />,
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header">
          <BookOpen size={32} className="section-icon" />
          <h2 className="section-title">{about?.title || "О программе ULTIMA 9.0"}</h2>
          <p className="section-subtitle">
            {about?.subtitle || "Стратегический контур неизбежного результата"}
          </p>
        </div>

        {/* БЛОК 1: Суть программы */}
        {about?.essence && (
          <div className="about-essence">
            <p className="about-essence-text">{about.essence}</p>
          </div>
        )}

        {/* БЛОК 2: Формула неизбежности результата */}
        {formula?.title && (
          <div className="about-formula">
            <h3 className="about-formula-title">{formula.title}</h3>
            {formula?.subtitle && (
              <p className="about-formula-subtitle">{formula.subtitle}</p>
            )}

            {/* Компоненты формулы */}
            <div className="formula-grid">
              {formulaComponents.map((component, idx) => (
                <div key={idx} className="formula-card">
                  <div className="formula-card-icon">
                    {formulaIcons[component.id] || <Users size={32} />}
                  </div>
                  <h4 className="formula-card-title">{component.title}</h4>
                  <p className="formula-card-description">{component.description}</p>
                </div>
              ))}
            </div>

            {/* Результат формулы */}
            {formula?.result && (
              <div className="formula-result">
                <strong>Результат:</strong> {formula.result}
              </div>
            )}
          </div>
        )}

        {/* БЛОК 3: Цикл программы */}
        {about?.cycle && (
          <div className="about-cycle">
            <div className="about-cycle-header">
              <Calendar size={24} className="about-cycle-icon" />
              <h3 className="about-cycle-title">{about.cycle.title || "Цикл программы"}</h3>
            </div>
            <p className="about-cycle-description">{about.cycle.description}</p>
            
            {about.cycle?.stages && (
              <ul className="about-cycle-stages">
                {about.cycle.stages.map((stage, idx) => (
                  <li key={idx} className="about-cycle-stage">{stage}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* БЛОК 4: Ритм работы */}
        {about?.rhythm && (
          <div className="about-rhythm">
            <div className="about-rhythm-header">
              <Repeat size={24} className="about-rhythm-icon" />
              <h3 className="about-rhythm-title">{about.rhythm.title || "Ритм работы"}</h3>
            </div>
            <p className="about-rhythm-description">{about.rhythm.description}</p>
            
            {about.rhythm?.details && (
              <ul className="about-rhythm-details">
                {about.rhythm.details.map((detail, idx) => (
                  <li key={idx} className="about-rhythm-detail">{detail}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}