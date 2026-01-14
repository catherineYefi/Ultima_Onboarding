import React from "react";
import {
  Clock,
  Users,
  BarChart2,
  Activity,
  CheckSquare,
  Target,
  ArrowRight,
} from "lucide-react";

/**
 * Главный цикл (12 недель)
 * Ожидаемые поля в content.sections.mainCycle (все необязательны):
 * {
 *   title?: string,
 *   lead?: string,
 *   rhythm?: Array<{ title: string, description?: string }>,
 *   metrics?: Array<{ name: string, desc?: string }>,
 *   cta?: { label: string, href: string }
 * }
 */
export default function MainCycle({ content, scrollToSection }) {
  const mc = content?.sections?.mainCycle ?? {};

  const title = mc?.title ?? "Главный цикл (12 недель)";
  const lead =
    mc?.lead ??
    "Работаем в недельном ритме: встречи, артефакты, метрики. Фокус — устранение узких мест и достижение WIG/OKR.";

  const rhythm = Array.isArray(mc?.rhythm)
    ? mc.rhythm
    : [
        { title: "Еженедельная встреча десятки", description: "Синхронизация, разбор прогресса, корректировки." },
        { title: "Встреча с БИ", description: "Декомпозиция задач и проработка решений." },
        { title: "Отчётность", description: "P&L weekly, приборы контроля, обновление дашборда." },
      ];

  const metrics = Array.isArray(mc?.metrics) && mc.metrics.length > 0
    ? mc.metrics
    : [
        { name: "WIG/OKR", desc: "Главные цели сезона и ключевые результаты." },
        { name: "Unit-экономика", desc: "CAC, LTV, маржинальность, окупаемость каналов." },
        { name: "Темп роста", desc: "Недельный прирост MRR/Revenue, конверсия воронки." },
      ];

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
        <div className="rhythm-grid">
          {rhythm.map((r, i) => (
            <div key={i} className="rhythm-card">
              <div className="rhythm-icon">
                {i % 3 === 0 && <Users size={22} />}
                {i % 3 === 1 && <CheckSquare size={22} />}
                {i % 3 === 2 && <Activity size={22} />}
              </div>
              <h4>{r?.title || `Шаг ${i + 1}`}</h4>
              {r?.description && <p>{r.description}</p>}
            </div>
          ))}
        </div>
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
