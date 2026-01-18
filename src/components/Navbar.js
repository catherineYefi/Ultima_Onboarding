import React, { useState, useEffect } from "react";
// Если у вас установлен lucide-react — можно оставить иконки. Если нет, удалите импорт и JSX с иконками.
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

/**
 * Унифицированная навигация под новые ID секций
 * Принимает:
 * - activeSection: string — текущая активная секция (из App)
 * - scrollToSection: (id: string) => void — плавный скролл (из App)
 */
const Navbar = ({ activeSection = "hero", scrollToSection = () => {} }) => {
  const [opened, setOpened] = useState(false);
  const [elevated, setElevated] = useState(false);

  // Набор пунктов верхнего меню (лаконично, без перегруза)
  const links = [
    { id: "about-program", label: "О программе" },
    { id: "roadmap", label: "Дорожная карта" },
    { id: "checklist", label: "Чек-лист" },
    { id: "prep-start-cc", label: "Подготовка" },
    { id: "meetings-rhythm", label: "Ритм" },
    { id: "roles", label: "Роли" },
    { id: "tools-hub", label: "Инструменты" },
    { id: "documents", label: "Документы" },
  ];

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpened(false);
    scrollToSection(id);
  };

  return (
    <header className={`navbar ${elevated ? "navbar--elevated" : ""}`}>
      <div className="navbar__inner">
        {/* Лого/бренд */}
        <div className="navbar__brand" onClick={() => go("hero")} role="button" tabIndex={0}>
          <span className="navbar__logo">ULTIMA 9.0</span>
        </div>

        {/* Десктоп-меню */}
        <nav className="navbar__links">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${activeSection === l.id ? "active" : ""}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Бургер для мобилок */}
        <button
          className="navbar__burger"
          aria-label={opened ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpened((s) => !s)}
        >
          {opened ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Мобильное выезжающее меню */}
      {opened && (
        <div className="navbar__drawer">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav-link nav-link--drawer ${activeSection === l.id ? "active" : ""}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="nav-link nav-link--drawer" onClick={() => go("final-cc")}>
            Завершение
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
