import React, { useMemo } from "react";

/**
 * WIG (Wildly Important Goal) Declaration — строгий якорь id="wig-declaration"
 *
 * Поддерживаемые источники данных:
 *  A) content.sections.wigDeclaration = {
 *       title?, subtitle?, intro?, template?, examples?: string[],
 *       rules?: string[], cadence?: string[], checkpoints?: string[]
 *     }
 *  Б) content.wigDeclaration = аналогичная структура
 *
 * Безопасные дефолты показаны, если данные частично отсутствуют.
 */

const normalizeWIG = (content = {}) => {
  const fromSections = content?.sections?.wigDeclaration || {};
  const fromRoot = content?.wigDeclaration || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "WIG — Декларация сверхважной цели";
  const subtitle =
    src?.subtitle ||
    "Формулируем одну-две цели, определяющие успех на горизонте ближайших месяцев.";

  const intro =
    src?.intro ||
    "WIG помогает сфокусировать организацию на действительно важном. Цель должна быть чёткой, измеримой, достижимой в заданный срок и подкреплённой ритмом контроля.";

  const template =
    src?.template ||
    "Снидить/Увеличить <Метрика> с <Текущее значение> до <Целевое значение> к <Дата/Период> за счёт <Ключевой рычаг/инициатива>.";

  const examples =
    Array.isArray(src?.examples) && src.examples.length
      ? src.examples
      : [
          "Увеличить ежемесячный актив DAU с 1 500 до 4 000 за 3 месяца за счёт реферальной программы и e-mail активации.",
          "Сократить среднее время развертывания релиза с 5 дней до 1 дня к 31 мая за счёт CI/CD и шаблонов инфраструктуры.",
        ];

  const rules =
    Array.isArray(src?.rules) && src.rules.length
      ? src.rules
      : [
          "WIG — одна (максимум две) на команду/направление.",
          "Формулировка содержит метрику, текущий и целевой уровень, крайний срок.",
          "Есть чёткий владелец и измеримый ритм контроля.",
        ];

  const cadence =
    Array.isArray(src?.cadence) && src.cadence.length
      ? src.cadence
      : [
          "Еженедельный короткий синк по метрике и ключевому рычагу.",
          "Ежемесячная ревизия плана и рисков.",
        ];

  const checkpoints =
    Array.isArray(src?.checkpoints) && src.checkpoints.length
      ? src.checkpoints
      : [
          "Промежуточные целевые уровни: 30%, 60%, 90% от WIG.",
          "Фиксируем факты/препятствия и корректируем инициативы.",
        ];

  return { title, subtitle, intro, template, examples, rules, cadence, checkpoints };
};

const List = ({ items = [], className = "" }) => {
  if (!items.length) return null;
  return (
    <ul className={`wig__list ${className}`.trim()}>
      {items.map((t, i) => (
        <li key={i} className="wig__li">
          {t}
        </li>
      ))}
    </ul>
  );
};

const WIGDeclaration = ({ id = "wig-declaration", content = {} }) => {
  const data = useMemo(() => normalizeWIG(content), [content]);

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
              <div className="wig__block-title">Правила постановки WIG</div>
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

        <div className="wig__hint">
          Данные можно хранить в <code>content.sections.wigDeclaration</code> или{" "}
          <code>content.wigDeclaration</code>. Поля:{" "}
          <code>title</code>, <code>subtitle</code>, <code>intro</code>,{" "}
          <code>template</code>, <code>examples[]</code>, <code>rules[]</code>,{" "}
          <code>cadence[]</code>, <code>checkpoints[]</code>.
        </div>
      </div>
    </section>
  );
};

export default WIGDeclaration;
