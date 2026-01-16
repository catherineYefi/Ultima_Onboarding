import React from "react";
import { Calendar, Target, Users, Award, CheckCircle, Zap } from "lucide-react";

/**
 * Roadmap компонент - дорожная карта программы от Start-СС до Final-СС
 */
export default function Roadmap({ id = "roadmap" }) {
  const stages = [
    {
      icon: Calendar,
      title: "Start-СС",
      duration: "День 1-2",
      description:
        "Офлайн-мероприятие. Определение WIG, настройка приборов контроля, построение дорожной карты на 6 месяцев.",
    },
    {
      icon: Zap,
      title: "Месяцы 1-2: Плотный старт",
      duration: "8 недель",
      description:
        "Интенсивная работа группы, еженедельные встречи, первые победы. Высокая активность и фокус.",
    },
    {
      icon: Target,
      title: "Месяцы 3-5: Устойчивый ритм",
      duration: "12 недель",
      description:
        "Работа по плану, корректировка стратегии, достижение промежуточных целей. Регулярность и дисциплина.",
    },
    {
      icon: Award,
      title: "Final-СС",
      duration: "День 1",
      description:
        "Финальное мероприятие. Презентация результатов, проверка выполнения целей, признание достижений.",
    },
  ];

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Дорожная карта программы</h2>
          <p className="section-subtitle">
            Путь от старта до финала: ключевые этапы 6-месячной программы
          </p>
        </div>

        <div className="roadmap-timeline">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={idx} className="roadmap-stage">
                <div className="roadmap-stage-icon">
                  <Icon size={28} />
                </div>
                <div className="roadmap-stage-content">
                  <div className="roadmap-stage-header">
                    <h3 className="roadmap-stage-title">{stage.title}</h3>
                    <span className="roadmap-stage-duration">{stage.duration}</span>
                  </div>
                  <p className="roadmap-stage-description">{stage.description}</p>
                </div>
                {idx < stages.length - 1 && <div className="roadmap-connector" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
