import React, { useMemo } from "react";

/**
 * Организационные шаги перед стартом — якорь id="org-steps"
 *
 * Поддерживаем несколько возможных структур входных данных:
 *  A) content.sections.organizationalSteps = {
 *       title?, subtitle?, steps?: Step[]
 *     }
 *  Б) content.organizationalSteps = { ... } (альтернативный корневой путь)
 *
 * Step:
 *  {
 *    title?: string,
 *    description?: string,
 *    bullets?: string[]         // список пунктов (синоним: items)
 *    items?: string[],          // то же, что bullets
 *    action?: {
 *      text?: string,           // текст кнопки (важно: рендерим ТОЛЬКО .text, не объект)
 *      link?: string            // "#id" (внутр. якорь) или внешний URL
 *    }
 *  }
 */

const normalizeSteps = (content = {}) => {
  const fromSections = content?.sections?.organizationalSteps || {};
  const fromRoot = content?.organizationalSteps || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

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

  // Нормализуем bullets/items
  const normalized = steps.map((s) => ({
    title: s?.title || "Шаг",
    description: s?.description || "",
    bullets: Array.isArray(s?.bullets)
      ? s.bullets
      : Array.isArray(s?.items)
      ? s.items
      : [],
    action: {
      text: s?.action?.text || "",
      link: s?.action?.link || "",
    },
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
      // ожидаем, что onAction выполнит плавный скролл
      onAction?.(href.replace(/^#/, ""));
    }
    // для внешних ссылок — стандартное поведение <a target="_blank">
  };

  return (
    <li className="orgsteps__card">
      <h4 className="orgsteps__title">{step.title}</h4>
      {step.description && (
        <p className="orgsteps__desc">{step.description}</p>
      )}
      {Array.isArray(step.bullets) && step.bullets.length > 0 && (
        <ul className="orgsteps__bullets">
          {step.bullets.map((b, i) => (
            <li key={i} className="orgsteps__bullet">
              {b}
            </li>
          ))}
        </ul>
      )}

      {hasAction && (
        <div className="orgsteps__actions">
          {isInternal ? (
            <a href={step.action.link} className="btn btn--secondary" onClick={handleClick}>
              {step.action.text /* ВАЖНО: рендерим ТОЛЬКО текст, не объект */}
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
    </li>
  );
};

const OrganizationalSteps = ({
  id = "org-steps",
  content = {},
  scrollToSection = () => {},
}) => {
  const data = useMemo(() => normalizeSteps(content), [content]);

  return (
    <section id={id} className="section orgsteps">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section__subtitle">{data.subtitle}</p>
          )}
        </header>

        <ul className="orgsteps__list">
          {data.steps.map((s, i) => (
            <StepCard key={i} step={s} onAction={scrollToSection} />
          ))}
        </ul>

        <div className="orgsteps__hint">
          Подсказка: заполняйте данные в <code>content.sections.organizationalSteps.steps</code>.
          Для кнопки используйте только <code>action.text</code> и <code>action.link</code>.
        </div>
      </div>
    </section>
  );
};

export default OrganizationalSteps;
