import React from "react";
import { FileText, Calendar, ExternalLink } from "lucide-react";

export default function Documents({ content }) {
  const links = content?.links || {};
  const openRules = () => {
    window.dispatchEvent(new CustomEvent("openRules"));
  };

  return (
    <section id="org-start" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Организационный старт</h2>
          <p className="section-subtitle">Обязательные документы и материалы</p>
        </div>

        <div className="cards-grid fade-in">
          {/* NDA */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>NDA</h3>
            <p className="doc-subtitle">Соглашение о конфиденциальности</p>
            <a
              href={links?.nda?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Открыть NDA <ExternalLink size={16} />
            </a>
          </div>

          {/* Правила — открываем ОВЕРЛЕЙ */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>Правила ULTIMA</h3>
            <p className="doc-subtitle">Регламент и дисциплина</p>
            <button className="doc-link" onClick={openRules}>
              Открыть правила
            </button>
          </div>

          {/* Календарь (пока «скоро будет») */}
          <div className="doc-card" aria-disabled={!links?.calendar?.available}>
            <Calendar size={32} />
            <h3>Календарь Нечто</h3>
            <p className="doc-subtitle">Расписание и события</p>
            {links?.calendar?.available ? (
              <a
                href={links?.calendar?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                Открыть календарь <ExternalLink size={16} />
              </a>
            ) : (
              <button className="doc-link disabled" disabled>
                {links?.calendar?.label || "СКОРО БУДЕТ"}
              </button>
            )}
          </div>

          {/* Презентация 9 сезона */}
          <div className="doc-card">
            <FileText size={32} />
            <h3>Организационная презентация 9 сезона</h3>
            <p className="doc-subtitle">Общие ориентиры и структура сезона</p>
            <a
              href="https://33wgq2.csb.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Открыть презентацию <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
