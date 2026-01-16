import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop компонент - кнопка для скролла наверх
 * Появляется при scroll > 500px
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Прокрутить наверх"
      title="Вернуться наверх"
    >
      <ArrowUp size={24} />
    </button>
  );
}
