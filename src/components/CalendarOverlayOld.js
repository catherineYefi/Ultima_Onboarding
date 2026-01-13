import React, { useEffect } from "react";
import { X } from "lucide-react";
import ProgramCalendar from "./ProgramCalendar";
import { nechtoEvents } from "../data/events.nechto";
import { ultimaEvents } from "../data/events.ultima";

export default function CalendarOverlay({ onClose }) {
  // В онбординге показываем только Нечто + ULTIMA (без группы)
  const onboardingEvents = [...nechtoEvents, ...ultimaEvents];

  // Блокируем скролл body когда overlay открыт
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="calendar-overlay">
      <div className="calendar-overlay-header">
        <div className="container">
          <div className="overlay-header-content">
            <h2>Календарь программы</h2>
            <p className="overlay-subtitle">
              Общий ритм экосистемы Нечто и ключевые события ULTIMA
            </p>
          </div>
          <button
            className="overlay-close-btn"
            onClick={onClose}
            aria-label="Закрыть календарь"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      <div className="calendar-overlay-body">
        <div className="container">
          <ProgramCalendar
            title=""
            events={onboardingEvents}
            showNote={false}
          />
        </div>
      </div>
    </div>
  );
}
