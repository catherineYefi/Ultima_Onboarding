// src/components/CycleTimeline.js
import React from "react";
import {
  Map,
  Target,
  Calendar as CalendarIcon,
  RefreshCw,
  Flag,
  ArrowRight,
  Users,
  CheckCircle2,
} from "lucide-react";

/**
 * CycleTimeline — визуализация цикла сезона.
 *
 * По ТЗ:
 * - Убраны упоминания БИ из 12-недельной дорожной карты (БИ — только на подготовке).
 * - Уточнён ритм основного цикла:
 *    Месяц 1 — трекер каждую неделю;
 *    Месяцы 2–6 — чередование: неделя с трекером / неделя с лидером;
 *    Бадди-созвоны раз в 2 недели.
 * - CTA-кнопки используют вариант secondary (светлый текст на тёмном фоне).
 *
 * Источник данных: content.sections.cycle (+ частично content.sections.mainCycle.rhythm.additional)
 */
export default function CycleTimeline({ content, scrollToSection }) {
  const cycle = content?.sections?.cycle ?? {};
  const mcRhythm = content?.sections?.mainCycle?.rhythm ?? {};

  const title = cycle?.title ?? "Цикл сезона";
  const note =
    cycle?.note ??
    "Важно: группы работают асинхронно. Даты Start-СС и основного цикла определяются индивидуально для каждой группы.";

  // Стадии цикла — берём из контента, иначе дефолт из ТЗ
  const stages =
    Array.isArray(cycle?.stages) && cycle.stages.length > 0
      ? cycle.stages
      : [
          {
            title: "Подготовка к СС",
            description:
              "3 встречи с БИ + Pre-Ultima Booster + AI-наставник. БИ участвует только на этапе подготовки.",
            icon: <Target size={18} />,
          },
          {
            title: "Start-СС (2 дня offline)",
            description:
              "Фиксируем точку А, выбираем WIG, настраиваем приборы и собираем дорожную карту.",
            icon: <Flag size={18} />,
          },
          {
            title: "Основной цикл (6 месяцев)",
            description:
              "Месяц 1 — трекер каждую неделю; Месяцы 2–6 — чередование: неделя с трекером / неделя с лидером; Бадди-созвоны раз в 2 недели.",
            icon: <RefreshCw size={18} />,
          },
          {
            title: "Final-СС (на слёте)",
            description:
              "Презентация результата, подтверждённые метрики, план следующего цикла.",
            icon: <CalendarIcon size={18} />,
          },
        ];

  const additional =
    Array.isArray(mcRhythm?.additional) && mcRhythm.additional.length > 0
      ? mcRhythm.additional
      : [
          "Бадди-созвоны раз в 2 недели",
          "Еженедельный апдейт приборов: P&L, CRM, KPI",
          "2–3 слёта Нечто за сезон (мастермайнды и стратегические сессии)",
        ];

  const goto = (id) => () => {
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cycle-timeline" className="section container">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">
          Движение от подготовки к Start-СС до финальной защиты результата
        </p>
      </div>

      {/* Карточки стадий */}
      <div className="timeline-grid fade-in">
        {stages.map((s, i) => (
          <div key={i} className="timeline-card">
            <div className="timeline-icon">{s.icon || <Map size={18} />}</div>
            <div className="timeline-content">
              <h3>{s.title || `Этап ${i + 1}`}</h3>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Доп. элементы главного цикла */}
      <div className="cycle-extras fade-in">
        <h3 className="block-title">
          <Users size={20} /> Дополнительно в главном цикле
        </h3>
        <ul className="final-list dots">
          {additional.map((a, idx) => (
            <li key={idx}>
              <CheckCircle2 size={16} style={{ marginRight: 6, verticalAlign: -2 }} />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA — светлый текст на тёмном фоне */}
      <div className="final-cta fade-in" style={{ marginTop: 16 }}>
        <button className="cta-button secondary" onClick={goto("ss-offline")}>
          Программа Start-СС <ArrowRight size={16} />
        </button>
        <button
          className="cta-button secondary"
          onClick={goto("main-cycle")}
          style={{ marginLeft: 8 }}
        >
          Ритм встреч (6 месяцев) <ArrowRight size={16} />
        </button>
      </div>

      {/* Примечание */}
      <div className="muted" style={{ marginTop: 14 }}>{note}</div>
    </section>
  );
}
