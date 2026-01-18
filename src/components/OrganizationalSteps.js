import React, { useMemo } from "react";

/**
 * Организационные шаги — базовые классы (section/container/list/card).
 * Поддерживает content.sections.organizationalSteps или content.organizationalSteps.
 * Подсказки удалены.
 */

const normalize = (content = {}) => {
  const a = content?.sections?.organizationalSteps || {};
  const b = content?.organizationalSteps || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Организационные шаги";
  const subtitle =
    src?.subtitle ||
    "Что требуется подготовить до начала стратегической сессии и запуска основного цикла.";

  const steps = Array.isArray(src?.steps) && src.steps.length
    ? src.steps
    : [
        {
          title: "Назначить ответственных",
          description:
            "Определите владельцев по ключевым направлениям (коммуникации, материалы, доступы).",
          bullets: ["Создать общий чат/канал", "Назначить секретаря встреч"],
          action: { text: "Смотреть роли", link: "#roles" },
        },
        {
          title: "Собрать документы",
          description:
            "Соберите NDA, презентацию команды и базовые артефакты продукта.",
          bullets: ["NDA", "Pitch/презентация", "Ссылки на репозитории"],
          action: { text: "Открыть документы", link: "#documents" },
        },
      ];

  const normalized = steps.map((s) => ({
    title: s?.title || "Шаг",
    description: s?.description || "",
    bullets: Array.isArray(s?.bullets) ? s.bullets : Array.isArray(s?.items) ? s.items : [],
    action: { text: s?.action?.text || "", link: s?.action?.link || "" },
  }));

  return { title, subtitle, steps: normalized };
};

const StepCard = ({ step, onAction }) => {
  const hasAction = step?.action?.text && (step.action.link || onAction);
  const isInternal = step?.action?.link?.startsWith("#");

  const handleClick = (e) => {
    if (!hasAction) return;
    const href = step?.action?.link || "#";
    if (isInternal) {
      e.preventDefault();
      onAction?.(href.replace(/^#/, ""));
    }
  };

  return (
    <li className="item">
      <div className="card" style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h4 style={{ marginTop: 0 }}>{step.title}</h4>
        {step.description && <p style={{ marginTop: 6 }}>{step.description}</p>}
        {Array.isArray(step.bullets) && step.bullets.length > 0 && (
          <ul className="list" style={{ marginTop: 8 }}>
            {step.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {hasAction && (
          <div style={{ marginTop: 10 }}>
            {isInternal ? (
              <a href={step.action.link} className="btn btn--secondary" onClick={handleClick}>
                {step.action.text}
              </a>
            ) : (
              <a
                href={step.action.link || "#"}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!step.action.link) e.preventDefault();
                }}
              >
                {step.action.text}
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

const OrganizationalSteps = ({ id = "org-steps", content = {}, scrollToSection = () => {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <ul className="list" style={{ display: "grid", gap: 12 }}>
          {data.steps.map((s, i) => (
            <StepCard key={i} step={s} onAction={scrollToSection} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrganizationalSteps;
