import React from "react";

/**
 * Intro компонент - введение в программу, формула ULTIMA
 */
export default function Intro({ id = "intro" }) {
  const formulaPhases = [
    {
      title: "Приборы контроля",
      description: "Метрики, которые показывают прогресс достижения WIG",
    },
    {
      title: "Группа и лидер",
      description: "Мастермайнд из 5-7 человек с ясной ролью каждого",
    },
    {
      title: "Спринтовая работа",
      description: "6 месяцев интенсивной работы с еженедельными встречами",
    },
  ];

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Как устроена программа</h2>
          <p className="section-subtitle">
            ULTIMA основана на проверенной формуле неизбежности
          </p>
        </div>

        {/* Формула */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.25rem" }}>
            Формула ULTIMA
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {formulaPhases.map((phase, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.5rem",
                  background: "rgba(30, 36, 64, 0.6)",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "1rem",
                  transition: "all 0.3s",
                }}
                className="glossary-card"
              >
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#667eea",
                    marginBottom: "0.5rem",
                  }}
                >
                  {phase.title}
                </h4>
                <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Цикл */}
        <div style={{ marginTop: "3rem" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.25rem" }}>
            Цикл программы
          </h3>
          <div
            style={{
              padding: "2rem",
              background: "rgba(30, 36, 64, 0.6)",
              border: "1px solid rgba(102, 126, 234, 0.2)",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              <strong>6 месяцев</strong> интенсивной работы с еженедельными встречами
            </p>
            <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
              Каждая неделя имеет свой фокус: подготовка, анализ, планирование, выполнение,
              контроль.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
