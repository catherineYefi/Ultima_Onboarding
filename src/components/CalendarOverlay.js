import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CalendarModeToggle from "./CalendarModeToggle";
import CalendarGrid from "./CalendarGrid";
import ProgramCalendar from "./ProgramCalendar";
import { nechtoEvents } from "../data/events.nechto";
import { ultimaEvents } from "../data/events.ultima";

export default function CalendarOverlay({ onClose }) {
  // В онбординге показываем только Нечто + ULTIMA (без группы)
  const onboardingEvents = [...nechtoEvents, ...ultimaEvents];

  // Режим календаря: grid или list
  const [calendarMode, setCalendarMode] = useState(() => {
    // Загружаем из localStorage если есть
    return localStorage.getItem("calendarMode") || "grid";
  });

  // Сохраняем режим в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("calendarMode", calendarMode);
  }, [calendarMode]);

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

          <div className="overlay-header-actions">
            <CalendarModeToggle
              mode={calendarMode}
              onChange={setCalendarMode}
            />
            <button
              className="overlay-close-btn"
              onClick={onClose}
              aria-label="Закрыть календарь"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-overlay-body">
        <div className="container">
          {calendarMode === "grid" ? (
            <CalendarGrid events={onboardingEvents} year={2026} />
          ) : (
            <ProgramCalendar
              title=""
              events={onboardingEvents}
              showNote={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
