import React from "react";
import { Target, TrendingUp, BarChart2, Users, BookOpen, ArrowRight } from "lucide-react";

/**
 * FourDX - 4 Дисциплины Исполнения
 * Методология достижения целей в ULTIMA
 */
export default function FourDX({ id = "4dx", content, scrollToSection }) {
  const fourDX = content?.fourDX || {};
  const title = fourDX?.title || "4 Дисциплины Исполнения";
  const subtitle = fourDX?.subtitle || "Методология достижения целей в ULTIMA";
  const intro = fourDX?.intro || "Основа работы в программе — проверенная методология из книги «The 4 Disciplines of Execution» (FranklinCovey)";
  
  const disciplines = fourDX?.disciplines || [
    {
      number: 1,
      icon: "Target",
      title: "Фокус на чрезвычайно важных целях",
      subtitle: "Wildly Important Goals (WIG)",
      description: "Не более 1-2 целей одновременно. Вместо размытых «хочу больше зарабатывать» — конкретная цель с числами и датой.",
      inUltima: "В ULTIMA вы формулируете один WIG на 6 месяцев",
      formula: "От X до Y к дате",
      examples: [
        "От 5 млн/мес до 10 млн/мес к 1 июля",
        "От 15 сотрудников до 30 к 1 августа",
        "От 3% конверсии до 8% к 15 июня"
      ],
      link: "#wig-declaration"
    },
    {
      number: 2,
      icon: "TrendingUp",
      title: "Действуйте на основе опережающих показателей",
      subtitle: "Lead Measures vs Lag Measures",
      description: "Lead — то что вы делаете каждый день (звонки, встречи). Lag — итоговый результат (выручка, прибыль). Lead влияет на Lag.",
      inUltima: "Каждую неделю вы отслеживаете Lead-метрики и корректируете действия",
      formula: "Lead → Lag",
      examples: [
        "Lead: 50 звонков/день → Lag: 10 встреч → 3 сделки → +2 млн выручки",
        "Lead: 3 поста/неделя → Lag: +500 подписчиков → 20 заявок → 5 клиентов",
        "Lead: 10 собеседований/неделя → Lag: 2 найма → расширение отдела"
      ],
      link: "#control-panel"
    },
    {
      number: 3,
      icon: "BarChart2",
      title: "Ведите захватывающее табло",
      subtitle: "Scoreboard",
      description: "Видимые метрики для всей команды. Каждый видит прогресс к WIG в реальном времени. Табло мотивирует и показывает узкие места.",
      inUltima: "Приборы контроля: P&L weekly, CRM-воронка, KPI-дашборд",
      formula: "Видимость → Мотивация → Результат",
      examples: [
        "P&L weekly: текущая прибыль vs план",
        "CRM-воронка: конверсия на каждом этапе",
        "HR-дашборд: заявок → собеседований → оффер → найм"
      ],
      link: "#control-panel"
    },
    {
      number: 4,
      icon: "Users",
      title: "Создайте каденцию отчётности",
      subtitle: "Cadence of Accountability",
      description: "Регулярные короткие встречи для отчёта: что сделал → что мешает → что буду делать. Не совещание, а разбор конкретных действий.",
      inUltima: "Еженедельные встречи 30-45 минут на участника с трекером или лидером группы",
      formula: "Отчёт → Препятствия → План → Действие",
      examples: [
        "Что сделал: 200 звонков, 15 встреч, 3 сделки",
        "Что мешает: низкая конверсия на 2-й встрече",
        "Что буду делать: доработать презентацию, пройти 10 встреч"
      ],
      link: "#meeting-cycle"
    }
  ];

  const bottomNote = fourDX?.note || "Эти 4 дисциплины — не теория, а практический инструмент. В ULTIMA вы внедряете их системно под контролем трекера.";

  // Маппинг иконок
  const iconMap = {
    Target: Target,
    TrendingUp: TrendingUp,
    BarChart2: BarChart2,
    Users: Users
  };

  const getIcon = (iconName, size = 28) => {
    const IconComponent = iconMap[iconName] || Target;
    return <IconComponent size={size} />;
  };

  // Обработка клика по ссылке
  const handleLink = (link) => {
    if (!link) return;
    if (link.startsWith("#")) {
      const sectionId = link.slice(1);
      if (scrollToSection) {
        scrollToSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section highlight-section">
      <div className="container">
        {/* Header */}
        <div className="section-header fade-in">
          <BookOpen size={32} className="section-icon" />
          <h2>{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Intro */}
        <div className="card fade-in" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{intro}</p>
        </div>

        {/* Disciplines */}
        <div className="fourdx-grid" style={{ 
          display: 'grid', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {disciplines.map((discipline, idx) => (
            <div 
              key={idx} 
              className="fourdx-card card fade-in" 
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                position: 'relative',
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}
            >
              {/* Number Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {discipline.number}
              </div>

              {/* Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6366f1'
                }}>
                  {getIcon(discipline.icon, 24)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{discipline.title}</h3>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.9rem', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: 'italic'
                  }}>
                    {discipline.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                {discipline.description}
              </p>

              {/* In ULTIMA */}
              <div style={{ 
                background: 'rgba(99, 102, 241, 0.1)', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1rem',
                borderLeft: '3px solid #6366f1'
              }}>
                <strong style={{ color: '#6366f1' }}>В ULTIMA:</strong>
                <p style={{ margin: '0.5rem 0 0 0' }}>{discipline.inUltima}</p>
              </div>

              {/* Formula */}
              {discipline.formula && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6'
                }}>
                  {discipline.formula}
                </div>
              )}

              {/* Examples */}
              {discipline.examples && discipline.examples.length > 0 && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Примеры:</strong>
                  <ul className="final-list dots" style={{ marginBottom: '1rem' }}>
                    {discipline.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link */}
              {discipline.link && (
                <button
                  onClick={() => handleLink(discipline.link)}
                  className="cta-button secondary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Подробнее
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="card fade-in" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '2rem'
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
            {bottomNote}
          </p>
        </div>
      </div>
    </section>
  );
}
