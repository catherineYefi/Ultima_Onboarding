import React from "react";
import { Users, UserCheck, ClipboardList, Target } from "lucide-react";

/**
 * Intro компонент - введение в программу, ФОРМУЛА ULTIMA
 * Формула неизбежности результата: Трекер + Лидер + Группа + Ассистент
 */
export default function Intro({ id = "intro" }) {
  // ПРАВИЛЬНАЯ ФОРМУЛА ULTIMA (из методологии)
  const formulaComponents = [
    {
      icon: Target,
      title: "Трекер",
      description:
        "Действующий предприниматель-практик с большим опытом. Управляет процессом, фокусирует на WIG, видит препятствия, помогает принимать решения.",
    },
    {
      icon: UserCheck,
      title: "Лидер группы",
      description:
        "Участник программы, который берёт на себя роль модератора встреч. Держит командный дух, организует ритм, следит за временем.",
    },
    {
      icon: Users,
      title: "Группа из 8 предпринимателей",
      description:
        "Адвайзери-борд друг для друга. Дают обратную связь, делятся опытом, поддерживают, помогают видеть слепые зоны.",
    },
    {
      icon: ClipboardList,
      title: "Ассистент группы",
      description:
        "Протоколирует встречи, контролирует сроки, ведёт дашборд группы, напоминает о дедлайнах, обеспечивает структуру.",
    },
  ];

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Формула неизбежности результата</h2>
          <p className="section-subtitle">
            Эти 4 элемента + бадди-система создают формулу неизбежности результата
          </p>
        </div>

        {/* Формула ULTIMA */}
        <div className="intro-formula">
          <h3 className="intro-subtitle">Формула ULTIMA</h3>
          <div className="formula-grid">
            {formulaComponents.map((component, idx) => {
              const IconComponent = component.icon;
              return (
                <div key={idx} className="formula-card">
                  <div className="formula-card-icon">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="formula-card-title">{component.title}</h4>
                  <p className="formula-card-description">{component.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Цикл программы */}
        <div className="intro-cycle">
          <h3 className="intro-subtitle">Цикл программы</h3>
          <div className="cycle-info-card">
            <p className="cycle-duration">
              <strong>6 месяцев</strong> от Start-СС до Final-СС
            </p>
            <p className="cycle-description">
              Месяц 1: встречи с трекером каждую неделю.
              <br />
              Месяцы 2-6: чередование — неделя с трекером, неделя с лидером группы.
              <br />
              Бадди-созвоны раз в 2 недели.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}