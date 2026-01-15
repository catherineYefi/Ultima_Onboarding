import React from "react";
import {
  Trophy,
  FileText,
  CheckCircle2,
  ArrowRight,
  Share2,
  Upload,
  ExternalLink,
} from "lucide-react";

/**
 * FINAL — выпускной и сдача артефактов
 *
 * Совместимо с произвольным content.sections.final, но безопасно работает и без него.
 *
 * Ожидаемые (необязательные) поля:
 * content.sections.final = {
 *   title?: string,
 *   lead?: string,
 *   deliverables?: Array<{ name: string, desc?: string, href?: string }>,
 *   checklist?: string[],
 *   criteria?: string[],
 *   cta?: { label: string, href: string }
 * }
 */
export default function Final({ content, scrollToSection }) {
  const fin = content?.sections?.final ?? {};

  const title =
    fin?.title || "Final-СС: подведение итогов и защита результата";
  const lead =
    fin?.lead ||
    "Готовим и сдаём итоговый пакет: презентация результата, подтверждённые метрики и план на следующие 90 дней. Питч — коротко и по делу.";

  // «Что сдаём» — безопасные дефолты, чтобы блок не был пустым
  const deliverables =
    Array.isArray(fin?.deliverables) && fin.deliverables.length > 0
      ? fin.deliverables
      : [
          {
            name: "Финальная презентация (PDF, 15–20 слайдов)",
            desc: "Точка А → Точка Б → фактический результат + ключевые инсайты.",
          },
          {
            name: "Дашборд метрик",
            desc: "Скрин/ссылка на приборы контроля (P&L weekly, CRM, KPI).",
          },
          {
            name: "P&L за сезон",
            desc: "Сводка: выручка, маржа, ROMI по ключевым каналам.",
          },
          {
            name: "План на 90 дней",
            desc: "3–5 эпиков, метрики, чек-поинты, ответственные.",
          },
        ];

  // Чек-лист перед сдачей
  const checklist =
    Array.isArray(fin?.checklist) && fin.checklist.length > 0
      ? fin.checklist
      : [
          "PDF открывается и корректно отображается на экране",
          "Все цифры подтверждены источниками/скринами",
          "Ссылки и QR-коды работают",
          "Тайминг питча ≤ 7 минут, ответы на вопросы ≤ 5 минут",
        ];

  // Критерии зачёта
  const criteria =
    Array.isArray(fin?.criteria) && fin.criteria.length > 0
      ? fin.criteria
      : [
          "Подтверждённый рост по ключевым метрикам и/или ROI",
          "Прозрачные источники данных",
          "Согласованность целей, метрик и действий (WIG ↔ KPI ↔ P&L/CRM)",
        ];

  // CTA по умолчанию — вернуться к подготовке
  const cta = fin?.cta ?? { label: "К подготовке", href: "#prep-ss" };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (typeof scrollToSection === "function") return scrollToSection(id);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="final" className="section container final-section">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">{lead}</p>
      </div>

      <div className="final-grid fade-in">
        {/* Пакет артефактов */}
        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon">
              <FileText size={22} />
            </div>
            <h3>Что сдаём</h3>
          </div>
          <ul className="final-list">
            {deliverables.map((d, i) => (
              <li key={i} className="final-item">
                <CheckCircle2 size={18} />
                <div>
                  <div className="final-item-name">{d?.name || "Артефакт"}</div>
                  {d?.desc && (
                    <div className="final-item-desc">{d.desc}</div>
                  )}
                  {d?.href && (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-link"
                    >
                      Открыть <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Чек-лист готовности */}
        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon">
              <Upload size={22} />
            </div>
            <h3>Чек-лист перед сдачей</h3>
          </div>
          <ul className="final-list dots">
            {checklist.map((c, i) => (
              <li key={i}>{String(c)}</li>
            ))}
          </ul>
        </div>

        {/* Критерии зачёта */}
        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon">
              <Trophy size={22} />
            </div>
            <h3>Критерии зачёта</h3>
          </div>
          <ul className="final-list dots">
            {criteria.map((c, i) => (
              <li key={i}>{String(c)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="final-cta fade-in">
        {/* secondary = светлый текст на тёмном фоне */}
        {cta?.label && (
          <button
            className="cta-button secondary"
            onClick={() => go(cta.href)}
          >
            {cta.label} <ArrowRight size={18} />
          </button>
        )}
        <button
          className="cta-button secondary"
          onClick={() => go("#prep-ss")}
          style={{ marginLeft: 8 }}
        >
          Перейти к чек-листам <Share2 size={18} />
        </button>
      </div>
    </section>
  );
}
