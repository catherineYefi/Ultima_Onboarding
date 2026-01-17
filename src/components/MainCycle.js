import React from "react";
import {
  RefreshCw,
  Users,
  CheckSquare,
  Activity,
  Zap,
  TrendingUp,
  UserCheck,
} from "lucide-react";

/**
 * MainCycle компонент - ритм встреч программы
 * VERSION 2.0 - читает из content.meetingsRhythm
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function MainCycle({ id = "meetings-rhythm", content }) {
  const rhythm = content?.meetingsRhythm || {};

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <RefreshCw size={32} className="section-icon" />
          <h2>{rhythm?.title || "Ритм встреч"}</h2>
          <p className="section-subtitle">
            {rhythm?.subtitle || "Как устроена работа в течение 6 месяцев"}
          </p>
        </div>

        {/* БЛОК 1: Месяц 1 - Плотный старт */}
        {rhythm?.month1 && (
          <div className="rhythm-block fade-in">
            <div className="rhythm-block-header">
              <Zap size={24} className="rhythm-block-icon" />
              <h3>{rhythm.month1.title}</h3>
            </div>
            <p className="rhythm-block-description">{rhythm.month1.description}</p>
            
            {rhythm.month1.meetings && rhythm.month1.meetings.length > 0 && (
              <div className="rhythm-meetings-list">
                {rhythm.month1.meetings.map((meeting, idx) => (
                  <div key={idx} className="rhythm-meeting-item">
                    <div className="rhythm-meeting-number">
                      {idx + 1}
                    </div>
                    <div className="rhythm-meeting-content">
                      <strong>{meeting}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* БЛОК 2: Месяцы 2-6 - Устойчивый ритм */}
        {rhythm?.months26 && (
          <div className="rhythm-block fade-in">
            <div className="rhythm-block-header">
              <TrendingUp size={24} className="rhythm-block-icon" />
              <h3>{rhythm.months26.title}</h3>
            </div>
            <p className="rhythm-block-description">{rhythm.months26.description}</p>
            
            {/* Паттерн чередования */}
            {rhythm.months26.pattern && (
              <div className="rhythm-pattern">
                <h4>Паттерн чередования:</h4>
                <div className="rhythm-pattern-grid">
                  {rhythm.months26.pattern.map((item, idx) => (
                    <div key={idx} className="rhythm-pattern-item">
                      <div className="rhythm-pattern-icon">
                        {idx % 2 === 0 ? <Users size={20} /> : <CheckSquare size={20} />}
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Заметка про бадди */}
            {rhythm.months26.buddyNote && (
              <div className="rhythm-buddy-note">
                <UserCheck size={20} />
                <span>{rhythm.months26.buddyNote}</span>
              </div>
            )}
          </div>
        )}

        {/* БЛОК 3: Дополнительные активности */}
        {rhythm?.additional && rhythm.additional.length > 0 && (
          <div className="rhythm-additional fade-in">
            <div className="rhythm-additional-header">
              <Activity size={24} className="rhythm-additional-icon" />
              <h3>Дополнительные активности</h3>
            </div>
            <ul className="rhythm-additional-list">
              {rhythm.additional.map((item, idx) => (
                <li key={idx} className="rhythm-additional-item">
                  <CheckSquare size={18} className="rhythm-additional-bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}