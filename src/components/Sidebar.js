import React, { useEffect, useMemo, useState } from "react";

const Sidebar = ({
  activeSection = "hero",
  progress = 0,
  scrollToSection = () => {},
}) => {
  const [pinned, setPinned] = useState(true);

  const groups = useMemo(
    () => [
      { title: "Старт", items: [
        { id: "hero", label: "Вступление" },
        { id: "glossary", label: "Глоссарий" },
      ]},
      { title: "Онбординг", items: [
        { id: "about-program", label: "О программе" },
        { id: "roadmap", label: "Дорожная карта" },
        { id: "checklist", label: "Чек-лист" },
        { id: "org-steps", label: "Орг. шаги" },
        { id: "prep-start-cc", label: "Подготовка к Start-CC" },
      ]},
      { title: "Программа", items: [
        { id: "start-cc", label: "Start-CC" },
        { id: "meetings-rhythm", label: "Ритм встреч" },
        { id: "meeting-cycle", label: "Цикл встречи" },
        { id: "roles", label: "Роли" },
        { id: "wig-declaration", label: "WIG-декларация" },
        { id: "control-panel", label: "Панель контроля" },
      ]},
      { title: "Инструменты", items: [
        { id: "tools-hub", label: "Каталог инструментов" },
        { id: "calendar", label: "Календарь (оверлей)" }, // клик — откроет модалку
      ]},
      { title: "Документы и правила", items: [
        { id: "documents", label: "Документы" },
        { id: "rules", label: "Правила" },
      ]},
      { title: "Завершение", items: [{ id: "final-cc", label: "Завершение CC" }]},
    ],
    []
  );

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setPinned(true); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => scrollToSection(id);

  return (
    <aside className={`sidebar ${pinned ? "sidebar--pinned" : "sidebar--floating"}`}>
      <div className="sidebar__top">
        <button
          className="sidebar__pin"
          onClick={() => setPinned((s) => !s)}
          aria-label={pinned ? "Открепить сайдбар" : "Закрепить сайдбар"}
          title={pinned ? "Открепить" : "Закрепить"}
        >
          {pinned ? "⧉" : "📌"}
        </button>

        <div className="sidebar__progress" aria-label="Прогресс страницы">
          <div className="sidebar__progress-track">
            <div className="sidebar__progress-bar" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
          <span className="sidebar__progress-label">{Math.round(progress)}%</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Навигация по разделам">
        {groups.map((g) => (
          <div key={g.title} className="sidebar__group">
            <div className="sidebar__group-title">{g.title}</div>
            <ul className="sidebar__list">
              {g.items.map((it) => {
                const isActive = activeSection === it.id;
                return (
                  <li key={it.id} className="sidebar__item">
                    <button
                      className={`sidebar__link ${isActive ? "active" : ""}`}
                      onClick={() => go(it.id)}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {it.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
