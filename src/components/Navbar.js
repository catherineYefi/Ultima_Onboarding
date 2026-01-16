import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar компонент - sticky навигация с 3 основными разделами + бургер-меню
 * 
 * Props:
 * - activeSection: текущая активная секция (для подсвечивания)
 * - scrollToSection: функция для скролла к секции
 */
export default function Navbar({ activeSection, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Главные разделы (3 кнопки в навбаре)
  const mainSections = [
    { id: "onboarding", label: "Онбординг" },
    { id: "about", label: "О программе" },
    { id: "documents-nda", label: "Документы" },
  ];

  // Отслеживание скролла для sticky поведения
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Обработчик клика на раздел
  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Логотип */}
        <div 
          className="navbar-logo"
          onClick={() => scrollToSection("hero")}
          role="button"
          tabIndex="0"
        >
          ULTIMA 9.0
        </div>

        {/* Desktop меню */}
        <ul className="navbar-menu">
          {mainSections.map((section) => (
            <li key={section.id}>
              <button
                className={`navbar-link ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile меню кнопка */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile меню */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {mainSections.map((section) => (
            <button
              key={section.id}
              className={`navbar-mobile-link ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
