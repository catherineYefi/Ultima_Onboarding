import React, { useMemo } from "react";

/**
 * О программе — якорь id="about-program"
 * Сверстано строго под существующие классы из твоего CSS:
 *  - about-program, about-essence, about-essence-text
 *  - about-rhythm, about-rhythm-header, about-rhythm-title, about-rhythm-details, about-rhythm-detail
 *
 * Источники данных:
 *  - content.sections.aboutProgram
 *  - content.aboutProgram
 *
 * Порядок блоков:
 *  1) Что это
 *  2) Для кого
 *  3) Стратегический контур неизбежного результата
 *  4) (опц.) Польза
 */

const normalize = (content = {}) => {
  const s = content?.sections?.aboutProgram || content?.aboutProgram || {};

  const title = s?.title || "О программе ULTIMA";
  const subtitle =
    s?.subtitle ||
    "Кратко о сути программы, целевой аудитории и стратегическом контуре.";

  const whatIsIt =
    s?.whatIsIt ||
    "ULTIMA — программа достижения неизбежного результата через стратегический цикл и дисциплину исполнения.";

  const forWhomArr = Array.isArray(s?.forWhom)
    ? s.forWhom
    : s?.forWhom
    ? [s.forWhom]
    : ["Фаундеры/СЕО", "Лидеры направлений", "Ключевые роли продукта/роста"];

  // Стратегический контур
  const sc = s?.strategicContour || {};
  const scTitle =
    sc?.title || "Стратегический контур неизбежного результата";
  const scPoints = Array.isArray(sc?.points)
    ? sc.points
    : Array.isArray(sc)
    ? sc
    : [
        "Фокус на WIG (сверхважной цели)",
        "Регулярный ритм встреч и контроль приборов",
        "Командная ответственность и прозрачность",
      ];

  const benefits = Array.isArray(s?.benefits) ? s.benefits : [];

  return { title, subtitle, whatIsIt, forWhomArr, scTitle, scPoints, benefits };
};

const List = ({ items = [] }) =>
  !items.length ? null : (
    <ul>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );

const AboutUltima = ({ id = "about-program", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section about-program">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        {/* 1) Что это */}
        <div className="about-essence">
          <h3>Что это</h3>
          <p className="about-essence-text">{data.whatIsIt}</p>
        </div>

        {/* 2) Для кого — сразу после «что это» */}
        <div className="about-essence" style={{ marginTop: 16 }}>
          <h3>Для кого</h3>
          <List items={data.forWhomArr} />
        </div>

        {/* 3) Стратегический контур — после «что/для кого» */}
        <div className="about-rhythm" style={{ marginTop: 24 }}>
          <div className="about-rhythm-header">
            <h3 className="about-rhythm-title">{data.scTitle}</h3>
          </div>
          <div className="about-rhythm-details">
            {data.scPoints.map((p, i) => (
              <div key={i} className="about-rhythm-detail">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* 4) Польза (если есть) */}
        {data.benefits.length > 0 && (
          <div className="about-essence" style={{ marginTop: 24 }}>
            <h3>Что даёт участие</h3>
            <List items={data.benefits} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUltima;
