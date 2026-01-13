import React, { useEffect, useRef } from "react";
import { X, Calendar, Clock, User, MapPin } from "lucide-react";
import { getLevelLabel } from "../utils/calendarUtils";

export default function EventPopup({ events, position, onClose }) {
  const popupRef = useRef(null);

  // Закрытие по клику вне pop-up
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!events || events.length === 0) return null;

  // Если одно событие - показываем детали
  if (events.length === 1) {
    const event = events[0];
    const startDate = new Date(event.start);
    const endDate = event.end ? new Date(event.end) : null;

    const formatTime = (date) => {
      return date.toLocaleString("ru", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Moscow",
      });
    };

    const formatDate = (date) => {
      return date.toLocaleString("ru", {
        day: "numeric",
        month: "short",
        timeZone: "Europe/Moscow",
      });
    };

    const isAllDay =
      formatTime(startDate) === "00:00" &&
      (!endDate || formatTime(endDate) === "23:59");

    return (
      <div ref={popupRef} className="event-popup single-event" style={position}>
        <div className="popup-header">
          <h4>{event.title}</h4>
          <button className="popup-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="popup-badges">
          <span className={`badge badge-${event.level}`}>
            {getLevelLabel(event.level)}
          </span>
          <span className="badge badge-format">
            {event.format === "offline" ? "Офлайн" : "Онлайн"}
          </span>
        </div>

        <div className="popup-body">
          <div className="popup-section">
            <div className="section-label">
              <Calendar size={16} />
              <span>Когда</span>
            </div>
            <p>
              {isAllDay
                ? endDate && formatDate(startDate) !== formatDate(endDate)
                  ? `${formatDate(startDate)} – ${formatDate(endDate)}`
                  : formatDate(startDate)
                : endDate && formatDate(startDate) !== formatDate(endDate)
                ? `${formatDate(startDate)} ${formatTime(
                    startDate
                  )} – ${formatDate(endDate)} ${formatTime(endDate)}`
                : `${formatDate(startDate)} • ${formatTime(
                    startDate
                  )}–${formatTime(endDate || startDate)}`}
            </p>
          </div>

          {event.host && (
            <div className="popup-section">
              <div className="section-label">
                <User size={16} />
                <span>Кто ведёт</span>
              </div>
              <p>{event.host}</p>
            </div>
          )}

          {event.description && (
            <div className="popup-section">
              <div className="section-label">
                <MapPin size={16} />
                <span>Суть</span>
              </div>
              <p>{event.description}</p>
            </div>
          )}

          {event.purpose && (
            <div className="popup-section">
              <div className="section-label">
                <span>Зачем</span>
              </div>
              <p>{event.purpose}</p>
            </div>
          )}

          {event.prep && (
            <div className="popup-section highlight">
              <div className="section-label">
                <Clock size={16} />
                <span>Что подготовить</span>
              </div>
              <p>{event.prep}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Если несколько событий - показываем список
  return (
    <div ref={popupRef} className="event-popup multi-events" style={position}>
      <div className="popup-header">
        <h4>События дня ({events.length})</h4>
        <button className="popup-close" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="popup-body">
        {events.map((event, idx) => {
          const startDate = new Date(event.start);
          const formatTime = (date) => {
            return date.toLocaleString("ru", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Moscow",
            });
          };

          const isAllDay = formatTime(startDate) === "00:00";

          return (
            <div key={`${event.id}-${idx}`} className="event-list-item">
              <div className="event-list-badges">
                <span className={`badge badge-${event.level}`}>
                  {getLevelLabel(event.level)}
                </span>
              </div>
              <div className="event-list-content">
                <h5>{event.title}</h5>
                {!isAllDay && (
                  <p className="event-time">{formatTime(startDate)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
