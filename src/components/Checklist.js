import React, { useEffect, useMemo, useState } from "react";

/**
 * Checklist — интерактивный чек-лист с сохранением состояния.
 * Источники данных:
 *  - content.checklist  или  content.sections.checklist
 * Формат:
 * {
 *   id?: "prep-ss",
 *   title?: "...",
 *   subtitle?: "...",
 *   groups: [
 *     { title: "Группа", items: [{ id: "x", text: "..." }, ...] }
 *   ]
 * }
 */

const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
};

const normalize = (content = {}) => {
  const a = content?.sections?.checklist || {};
  const b = content?.checklist || {};
  const src = Object.keys(a).length ? a : b;

  const title = src?.title || "Чек-лист подготовки";
  const subtitle =
    src?.subtitle ||
    "Отмечай выполненные пункты — прогресс сохранится автоматически.";

  // поддержим как groups[], так и плоский items[]
  const groups =
    Array.isArray(src?.groups) && src.groups.length
      ? src.groups
      : [
          {
            title: "Базовые шаги",
            items:
              Array.isArray(src?.items) && src.items.length
                ? src.items
                : [
                    { id: "assign-owners", text: "Назначены ответственные по направлениям" },
                    { id: "collect-docs", text: "Собраны NDA и презентация команды" },
                    { id: "book-venue", text: "Выбрана и забронирована площадка для СС" },
                  ],
          },
        ];

  const checklistId = src?.id || "default-checklist";
  return { checklistId, title, subtitle, groups };
};

export default function Checklist({ id = "checklist", content = {} }) {
  const data = useMemo(() => normalize(content), [content]);

  // построим список всех id пунктов, чтобы инициализировать состояние
  const allIds = useMemo(
    () =>
      data.groups.flatMap((g) =>
        (g.items || []).map((it) => String(it.id || it.text))
      ),
    [data]
  );

  const initialState = useMemo(() => {
    const obj = {};
    allIds.forEach((k) => (obj[k] = false));
    return obj;
  }, [allIds]);

  const [checked, setChecked] = useLocalState(
    `checklist:${data.checklistId}`,
    initialState
  );

  // если состав чеклиста поменялся — аккуратно подстроим состояние
  useEffect(() => {
    setChecked((prev) => {
      const nxt = { ...prev };
      allIds.forEach((k) => {
        if (nxt[k] === undefined) nxt[k] = false;
      });
      Object.keys(nxt).forEach((k) => {
        if (!allIds.includes(k)) delete nxt[k];
      });
      return nxt;
    });
  }, [allIds, setChecked]);

  const toggle = (key) => setChecked((s) => ({ ...s, [key]: !s[key] }));

  const total = allIds.length;
  const done = Object.values(checked).filter(Boolean).length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        {/* Прогресс */}
        <div className="checklist-progress" aria-label="Прогресс чек-листа">
          <div className="checklist-progress-bar">
            <div
              className="checklist-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="checklist-progress-text">
            {done} / {total} — {progress}%
          </div>
        </div>

        {/* Группы чек-листа */}
        {data.groups.map((g, gi) => (
          <div key={gi} className="checklist-group">
            {g.title && <h3 className="checklist-group-title">{g.title}</h3>}
            <ul className="checklist-list">
              {(g.items || []).map((it, ii) => {
                const key = String(it.id || it.text);
                return (
                  <li key={ii} className="checklist-item">
                    <label className="checklist-row">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                      />
                      <span className="checklist-text">{it.text || String(it)}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
