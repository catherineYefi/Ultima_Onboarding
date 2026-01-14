import React from "react";
import { MapPin, CalendarDays, ClipboardList, CheckCircle2 } from "lucide-react";

/**
 * Start-СС (офлайн, 2 дня)
 * Ожидаемые (необязательные) поля в content.sections.ssOffline:
 * {
 *   title?: string,
 *   format?: string,                     // короткое описание формата
 *   days?: Array<{ title: string, items: string[] }>, // план по дням
 *   results?: string[]                   // что должно быть на выходе
 * }
 */
export default function SSOffline({ content }) {
  const sso = content?.sections?.ssOffline ?? {};

  const title = sso?.title ?? "Start-СС (офлайн, 2 дня)";
  const format =
    sso?.format ?? "2 дня офлайн (Start-СС: день 1 и день 2)";

  const days = Array.isArray(sso?.days) && sso.days.length > 0
    ? sso.days
    : [
        {
          title: "День 1 — Фокус и экономика",
          items: [
            "Вводная рамка и цели сезона",
            "Фокус: стратегия, продукт, сегменты",
            "Экономика: каналы, юнит-экономика, приоритеты",
          ],
        },
        {
          title: "День 2 — Дорожная карта и контроль",
          items: [
            "Фиксируем WIG/OKR и ключевые метрики",
            "Настраиваем приборы контроля",
            "Собираем дорожную карту на 12 недель",
          ],
        },
      ];

  const results = Array.isArray(sso?.results) && sso.results.length > 0
    ? sso.results
    : [
        "Определены WIG/OKR",
        "Настроены приборы контроля",
        "Собрана дорожная карта на 12 недель",
      ];

  return (
    <section id="ss-offline" className="section container ss-offline">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">{format}</p>
      </div>

      <div className="ss-grid fade-in">
        {/* Формат и место */}
        <div className="ss-card">
          <div className="ss-card-header">
            <div className="ss-icon"><MapPin size={22} /></div>
            <h3>Формат</h3>
          </div>
          <p className="muted">{format}</p>
          <ul className="ss-list">
            <li>Полное погружение, «режим закрытой комнаты»</li>
            <li>Командная работа и фасилитация</li>
            <li>Чёткие артефакты на выходе</li>
          </ul>
        </div>

        {/* По дням */}
        <div className="ss-card">
          <div className="ss-card-header">
            <div className="ss-icon"><CalendarDays size={22} /></div>
            <h3>План по дням</h3>
          </div>

          {days.map((d, i) => (
            <div key={i} className="ss-day">
              <h4>{d?.title || `День ${i + 1}`}</h4>
              <ul className="ss-list">
                {(Array.isArray(d?.items) ? d.items : []).map((it, k) => (
                  <li key={k}>{String(it)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Результаты */}
        <div className="ss-card">
          <div className="ss-card-header">
            <div className="ss-icon"><ClipboardList size={22} /></div>
            <h3>Результаты на выходе</h3>
          </div>
          <ul className="ss-results">
            {results.map((r, i) => (
              <li key={i}>
                <CheckCircle2 size={18} />
                <span>{String(r)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
