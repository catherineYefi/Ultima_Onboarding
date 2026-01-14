import React from "react";
import {
  Flag,
  Rocket,
  CalendarCheck,
  Trophy,
  LineChart,
  TrendingUp,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

/**
 * Цикл сезона — дорожная карта
 *
 * Ожидаемая структура в content.sections.cycleTimeline (необязательна):
 * {
 *   intro?: string,
 *   stages?: [
 *     {
 *       id: "start-ss" | "main-cycle" | "graduation",
 *       title: string,
 *       subtitle?: string,
 *       icon?: "start" | "cycle" | "grad",
 *       points?: string[],
 *       cta?: { label: string, href: string } // href может быть "#prep-ss", "#calendar" и т.п.
 *     }, ...
 *   ]
 * }
 */
export default function CycleTimeline({ content, scrollToSection }) {
  const ct = content?.sections?.cycleTimeline ?? {};

  const defStages = [
    {
      id: "start-ss",
      title: "Start-СС (2 дня офлайн)",
      subtitle: "Фокус, экономика, карта работ",
      icon: "start",
      points: [
        "Финализируем WIG/OKR",
        "Ставим приборы контроля",
        "Собираем дорожную карту на 12 недель",
      ],
      cta: { label: "Подготовиться", href: "#prep-ss" },
    },
    {
      id: "main-cycle",
      title: "Главный цикл (12 недель)",
      subtitle: "Ритм встреч и отчётности",
      icon: "cycle",
      points: [
        "Неделя 1–12: спринты и контроль метрик",
        "Работа с БИ и трекерами",
        "Фокус на ROI и устранение узких мест",
      ],
      cta: { label: "О ритме встреч", href: "#main-cycle" },
    },
    {
      id: "graduation",
      title: "Выпускной",
      subtitle: "Итоги и новые горизонты",
      icon: "grad",
      points: [
        "Презентация результатов",
        "Ретроспектива и план роста",
        "Следующие шаги после сезона",
      ],
      cta: { label: "Что подготовить", href: "#final" },
    },
  ];

  const stages = Array.isArray(ct?.stages) && ct.stages.length > 0 ? ct.stages : defStages;
  const intro =
    ct?.intro ??
    "Движемся по понятной траектории: сначала фокусируемся на стратегии и метриках на Start-СС, затем работаем по недельному ритму и завершаем сезон выпускным.";

  const iconFor = (name) => {
    switch (name) {
      case "start":
        return <Rocket size={24} />;
      case "cycle":
        return <LineChart size={24} />;
      case "grad":
        return <Trophy size={24} />;
      default:
        return <Flag size={24} />;
    }
  };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      scrollToSection?.(id);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="cycle-timeline" className="section container cycle-timeline">
      <div className="section-header fade-in">
        <h2>Дорожная карта сезона</h2>
        <p className="section-subtitle">{intro}</p>
      </div>

      <ol className="timeline fade-in" aria-label="Этапы сезона ULTIMA">
        {stages.map((s, idx) => (
          <li key={s.id || idx} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true">
              <div className="timeline-pin" />
            </div>

            <div className="timeline-card">
              <div className="timeline-card-header">
                <div className="timeline-icon">{iconFor(s.icon)}</div>
                <div className="timeline-titles">
                  <h3>{s.title || "Этап"}</h3>
                  {s.subtitle && <p className="timeline-subtitle">{s.subtitle}</p>}
                </div>
              </div>

              {Array.isArray(s.points) && s.points.length > 0 && (
                <ul className="timeline-points">
                  {s.points.map((p, i) => (
                    <li key={i}>
                      <TrendingUp size={16} />
                      <span>{String(p)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.cta?.label && (
                <button
                  className="cta-button primary outline"
                  onClick={() => go(s.cta?.href)}
                  aria-label={s.cta?.label}
                >
                  {s.cta.label} <ArrowRight size={18} />
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Мини-шаги под таймлайном — если нужно подсветить рутину */}
      <div className="timeline-hints fade-in">
        <div className="hint">
          <CalendarCheck size={18} />
          Недельный ритм встреч и отчётности
        </div>
        <div className="hint">
          <ClipboardCheck size={18} />
          Материалы и дедлайны фиксируем в воркбуке
        </div>
      </div>
    </section>
  );
}
