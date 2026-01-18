import React, { useMemo } from "react";

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

const Rules = ({ id = "rules", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <ol className="list" style={{ paddingLeft: 18 }}>
          {data.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>{it?.title || "Правило"}</div>
              {it?.text && <div style={{ marginTop: 4 }}>{it.text}</div>}
            </li>
          ))}
        </ol>

        {data.notes.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Примечания</div>
            <ul className="list" style={{ paddingLeft: 18 }}>
              {data.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rules;
