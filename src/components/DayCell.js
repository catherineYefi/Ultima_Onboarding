import React from "react";
import { getLevelColor } from "../utils/calendarUtils";

export default function DayCell({ day, events, isToday, onClick }) {
  if (!day) {
    return <div className="day-cell empty"></div>;
  }

  const hasEvents = events && events.length > 0;
  const visibleEvents = events ? events.slice(0, 3) : [];
  const hiddenCount = events ? Math.max(0, events.length - 3) : 0;

  // Проверяем есть ли диапазоны
  const rangeEvents = events ? events.filter((e) => e.isRange) : [];
  const hasRangeStart = rangeEvents.some((e) => e.isStart);
  const hasRangeEnd = rangeEvents.some((e) => e.isEnd);
  const hasRangeMid = rangeEvents.some((e) => !e.isStart && !e.isEnd);

  return (
    <div
      className={`day-cell ${hasEvents ? "has-events" : ""} ${
        isToday ? "today" : ""
      }`}
      onClick={() => hasEvents && onClick && onClick(events)}
    >
      <div className="day-number">{day}</div>

      {hasEvents && (
        <div className="day-markers">
          {visibleEvents.map((event, idx) => (
            <div
              key={`${event.id}-${idx}`}
              className="event-dot"
              style={{ backgroundColor: getLevelColor(event.level) }}
              title={event.title}
            />
          ))}
          {hiddenCount > 0 && <div className="more-count">+{hiddenCount}</div>}
        </div>
      )}

      {/* Подсветка диапазонов */}
      {rangeEvents.length > 0 && (
        <div
          className={`range-highlight ${hasRangeStart ? "start" : ""} ${
            hasRangeEnd ? "end" : ""
          } ${hasRangeMid ? "mid" : ""}`}
          style={{ backgroundColor: getLevelColor(rangeEvents[0].level) }}
        />
      )}
    </div>
  );
}
