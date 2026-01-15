import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ content, scrollToSection }) {
  const hero = content?.hero || {};
  const bullets = Array.isArray(hero?.bullets) ? hero.bullets : [];
  const accent = hero?.accent;

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const pCTA = hero?.ctaPrimary ?? { label: "Узнать про онбординг", href: "#onboarding" };
  const sCTA = hero?.ctaSecondary ?? { label: "К подготовке Start-СС", href: "#prep-ss" };

  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">{hero?.title || "ULTIMA"}</h1>
            <p className="hero-subtitle">{hero?.subtitle || ""}</p>

            {Array.isArray(bullets) && bullets.length > 0 && (
              <ul className="hero-bullets">
                {bullets.map((b, i) => (
                  <li key={i}>
                    <Sparkles size={16} /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {accent && <div className="hero-accent">{accent}</div>}

            <div className="hero-cta">
              <button className="cta-button primary" onClick={() => go(pCTA.href)}>
                {pCTA.label} <ArrowRight size={18} />
              </button>
              <button className="cta-button secondary" onClick={() => go(sCTA.href)}>
                {sCTA.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
