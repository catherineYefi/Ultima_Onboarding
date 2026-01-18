import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

/**
 * OrganizationalSteps компонент - организационные шаги подготовки
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 * - scrollToSection: функция для навигации (опционально)
 */
export default function OrganizationalSteps({ id = "org-steps", content, scrollToSection }) {
  const orgSteps = content?.organizationalSteps || {};
  const steps = orgSteps?.steps || [];

  // Обработка клика по кнопке действия
  const handleAction = (actionLink) => {
    if (!actionLink) return;

    if (actionLink.startsWith("#")) {
      // Внутренняя ссылка - скролл к секции
      const targetId = actionLink.slice(1);
      if (scrollToSection) {
        scrollToSection(targetId);
      } else {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Внешняя ссылка
      window.open(actionLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header">
          <h2 className="section-title">
            {orgSteps?.title || "Организационные шаги"}
          </h2>
          <p className="section-subtitle">
            {orgSteps?.subtitle || "Что нужно сделать для комфортного старта"}
          </p>
        </div>

        {/* Список шагов */}
        <div className="org-steps-list">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="org-step-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Номер шага */}
              <div className="org-step-number">
                <span>{step.number}</span>
              </div>

              {/* Контент шага */}
              <div className="org-step-content">
                <h3 className="org-step-title">{step.title}</h3>
                <p className="org-step-description">{step.description}</p>

                {/* Кнопка действия (если есть) */}
                {step.action && (
                  <button
                    className="org-step-action"
                    onClick={() => handleAction(step.actionLink)}
                  >
                    <span>{step.action}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {/* Иконка завершения (декоративная) */}
              <div className="org-step-check">
                <CheckCircle size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Мотивационная заметка */}
        {orgSteps?.note && (
          <div className="org-steps-note">
            {orgSteps.note}
          </div>
        )}
      </div>
    </section>
  );
}