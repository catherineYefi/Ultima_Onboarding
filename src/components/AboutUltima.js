import React from "react";
import { Target, LineChart, Users, CheckCircle2, GraduationCap } from "lucide-react";

export default function AboutUltima({ content }) {
  const about = content?.sections?.about ?? {};

  const title = about?.title ?? "Что такое ULTIMA?";
  const lead =
    about?.lead ??
    "ULTIMA — это управляемый сезон стратегической работы над ростом бизнеса: цели, метрики, дисциплина исполнения. Фокус на ROI и предсказуемом результате.";

  const values = [
    {
      icon: <Target size={24} />,
      title: "Результат",
      text:
        about?.valueResult ??
        "Чёткая формулировка WIG/OKR, дорожная карта и приборы контроля. Никакой «активности ради активности».",
    },
    {
      icon: <LineChart size={24} />,
      title: "Управление",
      text:
        about?.valueMgmt ??
        "Ритм встреч, понятные дедлайны, отчётность в воркбуке и дашбордах. Управляем прогрессом каждую неделю.",
    },
    {
      icon: <Users size={24} />,
      title: "Команда",
      text:
        about?.valueTeam ??
        "Лидер и группа предпринимателей без БИ. Сильная обратная связь и поддержка.",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Мастермайнды",
      text: "3 офлайн-мастермайнда с экспертами в год для Нечто ULTIMA.",
    },
  ];

  const metrics = [
    { label: "Длительность сезона", value: "12 недель" },
    { label: "Размер группы", value: "8 участников" },
    { label: "Формат", value: "онлайн + офлайн СС" },
  ];

  return (
    <section id="about" className="section container about-ultima">
      <div className="section-header fade-in">
        <h2>{title}</h2>
        <p className="section-subtitle">{lead}</p>
      </div>

      <div className="about-values fade-in">
        {values.map((v, i) => (
          <div key={i} className="about-card">
            <div className="about-card-icon">{v.icon}</div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <div className="about-metrics fade-in">
        {metrics.map((m, i) => (
          <div key={i} className="metric">
            <CheckCircle2 size={18} />
            <div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
