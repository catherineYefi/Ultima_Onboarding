import React, { useMemo } from "react";
import MonthCard from "./MonthCard";
import { groupEventsByDate, getMonthEvents } from "../utils/calendarUtils";

export default function CalendarGrid({ events, year = 2026 }) {
  // Группируем события по датам
  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  // Генерируем 12 месяцев
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="calendar-grid-container">
      <div className="calendar-grid-year">
        <h2>{year}</h2>
      </div>

      <div className="calendar-grid">
        {months.map((month) => {
          const monthEvents = getMonthEvents(events, year, month);

          return (
            <MonthCard
              key={month}
              year={year}
              month={month}
              eventsByDate={eventsByDate}
            />
          );
        })}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot nechto"></span>
          <span>Нечто</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot ultima"></span>
          <span>ULTIMA</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot group"></span>
          <span>Группа</span>
        </div>
      </div>
    </div>
  );
}
