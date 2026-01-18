import React, { useMemo, useState } from "react";

/**
 * Инструменты — классы tools__*
 */

const normalize = (content = {}) => {
  const a = content?.sections?.toolsHub || {};
  const b = content?.toolsHub || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Инструменты программы";
  const subtitle =
    src?.subtitle ||
    "Единая точка входа в сервисы и артефакты: документы, аналитика, коммуникации, разработка.";

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

const Tag = ({ t }) => <span className="tools__tag">{t}</span>;

const ToolCard = ({ tool }) => {
  const isInternal = tool?.link?.startsWith("#");
  const linkProps = isInternal
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
    <li className="tools__card">
      <div className="tools__head">
        <h4 className="tools__title">{tool.title}</h4>
        {tool.system && <span className="tools__system">{tool.system}</span>}
      </div>
      {tool.description && <p className="tools__desc">{tool.description}</p>}

      {Array.isArray(tool.tags) && tool.tags.length > 0 && (
        <div className="tools__tags">
          {tool.tags.map((t, i) => (
            <Tag key={i} t={t} />
          ))}
        </div>
      )}

      <div className="tools__actions">
        <a className="btn btn--primary" {...linkProps}>
          Открыть
        </a>
      </div>
    </li>
  );
};

const CategoryBlock = ({ c }) => (
  <div className="tools__category">
    <h3 className="tools__category-title">{c.title}</h3>
    <ul className="tools__grid">
      {c.tools.map((tool) => (
        <ToolCard key={tool.key} tool={tool} />
      ))}
    </ul>
  </div>
);

const ToolsHub = ({ id = "tools-hub", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.groups;
    const match = (t) =>
      (t.title || "").toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.system || "").toLowerCase().includes(q) ||
      (Array.isArray(t.tags) ? t.tags.join(" ").toLowerCase().includes(q) : false);

    return data.groups
      .map((c) => ({ ...c, tools: c.tools.filter(match) }))
      .filter((c) => c.tools.length > 0);
  }, [data.groups, query]);

  return (
    <section id={id} className="section tools">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <div className="tools__search">
          <input
            type="search"
            placeholder="Найти инструмент…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="tools__input"
            aria-label="Поиск по инструментам"
          />
        </div>

        {filteredGroups.length ? (
          filteredGroups.map((c) => <CategoryBlock key={c.key} c={c} />)
        ) : (
          <div className="tools__empty">Ничего не найдено по запросу «{query}».</div>
        )}

        <div className="tools__hint">
          Данные: <code>content.sections.toolsHub</code> или <code>content.toolsHub</code>.
        </div>
      </div>
    </section>
  );
};

export default ToolsHub;
