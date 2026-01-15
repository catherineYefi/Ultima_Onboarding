import React from "react";
import { FileText, Calendar, ExternalLink, BookOpen } from "lucide-react";

/**
 * Документы / Организационный старт
 * По ТЗ:
 *  - NDA: гугл-диск ссылка (константа)
 *  - Организационная презентация 9 сезона: https://33wgq2.csb.app/
 *  - Календарь: открываем секцию календаря (оверлей открывается из CalendarSection)
 *  - Правила: кнопка "Открыть правила" → onOpenRules()
 *  - AI-наставник: кнопка "Подробная инструкция" → onOpenAIMentor() (оверлей)
 */
const NDA_LINK =
  "https://drive.google.com/file/d/1s2I-HdtHI4TP1KS2yEEKaWYt7CMaGRgx/view?usp=drive_link";
const ORG_PRESENTATION_9 = "https://33wgq2.csb.app/";

export default function Documents({ onOpenRules, onOpenAIMentor }) {
  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="org-start" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Организационный старт</h2>
          <p className="section-subtitle">Обязательные документы и материалы</p>
        </div>

        <div className="cards-grid fade-in">
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

          <div className="doc-card">
            <FileText size={32} />
            <h3>Оргпрезентация 9 сезона</h3>
            <p>Ключевая информация для старта</p>
            <a
              href={ORG_PRESENTATION_9}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Открыть <ExternalLink size={16} />
            </a>
          </div>

          <div className="doc-card">
            <Calendar size={32} />
            <h3>Календарь Нечто</h3>
            <p>Расписание и события</p>
            <button className="doc-link" onClick={() => go("#calendar")}>
              Открыть календарь
            </button>
          </div>

          <div className="doc-card">
            <BookOpen size={32} />
            <h3>Правила ULTIMA</h3>
            <p>Регламент и дисциплина</p>
            <button
              className="doc-link"
              onClick={() =>
                typeof onOpenRules === "function"
                  ? onOpenRules()
                  : go("#rules")
              }
            >
              Открыть правила
            </button>
          </div>

          <div className="doc-card">
            <BookOpen size={32} />
            <h3>AI-наставник</h3>
            <p>Полная инструкция и промпт</p>
            <button
              className="doc-link"
              onClick={() =>
                typeof onOpenAIMentor === "function"
                  ? onOpenAIMentor()
                  : go("#prep-ss")
              }
            >
              Подробная инструкция
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
