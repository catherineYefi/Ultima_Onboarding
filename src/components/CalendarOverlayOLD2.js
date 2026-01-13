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

  // ДЕБАГ: проверяем что overlay рендерится
  console.log("CalendarOverlay render, mode:", calendarMode);

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

          {/* ВРЕМЕННЫЙ ПЕРЕКЛЮЧАТЕЛЬ - для теста */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              background: "rgba(255,255,255,0.1)",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => setCalendarMode("grid")}
              style={{
                padding: "10px 20px",
                background: calendarMode === "grid" ? "#6366f1" : "#666",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🗓️ Grid
            </button>
            <button
              onClick={() => setCalendarMode("list")}
              style={{
                padding: "10px 20px",
                background: calendarMode === "list" ? "#6366f1" : "#666",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              📋 List
            </button>
          </div>

          {/* ОСНОВНОЙ ПЕРЕКЛЮЧАТЕЛЬ - из компонента */}
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
          {/* Показываем текущий режим */}
          <div
            style={{
              padding: "10px",
              background: "yellow",
              color: "black",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            ТЕКУЩИЙ РЕЖИМ: {calendarMode}
          </div>

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
