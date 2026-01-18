import React from "react";
import { Users, Crown, UserCheck, Clipboard, Compass } from "lucide-react";

/**
 * Roles компонент - роли участников программы
 * VERSION 1.1 — сетка центрирована (используем общую cards-grid)
 */

export default function Roles({ id = "roles", content }) {
  const roles = content?.roles || {};

  const iconMap = {
    Compass,
    Crown,
    Users,
    UserCheck,
    Clipboard,
  };

  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName] || Users;
    return <IconComponent size={size} />;
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header fade-in">
          <Users size={32} className="section-icon" />
          <h2>{roles?.title || "Роли в программе"}</h2>
          <p className="section-subtitle">
            {roles?.subtitle || "Кто за что отвечает в системе ULTIMA"}
          </p>
        </div>

        {roles?.items && roles.items.length > 0 && (
          // Используем твою универсальную сетку cards-grid, чтобы карточки
          // были по центру и адекватно переносились на мобильных
          <div className="cards-grid roles-grid fade-in">
            {roles.items.map((role, idx) => (
              <div
                key={idx}
                className="role-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="role-icon">{getIcon(role.icon)}</div>
                <h3 className="role-title">{role.title}</h3>

                {role.description && (
                  <p className="role-description">{role.description}</p>
                )}

                {role.responsibilities && role.responsibilities.length > 0 && (
                  <div className="role-responsibilities">
                    <h4 className="role-responsibilities-title">
                      Ответственности:
                    </h4>
                    <ul className="role-responsibilities-list">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {roles?.note && <div className="roles-note fade-in">{roles.note}</div>}
      </div>
    </section>
  );
}
