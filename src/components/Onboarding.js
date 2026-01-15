// src/components/Onboarding.js
import React from "react";
import { BookOpen, ListChecks, ExternalLink } from "lucide-react";

/**
 * Онбординг
 * Безопасно работает с разными формами контента:
 * - content.onboarding.{sections, checklist}
 * - content.sections.onboarding.{sections, checklist}
 * Если чего-то нет — подставляет дефолты из ТЗ.
 */
export default function Onboarding({ content }) {
  // Нормализация источников
  const ob =
    (content && (content.onboarding || content.sections?.onboarding)) || {};

  // Sections (массив карточек онбординга)
  const sections = Array.isArray(ob.sections) ? ob.sections : [];

  // Чек-лист (верхний/дублирующий)
  const defaultChecklist = [
    "Подписал NDA",
    "Вступил в чаты группы",
    "Узнал про роль buddy (назначение на первой встрече)",
    "Записал видео-визитку о бизнесе (2–3 минуты)",
    'Заполнил "Точку А и Б"',
    "Подготовил презентацию для Start-СС",
    "Составил черновик декларации WIG",
    "Определил первую золотую задачу",
  ];
  const checklist = Array.isArray(ob.checklist) && ob.checklist.length > 0 ? ob.checklist : defaultChecklist;

  // Универсальные рендеры частей секции
  const renderDocuments = (docs) => {
    if (!Array.isArray(docs) || docs.length === 0) return null;
    return (
      <ul className="documents-list">
        {docs.map((d, i) => (
          <li key={i} className="document-item">
            <BookOpen size={18} />
            <a href={d.link || "#"} target="_blank" rel="noopener noreferrer">
              {d.title || "Документ"} <ExternalLink size={14} />
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderBulletItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <ul className="final-list dots">
        {items.map((t, i) => (
          <li key={i}>{String(t)}</li>
        ))}
      </ul>
    );
  };

  const renderStages = (stages) => {
    if (!Array.isArray(stages) || stages.length === 0) return null;
    return (
      <div className="rhythm-grid" style={{ marginTop: 8 }}>
        {stages.map((st, i) => (
          <div key={i} className="rhythm-card">
            <h4>{st?.title || `Шаг ${i + 1}`}</h4>
            {st?.description && <p>{st.description}</p>}
          </div>
        ))}
      </div>
    );
  };

  const renderGlossary = (content) => {
    const terms = content?.terms;
    if (!Array.isArray(terms) || terms.length === 0) return null;
    return (
      <div className="metrics-grid" style={{ marginTop: 8 }}>
        {terms.map((t, i) => (
          <div key={i} className="metric-card">
            <div className="metric-icon"><ListChecks size={18} /></div>
            <div className="metric-texts">
              <div className="metric-name">{t.term || "Термин"}</div>
              {t.definition && <div className="metric-desc">{t.definition}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="onboarding" className="section container">
      <div className="section-header fade-in">
        <h2>Онбординг</h2>
        <p className="section-subtitle">
          Быстрый старт в ULTIMA: документы, шаги и ожидания по программе.
        </p>
      </div>

      {/* Верхний чек-лист */}
      <div className="card fade-in">
        <h3 style={{ marginTop: 0 }}>Стартовый чек-лист</h3>
        {renderBulletItems(checklist)}
      </div>

      {/* Разделы онбординга */}
      <div className="cards-grid fade-in" style={{ marginTop: 16 }}>
        {(sections.length > 0 ? sections : []).map((sec, idx) => {
          const c = sec?.content || {};
          return (
            <div key={sec?.id || idx} className="doc-card">
              <h3>{sec?.title || "Раздел"}</h3>
              {sec?.subtitle && <p className="doc-subtitle">{sec.subtitle}</p>}
              {c.text && <p>{c.text}</p>}
              {renderBulletItems(c.items)}
              {renderStages(c.stages)}
              {/* Специальный случай: глоссарий */}
              {sec?.id === "glossary" && renderGlossary(c)}
              {renderDocuments(c.documents)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
