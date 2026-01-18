import React from "react";
import { Gauge, TrendingUp, Activity, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

/**
 * ControlPanel компонент - приборы контроля
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ (ФИНАЛЬНЫЙ!)
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function ControlPanel({ id = "control-panel", content }) {
  const controlPanel = content?.controlPanel || {};

  // Маппинг иконок для типов метрик
  const iconMap = {
    TrendingUp: TrendingUp,
    Activity: Activity,
    Gauge: Gauge,
    CheckCircle: CheckCircle,
  };

  // Функция получения иконки
  const getIcon = (iconName, size = 24) => {
    const IconComponent = iconMap[iconName] || Gauge;
    return <IconComponent size={size} />;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Gauge size={32} className="section-icon" />
          <h2>{controlPanel?.title || "Приборы контроля"}</h2>
          <p className="section-subtitle">
            {controlPanel?.subtitle || "Метрики и KPI для отслеживания прогресса"}
          </p>
        </div>

        {/* Зачем нужны приборы */}
        {controlPanel?.purpose && (
          <div className="controlpanel-purpose fade-in">
            <h3>Зачем нужны приборы контроля?</h3>
            <p>{controlPanel.purpose}</p>
          </div>
        )}

        {/* Категории метрик */}
        {controlPanel?.categories && controlPanel.categories.length > 0 && (
          <div className="controlpanel-categories">
            {controlPanel.categories.map((category, catIdx) => (
              <div 
                key={catIdx} 
                className="controlpanel-category fade-in"
                style={{ animationDelay: `${catIdx * 0.1}s` }}
              >
                {/* Заголовок категории */}
                <div className="controlpanel-category-header">
                  <div className="controlpanel-category-icon">
                    {getIcon(category.icon)}
                  </div>
                  <h3>{category.title}</h3>
                </div>

                {/* Описание категории */}
                {category.description && (
                  <p className="controlpanel-category-description">{category.description}</p>
                )}

                {/* Метрики категории */}
                {category.metrics && category.metrics.length > 0 && (
                  <div className="controlpanel-metrics">
                    {category.metrics.map((metric, metricIdx) => (
                      <div key={metricIdx} className="controlpanel-metric">
                        <CheckCircle size={16} className="controlpanel-metric-icon" />
                        <div className="controlpanel-metric-content">
                          <div className="controlpanel-metric-name">{metric.name}</div>
                          {metric.formula && (
                            <div className="controlpanel-metric-formula">{metric.formula}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Правила работы с приборами */}
        {controlPanel?.rules && controlPanel.rules.length > 0 && (
          <div className="controlpanel-rules fade-in">
            <h3>Правила работы с приборами</h3>
            <div className="controlpanel-rules-grid">
              {controlPanel.rules.map((rule, idx) => (
                <div key={idx} className="controlpanel-rule-card">
                  <div className="controlpanel-rule-number">{idx + 1}</div>
                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Шаблоны дашбордов */}
        {controlPanel?.templates && controlPanel.templates.length > 0 && (
          <div className="controlpanel-templates fade-in">
            <h3>Шаблоны дашбордов</h3>
            <div className="controlpanel-templates-grid">
              {controlPanel.templates.map((template, idx) => (
                <div key={idx} className="controlpanel-template-card">
                  <h4>{template.title}</h4>
                  {template.description && (
                    <p>{template.description}</p>
                  )}
                  {template.link && (
                    <a
                      href={template.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="controlpanel-template-link"
                    >
                      Открыть шаблон <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Важное напоминание */}
        {controlPanel?.reminder && (
          <div className="controlpanel-reminder fade-in">
            <AlertCircle size={24} className="controlpanel-reminder-icon" />
            <p>{controlPanel.reminder}</p>
          </div>
        )}
      </div>
    </section>
  );
}