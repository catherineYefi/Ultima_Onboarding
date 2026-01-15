// src/components/Navbar.js
import React from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar — верхняя навигация.
 *
 * По ТЗ:
 * - Убираем пункт "Правила" из навигации (теперь это подстраница/overlay из "Организационный старт").
 * - Сохраняем индикатор прогресса прокрутки.
 * - Мобильное меню.
 *
 * Пропсы:
 *  - activeSection: string — текущая активная секция (для подсветки)
 *  - mobileMenuOpen: bool — состояние мобильного меню
 *  - setMobileMenuOpen(fn): setter
 *  - scrollToSection(id): прокрутка к секции
 *  - content: объект из content.js (берём navItems)
 *  - scrollProgress: number 0..100 — прогресс прокрутки для топ-бар индикатора
 */
export default function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  content,
  scrollProgress = 0,
}) {
  const allItems = Array.isArray(content?.navItems) ? content.navItems : [];

  // скрываем "rules" из навигации
  const navItems = allItems.filter((it) => String(it?.id).toLowerCase() !== "rules");

  const clickNav = (id) => (e) => {
    e.preventDefault();
    setMobileMenuOpen?.(false);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else scrollToSection?.(id);
  };

  const logoSrc = `${process.env.PUBLIC_URL || ""}/logo192.png`;

  return (
    <header className="navbar">
      {/* progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${Math.max(0, Math.min(100, scrollProgress))}%` }}
      />

      <div className="container nav-inner">
        {/* logo/title */}
        <a href="#hero" className="brand" onClick={clickNav("hero")} aria-label="На главную">
          <img
            src={logoSrc}
            alt="ULTIMA"
            className="brand-logo"
            onError={(e) => {
              // если нет логотипа, просто скрываем img
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="brand-title">ULTIMA 9.0</span>
        </a>

        {/* desktop nav */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={clickNav(item.id)}
              >
                {item.title || item.id}
              </a>
            );
          })}
        </nav>

        {/* mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-link ${isActive ? "active" : ""}`}
                onClick={clickNav(item.id)}
              >
                {item.title || item.id}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
