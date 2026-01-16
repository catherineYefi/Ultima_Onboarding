import React from "react";

/**
 * Glossary компонент - глоссарий ключевых терминов ULTIMA
 */
export default function Glossary({ id = "glossary" }) {
  const terms = [
    {
      title: "ММ (Мастермайнд)",
      description:
        "Группа предпринимателей, работающих над общей целью. Основа программы ULTIMA.",
    },
    {
      title: "Бадди (Buddy)",
      description:
        "Личный наставник из группы, который помогает вам в достижении целей на протяжении 6 месяцев.",
    },
    {
      title: "Ассистент группы",
      description:
        "Специалист, координирующий встречи группы, собирающий отчёты и поддерживающий дисциплину.",
    },
    {
      title: "WIG (Wildly Important Goal)",
      description:
        "Главная цель на 6 месяцев. Должна быть измеримой и фокусированной на одном приоритете.",
    },
    {
      title: "Start-СС (Стратегическая Сессия)",
      description:
        "Офлайн-мероприятие в начале программы, где определяются цели, роли и приборы контроля.",
    },
    {
      title: "Final-СС (Финальная Сессия)",
      description:
        "Заключительное мероприятие, где подводятся итоги, проверяется выполнение целей и определяются следующие шаги.",
    },
  ];

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Глоссарий терминов</h2>
          <p className="section-subtitle">
            Ключевые понятия, которые нужно знать перед началом программы
          </p>
        </div>

        <div className="glossary-grid">
          {terms.map((term, idx) => (
            <div key={idx} className="glossary-card">
              <h3 className="glossary-card-title">{term.title}</h3>
              <p className="glossary-card-description">{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
