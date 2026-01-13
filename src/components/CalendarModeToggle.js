import React from "react";
import { Calendar, LayoutGrid } from "lucide-react";

export default function CalendarModeToggle({ mode, onChange }) {
  return (
    <div className="calendar-mode-toggle">
      <button
        className={`mode-btn ${mode === "grid" ? "active" : ""}`}
        onClick={() => onChange("grid")}
        aria-label="Дорожная карта"
      >
        <LayoutGrid size={18} />
        <span>Дорожная карта</span>
      </button>
      <button
        className={`mode-btn ${mode === "list" ? "active" : ""}`}
        onClick={() => onChange("list")}
        aria-label="Расписание"
      >
        <Calendar size={18} />
        <span>Расписание</span>
      </button>
    </div>
  );
}
