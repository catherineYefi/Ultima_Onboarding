import React, { useState, useMemo } from "react";
import { Calendar, Clock, MapPin, User, ChevronRight, X } from "lucide-react";

export default function ProgramCalendar({ title, events, showNote = false }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Сортируем события по дате
  const sortedEvents = useMemo(() => {
    return [...events]
      .filter((e) => e.start) // Фильтруем события без даты (TBD)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [events]);

  // Группируем по месяцам
  const eventsByMonth = useMemo(() => {
    const groups = {};
    sortedEvents.forEach((event) => {
      const date = new Date(event.start);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!groups[monthKey]) {
        groups[monthKey] = {
          month: date.toLocaleString("ru", { month: "long" }),
          year: date.getFullYear(),
          events: [],
        };
      }
      groups[monthKey].events.push(event);
    });
    return Object.values(groups);
  }, [sortedEvents]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const isSameDay = startDate.toDateString() === endDate.toDateString();

    if (isSameDay) {
      return `${startDate.toLocaleDateString("ru", {
        day: "numeric",
        month: "short",
      })} • ${startDate.toLocaleTimeString("ru", {
        hour: "2-digit",
        minute: "2-digit",
      })}–${endDate.toLocaleTimeString("ru", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return `${startDate.toLocaleDateString("ru", {
      day: "numeric",
      month: "short",
    })} – ${endDate.toLocaleDateString("ru", {
      day: "numeric",
      month: "short",
    })}`;
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case "nechto":
        return "Нечто";
      case "ultima":
        return "ULTIMA";
      case "group":
        return "Ваша группа";
      default:
        return level;
    }
  };

  const getFormatLabel = (format) => {
    switch (format) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "stage":
        return "Этап";
      default:
        return format;
    }
  };

  return (
    <div className="program-calendar">
      <div className="calendar-header">
        <Calendar size={32} className="calendar-icon" />
        <div>
          <h2>{title}</h2>
          {showNote && (
            <p className="calendar-note">
              В онбординге вы видите общий ритм Нечто и события ULTIMA. Все
              события Нечто, ULTIMA и вашей группы собраны в персональном
              календаре, закреплённом в чате группы.
            </p>
          )}
        </div>
      </div>

      <div className="calendar-timeline">
        {eventsByMonth.map((group, idx) => (
          <div key={idx} className="timeline-month">
            <div className="month-header">
              <div className="month-label">
                {group.month} {group.year}
              </div>
            </div>

            <div className="month-events">
              {group.events.map((event) => (
                <div
                  key={event.id}
                  className={`event-card level-${event.level}`}
                  onClick={() => setSelectedEvent(event)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelectedEvent(event)
                  }
                >
                  <div className="event-card-header">
                    <div className="event-badges">
                      <span
                        className={`badge badge-level level-${event.level}`}
                      >
                        {getLevelLabel(event.level)}
                      </span>
                      <span className="badge badge-format">
                        {getFormatLabel(event.format)}
                      </span>
                      {event.status && (
                        <span className="badge badge-status">
                          {event.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="event-title">{event.title}</h4>

                  <div className="event-meta">
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>
                        {event.end
                          ? formatDateRange(event.start, event.end)
                          : formatDate(event.start)}
                      </span>
                    </div>
                    {event.host && (
                      <div className="meta-item">
                        <User size={14} />
                        <span>{event.host}</span>
                      </div>
                    )}
                  </div>

                  <button className="event-details-btn">
                    Подробнее
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>

            <div className="modal-header">
              <h3>{selectedEvent.title}</h3>
              <div className="modal-badges">
                <span
                  className={`badge badge-level level-${selectedEvent.level}`}
                >
                  {getLevelLabel(selectedEvent.level)}
                </span>
                <span className="badge badge-format">
                  {getFormatLabel(selectedEvent.format)}
                </span>
                {selectedEvent.status && (
                  <span className="badge badge-status">
                    {selectedEvent.status}
                  </span>
                )}
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <div className="section-label">
                  <Clock size={18} />
                  <strong>Когда:</strong>
                </div>
                <p>
                  {selectedEvent.end
                    ? formatDateRange(selectedEvent.start, selectedEvent.end)
                    : formatDate(selectedEvent.start)}
                </p>
              </div>

              {selectedEvent.host && (
                <div className="modal-section">
                  <div className="section-label">
                    <User size={18} />
                    <strong>Кто ведёт:</strong>
                  </div>
                  <p>{selectedEvent.host}</p>
                </div>
              )}

              <div className="modal-section">
                <div className="section-label">
                  <strong>Суть:</strong>
                </div>
                <p>{selectedEvent.description}</p>
              </div>

              {selectedEvent.purpose && (
                <div className="modal-section">
                  <div className="section-label">
                    <strong>Зачем:</strong>
                  </div>
                  <p>{selectedEvent.purpose}</p>
                </div>
              )}

              {selectedEvent.prep && (
                <div className="modal-section highlight">
                  <div className="section-label">
                    <strong>Что подготовить:</strong>
                  </div>
                  <p>{selectedEvent.prep}</p>
                </div>
              )}

              {selectedEvent.note && (
                <div className="modal-note">{selectedEvent.note}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
