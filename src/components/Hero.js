import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero({ content, scrollToSection }) {
  const hero = content?.hero || {};

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

  const pCTA = hero?.ctaPrimary ?? { label: "Онбординг", href: "#onboarding" };
  const sCTA = hero?.ctaSecondary ?? { label: "Подготовка к Start-СС", href: "#prep-ss" };

  return (
    <section id="hero" className="hero section-lg">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">{hero?.title || "ULTIMA"}</h1>
            <p className="hero-subtitle">{hero?.subtitle || "Стратегическое развитие организации"}</p>

            <div className="hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => go(pCTA.href)}>
                {pCTA.label} <ArrowRight size={20} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => go(sCTA.href)}>
                {sCTA.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
