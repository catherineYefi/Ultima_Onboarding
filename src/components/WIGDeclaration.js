import React from "react";
import { Target, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react";

/**
 * WIGDeclaration компонент - работа с декларацией главной цели
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function WIGDeclaration({ id = "wig-declaration", content }) {
  const wigDeclaration = content?.wigDeclaration || {};

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Target size={32} className="section-icon" />
          <h2>{wigDeclaration?.title || "Работа с декларацией WIG"}</h2>
          <p className="section-subtitle">
            {wigDeclaration?.subtitle || "Как формулировать и отслеживать главную цель"}
          </p>
        </div>

        {/* Что такое WIG */}
        {wigDeclaration?.definition && (
          <div className="wig-definition fade-in">
            <h3>Что такое WIG?</h3>
            <p>{wigDeclaration.definition}</p>
          </div>
        )}

        {/* Формула WIG */}
        {wigDeclaration?.formula && (
          <div className="wig-formula fade-in">
            <div className="wig-formula-header">
              <Target size={24} className="wig-formula-icon" />
              <h3>{wigDeclaration.formula.title || "Формула WIG"}</h3>
            </div>
            <div className="wig-formula-content">
              {wigDeclaration.formula.template && (
                <div className="wig-formula-template">
                  {wigDeclaration.formula.template}
                </div>
              )}
              {wigDeclaration.formula.example && (
                <div className="wig-formula-example">
                  <strong>Пример:</strong> {wigDeclaration.formula.example}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Критерии хорошего WIG */}
        {wigDeclaration?.criteria && wigDeclaration.criteria.length > 0 && (
          <div className="wig-criteria fade-in">
            <h3>Критерии хорошего WIG</h3>
            <div className="wig-criteria-grid">
              {wigDeclaration.criteria.map((criterion, idx) => (
                <div key={idx} className="wig-criterion-card">
                  <CheckCircle size={20} className="wig-criterion-icon" />
                  <div className="wig-criterion-content">
                    <h4>{criterion.title}</h4>
                    <p>{criterion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lead/Lag показатели */}
        {wigDeclaration?.leadLag && (
          <div className="wig-leadlag fade-in">
            <h3>Lead и Lag показатели</h3>
            <div className="wig-leadlag-grid">
              {/* Lead показатели */}
              {wigDeclaration.leadLag.lead && (
                <div className="wig-leadlag-card lead">
                  <div className="wig-leadlag-header">
                    <TrendingUp size={24} />
                    <h4>{wigDeclaration.leadLag.lead.title || "Lead (опережающие)"}</h4>
                  </div>
                  <p className="wig-leadlag-description">
                    {wigDeclaration.leadLag.lead.description}
                  </p>
                  {wigDeclaration.leadLag.lead.examples && (
                    <ul className="wig-leadlag-examples">
                      {wigDeclaration.leadLag.lead.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Lag показатели */}
              {wigDeclaration.leadLag.lag && (
                <div className="wig-leadlag-card lag">
                  <div className="wig-leadlag-header">
                    <Calendar size={24} />
                    <h4>{wigDeclaration.leadLag.lag.title || "Lag (результирующие)"}</h4>
                  </div>
                  <p className="wig-leadlag-description">
                    {wigDeclaration.leadLag.lag.description}
                  </p>
                  {wigDeclaration.leadLag.lag.examples && (
                    <ul className="wig-leadlag-examples">
                      {wigDeclaration.leadLag.lag.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Частые ошибки */}
        {wigDeclaration?.mistakes && wigDeclaration.mistakes.length > 0 && (
          <div className="wig-mistakes fade-in">
            <div className="wig-mistakes-header">
              <AlertCircle size={24} className="wig-mistakes-icon" />
              <h3>Частые ошибки при формулировке WIG</h3>
            </div>
            <ul className="wig-mistakes-list">
              {wigDeclaration.mistakes.map((mistake, idx) => (
                <li key={idx} className="wig-mistake-item">
                  <AlertCircle size={18} className="wig-mistake-icon" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}