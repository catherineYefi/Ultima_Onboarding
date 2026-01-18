import React, { useMemo, useState } from "react";

/**
 * Каталог инструментов (Tools Hub) — строгий якорь id="tools-hub"
 *
 * Поддерживаемые источники данных:
 *  A) content.sections.toolsHub = {
 *       title?, subtitle?, categories?: Category[], tools?: Tool[]
 *     }
 *  Б) content.toolsHub = аналогичная структура
 *
 * Мы поддерживаем два способа описания:
 *  1) categories[] со своими tools[] внутри
 *  2) плоский массив tools[] (без категорий) — сгруппируем по типу или "Прочее"
 *
 * Tool:
 *  {
 *    key?: string,
 *    title?: string,           // Название инструмента
 *    description?: string,
 *    link?: string,            // URL или "#anchor"
 *    tags?: string[],          // ["design", "tracking"]
 *    type?: string,            // "Docs", "Analytics", "Comms", "Dev", ...
 *    system?: string           // "Notion", "Jira", "GA4", "Figma" — отображаем серая подпись
 *  }
 */

const normalizeHub = (content = {}) => {
  const fromSections = content?.sections?.toolsHub || {};
  const fromRoot = content?.toolsHub || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "Инструменты программы";
  const subtitle =
    src?.subtitle ||
    "Единая точка входа в сервисы и артефакты: документы, аналитика, коммуникации, разработка.";

  const categories = Array.isArray(src?.categories) ? src.categories : [];
  const flatTools = Array.isArray(src?.tools) ? src.tools : [];

  // Если есть categories с tools — используем их.
  if (categories.length && categories.some((c) => Array.isArray(c?.tools) && c.tools.length)) {
    const normalized = categories
      .filter((c) => Array.isArray(c?.tools))
      .map((c, ci) => ({
        key: c?.key || `cat-${ci}`,
        title: c?.title || "Категория",
        tools: c.tools.map((t, ti) => ({
          key: t?.key || `t-${ci}-${ti}`,
          title: t?.title || "Инструмент",
          description: t?.description || "",
          link: t?.link || "#",
          tags: Array.isArray(t?.tags) ? t.tags : [],
          type: t?.type || "",
          system: t?.system || "",
        })),
      }));
    return { title, subtitle, categories: normalized };
  }

  // Иначе работаем с плоским массивом tools и группируем по type.
  const baseTools =
    flatTools.length > 0
      ? flatTools
      : [
          {
            key: "notion",
            title: "Notion — база знаний",
            description: "Архив решений, протоколов, контента программы.",
            link: "#",
            tags: ["docs"],
            type: "Docs",
            system: "Notion",
          },
          {
            key: "jira",
            title: "Jira — проект/борды",
            description: "Трекинг задач, спринты, доски Kanban/Scrum.",
            link: "#",
            tags: ["pm"],
            type: "Project",
            system: "Jira",
          },
          {
            key: "ga4",
            title: "GA4 — продуктовая аналитика",
            description: "Ивент-аналитика веб/мобайл, аудитории, конверсии.",
            link: "#",
            tags: ["analytics"],
            type: "Analytics",
            system: "Google Analytics 4",
          },
        ];

  const byType = {};
  baseTools.forEach((t) => {
    const type = t?.type || "Прочее";
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

  const normalized = Object.entries(byType).map(([type, tools], i) => ({
    key: `cat-${i}`,
    title: type,
    tools,
  }));

  return { title, subtitle, categories: normalized };
};

const Tag = ({ t }) => <span className="tools__tag">{t}</span>;

const ToolCard = ({ tool }) => {
  const isInternal = tool?.link?.startsWith("#");
  const hasTags = Array.isArray(tool?.tags) && tool.tags.length > 0;

  const LinkEl = isInternal ? "a" : "a";
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

      {hasTags && (
        <div className="tools__tags">
          {tool.tags.map((t, i) => (
            <Tag key={i} t={t} />
          ))}
        </div>
      )}

      <div className="tools__actions">
        <LinkEl className="btn btn--primary" {...linkProps}>
          Открыть
        </LinkEl>
      </div>
    </li>
  );
};

const CategoryBlock = ({ c }) => {
  return (
    <div className="tools__category">
      <h3 className="tools__category-title">{c.title}</h3>
      <ul className="tools__grid">
        {c.tools.map((tool) => (
          <ToolCard key={tool.key} tool={tool} />
        ))}
      </ul>
    </div>
  );
};

const ToolsHub = ({ id = "tools-hub", content = {} }) => {
  const data = useMemo(() => normalizeHub(content), [content]);
  const [query, setQuery] = useState("");

  // Простая фильтрация по названию/описанию/тегам/системе
  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.categories;

    const match = (t) =>
      (t.title || "").toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.system || "").toLowerCase().includes(q) ||
      (Array.isArray(t.tags) ? t.tags.join(" ").toLowerCase().includes(q) : false);

    return data.categories
      .map((c) => ({
        ...c,
        tools: c.tools.filter(match),
      }))
      .filter((c) => c.tools.length > 0);
  }, [data.categories, query]);

  return (
    <section id={id} className="section tools">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section__subtitle">{data.subtitle}</p>
          )}
        </header>

        <div className="tools__search">
          <input
            type="search"
            placeholder="Найти инструмент… (название, система, тег)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="tools__input"
            aria-label="Поиск по инструментам"
          />
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((c) => <CategoryBlock key={c.key} c={c} />)
        ) : (
          <div className="tools__empty">Ничего не найдено по запросу «{query}».</div>
        )}

        <div className="tools__hint">
          Данные берутся из <code>content.sections.toolsHub</code> (или{" "}
          <code>content.toolsHub</code>). Поддерживаются поля:{" "}
          <code>categories[].tools[]</code> или плоский <code>tools[]</code>. Поля инструмента:{" "}
          <code>title</code>, <code>description</code>, <code>link</code>,{" "}
          <code>tags[]</code>, <code>type</code>, <code>system</code>.
        </div>
      </div>
    </section>
  );
};

export default ToolsHub;
