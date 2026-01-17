import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

/**
 * Checklist компонент - стартовый чек-лист с сохранением в localStorage
 * VERSION 2.0 - читает из content.startingChecklist
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Checklist({ id = "checklist", content }) {
  const checklistData = content?.startingChecklist || {};
  const items = checklistData?.items || [];

  // Инициализация чеклиста
  const initializeChecklist = () => {
    return items.map((text, idx) => ({
      id: idx,
      text,
      completed: false,
    }));
  };

  const [checklist, setChecklist] = useState(initializeChecklist());

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("ultima-checklist-v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Проверяем, что количество пунктов совпадает
        if (parsed.length === items.length) {
          setChecklist(parsed);
        } else {
          // Если структура изменилась, сбрасываем
          setChecklist(initializeChecklist());
        }
      } catch (e) {
        console.error("Failed to parse checklist:", e);
        setChecklist(initializeChecklist());
      }
    }
  }, []);

  // Переключение пункта чеклиста
  const toggleItem = (itemId) => {
    const updated = checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    localStorage.setItem("ultima-checklist-v2", JSON.stringify(updated));
  };

  // Расчёт прогресса
  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header">
          <h2 className="section-title">
            {checklistData?.title || "Стартовый чек-лист"}
          </h2>
          <p className="section-subtitle">
            {checklistData?.subtitle || "Пройди все пункты перед первой встречей группы"}
          </p>
        </div>

        {/* Прогресс-бар */}
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
                className="checklist-item-input"
                style={{ display: "none" }}
              />
              <div className="checklist-item-checkbox">
                {item.completed && <Check size={16} />}
              </div>
              <span className="checklist-item-text">{item.text}</span>
            </label>
          ))}
        </div>

        {/* Мотивационное сообщение при завершении */}
        {progress === 100 && (
          <div className="checklist-complete-message">
            🎉 Отлично! Вы готовы к старту программы!
          </div>
        )}
      </div>
    </section>
  );
}