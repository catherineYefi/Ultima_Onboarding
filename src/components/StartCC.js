import React from "react";
import { MapPin, Calendar, Target, CheckCircle } from "lucide-react";

/**
 * StartCC компонент - Start-СС (Стратегическая Сессия)
 * VERSION 2.0 - переименован из SSOffline, читает из content.startCC
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function StartCC({ id = "start-cc", content }) {
  const startCC = content?.startCC || {};

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <MapPin size={32} className="section-icon" />
          <h2>{startCC?.title || "Start-СС (Стратегическая Сессия)"}</h2>
          <p className="section-subtitle">
            {startCC?.subtitle || "2 дня интенсивной работы с трекером и группой"}
          </p>
        </div>

        {/* Обзор */}
        {startCC?.overview && (
          <div className="startcc-overview fade-in">
            <p>{startCC.overview}</p>
          </div>
        )}

        {/* День 1 */}
        {startCC?.day1 && (
          <div className="startcc-day fade-in">
            <div className="startcc-day-header">
              <Calendar size={24} className="startcc-day-icon" />
              <h3>{startCC.day1.title}</h3>
            </div>
            {startCC.day1.blocks && startCC.day1.blocks.length > 0 && (
              <div className="startcc-blocks">
                {startCC.day1.blocks.map((block, idx) => (
                  <div key={idx} className="startcc-block">
                    <div className="startcc-block-number">{idx + 1}</div>
                    <div className="startcc-block-content">
                      <h4>{block.title}</h4>
                      <p>{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* День 2 */}
        {startCC?.day2 && (
          <div className="startcc-day fade-in">
            <div className="startcc-day-header">
              <Calendar size={24} className="startcc-day-icon" />
              <h3>{startCC.day2.title}</h3>
            </div>
            {startCC.day2.blocks && startCC.day2.blocks.length > 0 && (
              <div className="startcc-blocks">
                {startCC.day2.blocks.map((block, idx) => (
                  <div key={idx} className="startcc-block">
                    <div className="startcc-block-number">{idx + 1}</div>
                    <div className="startcc-block-content">
                      <h4>{block.title}</h4>
                      <p>{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Результаты Start-СС */}
        {startCC?.results && (
          <div className="startcc-results fade-in">
            <div className="startcc-results-header">
              <Target size={24} className="startcc-results-icon" />
              <h3>{startCC.results.title || "Результаты Start-СС"}</h3>
            </div>
            {startCC.results.items && startCC.results.items.length > 0 && (
              <ul className="startcc-results-list">
                {startCC.results.items.map((item, idx) => (
                  <li key={idx} className="startcc-result-item">
                    <CheckCircle size={20} className="startcc-result-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}