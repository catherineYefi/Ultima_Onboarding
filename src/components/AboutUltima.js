import React from "react";
import { Target, LineChart, Users, CheckCircle2, Sparkles } from "lucide-react";

/**
 * ABOUT ULTIMA — секция "Что такое ULTIMA?"
 *
 * Правки по ТЗ:
 * - В явном виде указаны: 3 офлайн мастермайнда (ММ) в год для участников ULTIMA
 * - Количество участников в группе: 8 (не 10–12)
 * - Безопасные дефолты — если каких-то полей нет в content, рендерим осмысленные значения
 *
 * Ожидаемые (необязательные) поля:
 *   content.sections.about = {
 *     title?: string
 *     lead?: string
 *     valueResult?: string
 *     valueMgmt?: string
 *     valueTeam?: string
 *     metrics?: Array<{ label: string, value: string }>
 *   }
 */
export default function AboutUltima({ content }) {
  const about = content?.sections?.about ?? {};

  const title = about?.title ?? "Что такое ULTIMA?";
  const lead =
    about?.lead ??
    "ULTIMA — стратегический контур роста на 6 месяцев: цели, метрики, дисциплина и командная поддержка. Для участников ULTIMA доступны 3 офлайн мастермайнда (ММ) в год с экспертами экосистемы — в дополнение к регулярной работе сезона.";

  // карточки-ценности
  const values = [
    {
      icon: <Target size={24} />,
      title: "Результат",
      text:
        about?.valueResult ??
        "WIG/OKR, дорожная карта и приборы контроля. Делаем только то, что приближает к результату — без «активности ради активности».",
    },
    {
      icon: <LineChart size={24} />,
      title: "Управление",
      text:
        about?.valueMgmt ??
        "Недельный ритм встреч, дедлайны и отчётность в приборах (P&L weekly, CRM, KPI). Управляем по фактам и цифрам.",
    },
    {
      icon: <Users size={24} />,
      title: "Команда",
      text:
        about?.valueTeam ??
        "Группа предпринимателей (8 человек), трекер и лидер. Сильная обратная связь, поддержка и взаимная ответственность.",
    },
  ];

  // метрики (если нет своих — даём дефолты по ТЗ)
  const metrics = Array.isArray(about?.metrics) && about.metrics.length > 0
    ? about.metrics
    : [
        { label: "Длительность сезона", value: "6 месяцев" },
        { label: "Размер группы", value: "8 человек" },
        {
          label: "Формат",
          value: "Онлайн-ритм + офлайн Start-СС/Final-СС + 3 офлайн ММ в год",
        },
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
            <div className="about-card-icon">{v.icon || <Sparkles size={24} />}</div>
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
