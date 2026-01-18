import React, { useMemo, useState } from "react";

/**
 * Панель контроля — классы cp__*
 */

const normalize = (content = {}) => {
  const a = content?.sections?.controlPanel || {};
  const b = content?.controlPanel || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Панель контроля";
  const subtitle =
    src?.subtitle ||
    "Метрики, формулы, ведущие/запаздывающие показатели и внешние дашборды.";

  const categories = Array.isArray(src?.categories) ? src.categories : [];
  const formulas = Array.isArray(src?.formulas) ? src.formulas : [];
  const dashboards = Array.isArray(src?.dashboards) ? src.dashboards : [];
  const leadLag = {
    lead: Array.isArray(src?.leadLag?.lead) ? src.leadLag.lead : [],
    lag: Array.isArray(src?.leadLag?.lag) ? src.leadLag.lag : [],
  };

  const defCats =
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
                cadence: "еженедельно",
              },
            ],
          },
        ];

  const normCats = defCats.map((c, i) => ({
    key: c?.key || `cat-${i}`,
    title: c?.title || "Категория",
    metrics: Array.isArray(c?.metrics)
      ? c.metrics.map((m, j) => ({
          key: m?.key || `m-${i}-${j}`,
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

  const defFormulas =
    formulas.length > 0
      ? formulas
      : [
          "DAU = число уникальных users с событием session_start за сутки.",
          "CR Signup→Activation = ActivatedUsers(7d) / NewSignups(7d).",
        ];

  const defDashboards =
    dashboards.length > 0
      ? dashboards
      : [{ title: "Продуктовая панель (пример)", link: "#", system: "Data Studio" }];

  const defLeadLag = {
    lead: leadLag.lead.length ? leadLag.lead : ["Приглашения по рефералке", "Эксперименты/неделя"],
    lag: leadLag.lag.length ? leadLag.lag : ["DAU", "Выручка", "NPS"],
  };

  return {
    title,
    subtitle,
    categories: normCats,
    formulas: defFormulas,
    dashboards: defDashboards,
    leadLag: defLeadLag,
  };
};

const MetricItem = ({ m }) => (
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
    {m.notes?.length ? (
      <ul className="cp__notes">
        {m.notes.map((n, i) => (
          <li key={i} className="cp__note">
            {n}
          </li>
        ))}
      </ul>
    ) : null}
  </li>
);

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

const Tabs = ({ tabs, active, onChange }) => (
  <div className="cp__tabs">
    <div className="cp__tablist" role="tablist" aria-label="Панель контроля">
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

const ControlPanel = ({ id = "control-panel", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);
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
          {data.dashboards.map((d, i) => {
            const isInternal = d?.link?.startsWith("#");
            const props = isInternal
              ? { href: d.link }
              : {
                  href: d.link || "#",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: (e) => {
                    if (!d.link) e.preventDefault();
                  },
                };
            return (
              <li key={i} className="cp__dash-item">
                <a className="cp__dash-link" {...props}>
                  {d.title || `Дашборд ${i + 1}`}
                </a>
                {d.system ? <span className="cp__dash-system">({d.system})</span> : null}
              </li>
            );
          })}
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
          Данные: <code>content.sections.controlPanel</code> или <code>content.controlPanel</code>.
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;
