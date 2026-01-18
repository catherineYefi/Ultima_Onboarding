import React, { useMemo } from "react";

/**
 * Документы — унифицировано под ID "documents"
 * Ожидает проп:
 *  - id: string — якорь секции (из App.js передаём "documents")
 *  - content: объект с данными. Допускаются обе структуры:
 *      a) content.sections.about.documents — массив документов (старый формат)
 *      б) content.documents.{groups|items} — новый формат (если появится)
 *
 * Структура элемента документа, которую поддерживаем:
 *  {
 *    title?: string,     // Заголовок или тип документа
 *    name?: string,      // Человекопонятное название
 *    description?: string,
 *    link?: string,      // URL
 *    fileType?: string,  // PDF/DOCX/… (необязательно)
 *    required?: boolean, // must-have (выделим меткой)
 *    tags?: string[]     // необязательно
 *  }
 */

const fallbackGroups = (docsArr) => {
  // Группируем по "required" и имеющимся тегам "nda", "presentation", прочее.
  const nda = [];
  const pres = [];
  const required = [];
  const optional = [];

  docsArr.forEach((d) => {
    const tags = (d?.tags || []).map((t) => String(t).toLowerCase());
    const title = (d?.title || "").toLowerCase();
    const name = (d?.name || "").toLowerCase();

    const taggedNDA =
      tags.includes("nda") || /nda|non[- ]?disclosure|соглашени[ея]\s+о\s+конфиден/i.test(title + " " + name);
    const taggedPres =
      tags.includes("presentation") || /презентаци/i.test(title + " " + name);

    if (taggedNDA) nda.push(d);
    else if (taggedPres) pres.push(d);
    else if (d?.required) required.push(d);
    else optional.push(d);
  });

  const groups = [];
  if (nda.length) groups.push({ key: "nda", label: "NDA / Конфиденциальность", items: nda });
  if (pres.length) groups.push({ key: "presentation", label: "Презентации", items: pres });
  if (required.length) groups.push({ key: "required", label: "Обязательные документы", items: required });
  if (optional.length) groups.push({ key: "optional", label: "Полезные материалы", items: optional });
  if (!groups.length) groups.push({ key: "all", label: "Документы", items: docsArr });
  return groups;
};

const normalizeDocuments = (content) => {
  // Источник А: старый формат: content.sections.about.documents
  const legacy = content?.sections?.about?.documents;
  // Источник Б: гипотетический новый формат
  const modernGroups = content?.documents?.groups;
  const modernItems = content?.documents?.items;

  if (Array.isArray(modernGroups) && modernGroups.length) {
    // уже сгруппировано
    return modernGroups
      .filter((g) => Array.isArray(g?.items))
      .map((g, idx) => ({
        key: g.key || `group-${idx}`,
        label: g.label || g.title || `Группа ${idx + 1}`,
        items: g.items,
      }));
  }

  const items =
    (Array.isArray(modernItems) && modernItems.length && modernItems) ||
    (Array.isArray(legacy) && legacy.length && legacy) ||
    [];

  return fallbackGroups(items);
};

const DocCard = ({ doc }) => {
  const title = doc?.title || doc?.name || "Документ";
  const description = doc?.description || "";
  const href = doc?.link || "#";
  const fileType = doc?.fileType || "";
  const isRequired = !!doc?.required;

  return (
    <li className="doc-card">
      <div className="doc-card__head">
        <h4 className="doc-card__title">
          {title}
          {isRequired && <span className="doc-card__badge">must</span>}
        </h4>
        {fileType && <span className="doc-card__type">{fileType}</span>}
      </div>
      {description && <p className="doc-card__desc">{description}</p>}
      <div className="doc-card__actions">
        <a
          href={href}
          className="btn btn--primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (href === "#") e.preventDefault();
          }}
        >
          Открыть
        </a>
      </div>
    </li>
  );
};

const Documents = ({ id = "documents", content = {} }) => {
  const groups = useMemo(() => normalizeDocuments(content), [content]);

  return (
    <section id={id} className="section documents">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">Документы</h2>
          <p className="section__subtitle">
            Все материалы, необходимые для старта и прохождения программы ULTIMA 9.0.
          </p>
        </header>

        {groups.map((g) => (
          <div key={g.key} className="documents__group">
            <h3 className="documents__group-title">{g.label}</h3>
            <ul className="documents__list">
              {g.items.map((doc, i) => (
                <DocCard key={`${g.key}-${i}`} doc={doc} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Documents;
