import React from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar — сокращённое меню (5 пунктов) + прогресс-бар скролла.
 * ТЗ:
 * - Пункты в порядке: Главная / Начать / Онбординг / Подготовка / О программе
 * - Sticky, прозрачный фон с blur
 * - Прогресс-бар сверху показывает прогресс прокрутки
 * - Мобильное меню: гамбургер -> сайдбар справа
 */
export default function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  scrollProgress,
}) {
  const menuItems = [
    { id: "hero", label: "Главная" },
    { id: "start-here", label: "🚀 Начать" },
    { id: "onboarding", label: "Онбординг" },
    { id: "prep-ss", label: "Подготовка к СС" },
    { id: "about", label: "О программе" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div
        className="progress-bar-top"
        style={{ width: `${Math.min(Math.max(scrollProgress || 0, 0), 100)}%` }}
        aria-hidden="true"
      />

      <nav className="navbar" role="navigation" aria-label="Главная навигация">
        <div className="navbar-container">
          {/* Brand */}
          <div className="navbar-brand" onClick={() => scrollToSection?.("hero")} role="button" tabIndex={0}>
            <h1 className="brand-title">ULTIMA 9.0</h1>
            <span className="brand-subtitle">Онбординг</span>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-only">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection?.(item.id)}
                className={`menu-item ${activeSection === item.id ? "active" : ""}`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen?.(false)}
            aria-hidden="true"
          />
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Навигация">
            <div className="mobile-menu-header">
              <h3>Навигация</h3>
              <button onClick={() => setMobileMenuOpen?.(false)} aria-label="Закрыть меню">
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu-items">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection?.(item.id);
                    setMobileMenuOpen?.(false);
                  }}
                  className={`mobile-menu-item ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <p>Остальные разделы доступны при прокрутке</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
