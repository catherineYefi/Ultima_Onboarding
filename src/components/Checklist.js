import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

/**
 * Checklist компонент - стартовый чек-лист с сохранением в localStorage
 */
export default function Checklist({ id = "checklist" }) {
  const defaultItems = [
    "Подписал NDA",
    "Вступил в чаты группы",
    "Узнал про роль buddy (назначение на первой встрече)",
    "Записал видео-визитку о бизнесе (2–3 минуты)",
    "Заполнил \"Точку А и Б\"",
    "Подготовил презентацию для Start-СС",
    "Составил черновик декларации WIG",
    "Определил первую золотую задачу",
  ];

  const [checklist, setChecklist] = useState(defaultItems.map((text, idx) => ({
    id: idx,
    text,
    completed: false,
  })));

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ultima-checklist");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChecklist(parsed);
      } catch (e) {
        console.error("Failed to parse checklist:", e);
      }
    }
  }, []);

  // Сохранение в localStorage
  const toggleItem = (itemId) => {
    const updated = checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    localStorage.setItem("ultima-checklist", JSON.stringify(updated));
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Стартовый чек-лист</h2>
          <p className="section-subtitle">
            Пройди все пункты перед первой встречей группы
          </p>
        </div>

        {/* Прогресс */}
        <div className="checklist-progress">
          <div className="checklist-progress-bar">
            <div
              className="checklist-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="checklist-progress-text">
            Выполнено {completedCount} из {totalCount} ({progress}%)
          </div>
        </div>

        {/* Пункты чек-листа */}
        <div className="checklist-items">
          {checklist.map((item, idx) => (
            <label
              key={item.id}
              className={`checklist-item ${item.completed ? "completed" : ""}`}
              style={{
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="checklist-item-checkbox"
                style={{ display: "none" }}
              />
              <div className="checklist-item-checkbox">
                {item.completed && <Check size={16} />}
              </div>
              <span className="checklist-item-text">{item.text}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
