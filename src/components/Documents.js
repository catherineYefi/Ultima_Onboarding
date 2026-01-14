import React from "react";
import { FileText, Calendar as CalendarIcon, ExternalLink, ShieldCheck } from "lucide-react";

/**
 * Организационный старт (документы)
 * - Использует content.links.* для NDA / Правила / Календарь (из normalizeContent в App.js)
 * - Отдельная карточка "Организационная презентация 9 сезона" — внешняя ссылка
 */
export default function Documents({ content }) {
  const links = content?.links || {};

  const CARDS = [
    {
      key: "nda",
      icon: <ShieldCheck size={32} />,
      title: "NDA",
      subtitle: "Соглашение о конфиденциальности",
      available: !!links?.nda?.available,
      href: links?.nda?.url || "#",
      label: links?.nda?.label || "Открыть документ",
      external: true,
    },
    {
      key: "rules",
      icon: <FileText size={32} />,
      title: "Правила ULTIMA",
      subtitle: "Регламент и дисциплина",
      available: !!links?.rules?.available,
      href: links?.rules?.url || "#rules",
      label: links?.rules?.label || "Открыть правила",
      external: false, // скроллим к секции #rules, попап откроется кнопкой там
    },
    {
      key: "calendar",
      icon: <CalendarIcon size={32} />,
      title: "Календарь Нечто",
      subtitle: "Расписание и события",
      available: !!links?.calendar?.available,
      href: links?.calendar?.url || "#calendar",
      label: links?.calendar?.label || (links?.calendar?.available ? "Открыть календарь" : "СКОРО БУДЕТ"),
      external: false,
      disabled: !links?.calendar?.available,
    },
    {
      key: "org-presentation",
      icon: <FileText size={32} />,
      title: "Организационная презентация 9 сезона",
      subtitle: "Общие ориентиры и структура сезона",
      available: true,
      href: "https://33wgq2.csb.app/",
      label: "Открыть презентацию",
      external: true,
    },
  ];

  return (
    <section id="org-start" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Организационный старт</h2>
          <p className="section-subtitle">Обязательные документы и материалы</p>
        </div>

        <div className="cards-grid fade-in">
          {CARDS.map((card) => (
            <div
              key={card.key}
              className={`doc-card ${card.disabled ? "disabled" : ""}`}
              aria-disabled={card.disabled ? "true" : "false"}
            >
              {card.icon}
              <h3>{card.title}</h3>
              <p className="doc-subtitle">{card.subtitle}</p>

              {card.available ? (
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="doc-link"
                >
                  {card.label}
                  {card.external && <ExternalLink size={16} />}
                </a>
              ) : (
                <button className="doc-link disabled" disabled>
                  {card.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
