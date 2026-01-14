import React from "react";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * HERO — первый экран.
 * Требования (согласно ТЗ):
 * - Заголовок + 1 строка описания
 * - Две CTA: "Начать онбординг" -> #start-here и "Календарь программы" -> #calendar
 * - Никаких списков/лишнего контента
 * - Анимация появления (fade-in)
 * - Мобильная версия: кнопки на всю ширину, вертикально
 */
export default function Hero({ scrollToSection }) {
  const goStart = () => scrollToSection?.("start-here");
  const goCalendar = () => scrollToSection?.("calendar");

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container fade-in">
        <div className="hero-content">
          <h1 className="hero-title">ULTIMA 9.0</h1>

          <p className="hero-subtitle">
            Ваш навигатор по стратегическому сезону — от первого шага до финальной сессии
          </p>

          <div className="hero-cta-group">
            <button
              onClick={goStart}
              className="cta-button primary"
              aria-label="Начать онбординг"
            >
              <span role="img" aria-label="rocket">🚀</span> Начать онбординг
              <ArrowRight size={20} />
            </button>

            <button
              onClick={goCalendar}
              className="cta-button secondary"
              aria-label="Открыть календарь программы"
            >
              <span role="img" aria-label="calendar">📅</span> Календарь программы
              <Calendar size={20} />
            </button>
          </div>
        </div>

        {/* Декоративная зона (по желанию): можно добавить градиент/абстракцию */}
        <div className="hero-decoration" aria-hidden="true" />
      </div>
    </section>
  );
}
