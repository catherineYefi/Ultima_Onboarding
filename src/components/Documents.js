import React from "react";
import { FileText, Calendar, ExternalLink } from "lucide-react";

export default function Documents({ content }) {
  return (
    <section id="org-start" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Организационный старт</h2>
          <p className="section-subtitle">Обязательные документы</p>
        </div>
        <div className="cards-grid fade-in">
          <div className="doc-card">
            <FileText size={32} />
            <h3>NDA</h3>
            <p>Соглашение о конфиденциальности</p>
            {content.links.nda.available ? (
              <a
                href={content.links.nda.url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                Открыть документ
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="doc-link disabled" disabled>
                {content.links.nda.label}
              </button>
            )}
          </div>
          <div className="doc-card">
            <FileText size={32} />
            <h3>Правила ULTIMA</h3>
            <p>Регламент и дисциплина</p>
            {content.links.rules.available ? (
              <a
                href={content.links.rules.url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                Открыть документ
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="doc-link disabled" disabled>
                {content.links.rules.label}
              </button>
            )}
          </div>
          <div className="doc-card">
            <Calendar size={32} />
            <h3>Календарь Нечто</h3>
            <p>Расписание и события</p>
            {content.links.calendar.available ? (
              <a
                href={content.links.calendar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                Открыть календарь
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="doc-link disabled" disabled>
                {content.links.calendar.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
