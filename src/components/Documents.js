import React from "react";
import { FileText, Calendar, ExternalLink, BookOpen, File } from "lucide-react";

/**
 * Documents компонент - важные документы и материалы
 * VERSION 2.0 - читает из content.documents
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 */
export default function Documents({ id = "documents", content }) {
  const documents = content?.documents || {};
  const categories = documents?.categories || [];

  // Маппинг иконок
  const iconMap = {
    FileText: FileText,
    Calendar: Calendar,
    BookOpen: BookOpen,
    File: File,
  };

  // Функция получения иконки
  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName] || FileText;
    return <IconComponent size={size} />;
  };

  // Обработка клика по документу
  const handleDocClick = (link) => {
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
          <h2>{documents?.title || "Документы и материалы"}</h2>
          <p className="section-subtitle">
            {documents?.subtitle || "Важные документы для работы в программе"}
          </p>
        </div>

        {/* Категории документов */}
        {categories.map((category, catIdx) => (
          <div key={catIdx} className="documents-category fade-in">
            {/* Заголовок категории */}
            {category.title && (
              <h3 className="documents-category-title">{category.title}</h3>
            )}

            {/* Сетка документов */}
            <div className="cards-grid">
              {category.items && category.items.map((doc, docIdx) => (
                <div key={docIdx} className="doc-card">
                  {/* Иконка */}
                  <div className="doc-card-icon">
                    {getIcon(doc.icon)}
                  </div>

                  {/* Название */}
                  <h4 className="doc-card-title">{doc.title}</h4>

                  {/* Описание */}
                  {doc.description && (
                    <p className="doc-card-description">{doc.description}</p>
                  )}

                  {/* Кнопка/Ссылка */}
                  {doc.link && (
                    doc.link.startsWith("#") ? (
                      // Внутренняя ссылка - кнопка
                      <button
                        className="doc-link"
                        onClick={() => handleDocClick(doc.link)}
                      >
                        {doc.linkText || "Открыть"}
                      </button>
                    ) : (
                      // Внешняя ссылка - <a>
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doc-link"
                      >
                        {doc.linkText || "Открыть"} <ExternalLink size={16} />
                      </a>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}