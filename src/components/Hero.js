import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

/**
 * Hero компонент - главный блок онбординга
 * VERSION 2.0 - обновлен под новую структуру content.hero
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 * - scrollToSection: функция для навигации
 */
export default function Hero({ id = "hero", content, scrollToSection }) {
  const hero = content?.hero || {};

  // CTA кнопки из нового формата
  const primaryCTA = hero?.cta?.primary || { label: "Узнать про онбординг", href: "#onboarding" };
  const secondaryCTA = hero?.cta?.secondary || { label: "К подготовке Start-СС", href: "#prep-start-cc" };

  // Функция навигации
  const handleCTAClick = (href) => {
    if (!href) return;
    
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      if (scrollToSection) {
        scrollToSection(targetId);
      } else {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="hero section-lg">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            {/* Заголовок и подзаголовок */}
            <h1 className="hero-title">{hero?.title || "ULTIMA 9.0"}</h1>
            <p className="hero-subtitle">{hero?.subtitle || "Стратегический контур неизбежного результата"}</p>

            {/* Описание */}
            {hero?.description && (
              <p className="hero-description">{hero.description}</p>
            )}

            {/* Highlights - ключевые пункты */}
            {hero?.highlights && hero.highlights.length > 0 && (
              <ul className="hero-highlights">
                {hero.highlights.map((item, idx) => (
                  <li key={idx} className="hero-highlight-item">
                    <CheckCircle size={20} className="hero-highlight-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Accent - дополнительный акцент */}
            {hero?.accent && (
              <div className="hero-accent">
                {hero.accent}
              </div>
            )}

            {/* CTA кнопки */}
            <div className="hero-cta">
              <button 
                className="btn btn-primary btn-lg" 
                onClick={() => handleCTAClick(primaryCTA.href)}
              >
                {primaryCTA.label} <ArrowRight size={20} />
              </button>
              <button 
                className="btn btn-secondary btn-lg" 
                onClick={() => handleCTAClick(secondaryCTA.href)}
              >
                {secondaryCTA.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}