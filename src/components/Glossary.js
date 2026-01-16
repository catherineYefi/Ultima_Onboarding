import React from "react";

/**
 * Glossary компонент - глоссарий ключевых терминов ULTIMA
 * Все определения соответствуют методологии из content.js
 */
export default function Glossary({ id = "glossary" }) {
  const terms = [
    {
      title: "ММ (Мастермайнд)",
      description:
        "Встреча с топ-экспертами для обмена опытом и управленческих инсайтов. 3 ММ в год только для участников ULTIMA.",
    },
    {
      title: "Бадди (Buddy)",
      description:
        "Партнёр внутри группы для взаимной поддержки и ответственности. Созвоны раз в 2 недели.",
    },
    {
      title: "Ассистент группы",
      description:
        "Протоколирует встречи, контролирует сроки и фиксирует решения в течение всего сезона.",
    },
    {
      title: "WIG (Wildly Important Goal)",
      description:
        "Главная цель на 6 месяцев. Должна быть измеримой и фокусированной на одном приоритете.",
    },
    {
      title: "Трекер",
      description:
        "Действующий предприниматель-практик с большим опытом. Управляет процессом, фокусирует на WIG, помогает преодолевать препятствия.",
    },
    {
      title: "Лидер группы",
      description:
        "Участник программы, который берёт на себя роль модератора встреч. Держит командный дух, организует ритм, следит за временем.",
    },
    {
      title: "Start-СС (Стратегическая Сессия)",
      description:
        "Офлайн-мероприятие в начале программы (2 дня), где определяются WIG, приборы контроля и дорожная карта на 6 месяцев.",
    },
    {
      title: "Final-СС (Финальная Сессия)",
      description:
        "Заключительное мероприятие на слёте, где подводятся итоги, проверяется выполнение целей и определяются следующие шаги.",
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