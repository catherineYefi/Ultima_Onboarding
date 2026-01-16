// src/components/Onboarding.js
import React, { useState } from "react";
import { BookOpen, ListChecks, ExternalLink } from "lucide-react";

/**
 * Онбординг
 * Новая версия с табами вместо 3-х колонок для лучшей читаемости
 */
export default function Onboarding({ id = "onboarding", content }) {
  const [activeTab, setActiveTab] = useState(0);

  // Нормализация источников
  const ob =
    (content && (content.onboarding || content.sections?.onboarding)) || {};

  // Sections (массив карточек онбординга)
  const sections = Array.isArray(ob.sections) ? ob.sections : [];

  // Чек-лист
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

  // Рендеры
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
      <ul className="checklist-items">
        {items.map((t, i) => (
          <li key={i} className="checklist-item">
            <input type="checkbox" id={`item-${i}`} />
            <label htmlFor={`item-${i}`}>{String(t)}</label>
          </li>
        ))}
      </ul>
    );
  };

  const renderStages = (stages) => {
    if (!Array.isArray(stages) || stages.length === 0) return null;
    return (
      <div className="stages-grid">
        {stages.map((st, i) => (
          <div key={i} className="stage-card">
            <div className="stage-number">{i + 1}</div>
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
      <div className="glossary-grid">
        {terms.map((t, i) => (
          <div key={i} className="glossary-item">
            <div className="glossary-term">{t.term || "Термин"}</div>
            {t.definition && <div className="glossary-definition">{t.definition}</div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id={id} className="section container">
      <div className="section-header">
        <h2>Онбординг</h2>
        <p className="section-subtitle">
          Быстрый старт в ULTIMA: документы, шаги и ожидания по программе.
        </p>
      </div>

      {/* Табы для онбординг-секций */}
      {sections.length > 0 && (
        <div className="onboarding-tabs">
          <div className="tabs">
            {sections.map((sec, idx) => (
              <button
                key={sec?.id || idx}
                className={`tab-button ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {sec?.title || `Раздел ${idx + 1}`}
              </button>
            ))}
          </div>

          {sections.map((sec, idx) => {
            const c = sec?.content || {};
            return (
              <div 
                key={sec?.id || idx} 
                className={`tab-content ${activeTab === idx ? '' : 'hidden'}`}
              >
                <div className="card">
                  {sec?.subtitle && <p className="card-subtitle">{sec.subtitle}</p>}
                  {c.text && <p className="card-description">{c.text}</p>}
                  {renderBulletItems(c.items)}
                  {renderStages(c.stages)}
                  {sec?.id === "glossary" && renderGlossary(c)}
                  {renderDocuments(c.documents)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Чек-лист как отдельный блок */}
      <div className="card">
        <div className="flex flex-between">
          <h3 className="card-title">Стартовый чек-лист</h3>
          <span className="badge badge-success">{checklist.filter(Boolean).length} пунктов</span>
        </div>
        {renderBulletItems(checklist)}
      </div>
    </section>
  );
}
