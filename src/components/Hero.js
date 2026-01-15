import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * HERO — шапка лендинга ULTIMA
 * По ТЗ:
 *  - Акцент: "6 месяцев • 2 стратсессии • Еженедельные встречи • 3 мастермайнда (ММ) в год"
 *  - Буллеты: добавлен пункт про эфиры с экспертами
 *  - Кнопка: "Узнать про онбординг" → #onboarding (чтобы новичок шёл в правильный первый шаг)
 */
export default function Hero({ content, scrollToSection }) {
  const hero = content?.hero || {};
  const title =
    hero.title || "ULTIMA 9.0 — стратегический контур неизбежного результата";
  const subtitle =
    hero.subtitle ||
    "Не обучение. Не трекинг. Стратегический контур для достижения конкретного бизнес-результата через систему, дисциплину и ответственность.";

  const accent =
    hero.accent ||
    "6 месяцев • 2 стратсессии • Еженедельные встречи • 3 мастермайнда (ММ) в год";

  const bullets = Array.isArray(hero.bullets)
    ? hero.bullets
    : [
        "Фокус на факты, цифры и приборы контроля",
        "Цикл 6 месяцев: Start-СС → работа → Final-СС",
        "Трекер + Лидер группы + Ассистент + Бадди-система",
        "3 мастермайнда (ММ) в год + эфиры с топ-экспертами только для ULTIMA",
      ];

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-accent">{accent}</div>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>

            <ul className="hero-bullets">
              {bullets.map((b, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="hero-cta">
              <button
                className="cta-button primary"
                onClick={() => scrollToSection?.("onboarding")}
              >
                Узнать про онбординг <ArrowRight size={18} />
              </button>
              <button
                className="cta-button"
                onClick={() => scrollToSection?.("about-program")}
              >
                О программе
              </button>
            </div>
          </div>

          <div className="hero-art" />
        </div>
      </div>
    </section>
  );
}
