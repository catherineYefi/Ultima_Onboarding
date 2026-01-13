import React from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  content,
  scrollProgress,
}) {
  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">ULTIMA 9.0</div>

            {/* Desktop Navigation */}
            <div
              className="nav-links desktop-only"
              role="navigation"
              aria-label="Основная навигация"
            >
              {content.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  aria-label={`Перейти к секции ${item.title}`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              {content.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
