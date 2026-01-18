import React, { useMemo } from "react";

const normalizeWIG = (content = {}) => {
  const fromSections = content?.sections?.wigDeclaration || {};
  const fromRoot = content?.wigDeclaration || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "WIG — Декларация сверхважной цели";
  const subtitle =
    src?.subtitle ||
    "Фокусируемся на 1–2 действительно ключевых целях на ближайший период.";

  const intro =
    src?.intro ||
    "WIG должна быть измеримой, достижимой к конкретной дате и подкреплённой ритмом контроля.";

  const template =
    src?.template ||
    "Увеличить/Снизить <Метрика> с <Текущее> до <Целевое> к <Дата> за счёт <Ключевая инициатива>.";

  const examples =
    Array.isArray(src?.examples) && src.examples.length
      ? src.examples
      : [
          "Увеличить DAU с 1 500 до 4 000 за 3 месяца за счёт реферальной программы и e-mail вовлечения.",
          "Сократить время релиза с 5 дней до 1 дня к 31 мая через CI/CD и шаблоны инфраструктуры.",
        ];

  const rules =
    Array.isArray(src?.rules) && src.rules.length
      ? src.rules
      : [
          "Не более двух WIG на команду/направление.",
          "Формулировка: метрика, текущий и целевой уровень, срок.",
          "Определён владелец и ритм контроля.",
        ];

  const cadence =
    Array.isArray(src?.cadence) && src.cadence.length
      ? src.cadence
      : ["Еженедельный синк по метрике", "Ежемесячная ревизия плана и рисков"];

  const checkpoints =
    Array.isArray(src?.checkpoints) && src.checkpoints.length
      ? src.checkpoints
      : ["Цели 30% / 60% / 90%", "Фиксация препятствий и корректировка инициатив"];

  return { title, subtitle, intro, template, examples, rules, cadence, checkpoints };
};

const List = ({ items = [] }) =>
  !items.length ? null : (
    <ul className="list" style={{ marginTop: 8 }}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );

const WIGDeclaration = ({ id = "wig-declaration", content = {} }) => {
  const data = useMemo(() => normalizeWIG(content), [content]);

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <p style={{ marginTop: 0 }}>{data.intro}</p>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Шаблон формулировки</div>
          <pre style={{ margin: 0, padding: 12, border: "1px solid #eee", borderRadius: 8, overflow: "auto" }}>
{data.template}
          </pre>
        </div>

        <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Примеры</div>
            <List items={data.examples} />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Правила постановки WIG</div>
            <List items={data.rules} />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Ритм и контроль</div>
            <List items={data.cadence} />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Чекпоинты</div>
            <List items={data.checkpoints} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WIGDeclaration;
