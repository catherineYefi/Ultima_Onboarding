import React, { useMemo, useState } from "react";

/**
 * Каталог инструментов (минимальная версия без новых CSS-классов).
 * Источники:
 *  - content.sections.toolsHub
 *  - content.toolsHub
 * Поддерживает:
 *  1) categories[].tools[]
 *  2) плоский tools[] (автогруппировка по type, иначе "Инструменты")
 */

const normalize = (content = {}) => {
  const a = content?.sections?.toolsHub || {};
  const b = content?.toolsHub || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Инструменты программы";
  const subtitle =
    src?.subtitle ||
    "Сервисы и артефакты: документы, аналитика, коммуникации, разработка.";

  const categories = Array.isArray(src?.categories) ? src.categories : [];
  const flat = Array.isArray(src?.tools) ? src.tools : [];

  if (categories.length && categories.some((c) => Array.isArray(c?.tools) && c.tools.length)) {
    return {
      title,
      subtitle,
      groups: categories
        .filter((c) => Array.isArray(c?.tools))
        .map((c, i) => ({
          key: c?.key || `cat-${i}`,
          title: c?.title || "Категория",
          tools: c.tools.map((t, j) => ({
            key: t?.key || `t-${i}-${j}`,
            title: t?.title || "Инструмент",
            description: t?.description || "",
            link: t?.link || "#",
            tags: Array.isArray(t?.tags) ? t.tags : [],
            type: t?.type || "",
            system: t?.system || "",
          })),
        })),
    };
  }

  const base =
    flat.length > 0
      ? flat
      : [
          {
            key: "notion",
            title: "Notion — база знаний",
            description: "Архив решений, протоколов, контента.",
            link: "#",
            tags: ["docs"],
            type: "Docs",
            system: "Notion",
          },
        ];

  const byType = {};
  base.forEach((t) => {
    const type = t?.type || "Инструменты";
    if (!byType[type]) byType[type] = [];
    byType[type].push({
      key: t?.key || `${type}-${byType[type].length}`,
      title: t?.title || "Инструмент",
      description: t?.description || "",
      link: t?.link || "#",
      tags: Array.isArray(t?.tags) ? t.tags : [],
      type: t?.type || "",
      system: t?.system || "",
    });
  });

  const groups = Object.entries(byType).map(([type, tools], i) => ({
    key: `cat-${i}`,
    title: type,
    tools,
  }));

  return { title, subtitle, groups };
};

const ToolsHub = ({ id = "tools-hub", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);
  const [q, setQ] = useState("");

  const filter = (tool) => {
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return (
      (tool.title || "").toLowerCase().includes(s) ||
      (tool.description || "").toLowerCase().includes(s) ||
      (tool.system || "").toLowerCase().includes(s) ||
      (Array.isArray(tool.tags) ? tool.tags.join(" ").toLowerCase().includes(s) : false)
    );
  };

  const filteredGroups = useMemo(
    () =>
      data.groups
        .map((g) => ({ ...g, tools: g.tools.filter(filter) }))
        .filter((g) => g.tools.length > 0),
    [data.groups, q]
  );

  const ToolLink = ({ tool }) => {
    const isInternal = tool?.link?.startsWith("#");
    const props = isInternal
      ? { href: tool.link }
      : {
          href: tool.link || "#",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: (e) => {
            if (!tool.link) e.preventDefault();
          },
        };
    return (
      <a {...props} className="btn btn--primary" style={{ textDecoration: "none" }}>
        Открыть
      </a>
    );
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        {/* Поиск */}
        <div style={{ margin: "8px 0 16px" }}>
          <input
            type="search"
            placeholder="Найти инструмент…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #e7e7e7",
              borderRadius: 10,
              outline: "none",
            }}
            aria-label="Поиск по инструментам"
          />
        </div>

        {/* Категории */}
        {filteredGroups.length ? (
          filteredGroups.map((g) => (
            <div key={g.key} style={{ margin: "16px 0" }}>
              <h3 style={{ marginTop: 0 }}>{g.title}</h3>
              <ul className="list" style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
                {g.tools.map((t) => (
                  <li key={t.key} className="item">
                    <div
                      className="card"
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 12,
                        padding: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <h4 style={{ margin: 0 }}>{t.title}</h4>
                        {t.system ? (
                          <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
                            {t.system}
                          </span>
                        ) : null}
                      </div>

                      {t.description && (
                        <p style={{ margin: "6px 0 8px", color: "rgba(0,0,0,0.75)" }}>{t.description}</p>
                      )}

                      {Array.isArray(t.tags) && t.tags.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                          {t.tags.map((tag, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: 12,
                                background: "#f3f3f3",
                                border: "1px solid #e7e7e7",
                                borderRadius: 999,
                                padding: "2px 8px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <ToolLink tool={t} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div style={{ color: "rgba(0,0,0,0.55)" }}>
            Ничего не найдено по запросу «{q}».
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsHub;
