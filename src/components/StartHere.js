import React from "react";
import {
  ArrowRight,
  FileText,
  Brain,
  Calendar as CalendarIcon,
  CheckCircle2,
} from "lucide-react";

/**
 * START HERE — быстрый старт онбординга
 * - 3 карточки-навигации: Организационный старт, Подготовка к СС, Календарь
 * - Учитывает content.links (calendar может быть "СКОРО БУДЕТ")
 * - CTA "Начать" ведёт в "Орг. старт"
 */
export default function StartHere({ content, scrollToSection }) {
  const go = (idOrUrl) => {
    if (!idOrUrl) return;
    if (idOrUrl.startsWith("#")) {
      const id = idOrUrl.replace("#", "");
      scrollToSection?.(id);
    } else {
      window.open(idOrUrl, "_blank", "noopener,noreferrer");
    }
  };

  const links = content?.links || {};
  const canOpenCalendar = Boolean(links?.calendar?.available);

  const cards = [
    {
      id: "org-start",
      title: "Организационный старт",
      subtitle: "Обязательные документы",
      icon: <FileText size={28} />,
      bullets: [
        "NDA — шаблон и соглашение",
        "Правила группы — попап в разделе",
        "Орг. презентация 9 сезона",
      ],
      action: {
        label: "Перейти",
        onClick: () => go("#org-start"),
      },
    },
    {
      id: "prep-ss",
      title: "Подготовка к стратегической сессии",
      subtitle: "Чек-листы, Booster, AI-наставник",
      icon: <Brain size={28} />,
      bullets: [
        "3 встречи с БИ",
        "Pre-Ultima Booster",
        "AI-наставник — строгий трекер",
      ],
      action: {
        label: "Открыть подготовку",
        onClick: () => go("#prep-ss"),
      },
    },
    {
      id: "calendar",
      title: "Календарь Нечто",
      subtitle: "Расписание и события",
      icon: <CalendarIcon size={28} />,
      bullets: [
        "Общий ритм экосистемы",
        "Ключевые события ULTIMA",
        links?.calendar?.available ? "Доступен" : "СКОРО БУДЕТ",
      ],
      action: links?.calendar?.available
        ? {
            label: "Открыть календарь",
            onClick: () => go("#calendar"),
          }
        : {
            label: links?.calendar?.label || "СКОРО БУДЕТ",
            onClick: () => go("#calendar"),
            disabled: true,
          },
      muted: !canOpenCalendar,
    },
  ];

  return (
    <section id="start-here" className="section container start-here">
      <div className="section-header fade-in">
        <h2>Начать онбординг</h2>
        <p className="section-subtitle">
          Три шага для быстрого входа в сезон ULTIMA 9.0
        </p>
      </div>

      <div className="starthere-grid fade-in">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`start-card ${card.muted ? "muted" : ""}`}
            aria-disabled={card.action?.disabled ? "true" : "false"}
          >
            <div className="start-card-header">
              <div className="start-card-icon">{card.icon}</div>
              <div className="start-card-titles">
                <h3>{card.title}</h3>
                <p className="start-card-subtitle">{card.subtitle}</p>
              </div>
            </div>

            <ul className="start-card-list">
              {card.bullets.map((b, i) => (
                <li key={i} className="start-card-listitem">
                  <CheckCircle2 size={16} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <button
              className={`cta-button ${card.action?.disabled ? "disabled" : "primary"}`}
              onClick={card.action?.onClick}
              disabled={card.action?.disabled}
              aria-label={card.action?.label}
            >
              {card.action?.label}
              {!card.action?.disabled && <ArrowRight size={18} />}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
