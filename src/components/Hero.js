import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero({ content, scrollToSection }) {
  const hero = content?.sections?.hero ?? {};
  const title =
    hero?.title ??
    "ULTIMA 9.0 — система управления ростом: цели, ритм, дисциплина, приборы";
  const subtitle =
    hero?.subtitle ??
    "6 месяцев управляемого внедрения: Start-СС → недельный ритм → Final-СС.";

  const bullets =
    Array.isArray(hero?.bullets) && hero.bullets.length > 0
      ? hero.bullets
      : [
          "Фокус на факты, цифры и приборы контроля",
          "Цикл 6 месяцев: Start-СС → работа → Final-СС",
          "Трекер + Лидер группы + Ассистент + Бадди-система",
          "3 мастермайнда (ММ) в год + эфиры с топ-экспертами только для ULTIMA",
        ];

  // Акцентная строка в хиро
  const accent =
    hero?.accent ??
    "6 месяцев • 2 стратсессии • Еженедельные встречи • 3 мастермайнда (ММ) в год";

  const primaryCta = {
    label: "К подготовке Start-СС",
    href: "#prep-ss",
  };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
      scrollToSection?.(id);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <header id="hero" className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
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

            <div className="hero-actions">
              <button
                className="cta-button primary"
                onClick={() => go(primaryCta.href)}
              >
                {primaryCta.label} <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-visual">
            {/* место под иллюстрацию/градиент/логотип */}
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </header>
  );
}
