import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Target, 
  RefreshCw, 
  FileText, 
  Briefcase, 
  Tool,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export default function Onboarding({ content }) {
  const [activeSection, setActiveSection] = useState(0);
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('ultima-onboarding-checklist');
    if (saved) {
      return JSON.parse(saved);
    }
    return content.onboarding.checklist.map((item, index) => ({
      id: index,
      text: item,
      completed: false
    }));
  });
  const [showModal, setShowModal] = useState(null);

  // Сохраняем чек-лист в localStorage
  useEffect(() => {
    localStorage.setItem('ultima-onboarding-checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Считаем прогресс
  const completedCount = checklist.filter(item => item.completed).length;
  const progress = (completedCount / checklist.length) * 100;

  // Переключение задачи
  const toggleTask = (id) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Сброс прогресса
  const resetProgress = () => {
    if (window.confirm('Сбросить весь прогресс онбординга?')) {
      setChecklist(checklist.map(item => ({ ...item, completed: false })));
    }
  };

  const sections = content.onboarding.sections;
  const currentSection = sections[activeSection];

  const sectionIcons = [
    <BookOpen size={20} />,
    <Calendar size={20} />,
    <CheckSquare size={20} />,
    <Target size={20} />,
    <RefreshCw size={20} />,
    <FileText size={20} />,
    <Briefcase size={20} />,
    <Tool size={20} />
  ];

  return (
    <section id="onboarding" className="section onboarding-section">
      <div className="container">
        {/* Заголовок */}
        <div className="section-header">
          <h2>📚 Онбординг ULTIMA 9.0</h2>
          <p>Пошаговое руководство для успешного старта в программе</p>
        </div>

        {/* Прогресс-бар */}
        <div className="onboarding-progress-card">
          <div className="progress-header">
            <div className="progress-info">
              <span className="progress-label">📊 Ваш прогресс:</span>
              <span className="progress-value">{Math.round(progress)}%</span>
              <span className="progress-count">({completedCount}/{checklist.length})</span>
            </div>
            <button onClick={resetProgress} className="reset-button" title="Сбросить прогресс">
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Основной контент */}
        <div className="onboarding-content-wrapper">
          {/* Навигация по секциям */}
          <div className="onboarding-nav">
            <h3>Разделы онбординга:</h3>
            <div className="onboarding-sections-list">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={`section-tab ${activeSection === index ? 'active' : ''}`}
                >
                  <span className="section-icon">{sectionIcons[index]}</span>
                  <span className="section-title">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Контент выбранной секции */}
          <div className="onboarding-main-content">
            {/* Заголовок секции */}
            <div className="section-content-header">
              <h3>{currentSection.title}</h3>
              {currentSection.subtitle && (
                <p className="section-subtitle">{currentSection.subtitle}</p>
              )}
            </div>

            {/* Контент секции */}
            <div className="section-content-body">
              {/* Текстовый контент */}
              {currentSection.content.text && (
                <div className="content-text">
                  <p>{currentSection.content.text}</p>
                </div>
              )}

              {/* Список документов */}
              {currentSection.content.documents && (
                <div className="content-documents">
                  <h4>📎 Документы и материалы:</h4>
                  <div className="documents-list">
                    {currentSection.content.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="document-item"
                      >
                        <FileText size={20} />
                        <span>{doc.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Этапы/стадии */}
              {currentSection.content.stages && (
                <div className="content-stages">
                  {currentSection.content.stages.map((stage, index) => (
                    <div key={index} className="stage-item">
                      <div className="stage-number">{index + 1}</div>
                      <div className="stage-content">
                        <h5>{stage.title}</h5>
                        <p>{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Список пунктов */}
              {currentSection.content.items && (
                <div className="content-items">
                  <ul>
                    {currentSection.content.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Модальное окно */}
              {currentSection.content.modal && (
                <button
                  onClick={() => setShowModal(currentSection.content.modal)}
                  className="modal-trigger-button"
                >
                  {currentSection.content.modal.buttonText}
                </button>
              )}
            </div>

            {/* Навигация между секциями */}
            <div className="section-navigation">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="nav-button nav-prev"
              >
                <ChevronLeft size={20} />
                <span>Предыдущий раздел</span>
              </button>
              <button
                onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                disabled={activeSection === sections.length - 1}
                className="nav-button nav-next"
              >
                <span>Следующий раздел</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Чек-лист */}
          <div className="onboarding-checklist">
            <h3>✅ Ваш чек-лист старта</h3>
            <div className="checklist-items">
              {checklist.map((item) => (
                <label key={item.id} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span className={item.completed ? 'completed' : ''}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Модальное окно */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close"
                onClick={() => setShowModal(null)}
              >
                <X size={24} />
              </button>
              <h3>{showModal.title}</h3>
              <div className="modal-body">
                {showModal.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
