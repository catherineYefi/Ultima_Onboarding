import React from "react";
import { Repeat, MessageSquare, Target, TrendingUp, CheckCircle } from "lucide-react";

/**
 * MeetingCycle компонент - структура еженедельных встреч
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function MeetingCycle({ id = "meeting-cycle", content }) {
  const meetingCycle = content?.meetingCycle || {};

  // Маппинг иконок для этапов
  const iconMap = {
    MessageSquare: MessageSquare,
    Target: Target,
    TrendingUp: TrendingUp,
    CheckCircle: CheckCircle,
    Repeat: Repeat,
  };

  // Функция получения иконки
  const getIcon = (iconName, size = 24) => {
    const IconComponent = iconMap[iconName] || Repeat;
    return <IconComponent size={size} />;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Repeat size={32} className="section-icon" />
          <h2>{meetingCycle?.title || "Цикл разбора на встречах"}</h2>
          <p className="section-subtitle">
            {meetingCycle?.subtitle || "Как проходит еженедельная встреча"}
          </p>
        </div>

        {/* Обзор */}
        {meetingCycle?.overview && (
          <div className="meetingcycle-overview fade-in">
            <p>{meetingCycle.overview}</p>
          </div>
        )}

        {/* Этапы встречи */}
        {meetingCycle?.stages && meetingCycle.stages.length > 0 && (
          <div className="meetingcycle-stages fade-in">
            {meetingCycle.stages.map((stage, idx) => (
              <div 
                key={idx} 
                className="meetingcycle-stage"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Номер этапа */}
                <div className="meetingcycle-stage-number">{idx + 1}</div>

                {/* Иконка этапа */}
                <div className="meetingcycle-stage-icon">
                  {getIcon(stage.icon)}
                </div>

                {/* Контент этапа */}
                <div className="meetingcycle-stage-content">
                  <h3 className="meetingcycle-stage-title">{stage.title}</h3>
                  
                  {stage.duration && (
                    <div className="meetingcycle-stage-duration">{stage.duration}</div>
                  )}
                  
                  {stage.description && (
                    <p className="meetingcycle-stage-description">{stage.description}</p>
                  )}

                  {/* Ключевые вопросы */}
                  {stage.questions && stage.questions.length > 0 && (
                    <div className="meetingcycle-questions">
                      <h4>Ключевые вопросы:</h4>
                      <ul>
                        {stage.questions.map((question, qIdx) => (
                          <li key={qIdx}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Результат встречи */}
        {meetingCycle?.outcome && (
          <div className="meetingcycle-outcome fade-in">
            <div className="meetingcycle-outcome-header">
              <CheckCircle size={24} className="meetingcycle-outcome-icon" />
              <h3>{meetingCycle.outcome.title || "Результат встречи"}</h3>
            </div>
            <p className="meetingcycle-outcome-text">{meetingCycle.outcome.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}