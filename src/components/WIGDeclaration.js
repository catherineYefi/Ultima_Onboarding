import React, { useMemo } from "react";

/**
 * WIG Declaration — под твои классы wig__*
 */

const normalize = (content = {}) => {
  const a = content?.sections?.wigDeclaration || {};
  const b = content?.wigDeclaration || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "WIG — Декларация сверхважной цели";
  const subtitle =
    src?.subtitle ||
    "Фокус на одной-двух целях, определяющих успех на горизонте месяцев.";

  const intro =
    src?.intro ||
    "WIG должна быть чёткой, измеримой и иметь владельца и ритм контроля.";

  const template =
    src?.template ||
    "Увеличить/Снизить <Метрика> с <Текущее> до <Целевое> к <Дата> за счёт <Инициатива>.";

  const examples =
    Array.isArray(src?.examples) && src.examples.length
      ? src.examples
      : [
          "Увеличить DAU с 1 500 до 4 000 за 3 месяца за счёт рефералок и e-mail активации.",
          "Сократить время релиза с 5 дней до 1 дня к 31 мая через CI/CD.",
        ];

  const rules =
    Array.isArray(src?.rules) && src.rules.length
      ? src.rules
      : [
          "Не более двух WIG на команду.",
          "Формулировка с метрикой, текущим и целевым значением, сроком.",
          "Определён владелец и ритм контроля.",
        ];

  const cadence =
    Array.isArray(src?.cadence) && src.cadence.length
      ? src.cadence
      : ["Еженедельный синк по метрике", "Ежемесячная ревизия плана/рисков"];

  const checkpoints =
    Array.isArray(src?.checkpoints) && src.checkpoints.length
      ? src.checkpoints
      : ["30% / 60% / 90% от цели", "Фиксируем препятствия и корректируем план"];

  return { title, subtitle, intro, template, examples, rules, cadence, checkpoints };
};

const List = ({ items = [], className = "" }) =>
  !items.length ? null : (
    <ul className={`wig__list ${className}`.trim()}>
      {items.map((t, i) => (
        <li key={i} className="wig__li">
          {t}
        </li>
      ))}
    </ul>
  );

const WIGDeclaration = ({ id = "wig-declaration", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section wig">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <div className="wig__intro">
          <p className="wig__text">{data.intro}</p>
        </div>

        <div className="wig__block">
          <div className="wig__block-title">Шаблон формулировки</div>
          <pre className="wig__template">
{data.template}
          </pre>
        </div>

        <div className="wig__grid">
          <div className="wig__col">
            <div className="wig__block">
              <div className="wig__block-title">Примеры</div>
              <List items={data.examples} />
            </div>

            <div className="wig__block">
              <div className="wig__block-title">Правила</div>
              <List items={data.rules} />
            </div>
          </div>

          <div className="wig__col">
            <div className="wig__block">
              <div className="wig__block-title">Ритм и контроль</div>
              <List items={data.cadence} />
            </div>

            <div className="wig__block">
              <div className="wig__block-title">Чекпоинты</div>
              <List items={data.checkpoints} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WIGDeclaration;
