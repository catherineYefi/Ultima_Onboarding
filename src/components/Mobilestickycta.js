import React, { useState, useEffect } from "react";
import { Target } from "lucide-react";

export default function MobileStickyCTA({ onClick }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const prepSSSection = document.getElementById("prep-ss");
      if (prepSSSection) {
        const rect = prepSSSection.getBoundingClientRect();
        // Скрываем CTA когда PrepSS в видимости
        setIsVisible(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Проверяем при монтировании

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`mobile-sticky-cta ${isVisible ? "visible" : "hidden"}`}>
      <button
        onClick={onClick}
        className="sticky-cta-button"
        aria-label="Перейти к подготовке к стратегической сессии"
      >
        <Target size={20} />
        <span>Подготовка к СС</span>
      </button>
    </div>
  );
}
