import React from "react";
import { Check } from "lucide-react";

/**
 * Sidebar компонент - боковая навигация с якорями
 * 
 * Props:
 * - activeSection: текущая активная секция
 * - scrollToSection: функция для скролла к секции
 * - progress: прогресс (0-100%)
 */
export default function Sidebar({ activeSection, scrollToSection, progress = 0 }) {
  // Группировка секций по категориям
  const sectionGroups = [
    {
      title: "Онбординг",
      sections: [
        { id: "hero", label: "Главная" },
        { id: "glossary", label: "Глоссарий" },
        { id: "intro", label: "Введение" },
        { id: "roadmap", label: "Дорожная карта" },
        { id: "checklist", label: "Чек-лист" },
        { id: "prep-ss", label: "Start-СС" },
      ],
    },
    {
      title: "Программа",
      sections: [
        { id: "about", label: "О ULTIMA" },
        { id: "rhythm", label: "Ритм работы" },
        { id: "roles", label: "Роли" },
      ],
    },
    {
      title: "Документы",
      sections: [
        { id: "documents-nda", label: "NDA" },
        { id: "documents-presentation", label: "Презентация" },
        { id: "documents-calendar", label: "Календарь" },
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
