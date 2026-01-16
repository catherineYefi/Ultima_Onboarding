import React from "react";
import {
  Calendar,
  Target,
  Users,
  Award,
  CheckCircle,
  Zap,
  Brain,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/**
 * Roadmap компонент - ПОЛНАЯ дорожная карта программы от подготовки до финала
 * Все этапы соответствуют методологии
 */
export default function Roadmap({ id = "roadmap" }) {
  const stages = [
    {
      icon: Brain,
      title: "Подготовка к Start-СС",
      duration: "2-3 недели",
      description:
        "3 встречи с БИ для сбора фактов и цифр + Pre-Ultima Booster (мини-курс) + AI-наставник для структурирования материалов.",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Start-СС",
      duration: "2 дня offline",
      description:
        "Определение WIG, настройка приборов контроля, построение дорожной карты на 6 месяцев. Выбор лидера группы и бадди-пар.",
      color: "accent",
    },
    {
      icon: Zap,
      title: "Месяц 1: Плотный старт",
      duration: "4 недели",
      description:
        "Встречи с трекером каждую неделю. Быстрый запуск внедрения, первые золотые задачи, установление ритма работы.",
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Месяцы 2-6: Устойчивый ритм",
      duration: "20 недель",
      description:
        "Чередование: неделя с трекером → неделя с лидером группы. Бадди-созвоны раз в 2 недели. Еженедельное обновление приборов контроля.",
      color: "secondary",
    },
    {
      icon: Sparkles,
      title: "Слёты Нечто (2-3 за сезон)",
      duration: "В течение 6 месяцев",
      description:
        "Мастермайнды с топ-экспертами, нетворкинг с участниками экосистемы, работа над стратегическими вопросами. Только для ULTIMA.",
      color: "accent",
    },
    {
      icon: Award,
      title: "Final-СС",
      duration: "1 день на слёте",
      description:
        "Презентация результатов, проверка выполнения WIG, фиксация достижений, планирование следующего цикла (для продленцев).",
      color: "success",
    },
  ];

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Дорожная карта программы</h2>
          <p className="section-subtitle">
            Полный путь от подготовки до финала: все ключевые этапы 6-месячной программы
          </p>
        </div>

        <div className="roadmap-timeline">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={idx} className="roadmap-stage">
                <div className={`roadmap-stage-icon roadmap-icon-${stage.color}`}>
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

        {/* Важная заметка */}
        <div className="roadmap-note">
          <CheckCircle size={20} />
          <p>
            <strong>Важно:</strong> Группы работают асинхронно. Даты Start-СС и основного
            цикла определяются индивидуально для каждой группы.
          </p>
        </div>
      </div>
    </section>
  );
}