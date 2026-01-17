import React from "react";
import { Users, Crown, UserCheck, Clipboard, Compass } from "lucide-react";

/**
 * Roles компонент - роли участников программы
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Roles({ id = "roles", content }) {
  const roles = content?.roles || {};

  // Маппинг иконок для ролей
  const iconMap = {
    Compass: Compass,
    Crown: Crown,
    Users: Users,
    UserCheck: UserCheck,
    Clipboard: Clipboard,
  };

  // Функция получения иконки
  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName] || Users;
    return <IconComponent size={size} />;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Users size={32} className="section-icon" />
          <h2>{roles?.title || "Роли в программе"}</h2>
          <p className="section-subtitle">
            {roles?.subtitle || "Кто за что отвечает в системе ULTIMA"}
          </p>
        </div>

        {/* Список ролей */}
        {roles?.items && roles.items.length > 0 && (
          <div className="roles-grid fade-in">
            {roles.items.map((role, idx) => (
              <div 
                key={idx} 
                className="role-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Иконка роли */}
                <div className="role-icon">
                  {getIcon(role.icon)}
                </div>

                {/* Название роли */}
                <h3 className="role-title">{role.title}</h3>

                {/* Описание роли */}
                {role.description && (
                  <p className="role-description">{role.description}</p>
                )}

                {/* Ответственности */}
                {role.responsibilities && role.responsibilities.length > 0 && (
                  <div className="role-responsibilities">
                    <h4 className="role-responsibilities-title">Ответственности:</h4>
                    <ul className="role-responsibilities-list">
                      {role.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Заметка о командной работе */}
        {roles?.note && (
          <div className="roles-note fade-in">
            {roles.note}
          </div>
        )}
      </div>
    </section>
  );
}