import React, { useMemo, useState } from "react";

/**
 * Панель контроля — минимальная версия без новых CSS-классов.
 * Поддерживает:
 *  - content.sections.controlPanel
 *  - content.controlPanel
 * Структуры: categories[].metrics[], formulas[], leadLag{lead[],lag[]}, dashboards[].
 */

const normalize = (content = {}) => {
  const a = content?.sections?.controlPanel || {};
  const b = content?.controlPanel || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Панель контроля";
  const subtitle =
    src?.subtitle ||
    "Метрики, формулы расчётов, ведущие/запаздывающие показатели и внешние панели.";

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
    lead: leadLag.lead.length ? leadLag.lead : ["Приглашения по рефералке", "Запущенные эксперименты/неделя"],
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

const ControlPanel = ({ id = "control-panel", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);
  const [tab, setTab] = useState("metrics");

  const TabButton = ({ value, children }) => (
    <button
      onClick={() => setTab(value)}
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #e7e7e7",
        background: tab === value ? "#111" : "#fff",
        color: tab === value ? "#fff" : "#111",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <TabButton value="metrics">Метрики</TabButton>
          <TabButton value="formulas">Формулы</TabButton>
          <TabButton value="leadlag">Lead/Lag</TabButton>
          <TabButton value="dashboards">Дашборды</TabButton>
        </div>

        {/* Panels */}
        {tab === "metrics" && (
          <div style={{ display: "grid", gap: 16 }}>
            {data.categories.map((c) => (
              <div key={c.key} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
                <h4 style={{ marginTop: 0 }}>{c.title}</h4>
                <ul className="list">
                  {c.metrics.map((m) => (
                    <li key={m.key} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                        <strong>{m.name}</strong>
                        {m.target ? (
                          <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
                            Цель: {m.target}
                          </span>
                        ) : null}
                      </div>
                      {m.description && (
                        <div style={{ color: "rgba(0,0,0,0.75)", marginTop: 4 }}>{m.description}</div>
                      )}
                      <ul className="list" style={{ marginTop: 6 }}>
                        {m.source && <li>Источник: {m.source}</li>}
                        {m.owner && <li>Владелец: {m.owner}</li>}
                        {m.cadence && <li>Ритм: {m.cadence}</li>}
                      </ul>
                      {m.notes?.length ? (
                        <ul className="list" style={{ marginTop: 6 }}>
                          {m.notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === "formulas" && (
          <ul className="list" style={{ marginTop: 8 }}>
            {data.formulas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}

        {tab === "leadlag" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Ведущие (Lead)</div>
              <ul className="list">
                {data.leadLag.lead.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Запаздывающие (Lag)</div>
              <ul className="list">
                {data.leadLag.lag.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "dashboards" && (
          <ul className="list" style={{ marginTop: 8 }}>
            {data.dashboards.map((d, i) => {
              const isInternal = d?.link?.startsWith("#");
              const anchorProps = isInternal
                ? { href: d.link }
                : {
                    href: d?.link || "#",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e) => {
                      if (!d?.link) e.preventDefault();
                    },
                  };
              return (
                <li key={i}>
                  <a {...anchorProps}>{d?.title || `Дашборд ${i + 1}`}</a>
                  {d?.system ? <span style={{ color: "rgba(0,0,0,0.55)" }}> ({d.system})</span> : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ControlPanel;
