import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import CalendarOverlay from "./CalendarOverlay";

export default function CalendarSection() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <section id="calendar" className="section">
        <div className="container">
          <div
            className="calendar-card"
            onClick={() => setIsCalendarOpen(true)}
          >
            <div className="calendar-card-icon">
              <Calendar size={48} />
            </div>
            <div className="calendar-card-content">
              <h3>Календарь Нечто</h3>
              <p>Расписание и события программы</p>
              <p className="calendar-card-subtitle">
                Общий ритм экосистемы Нечто и ключевые события ULTIMA
              </p>
            </div>
            <div className="calendar-card-action">
              <span>Открыть календарь</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </section>

      {isCalendarOpen && (
        <CalendarOverlay onClose={() => setIsCalendarOpen(false)} />
      )}
    </>
  );
}
