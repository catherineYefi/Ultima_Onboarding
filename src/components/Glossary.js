import React from "react";
import { 
  Users, 
  UserCheck, 
  Clipboard, 
  Target, 
  Compass, 
  Crown, 
  MapPin, 
  Flag 
} from "lucide-react";

/**
 * Glossary компонент - глоссарий ключевых терминов ULTIMA
 * VERSION 2.0 - читает из content.glossary с иконками
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Glossary({ id = "glossary", content }) {
  const glossary = content?.glossary || {};
  const terms = glossary?.terms || [];

  // Маппинг иконок (название строки → компонент React)
  const iconMap = {
    Users: Users,
    UserCheck: UserCheck,
    Clipboard: Clipboard,
    Target: Target,
    Compass: Compass,
    Crown: Crown,
    MapPin: MapPin,
    Flag: Flag,
  };

  // Функция получения иконки
  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {glossary?.title || "Глоссарий терминов"}
          </h2>
          <p className="section-subtitle">
            {glossary?.subtitle || "Ключевые понятия, которые нужно знать перед началом программы"}
          </p>
        </div>

        <div className="glossary-grid">
          {terms.map((item, idx) => (
            <div key={idx} className="glossary-card">
              {/* Иконка */}
              {item.icon && (
                <div className="glossary-card-icon">
                  {getIcon(item.icon)}
                </div>
              )}
              
              {/* Термин */}
              <h3 className="glossary-card-title">{item.term}</h3>
              
              {/* Определение */}
              <p className="glossary-card-description">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}