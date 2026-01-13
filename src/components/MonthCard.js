import React, { useState } from "react";
import DayCell from "./DayCell";
import EventPopup from "./EventPopup";
import {
  getMonthDays,
  monthNames,
  weekdayNames,
  hasEventsOnDate,
} from "../utils/calendarUtils";

export default function MonthCard({ year, month, eventsByDate }) {
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [popupPosition, setPopupPosition] = useState({});

  const weeks = getMonthDays(year, month);
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const currentDay = isCurrentMonth ? today.getDate() : null;

  const handleDayClick = (events, e) => {
    if (events && events.length > 0) {
      // Позиционируем pop-up относительно клика
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      };

      setPopupPosition(position);
      setSelectedEvents(events);
    }
  };

  return (
    <div className="month-card">
      <div className="month-header">
        <h3>
          {monthNames[month]} {year}
        </h3>
      </div>

      <div className="month-weekdays">
        {weekdayNames.map((day, idx) => (
          <div key={idx} className="weekday-label">
            {day}
          </div>
        ))}
      </div>

      <div className="month-grid">
        {weeks.map((week, weekIdx) => (
          <React.Fragment key={weekIdx}>
            {week.map((day, dayIdx) => {
              const events = day
                ? hasEventsOnDate(eventsByDate, year, month, day)
                : [];
              const isToday = day === currentDay;

              return (
                <DayCell
                  key={`${weekIdx}-${dayIdx}`}
                  day={day}
                  events={events}
                  isToday={isToday}
                  onClick={(evts) =>
                    handleDayClick(evts, {
                      currentTarget: document.querySelector(
                        `.month-card:nth-child(${
                          month + 1
                        }) .day-cell:nth-child(${weekIdx * 7 + dayIdx + 8})`
                      ),
                    })
                  }
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {selectedEvents && (
        <EventPopup
          events={selectedEvents}
          position={popupPosition}
          onClose={() => setSelectedEvents(null)}
        />
      )}
    </div>
  );
}
