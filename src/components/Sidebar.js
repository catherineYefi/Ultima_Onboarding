import React from "react";
import { Check } from "lucide-react";

/**
 * Sidebar компонент - боковая навигация с якорями
 * VERSION 2.0 - Новая структура по 5 секциям
 * 
 * Props:
 * - activeSection: текущая активная секция
 * - scrollToSection: функция для скролла к секции
 * - progress: прогресс (0-100%)
 */
export default function Sidebar({ activeSection, scrollToSection, progress = 0 }) {
  // ═══════════════════════════════════════════════════════════
  // НОВАЯ СТРУКТУРА НАВИГАЦИИ (5 СЕКЦИЙ)
  // ═══════════════════════════════════════════════════════════
  
  const sectionGroups = [
    {
      title: "📍 ОНБОРДИНГ",
      sections: [
        { id: "hero", label: "Главная" },
        { id: "glossary", label: "Глоссарий" },
        { id: "about-program", label: "О программе" },
        { id: "roadmap", label: "Дорожная карта" },
        { id: "checklist", label: "Чек-лист" },
        { id: "org-steps", label: "Организационные шаги" },
        { id: "prep-start-cc", label: "Подготовка к Start-СС" },
      ],
    },
    {
      title: "📍 ПРОГРАММА",
      sections: [
        { id: "start-cc", label: "Start-СС" },
        { id: "meetings-rhythm", label: "Ритм встреч" },
        { id: "meeting-cycle", label: "Цикл разбора" },
        { id: "roles", label: "Роли" },
        { id: "wig-declaration", label: "Декларация WIG" },
        { id: "control-panel", label: "Приборы контроля" },
      ],
    },
    {
      title: "📍 ИНСТРУМЕНТЫ",
      sections: [
        { id: "tools-hub", label: "Калькуляторы" },
        { id: "templates", label: "Шаблоны" },
        { id: "calendar", label: "Календарь" },
      ],
    },
    {
      title: "📍 ДОКУМЕНТЫ",
      sections: [
        { id: "documents", label: "NDA" },
        { id: "documents-presentation", label: "Презентации" },
        { id: "rules", label: "Правила" },
        { id: "ai-mentor", label: "AI-наставник" },
      ],
    },
    {
      title: "📍 ЗАВЕРШЕНИЕ",
      sections: [
        { id: "final-cc", label: "Final-СС" },
      ],
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Группы секций */}
        {sectionGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="sidebar-group">
            <h3 className="sidebar-group-title">{group.title}</h3>
            <ul className="sidebar-list">
              {group.sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`sidebar-link ${
                      activeSection === section.id ? "active" : ""
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span className="sidebar-link-icon">
                      {activeSection === section.id ? (
                        <Check size={16} />
                      ) : (
                        <span className="sidebar-dot" />
                      )}
                    </span>
                    <span>{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Прогресс-бар */}
        <div className="sidebar-progress">
          <div className="sidebar-progress-label">Прогресс</div>
          <div className="sidebar-progress-bar">
            <div
              className="sidebar-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="sidebar-progress-text">{progress}%</div>
        </div>
      </div>
    </aside>
  );
}