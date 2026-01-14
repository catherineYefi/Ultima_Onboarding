import React from "react";
import {
  Gauge,
  Users,
  Workflow,
  Target,
  ClipboardCheck,
  Settings2,
  Sparkles,
  Map,
  ArrowRight,
  BarChart2,
  ShieldCheck,
} from "lucide-react";

/**
 * Формула неизбежности результата
 * Поддерживает произвольную структуру из content.sections.formula, но безопасно работает и без неё.
 *
 * Ожидаемые (необязательные) поля:
 * content.sections.formula = {
 *   title?: string,
 *   subtitle?: string,
 *   pillars?: Array<{ icon?: string, title: string, text?: string }>,
 *   instruments?: Array<{ name: string, desc?: string }>,
 *   flow?: Array<{ title: string, points?: string[] }>,
 *   ctaPrimary?: { label: string, href: string },
 *   ctaSecondary?: { label: string, href: string }
 * }
 */

const ICONS = {
  Gauge: <Gauge size={18} />,
  Users: <Users size={18} />,
  Workflow: <Workflow size={18} />,
  Target: <Target size={18} />,
  ClipboardCheck: <ClipboardCheck size={18} />,
  Settings2: <Settings2 size={18} />,
  Sparkles: <Sparkles size={18} />,
  BarChart2: <BarChart2 size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
};

export default function Formula({ content }) {
  const f = content?.sections?.formula ?? {};

  const title = f?.title ?? "Формула неизбежности результата";
  const subtitle =
    f?.subtitle ??
    // убрано «внешний адвайзери-борд», формула — 4 элемента
    "Трекер + Лидер + Группа + Ассистент → рост по приборам (P&L weekly, CRM, KPI, оргструктура)";

  // Столпы/основы формулы
  const pillars =
    Array.isArray(f?.pillars) && f.pillars.length > 0
      ? f.pillars
      : [
          {
            icon: "Gauge",
            title: "Приборы контроля",
            text: "P&L weekly, CRM, KPI и оргструктура: видим факты, управляем по данным.",
          },
          {
            icon: "Users",
            title: "Группа и лидер",
            text: "ROI-дисциплина, взаимная ответственность и фокус на результат.",
          },
          {
            icon: "Workflow",
            title: "Спринтовая работа",
            text: "12 недель после Start-СС: постановка «золотых задач» и зачёт по чек-листу.",
          },
        ];

  // Инструменты (подпирающие элементы)
  const instruments =
    Array.isArray(f?.instruments) && f.instruments.length > 0
      ? f.instruments
      : [
          { name: "P&L weekly", desc: "Недельный отчёт по финансам: выручка, маржа, расходы." },
          { name: "CRM воронка", desc: "Конверсии, сделки, темп заполнения и завершения." },
          { name: "KPI", desc: "Лидовые, продуктовые и операционные показатели." },
          { name: "Оргструктура", desc: "Роли, зоны ответственности, «шляпы» и ЦКП." },
        ];

  // Алгоритм/поток (как движется сезон)
  const flow =
    Array.isArray(f?.flow) && f.flow.length > 0
      ? f.flow
      : [
          {
            title: "Цели и фокус",
            points: [
              "Формулируем WIG/OKR с измеримыми критериями",
              "Определяем «золотые задачи» на 2 недели",
            ],
          },
          {
            title: "Ритм и отчётность",
            points: [
              "Каждую неделю — обновление приборов контроля",
              "Разбор узких мест, корректировка плана",
            ],
          },
          {
            title: "Защита результата",
            points: [
              "Подтверждённый рост по метрикам и P&L",
              "Итоговая презентация и план на 90 дней",
            ],
          },
        ];

  // CTA (кнопки)
  const ctaPrimary = f?.ctaPrimary ?? {
    label: "Смотреть ритм встреч",
    href: "#main-cycle",
  };
  const ctaSecondary = f?.ctaSecondary ?? {
    label: "Дорожная карта 12 недель",
    href: "#cycle-timeline",
  };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="formula" className="section">
      <div className="container">
        {/* Заголовок */}
        <div className="section-header">
          <h2>{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Столпы формулы */}
        <div className="cards-grid">
          {pillars.map((p, i) => (
            <div key={i} className="doc-card">
              <div className="ap-icon">
                {p?.icon && ICONS[p.icon] ? ICONS[p.icon] : <Sparkles size={18} />}
              </div>
              <h3>{p?.title || "Без названия"}</h3>
              <p className="doc-subtitle">{p?.text || "Описание будет позже."}</p>

              {/* Для совместимости: иногда хотят внутрь кнопок в каждом столпе */}
              {i === 0 && (
                <button className="cta-button secondary" onClick={() => go("#main-cycle")}>
                  Смотреть ритм встреч
                </button>
              )}
              {i === 1 && (
                <button className="cta-button secondary" onClick={() => go("#ss-offline")}>
                  Стартовая СС офлайн
                </button>
              )}
              {i === 2 && (
                <button className="cta-button secondary" onClick={() => go("#cycle-timeline")}>
                  Дорожная карта 12 недель
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Инструменты формулы */}
        <div className="cycle-metrics" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <BarChart2 size={20} /> Инструменты и контроль
          </h3>
          <div className="metrics-grid">
            {instruments.map((m, i) => (
              <div key={i} className="metric-card">
                <div className="metric-icon"><ShieldCheck size={18} /></div>
                <div className="metric-texts">
                  <div className="metric-name">{m?.name || "Инструмент"}</div>
                  {m?.desc && <div className="metric-desc">{m.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Алгоритм/поток */}
        <div className="cycle-rhythm" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <Settings2 size={20} /> Как работает формула
          </h3>
          <div className="rhythm-grid">
            {flow.map((step, i) => (
              <div key={i} className="rhythm-card">
                <div className="rhythm-icon"><Target size={20} /></div>
                <h4>{step?.title || `Шаг ${i + 1}`}</h4>
                <ul className="final-list dots" style={{ marginTop: 8 }}>
                  {(Array.isArray(step?.points) ? step.points : []).map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Общие CTA секции */}
        <div className="final-cta" style={{ marginTop: 20 }}>
          {/* используем secondary, чтобы текст был СВЕТЛЫЙ на тёмном фоне */}
          {ctaPrimary?.label && (
            <button
              className="cta-button secondary"
              onClick={() => go(ctaPrimary.href)}
            >
              {ctaPrimary.label} <ArrowRight size={18} />
            </button>
          )}
          {ctaSecondary?.label && (
            <button
              className="cta-button secondary"
              onClick={() => go(ctaSecondary.href)}
              style={{ marginLeft: 8 }}
            >
              {ctaSecondary.label} <Map size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
