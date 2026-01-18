import React, { useMemo, useState } from "react";

/**
 * Панель контроля (Control Panel) — строгий якорь id="control-panel"
 *
 * Поддерживаемые источники данных:
 *  A) content.sections.controlPanel = {
 *       title?, subtitle?,
 *       categories?: Category[],    // группы метрик
 *       formulas?: string[],        // человекочитаемые формулы расчётов
 *       dashboards?: Dashboard[],   // ссылки на внешние панели/шиты
 *       leadLag?: { lead?: string[], lag?: string[] } // ведущие/запаздывающие метрики
 *     }
 *  Б) content.controlPanel = аналогичная структура
 *
 * Category:
 *  {
 *    key?: string,
 *    title?: string,                       // например: "Воронка продукта"
 *    metrics?: Metric[]
 *  }
 *
 * Metric:
 *  {
 *    key?: string,
 *    name?: string,                        // "DAU", "CR Signup→Activated"
 *    description?: string,
 *    target?: string,                      // "4000 к 31 мая"
 *    source?: string,                      // "Amplitude / Event: ..."
 *    owner?: string,                       // ответственный за метрику
 *    cadence?: string,                     // "еженедельно на синке"
 *    notes?: string[]                      // опционально
 *  }
 *
 * Dashboard:
 *  {
 *    title?: string,
 *    link?: string,                        // URL
 *    system?: string                       // "Looker", "GA4", "Datastudio" и пр.
 *  }
 */

const normalizeControl = (content = {}) => {
  const fromSections = content?.sections?.controlPanel || {};
  const fromRoot = content?.controlPanel || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "Панель контроля";
  const subtitle =
    src?.subtitle ||
    "Единое место для метрик, целей, источников данных и ссылок на внешние дашборды.";

  const categories = Array.isArray(src?.categories) ? src.categories : [];
  const formulas = Array.isArray(src?.formulas) ? src.formulas : [];
  const dashboards = Array.isArray(src?.dashboards) ? src.dashboards : [];
  const leadLag = {
    lead: Array.isArray(src?.leadLag?.lead) ? src.leadLag.lead : [],
    lag: Array.isArray(src?.leadLag?.lag) ? src.leadLag.lag : [],
  };

  // Безопасные дефолты, если данных мало
  const defaultsCategories =
    categories.length > 0
      ? categories
      : [
          {
            key: "funnel",
            title: "Воронка продукта",
            metrics: [
              {
                key: "dau",
                name: "DAU",
                description: "Ежедневные активные пользователи",
                target: "4 000 к 31 мая",
                source: "Amplitude / Event: session_start",
                owner: "",
                cadence: "еженедельно",
              },
              {
                key: "cr-activation",
                name: "CR Signup → Activation",
                description: "Доля активировавшихся в 7 дней",
                target: "≥ 35%",
                source: "Amplitude Cohorts + GA4",
                owner: "",
                cadence: "еженедельно",
              },
            ],
          },
        ];

  const defaultsDashboards =
    dashboards.length > 0
      ? dashboards
      : [
          {
            title: "Продуктовая панель (пример)",
            link: "#",
            system: "Datastudio",
          },
        ];

  const defaultsFormulas =
    formulas.length > 0
      ? formulas
      : [
          "DAU = количество уникальных users с событием session_start за сутки (UTC±0 или локальная зона, согласовать).",
          "CR Signup→Activation = ActivatedUsers(7d) / NewSignups(7d).",
        ];

  const defaultsLeadLag = {
    lead: leadLag.lead.length
      ? leadLag.lead
      : ["Число приглашённых по рефералке", "Запущенные эксперименты/неделя"],
    lag: leadLag.lag.length ? leadLag.lag : ["DAU", "Месячная выручка", "NPS"],
  };

  // Нормализация
  const normCategories = defaultsCategories.map((c, idx) => ({
    key: c?.key || `cat-${idx}`,
    title: c?.title || "Категория",
    metrics: Array.isArray(c?.metrics)
      ? c.metrics.map((m, j) => ({
          key: m?.key || `m-${idx}-${j}`,
          name: m?.name || "Метрика",
          description: m?.description || "",
          target: m?.target || "",
          source: m?.source || "",
          owner: m?.owner || "",
          cadence: m?.cadence || "",
          notes: Array.isArray(m?.notes) ? m.notes : [],
        }))
      : [],
  }));

  const normDashboards = defaultsDashboards.map((d, i) => ({
    title: d?.title || `Дашборд ${i + 1}`,
    link: d?.link || "#",
    system: d?.system || "",
  }));

  return {
    title,
    subtitle,
    categories: normCategories,
    formulas: defaultsFormulas,
    dashboards: normDashboards,
    leadLag: defaultsLeadLag,
  };
};

const MetricItem = ({ m }) => {
  return (
    <li className="cp__metric">
      <div className="cp__metric-head">
        <h5 className="cp__metric-name">{m.name}</h5>
        {m.target && <span className="cp__metric-target">Цель: {m.target}</span>}
      </div>
      {m.description && <p className="cp__metric-desc">{m.description}</p>}
      <ul className="cp__meta">
        {m.source && (
          <li className="cp__meta-item">
            <span className="cp__meta-label">Источник:</span> {m.source}
          </li>
        )}
        {m.owner && (
          <li className="cp__meta-item">
            <span className="cp__meta-label">Владелец:</span> {m.owner}
          </li>
        )}
        {m.cadence && (
          <li className="cp__meta-item">
            <span className="cp__meta-label">Ритм:</span> {m.cadence}
          </li>
        )}
      </ul>
      {Array.isArray(m.notes) && m.notes.length > 0 && (
        <ul className="cp__notes">
          {m.notes.map((n, i) => (
            <li key={i} className="cp__note">
              {n}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const CategoryBlock = ({ c }) => (
  <div className="cp__category">
    <h4 className="cp__category-title">{c.title}</h4>
    <ul className="cp__metrics">
      {c.metrics.map((m) => (
        <MetricItem key={m.key} m={m} />
      ))}
    </ul>
  </div>
);

const DashLink = ({ d }) => {
  const isInternal = d?.link?.startsWith("#");
  return (
    <li className="cp__dash-item">
      {isInternal ? (
        <a href={d.link} className="cp__dash-link">
          {d.title}
          {d.system ? <span className="cp__dash-system">({d.system})</span> : null}
        </a>
      ) : (
        <a
          href={d.link || "#"}
          className="cp__dash-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!d.link) e.preventDefault();
          }}
        >
          {d.title}
          {d.system ? <span className="cp__dash-system">({d.system})</span> : null}
        </a>
      )}
    </li>
  );
};

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="cp__tabs">
      <div className="cp__tablist" role="tablist" aria-label="Панель контроля — вкладки">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            className={`cp__tab ${active === t.key ? "is-active" : ""}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cp__tabpanel">{tabs.find((t) => t.key === active)?.content}</div>
    </div>
  );
};

const ControlPanel = ({ id = "control-panel", content = {} }) => {
  const data = useMemo(() => normalizeControl(content), [content]);
  const [active, setActive] = useState("metrics");

  const tabs = [
    {
      key: "metrics",
      label: "Метрики",
      content: (
        <div className="cp__grid">
          {data.categories.map((c) => (
            <CategoryBlock key={c.key} c={c} />
          ))}
        </div>
      ),
    },
    {
      key: "formulas",
      label: "Формулы",
      content: (
        <ul className="cp__formulas">
          {data.formulas.map((f, i) => (
            <li key={i} className="cp__formula">
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "leadlag",
      label: "Lead/Lag",
      content: (
        <div className="cp__leadlag">
          <div className="cp__lead">
            <div className="cp__block-title">Ведущие (Lead)</div>
            <ul className="cp__list">
              {data.leadLag.lead.map((t, i) => (
                <li key={i} className="cp__li">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="cp__lag">
            <div className="cp__block-title">Запаздывающие (Lag)</div>
            <ul className="cp__list">
              {data.leadLag.lag.map((t, i) => (
                <li key={i} className="cp__li">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      key: "dashboards",
      label: "Дашборды",
      content: (
        <ul className="cp__dash">
          {data.dashboards.map((d, i) => (
            <DashLink key={i} d={d} />
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section id={id} className="section control-panel">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <Tabs tabs={tabs} active={active} onChange={setActive} />

        <div className="cp__hint">
          Данные берутся из <code>content.sections.controlPanel</code> (или{" "}
          <code>content.controlPanel</code>). Структуры:{" "}
          <code>categories[]</code> с <code>metrics[]</code>,{" "}
          <code>formulas[]</code>, <code>leadLag&#123;lead,lag&#125;</code>,{" "}
          <code>dashboards[]</code> (поля: <code>title</code>, <code>link</code>, <code>system</code>).
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;
