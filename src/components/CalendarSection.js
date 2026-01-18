import React, { useMemo } from "react";

/**
 * Секция «Календарь» — строго якорь id="calendar"
 *
 * Источники данных (любой из них, по наличию):
 *  A) content.sections.calendar = { title?, subtitle?, events?: Event[] }
 *  Б) content.calendar = { title?, subtitle?, events?: Event[] }
 *  В) fallback: построение событий по rhythm из content.sections.mainCycle.rhythm
 *
 * Event:
 *  {
 *    date?: string,            // "2026-02-05" или "05.02" или текстовый ярлык
 *    time?: string,            // "10:00–11:00"
 *    title?: string,           // "Старт-CC"
 *    description?: string,     // краткое описание
 *    link?: string,            // внешняя ссылка или якорь
 *    location?: string         // "Zoom", "Офис", и т.п.
 *  }
 */

const normalizeEvents = (content = {}) => {
  const fromSections = content?.sections?.calendar || {};
  const fromRoot = content?.calendar || {};
  const src = Array.isArray(fromSections?.events)
    ? fromSections
    : Array.isArray(fromRoot?.events)
    ? fromRoot
    : {};

  // Если есть явные события — используем их.
  if (Array.isArray(src.events) && src.events.length) {
    return {
      title: src.title || "Календарь программы",
      subtitle:
        src.subtitle ||
        "Ключевые события и контрольные точки. Синхронизируйте свой график.",
      events: src.events,
    };
  }

  // Fallback: пробуем собрать события из rhythm главного цикла
  const rhythm = content?.sections?.mainCycle?.rhythm;
  const rhythmEvents =
    Array.isArray(rhythm) && rhythm.length
      ? rhythm.map((r, i) => ({
          date: `Неделя ${i + 1}`,
          time: "",
          title: r?.title || "Синк",
          description: r?.description || "",
          link: "",
          location: "",
        }))
      : [];

  // Если нет ничего — даём очень безопасные дефолты.
  const defaults =
    rhythmEvents.length > 0
      ? rhythmEvents
      : [
          {
            date: "TBD",
            time: "",
            title: "События будут добавлены",
            description:
              "Ответственные могут заполнить календарь через content.sections.calendar.events.",
            link: "",
            location: "",
          },
        ];

  return {
    title: "Календарь программы",
    subtitle:
      "Ключевые события и контрольные точки. Синхронизируйте свой график.",
    events: defaults,
  };
};

const EventRow = ({ e }) => {
  const hasLink = e?.link && e.link !== "#";
  return (
    <li className="calendar__row">
      <div className="calendar__cell calendar__cell--date">{e?.date || "—"}</div>
      <div className="calendar__cell calendar__cell--time">{e?.time || ""}</div>
      <div className="calendar__cell calendar__cell--title">
        <div className="calendar__title">
          {hasLink ? (
            <a
              href={e.link}
              target={e.link?.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={(ev) => {
                if (e.link === "#") ev.preventDefault();
              }}
            >
              {e?.title || "Событие"}
            </a>
          ) : (
            e?.title || "Событие"
          )}
        </div>
        {e?.description && (
          <div className="calendar__desc">{e.description}</div>
        )}
      </div>
      <div className="calendar__cell calendar__cell--location">
        {e?.location || ""}
      </div>
    </li>
  );
};

const CalendarSection = ({ id = "calendar", content = {} }) => {
  const data = useMemo(() => normalizeEvents(content), [content]);

  return (
    <section id={id} className="section calendar">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section__subtitle">{data.subtitle}</p>
          )}
        </header>

        <div className="calendar__table" role="table" aria-label="Календарь событий">
          <div className="calendar__header" role="rowgroup">
            <div className="calendar__row calendar__row--head" role="row">
              <div className="calendar__cell calendar__cell--date" role="columnheader">
                Дата
              </div>
              <div className="calendar__cell calendar__cell--time" role="columnheader">
                Время
              </div>
              <div className="calendar__cell calendar__cell--title" role="columnheader">
                Событие
              </div>
              <div className="calendar__cell calendar__cell--location" role="columnheader">
                Место
              </div>
            </div>
          </div>

          <ul className="calendar__body" role="rowgroup">
            {data.events.map((e, i) => (
              <EventRow key={i} e={e} />
            ))}
          </ul>
        </div>

        {/* Подсказка, как заполнять */}
        <div className="calendar__hint">
          Заполняется в <code>content.sections.calendar.events</code> (или{" "}
          <code>content.calendar.events</code>). Поддерживаются поля:
          <code>date</code>, <code>time</code>, <code>title</code>,{" "}
          <code>description</code>, <code>link</code>, <code>location</code>.
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
