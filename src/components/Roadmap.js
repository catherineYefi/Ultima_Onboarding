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
 * Roadmap компонент - дорожная карта программы
 * VERSION 2.0 - читает из content.roadmap
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Roadmap({ id = "roadmap", content }) {
  const roadmap = content?.roadmap || {};
  const stages = roadmap?.stages || [];

  // Маппинг иконок
  const iconMap = {
    Brain: Brain,
    Calendar: Calendar,
    Zap: Zap,
    TrendingUp: TrendingUp,
    Sparkles: Sparkles,
    Award: Award,
    Target: Target,
    Users: Users,
  };

  // Функция получения иконки
  const getIcon = (iconName) => {
    return iconMap[iconName] || Calendar;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header">
          <h2 className="section-title">
            {roadmap?.title || "Дорожная карта программы"}
          </h2>
          <p className="section-subtitle">
            {roadmap?.subtitle || "Полный путь от подготовки до финала"}
          </p>
        </div>

        {/* Timeline этапов */}
        <div className="roadmap-timeline">
          {stages.map((stage, idx) => {
            const Icon = getIcon(stage.icon);
            return (
              <div key={idx} className="roadmap-stage">
                {/* Иконка этапа */}
                <div className={`roadmap-stage-icon roadmap-icon-${stage.color || 'primary'}`}>
                  <Icon size={28} />
                </div>

                {/* Контент этапа */}
                <div className="roadmap-stage-content">
                  <div className="roadmap-stage-header">
                    <h3 className="roadmap-stage-title">{stage.title}</h3>
                    {stage.duration && (
                      <span className="roadmap-stage-duration">{stage.duration}</span>
                    )}
                  </div>
                  <p className="roadmap-stage-description">{stage.description}</p>
                </div>

                {/* Соединительная линия */}
                {idx < stages.length - 1 && <div className="roadmap-connector" />}
              </div>
            );
          })}
        </div>

        {/* Важная заметка */}
        {roadmap?.note && (
          <div className="roadmap-note">
            <CheckCircle size={20} />
            <p>{roadmap.note}</p>
          </div>
        )}
      </div>
    </section>
  );
}