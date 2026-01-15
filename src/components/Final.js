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
 * По ТЗ: заполняем "Что сдаём", чек-лист, критерии. Светлые CTA допустимы, но тут outline primary ок.
 */
export default function Final({ content, scrollToSection }) {
  const fin = content?.sections?.final ?? {};

  const title = fin?.title ?? "Final-СС: подведение итогов";
  const lead =
    fin?.lead ??
    "Готовим и сдаём итоговый пакет: презентация результата, цифры и подтверждающие артефакты. Финальная защита — краткая и по делу.";

  const deliverables =
    Array.isArray(fin?.deliverables) && fin.deliverables.length > 0
      ? fin.deliverables.map((d) =>
          typeof d === "string" ? { name: d } : d
        )
      : [
          { name: "Финальная презентация (PDF, 15–20 слайдов)", desc: "Результаты, динамика метрик, ключевые инсайты." },
          { name: "Дашборд метрик", desc: "Скрин/ссылка на актуальные приборы контроля." },
          { name: "P&L за сезон", desc: "Сводка: выручка, маржа, ROMI по ключевым каналам." },
          { name: "План на 90 дней", desc: "3–5 эпиков, метрики, чек-поинты." },
        ];

  const checklist =
    Array.isArray(fin?.checklist) && fin.checklist.length > 0
      ? fin.checklist
      : [
          "Сверстан PDF и проверен отображением на экране",
          "Все цифры подтверждены источниками/скринами",
          "Ссылки и QR-коды работают",
          "Тайминг питча ≤ 7 минут, ответы на вопросы ≤ 5 минут",
        ];

  const criteria =
    Array.isArray(fin?.criteria) && fin.criteria.length > 0
      ? fin.criteria
      : [
          "Чёткий ROI/рост ключевых метрик",
          "Прозрачные источники данных",
          "Правильные выводы и следующие шаги",
        ];

  const cta = fin?.cta ?? { label: "К подготовке", href: "#prep-ss" };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      scrollToSection?.(href.slice(1));
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
        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon"><FileText size={22} /></div>
            <h3>Что сдаём</h3>
          </div>
          <ul className="final-list">
            {deliverables.map((d, i) => (
              <li key={i} className="final-item">
                <CheckCircle2 size={18} />
                <div>
                  <div className="final-item-name">{d.name}</div>
                  {d.desc && <div className="final-item-desc">{d.desc}</div>}
                  {d.href && (
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

        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon"><Upload size={22} /></div>
            <h3>Чек-лист перед сдачей</h3>
          </div>
          <ul className="final-list dots">
            {checklist.map((c, i) => (
              <li key={i}>{String(c)}</li>
            ))}
          </ul>
        </div>

        <div className="final-card">
          <div className="final-card-header">
            <div className="final-icon"><Trophy size={22} /></div>
            <h3>Критерии зачёта</h3>
          </div>
          <ul className="final-list dots">
            {criteria.map((c, i) => (
              <li key={i}>{String(c)}</li>
            ))}
          </ul>
        </div>
      </div>

      {cta?.label && (
        <div className="final-cta fade-in">
          <button className="cta-button primary outline" onClick={() => go(cta.href)}>
            {cta.label} <ArrowRight size={18} />
          </button>
          <button className="cta-button secondary" onClick={() => go("#prep-ss")}>
            Перейти к чек-листам <Share2 size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
