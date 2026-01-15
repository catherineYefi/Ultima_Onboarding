import React from "react";
import {
  Clock,
  Users,
  BarChart2,
  Activity,
  CheckSquare,
  Target,
  ArrowRight,
  Tv2,
} from "lucide-react";

/**
 * Главный цикл (6 месяцев)
 * Поддерживает rhythm как объект: { description, meetings[], additional[] }
 * Добавлена секция expertSessions согласно ТЗ.
 */
export default function MainCycle({ content, scrollToSection }) {
  const mc = content?.sections?.mainCycle ?? {};

  const title = mc?.title ?? "Основной цикл (6 месяцев)";
  const lead =
    mc?.lead ??
    "Работаем в недельном ритме: месяц 1 — трекер каждую неделю; затем чередование трекер/лидер. Бадди — раз в 2 недели.";

  const rhythm = mc?.rhythm && !Array.isArray(mc.rhythm) ? mc.rhythm : {
    description:
      "Месяц 1 — трекер каждую неделю; Месяцы 2–6 — чередование: неделя с трекером / неделя с лидером. Бадди — раз в 2 недели.",
    meetings: [
      { week: "Неделя 1", format: "Встреча с трекером", focus: "Разбор прогресса, препятствия, экспертиза" },
      { week: "Неделя 2", format: "Встреча с лидером группы", focus: "Командная работа, поддержка, обмен опытом" },
    ],
    additional: ["Бадди-созвоны раз в 2 недели", "P&L weekly, CRM, KPI — еженедельный апдейт"],
  };

  const metrics = Array.isArray(mc?.metrics) && mc.metrics.length > 0
    ? mc.metrics
    : [
        { name: "WIG/OKR", desc: "Главные цели сезона и ключевые результаты." },
        { name: "Unit-экономика", desc: "CAC, LTV, маржинальность, окупаемость каналов." },
        { name: "Темп роста", desc: "Недельный прирост MRR/Revenue, конверсия воронки." },
      ];

  const expert = mc?.expertSessions; // может отсутствовать

  const cta = mc?.cta ?? { label: "К дорожной карте", href: "#cycle-timeline" };

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
    <section id="main-cycle" className="section container main-cycle">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">{lead}</p>
      </div>

      {/* Ритм встреч */}
      <div className="cycle-rhythm fade-in">
        <h3 className="block-title">
          <Clock size={20} /> Недельный ритм
        </h3>
        <p>{rhythm?.description}</p>
        <div className="rhythm-grid">
          {(rhythm?.meetings || []).map((r, i) => (
            <div key={i} className="rhythm-card">
              <div className="rhythm-icon">
                {i % 3 === 0 && <Users size={22} />}
                {i % 3 === 1 && <CheckSquare size={22} />}
                {i % 3 === 2 && <Activity size={22} />}
              </div>
              <h4>{r?.title || `${r?.week ?? `Шаг ${i + 1}`}: ${r?.format ?? ""}`}</h4>
              {r?.description ? <p>{r.description}</p> : r?.focus ? <p>{r.focus}</p> : null}
            </div>
          ))}
        </div>

        {Array.isArray(rhythm?.additional) && rhythm.additional.length > 0 && (
          <ul className="final-list dots" style={{ marginTop: 10 }}>
            {rhythm.additional.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Метрики и контроль */}
      <div className="cycle-metrics fade-in">
        <h3 className="block-title">
          <BarChart2 size={20} /> Метрики и контроль
        </h3>
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={i} className="metric-card">
              <div className="metric-icon"><Target size={20} /></div>
              <div className="metric-texts">
                <div className="metric-name">{m?.name || "Метрика"}</div>
                {m?.desc && <div className="metric-desc">{m.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Эфиры с экспертами */}
      {expert && (
        <div className="cycle-experts fade-in" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <Tv2 size={20} /> {expert.title || "Эфиры с топ-экспертами"}
          </h3>
          <p className="section-subtitle" style={{ marginTop: 4 }}>
            {expert.description || "Дополнительные образовательные сессии только для участников ULTIMA"}
          </p>
          <ul className="final-list dots">
            {[
              expert.format && `Формат: ${expert.format}`,
              expert.frequency && `Частота: ${expert.frequency}`,
              expert.access && `Доступ: ${expert.access}`,
            ]
              .filter(Boolean)
              .map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      {cta?.label && (
        <div className="cycle-cta fade-in">
          <button className="cta-button primary outline" onClick={() => go(cta.href)}>
            {cta.label} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
