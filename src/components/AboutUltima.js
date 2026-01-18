import React, { useMemo } from "react";

/**
 * О программе — якорь id="about-program"
 * Поддерживает:
 *  - content.sections.aboutProgram
 *  - content.aboutProgram
 * Ожидаемые поля (любые могут отсутствовать):
 *  {
 *    title?, subtitle?,
 *    whatIsIt?: string,
 *    forWhom?: string | string[],
 *    strategicContour?: { title?: string, points?: string[] } | string[],
 *    benefits?: string[]
 *  }
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

  // «Что это и для кого» (что и аудитория) — идёт ПЕРВЫМ блоком
  const forWhomArr = Array.isArray(s?.forWhom)
    ? s.forWhom
    : s?.forWhom
    ? [s.forWhom]
    : ["Фаундеры/СЕО", "Лидеры направлений", "Ключевые роли продукта/роста"];

  // «Стратегический контур неизбежного результата» — строго ПОСЛЕ «что и для кого»
  const sc = s?.strategicContour || {};
  const scTitle =
    sc?.title || "Стратегический контур неизбежного результата";
  const scPoints = Array.isArray(sc?.points)
    ? sc.points
    : Array.isArray(sc)
    ? sc
    : [
        "Фокус на WIG (сверхважной цели)",
        "Ритм встреч и контроль приборов",
        "Командная ответственность и прозрачность",
      ];

  const benefits = Array.isArray(s?.benefits) ? s.benefits : [];

  return { title, subtitle, whatIsIt, forWhomArr, scTitle, scPoints, benefits };
};

const List = ({ items = [], className = "" }) =>
  !items.length ? null : (
    <ul className={`about__list ${className}`.trim()}>
      {items.map((t, i) => (
        <li key={i} className="about__li">
          {t}
        </li>
      ))}
    </ul>
  );

const AboutUltima = ({ id = "about-program", content = {} }) => {
  const data = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section about">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        {/* 1) Что это */}
        <div className="about__block">
          <div className="about__block-title">Что это</div>
          <p className="about__text">{data.whatIsIt}</p>
        </div>

        {/* 2) Для кого — сразу после «что это» */}
        <div className="about__block">
          <div className="about__block-title">Для кого</div>
          <List items={data.forWhomArr} />
        </div>

        {/* 3) Стратегический контур — после «что/для кого» */}
        <div className="about__block">
          <div className="about__block-title">
            {data.scTitle}
          </div>
          <List items={data.scPoints} />
        </div>

        {/* 4) Польза (если есть) */}
        {data.benefits.length > 0 && (
          <div className="about__block">
            <div className="about__block-title">Что даёт участие</div>
            <List items={data.benefits} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUltima;
