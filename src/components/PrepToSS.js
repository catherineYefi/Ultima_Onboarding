import React from "react";
import {
  Target,
  ArrowRight,
  Users,
  Zap,
  Brain,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";

/**
 * PrepToSS компонент - подготовка к Start-СС
 * VERSION 2.0 - читает из content.prepToStartCC
 * 
 * Props:
 * - id: ID секции для якорей
 * - content: объект content из content.js
 * - activeTab, setActiveTab: состояние табов
 * - promptExpanded, setPromptExpanded: состояние промпта
 * - copiedPrompt, copyPrompt, downloadPrompt: работа с промптом
 */
export default function PrepToSS({
  id = "prep-start-cc",
  content,
  activeTab,
  setActiveTab,
  promptExpanded,
  setPromptExpanded,
  copiedPrompt,
  copyPrompt,
  downloadPrompt,
}) {
  const prep = content?.prepToStartCC || {};
  const aiPrompt = content?.aiMentorPrompt || "";

  return (
    <section id={id} className="section highlight-section">
      <div className="container">
        {/* Заголовок секции */}
        <div className="section-header fade-in">
          <Target size={32} className="section-icon" />
          <h2>{prep?.title || "Подготовка к Start-СС"}</h2>
          <p className="section-subtitle">
            {prep?.subtitle || "Ключевой этап перед офлайн стратегической сессией"}
          </p>
        </div>

        {/* Зачем готовиться */}
        {prep?.why && (
          <div className="section-block fade-in">
            <h3>Зачем готовиться?</h3>
            <p>{prep.why}</p>
          </div>
        )}

        {/* Пошаговая подготовка */}
        <div className="prep-steps fade-in">
          <h3 className="steps-title">Пошаговая подготовка</h3>

          {/* ШАГ 1: Встречи с БИ */}
          {prep?.biMeetings && prep.biMeetings.length > 0 && (
            <div className="prep-step">
              <div className="step-header">
                <div className="step-number">1</div>
                <Users size={32} className="step-icon" />
                <div className="step-title-block">
                  <h4>Встречи с БИ (Бизнес-Инженером)</h4>
                  <p className="step-outcome">Готовность к стратегической сессии</p>
                </div>
              </div>
              <div className="step-content">
                <p className="step-description">
                  3 встречи для сбора фактов, цифр и прояснения вашей бизнес-модели
                </p>
                {prep.biMeetings.map((meeting, idx) => (
                  <div key={idx} className="meeting-item">
                    <div className="meeting-number">{idx + 1}</div>
                    <div className="meeting-content">
                      <strong>Встреча №{idx + 1}: {meeting.title}</strong>
                      <p>{meeting.goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ШАГ 2: AI-Booster */}
          {prep?.aiBooster && (
            <div className="prep-step highlight">
              <div className="step-header">
                <div className="step-number">2</div>
                <Zap size={32} className="step-icon" />
                <div className="step-title-block">
                  <h4>Pre-Ultima Booster</h4>
                  <p className="step-outcome">Прояснение продукта, экономики и стратегии</p>
                </div>
              </div>
              <div className="step-content">
                <p>{prep.aiBooster.description}</p>
                {prep.aiBooster.modules && prep.aiBooster.modules.length > 0 && (
                  <ul>
                    {prep.aiBooster.modules.map((module, idx) => (
                      <li key={idx}>{module}</li>
                    ))}
                  </ul>
                )}
                {prep.aiBooster.link && (
                  <a
                    href={prep.aiBooster.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button primary"
                  >
                    Перейти к Booster <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ШАГ 3: AI-наставник */}
          {prep?.aiMentor && (
            <div className="prep-step highlight">
              <div className="step-header">
                <div className="step-number">3</div>
                <Brain size={32} className="step-icon" />
                <div className="step-title-block">
                  <h4>AI-наставник</h4>
                  <p className="step-outcome">Материалы собраны и структурированы</p>
                </div>
              </div>
              <div className="step-content">
                {/* Вступление */}
                {prep.aiMentor.intro && (
                  <p><strong>{prep.aiMentor.intro}</strong></p>
                )}
                
                {/* Детали */}
                {prep.aiMentor.details && (
                  <p>{prep.aiMentor.details}</p>
                )}

                {/* Как это работает */}
                {prep.aiMentor.features && prep.aiMentor.features.length > 0 && (
                  <div className="ai-features">
                    <h5>Как это работает:</h5>
                    <ul>
                      {prep.aiMentor.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Результат */}
                {prep.aiMentor.result && prep.aiMentor.result.length > 0 && (
                  <div className="ai-result">
                    <h5>Результат подготовки:</h5>
                    <ul>
                      {prep.aiMentor.result.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Промпт AI-наставника */}
                <div className="prompt-section">
                  <h5>Промпт AI-наставника:</h5>
                  <div className={`prompt-box ${promptExpanded ? "expanded" : "collapsed"}`}>
                    <pre>
                      {promptExpanded 
                        ? aiPrompt 
                        : (aiPrompt.substring(0, 300) + "...")}
                    </pre>
                    {!promptExpanded && (
                      <p className="prompt-hint">
                        Показан фрагмент. Полная версия — по кнопке.
                      </p>
                    )}
                  </div>

                  <div className="prompt-actions">
                    <button
                      onClick={() => setPromptExpanded?.(!promptExpanded)}
                      className="expand-button"
                    >
                      {promptExpanded ? (
                        <>
                          <ChevronUp size={16} /> Свернуть
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} /> Показать полностью
                        </>
                      )}
                    </button>

                    <button onClick={copyPrompt} className="cta-button secondary">
                      {copiedPrompt ? "Скопировано!" : "Скопировать промпт"}
                    </button>

                    <button onClick={downloadPrompt} className="cta-button secondary">
                      Скачать .txt
                    </button>

                    {/* Подробная инструкция */}
                    {prep.aiMentor.notionLink && (
                      <a
                        href={prep.aiMentor.notionLink}
                        target="_blank"
                        rel="noreferrer"
                        className="cta-button ghost"
                      >
                        Подробная инструкция <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Документы и шаблоны */}
        {prep?.documentsTemplates && (
          <div className="documents-templates fade-in">
            <h3>
              <FileText size={24} style={{ display: "inline", marginRight: "0.5rem" }} />
              {prep.documentsTemplates.title || "Документы и шаблоны"}
            </h3>
            {prep.documentsTemplates.items && prep.documentsTemplates.items.length > 0 && (
              <div className="templates-grid">
                {prep.documentsTemplates.items.map((item, idx) => (
                  <div key={idx} className="template-card">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="template-link"
                      >
                        Открыть <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}