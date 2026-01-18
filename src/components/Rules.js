import React, { useMemo } from "react";

/**
 * Секция «Правила» — якорь строго id="rules"
 *
 * Поддерживает оба формата данных:
 *  A) content.sections.rules = {
 *       title?: string,
 *       subtitle?: string,
 *       items?: Array<{ title?: string, text?: string }>
 *       notes?: string[]
 *     }
 *  Б) content.rules = аналогичная структура
 *
 * Если данных нет — выводим безопасные дефолты.
 */

const normalizeRules = (content = {}) => {
  const fromSections = content?.sections?.rules || {};
  const fromRoot = content?.rules || {};

  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title =
    src?.title ||
    "Правила и ожидания участия в программе ULTIMA 9.0";

  const subtitle =
    src?.subtitle ||
    "Пожалуйста, ознакомьтесь с базовыми требованиями и нормами взаимодействия.";

  const items = Array.isArray(src?.items) && src.items.length
    ? src.items
    : [
        {
          title: "Соблюдение сроков",
          text:
            "Участники придерживаются согласованных дедлайнов и заранее предупреждают, если требуется перенос.",
        },
        {
          title: "Прозрачная коммуникация",
          text:
            "Важные решения и блокирующие факторы фиксируются письменно в общем канале/документе.",
        },
        {
          title: "Ответственность и роли",
          text:
            "Каждая задача имеет назначенного ответственного и критерии готовности (Definition of Done).",
        },
        {
          title: "Рабочий контур",
          text:
            "Встречи проходят по ритму программы. Материалы, артефакты и доступы поддерживаются в актуальном состоянии.",
        },
        {
          title: "Конфиденциальность",
          text:
            "Информация, помеченная как конфиденциальная, не передается третьим лицам без согласия сторон.",
        },
      ];

  const notes = Array.isArray(src?.notes) ? src.notes : [];

  return { title, subtitle, items, notes };
};

const RuleItem = ({ index, title, text }) => (
  <li className="rules__item">
    <div className="rules__index">{index < 10 ? `0${index}` : index}</div>
    <div className="rules__body">
      <h4 className="rules__title">{title || "Правило"}</h4>
      {text && <p className="rules__text">{text}</p>}
    </div>
  </li>
);

const Notes = ({ notes = [] }) => {
  if (!notes.length) return null;
  return (
    <div className="rules__notes">
      <h5 className="rules__notes-title">Примечания</h5>
      <ul className="rules__notes-list">
        {notes.map((n, i) => (
          <li key={i} className="rules__note">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Rules = ({ id = "rules", content = {} }) => {
  const data = useMemo(() => normalizeRules(content), [content]);

  return (
    <section id={id} className="section rules">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section__subtitle">{data.subtitle}</p>
          )}
        </header>

        <ol className="rules__list">
          {data.items.map((it, i) => (
            <RuleItem
              key={i}
              index={i + 1}
              title={it?.title}
              text={it?.text}
            />
          ))}
        </ol>

        <Notes notes={data.notes} />
      </div>
    </section>
  );
};

export default Rules;
