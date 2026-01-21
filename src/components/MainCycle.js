import React from "react";
import {
  RefreshCw,
  Users,
  CheckSquare,
  Activity,
  BarChart2,
  Target,
  ArrowRight,
  Video,
} from "lucide-react";

/**
 * Основной цикл (6 месяцев)
 * По ТЗ:
 *  - Месяц 1: трекер каждую неделю
 *  - Месяцы 2–6: чередование — неделя с трекером / неделя с лидером
 *  - Бадди — раз в 2 недели
 *  - Блок "Эфиры с топ-экспертами"
 *  - Rhythm в content может быть объектом { description, meetings: [], additional: [] } — защитились
 */
export default function MainCycle({ id = "main-cycle", content, scrollToSection }) {
  const mc = content?.sections?.mainCycle ?? {};
  const title = mc?.title ?? "Основной цикл: 6 месяцев работы";
  const lead =
    mc?.lead ??
    "Работаем в недельном ритме: плотный старт, затем устойчивое чередование. Фокус — устранение узких мест и достижение WIG/OKR.";

  const rhythm = mc?.rhythm && typeof mc.rhythm === "object" ? mc.rhythm : {};
  const meetings = Array.isArray(rhythm?.meetings) ? rhythm.meetings : [];
  const additional = Array.isArray(rhythm?.additional) ? rhythm.additional : [];

  const expert = mc?.expertSessions;

  const cta = mc?.cta ?? { label: "К дорожной карте", href: "#cycle-timeline" };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section main-cycle">
      <div className="container">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">{lead}</p>
      </div>

      {/* Ритм по месяцам */}
      <div className="cycle-rhythm fade-in">
        <h3 className="block-title">
          <RefreshCw size={20} /> Как устроен ритм встреч
        </h3>
        <div className="rhythm-grid">
          <div className="rhythm-card">
            <div className="rhythm-icon">
              <CheckSquare size={22} />
            </div>
            <h4>Месяц 1: Плотный старт</h4>
            <p>
              Встречи с трекером <strong>каждую неделю</strong>. Задача — быстро
              запустить внедрение после Start-СС, не дать стратегии остаться на
              бумаге.
            </p>
          </div>
          <div className="rhythm-card">
            <div className="rhythm-icon">
              <Users size={22} />
            </div>
            <h4>Месяцы 2–6: Устойчивый ритм</h4>
            <p>
              Встречи <strong>каждую неделю</strong>, чередование:
            </p>
            <ul className="final-list dots" style={{ marginTop: 6 }}>
              <li>Неделя 1 → Встреча с трекером</li>
              <li>Неделя 2 → Встреча с лидером группы</li>
            </ul>
            <p className="muted">Бадди-созвоны — раз в 2 недели.</p>
          </div>
        </div>
      </div>

      {/* Конкретные форматы встреч — из content.sections.mainCycle.rhythm.meetings */}
      {meetings.length > 0 && (
        <div className="cycle-rhythm fade-in" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <Activity size={20} /> Форматы встреч
          </h3>
          <div className="rhythm-grid">
            {meetings.map((m, i) => (
              <div key={i} className="rhythm-card">
                <div className="rhythm-icon">
                  {i % 3 === 0 && <Users size={22} />}
                  {i % 3 === 1 && <CheckSquare size={22} />}
                  {i % 3 === 2 && <Activity size={22} />}
                </div>
                <h4>{m?.format || m?.title || `Встреча ${i + 1}`}</h4>
                <p>
                  <strong>{m?.week || ""}</strong>{" "}
                  {m?.focus ? `— ${m.focus}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Дополнительно */}
      {additional.length > 0 && (
        <div className="cycle-metrics fade-in" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <BarChart2 size={20} /> Дополнительно
          </h3>
          <ul className="final-list dots">
            {additional.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Эфиры с экспертами */}
      {expert && (
        <div className="cycle-metrics fade-in" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <Video size={20} /> {expert.title || "Эфиры с топ-экспертами"}
          </h3>
          <div className="metrics-card-full" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', borderRadius: '12px' }}>
            <div className="metric-icon" style={{ marginBottom: '1rem' }}>
              <Target size={24} />
            </div>
            <div className="metric-name" style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600' }}>
              {expert.description ||
                "Дополнительные образовательные сессии только для участников ULTIMA"}
            </div>
            <div className="metric-desc" style={{ lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                {expert.format ||
                  "Онлайн-эфиры с ведущими экспертами по управлению, маркетингу, продажам, HR"}
              </p>
              <p>
                {expert.frequency || "В течение сезона"}
                {expert.access ? ` • ${expert.access}` : ""}
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
