import React from "react";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";

/**
 * HERO — главный экран лендинга ULTIMA.
 *
 * Правки по ТЗ:
 * - Акцентная строка: «6 месяцев • 2 стратсессии • Еженедельные встречи • 3 мастермайнда (ММ) в год»
 * - Буллеты: добавлен «3 ММ + эфиры с топ-экспертами только для ULTIMA»
 * - Кнопка по умолчанию ведёт в онбординг (как первый шаг для новичка)
 * - Вторая кнопка: к подготовке Start-СС
 *
 * Пропсы:
 *  - content: объект из content.js
 *  - scrollToSection?: (id: string) => void
 */
export default function Hero({ content, scrollToSection }) {
  const hero = content?.hero || {};
  const title =
    hero.title ||
    "ULTIMA — стратегический контур неизбежного результата";
  const subtitle =
    hero.subtitle ||
    "Не обучение. Не трекинг. Работа на конкретный бизнес-результат через систему, дисциплину и ответственность.";
  const bullets = Array.isArray(hero.bullets) && hero.bullets.length > 0
    ? hero.bullets
    : [
        "Фокус на факты, цифры и приборы контроля",
        "Цикл 6 месяцев: Start-СС → работа → Final-СС",
        "Трекер + Лидер группы + Ассистент + Бадди-система",
        "3 мастермайнда (ММ) в год + эфиры с топ-экспертами только для ULTIMA",
      ];
  const accent =
    hero.accent ||
    "6 месяцев • 2 стратсессии • Еженедельные встречи • 3 мастермайнда (ММ) в год";

  const goto = (id) => () => {
    if (!id) return;
    if (typeof scrollToSection === "function") {
      scrollToSection(id);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <div className="container hero-container">
        {/* Левый столбец: текст */}
        <div className="hero-left">
          {/* Акцент-пилюля */}
          <div className="hero-accent">{accent}</div>

          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>

          {/* Буллеты */}
          <ul className="hero-bullets">
            {bullets.map((b, i) => (
              <li key={i} className="hero-bullet">
                <CheckCircle2 size={18} className="hero-bullet-icon" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA блок */}
          <div className="hero-cta">
            {/* По умолчанию ведём новичка в онбординг */}
            <button className="cta-button primary" onClick={goto("onboarding")}>
              Узнать про онбординг <ArrowRight size={18} />
            </button>

            {/* Доп. кнопка — к подготовке Start-СС */}
            <button
              className="cta-button secondary"
              onClick={goto("prep-ss")}
              style={{ marginLeft: 8 }}
            >
              К подготовке Start-СС <PlayCircle size={18} />
            </button>
          </div>
        </div>

        {/* Правый столбец: декоративный блок (опционально) */}
        <div className="hero-right">
          <div className="hero-card stats">
            <div className="stat">
              <div className="stat-value">6&nbsp;мес.</div>
              <div className="stat-label">длина сезона</div>
            </div>
            <div className="stat">
              <div className="stat-value">8</div>
              <div className="stat-label">участников в группе</div>
            </div>
            <div className="stat">
              <div className="stat-value">3</div>
              <div className="stat-label">офлайн-ММ в год</div>
            </div>
          </div>

          {/* Можно добавить иллюстрацию/абстрактный градиент через CSS */}
          <div className="hero-art" aria-hidden />
        </div>
      </div>
    </section>
  );
}
