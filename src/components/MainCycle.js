import React from "react";
import {
  RefreshCw,
  Users,
  UserCheck,
  BarChart2,
  Activity,
  ArrowRight,
} from "lucide-react";

/**
 * Рендерим rhythm как ОБЪЕКТ:
 * mainCycle.rhythm = {
 *   meetings: [{ format, focus }, ...],
 *   additional: [string, ...]
 * }
 * + блок expertSessions
 */
export default function MainCycle({ content }) {
  const mc = content?.sections?.mainCycle ?? {};
  const rhythm = mc?.rhythm && typeof mc.rhythm === "object" ? mc.rhythm : null;

  return (
    <section id="main-cycle" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <RefreshCw size={32} className="section-icon" />
          <h2>Основной цикл работы</h2>
          <p className="section-subtitle">6 месяцев регулярного внедрения</p>
        </div>

        {/* Описание ритма по месяцам */}
        <div className="rhythm-description fade-in">
          <h3>Как устроен ритм встреч:</h3>
          <div className="rhythm-months">
            <div className="rhythm-card">
              <h4>Месяц 1: Плотный старт</h4>
              <p>Встречи с трекером <strong>каждую неделю</strong>.</p>
              <p className="rhythm-goal">
                Задача: быстро запустить внедрение после Start-СС,
                не дать стратегии остаться на бумаге.
              </p>
            </div>

            <div className="rhythm-card">
              <h4>Месяцы 2–6: Устойчивый ритм</h4>
              <p>Встречи <strong>каждую неделю</strong>, но чередование:</p>
              <ul>
                <li>Неделя 1 → встреча с трекером</li>
                <li>Неделя 2 → встреча с лидером группы</li>
              </ul>
              <p className="rhythm-count">
                Итого за сезон: ~14–15 встреч с трекером + ~10 встреч с лидером.
              </p>
            </div>
          </div>
        </div>

        {/* Форматы встреч из rhythm.meetings */}
        <div className="meeting-formats fade-in">
          <h3>Два формата встреч:</h3>
          <div className="cards-grid">
            {(Array.isArray(rhythm?.meetings) ? rhythm.meetings : []).map(
              (item, idx) => (
                <div key={idx} className="card">
                  <h4>{item?.format || "Формат"}</h4>
                  {item?.focus && (
                    <p>
                      <strong>Фокус:</strong> {item.focus}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Дополнительные элементы из rhythm.additional */}
        {Array.isArray(rhythm?.additional) && rhythm.additional.length > 0 && (
          <div className="additional-elements fade-in">
            <h3>Дополнительно:</h3>
            <ul>
              {rhythm.additional.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Приборы/контроль (упрощённый блок) */}
        <div className="cycle-metrics fade-in">
          <h3 className="block-title">
            <BarChart2 size={20} /> Приборы и контроль
          </h3>
          <div className="metrics-grid">
            {[
              { name: "P&L weekly", desc: "еженедельный контроль финансов" },
              { name: "CRM", desc: "воронка и конверсии" },
              { name: "KPI", desc: "персональные и командные" },
            ].map((m, i) => (
              <div key={i} className="metric-card">
                <div className="metric-icon">
                  {i === 0 && <Activity size={18} />}
                  {i === 1 && <Users size={18} />}
                  {i === 2 && <UserCheck size={18} />}
                </div>
                <div className="metric-texts">
                  <div className="metric-name">{m.name}</div>
                  <div className="metric-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Эфиры с экспертами */}
        {mc?.expertSessions && (
          <div className="expert-sessions fade-in">
            <h3>{mc.expertSessions.title || "Эфиры с топ-экспертами"}</h3>
            <p className="muted">
              {mc.expertSessions.description ||
                "Дополнительные образовательные сессии только для участников ULTIMA"}
            </p>
            <ul className="ap-list">
              <li>
                <strong>Формат: </strong>
                {mc.expertSessions.format ||
                  "Онлайн-эфиры по управлению, маркетингу, продажам, HR"}
              </li>
              <li>
                <strong>Частота: </strong>
                {mc.expertSessions.frequency || "В течение сезона"}
              </li>
              <li>
                <strong>Доступ: </strong>
                {mc.expertSessions.access ||
                  "Записи доступны в закрытом разделе портала"}
              </li>
            </ul>
          </div>
        )}

        <div className="cycle-cta fade-in">
          <a href="#cycle-timeline" className="cta-button secondary">
            К дорожной карте <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
