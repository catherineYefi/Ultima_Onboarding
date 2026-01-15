import React from "react";
import { FileText, Calendar, Brain, ExternalLink } from "lucide-react";

/**
 * Организационный старт — обязательные документы и быстрые ссылки.
 *
 * Пропсы:
 *  - content (берём ссылки из content.links.*)
 *  - onOpenRules?: () => void
 *  - onOpenAIMentor?: () => void
 */
export default function Documents({ content, onOpenRules, onOpenAIMentor }) {
  const links = content?.links || {};

  const NDA_LINK = links?.nda?.url ||
    "https://drive.google.com/file/d/1s2I-HdtHI4TP1KS2yEEKaWYt7CMaGRgx/view?usp=drive_link";

  const ORG_PRESENTATION_9 = links?.orgPresentation9?.url || "https://33wgq2.csb.app/";

  const CALENDAR_ID = "#calendar";

  const AIM_GUIDE = links?.aiMentorGuide?.url ||
    "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link";

  return (
    <section id="org-start" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Организационный старт</h2>
          <p className="section-subtitle">Обязательные документы и быстрые ссылки</p>
        </div>

        <div className="cards-grid fade-in">
          {/* NDA */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>NDA</h3>
            <p>Соглашение о конфиденциальности</p>
            <a
              href={NDA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Открыть документ <ExternalLink size={16} />
            </a>
          </div>

          {/* Правила (overlay) */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>Правила ULTIMA</h3>
            <p>Регламент и дисциплина</p>
            <button
              className="doc-link"
              onClick={() => (typeof onOpenRules === "function" ? onOpenRules() : null)}
            >
              Открыть правила
            </button>
          </div>

          {/* Календарь */}
          <div className="doc-card">
            <Calendar size={32} />
            <h3>Календарь Нечто</h3>
            <p>Расписание и события</p>
            <a href={CALENDAR_ID} className="doc-link">
              Открыть календарь
            </a>
          </div>

          {/* AI-наставник */}
          <div className="doc-card">
            <Brain size={32} />
            <h3>AI-наставник</h3>
            <p>Подготовка по 17 слайдам, проверка L1/L2/L3</p>
            <div className="doc-actions-vertical">
              <button
                className="doc-link"
                onClick={() => (typeof onOpenAIMentor === "function" ? onOpenAIMentor() : null)}
              >
                Открыть подстраницу
              </button>
              <a
                href={AIM_GUIDE}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                Инструкция (Notion) <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Организационная презентация */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>Орг. презентация 9 сезона</h3>
            <p>Структура и ключевые параметры сезона</p>
            <a
              href={ORG_PRESENTATION_9}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Открыть <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
