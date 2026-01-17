import React from "react";
import { Wrench, Calculator, FileText, CheckSquare, ExternalLink, BarChart } from "lucide-react";

/**
 * ToolsHub компонент - полезные инструменты программы
 * VERSION 1.0 - НОВЫЙ КОМПОНЕНТ
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function ToolsHub({ id = "tools-hub", content }) {
  const toolsHub = content?.toolsHub || {};

  // Маппинг иконок для инструментов
  const iconMap = {
    Calculator: Calculator,
    FileText: FileText,
    CheckSquare: CheckSquare,
    BarChart: BarChart,
    Wrench: Wrench,
  };

  // Функция получения иконки
  const getIcon = (iconName, size = 24) => {
    const IconComponent = iconMap[iconName] || Wrench;
    return <IconComponent size={size} />;
  };

  // Обработка клика по инструменту
  const handleToolClick = (link) => {
    if (!link) return;

    if (link.startsWith("#")) {
      // Внутренняя ссылка - скролл
      const targetId = link.slice(1);
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Внешняя ссылка
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Wrench size={32} className="section-icon" />
          <h2>{toolsHub?.title || "Полезные инструменты"}</h2>
          <p className="section-subtitle">
            {toolsHub?.subtitle || "Калькуляторы, шаблоны и чек-листы для работы"}
          </p>
        </div>

        {/* Категории инструментов */}
        {toolsHub?.categories && toolsHub.categories.length > 0 && (
          <div className="toolshub-categories">
            {toolsHub.categories.map((category, catIdx) => (
              <div key={catIdx} className="toolshub-category fade-in" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                {/* Заголовок категории */}
                {category.title && (
                  <h3 className="toolshub-category-title">{category.title}</h3>
                )}

                {/* Сетка инструментов */}
                <div className="toolshub-grid">
                  {category.items && category.items.map((tool, toolIdx) => (
                    <div key={toolIdx} className="toolshub-card">
                      {/* Иконка */}
                      <div className="toolshub-icon">
                        {getIcon(tool.icon)}
                      </div>

                      {/* Название */}
                      <h4 className="toolshub-title">{tool.title}</h4>

                      {/* Описание */}
                      {tool.description && (
                        <p className="toolshub-description">{tool.description}</p>
                      )}

                      {/* Кнопка/Ссылка */}
                      {tool.link && (
                        tool.link.startsWith("#") ? (
                          // Внутренняя ссылка - кнопка
                          <button
                            className="toolshub-link"
                            onClick={() => handleToolClick(tool.link)}
                          >
                            {tool.linkText || "Открыть"}
                          </button>
                        ) : (
                          // Внешняя ссылка - <a>
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toolshub-link"
                          >
                            {tool.linkText || "Открыть"} <ExternalLink size={14} />
                          </a>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Заметка */}
        {toolsHub?.note && (
          <div className="toolshub-note fade-in">
            {toolsHub.note}
          </div>
        )}
      </div>
    </section>
  );
}