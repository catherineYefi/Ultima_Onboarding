import React, { useMemo } from "react";

/**
 * Правила — классы rules__*
 */

const normalize = (content = {}) => {
  const a = content?.sections?.rules || {};
  const b = content?.rules || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Правила и ожидания участия в программе ULTIMA 9.0";
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
            "Каждая задача имеет назначенного ответственного и критерии готовности (DoD).",
        },
      ];

  const notes = Array.isArray(src?.notes) ? src.notes : [];
  return { title, subtitle, items, notes };
};

const Rules = ({ id = "rules", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section rules">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <ol className="rules__list">
          {data.items.map((it, i) => (
            <li key={i} className="rules__item">
              <div className="rules__index">{i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
              <div className="rules__body">
                <h4 className="rules__title">{it?.title || "Правило"}</h4>
                {it?.text && <p className="rules__text">{it.text}</p>}
              </div>
            </li>
          ))}
        </ol>

        {data.notes.length > 0 && (
          <div className="rules__notes">
            <h5 className="rules__notes-title">Примечания</h5>
            <ul className="rules__notes-list">
              {data.notes.map((n, i) => (
                <li key={i} className="rules__note">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rules;
