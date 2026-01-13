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
  Copy,
  Download,
} from "lucide-react";

export default function PrepToSS({
  content,
  promptExpanded,
  setPromptExpanded,
  copiedPrompt,
  copyPrompt,
  downloadPrompt,
}) {
  return (
    <section id="prep-ss" className="section highlight-section">
      <div className="container">
        <div className="section-header fade-in">
          <Target size={32} className="section-icon" />
          <h2>Подготовка к стратегической сессии</h2>
          <p className="section-subtitle">Ключевой этап перед офлайн СС</p>
        </div>

        {/* Next Step Block */}
        <div className="next-step-block fade-in">
          <div className="next-step-icon">
            <ArrowRight size={32} />
          </div>
          <div className="next-step-content">
            <h3>{content.sections.prepSS.nextStep.title}</h3>
            <p>{content.sections.prepSS.nextStep.description}</p>
            <button
              onClick={() => {
                const aiSection = document.querySelector(".prompt-section");
                if (aiSection) {
                  aiSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
              className="cta-button primary"
            >
              {content.sections.prepSS.nextStep.cta.text}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="section-block fade-in">
          <h3>Зачем готовиться?</h3>
          <p>{content.sections.prepSS.why}</p>
        </div>

        {/* Readiness Checklists */}
        <div className="readiness-checklists fade-in">
          <h3>Чек-листы готовности к встречам</h3>
          <div className="checklists-grid">
            {content.sections.prepSS.readinessChecklists.map(
              (checklist, idx) => (
                <div key={checklist.id} className="checklist-card">
                  <div className="checklist-header">
                    <div className="checklist-number">{idx + 1}</div>
                    <h4>{checklist.title}</h4>
                  </div>
                  <ul className="checklist-items">
                    {checklist.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="checklist-bring">
                    <strong>Что принести:</strong> скрин/таблица/файл — любой
                    формат, главное факты
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* SS Readiness Criteria */}
        <div className="ss-criteria fade-in">
          <h3>{content.sections.prepSS.ssCriteria.title}</h3>
          <div className="criteria-grid">
            {content.sections.prepSS.ssCriteria.items.map((item, idx) => (
              <div key={idx} className="criteria-item">
                <div className="criteria-check">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Preparation */}
        <div className="prep-steps fade-in">
          <h3 className="steps-title">Пошаговая подготовка</h3>

          {/* Step 1: BI Meetings */}
          <div className="prep-step">
            <div className="step-header">
              <div className="step-number">1</div>
              <Users size={32} className="step-icon" />
              <div className="step-title-block">
                <h4>Встречи с БИ</h4>
                <p className="step-outcome">
                  Готовность к стратегической сессии
                </p>
              </div>
            </div>
            <div className="step-content">
              <p className="step-description">3 встречи с Бизнес-Инженером</p>
              {content.sections.prepSS.biMeetings.map((meeting, idx) => (
                <div key={idx} className="meeting-item">
                  <div className="meeting-number">{idx + 1}</div>
                  <div className="meeting-content">
                    <strong>
                      Встреча №{idx + 1}: {meeting.title}
                    </strong>
                    <p>{meeting.goal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Booster */}
          <div className="prep-step highlight">
            <div className="step-header">
              <div className="step-number">2</div>
              <Zap size={32} className="step-icon" />
              <div className="step-title-block">
                <h4>Pre-Ultima Booster</h4>
                <p className="step-outcome">
                  Прояснение продукта, экономики и стратегии
                </p>
              </div>
            </div>
            <div className="step-content">
              <p>{content.sections.prepSS.booster.description}</p>
              <ul>
                {content.sections.prepSS.booster.modules.map((module, idx) => (
                  <li key={idx}>{module}</li>
                ))}
              </ul>
              <a
                href={content.links.booster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                Перейти к Booster
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Step 3: AI Mentor */}
          <div className="prep-step highlight">
            <div className="step-header">
              <div className="step-number">3</div>
              <Brain size={32} className="step-icon" />
              <div className="step-title-block">
                <h4>AI-наставник</h4>
                <p className="step-outcome">
                  Материалы собраны и структурированы
                </p>
              </div>
            </div>
            <div className="step-content">
              <p>{content.sections.prepSS.aiMentor.description}</p>

              <div className="ai-features">
                <h5>Как это работает:</h5>
                <ul>
                  {content.sections.prepSS.aiMentor.features.map(
                    (feature, idx) => (
                      <li key={idx}>{feature}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="ai-result">
                <h5>Результат подготовки:</h5>
                <ul>
                  {content.sections.prepSS.aiMentor.result.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="prompt-section">
                <h5>Промпт AI-наставника:</h5>
                <div
                  className={`prompt-box ${
                    promptExpanded ? "expanded" : "collapsed"
                  }`}
                >
                  <pre>
                    {promptExpanded
                      ? content.aiMentorPrompt
                      : content.aiMentorPrompt.substring(0, 300) + "..."}
                  </pre>
                  {!promptExpanded && (
                    <p className="prompt-hint">
                      Показан фрагмент. Полная версия — по кнопке.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setPromptExpanded(!promptExpanded)}
                  className="expand-button"
                >
                  {promptExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      Свернуть
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Показать полностью
                    </>
                  )}
                </button>
                <div className="prompt-actions">
                  <button onClick={copyPrompt} className="cta-button secondary">
                    {copiedPrompt ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                    {copiedPrompt ? "Скопировано!" : "Скопировать промпт"}
                  </button>
                  <button
                    onClick={downloadPrompt}
                    className="cta-button secondary"
                  >
                    <Download size={20} />
                    Скачать .txt
                  </button>
                </div>
              </div>

              <div className="instructions">
                <h5>Инструкция использования:</h5>
                {content.sections.prepSS.aiMentor.instructions.map(
                  (instruction, idx) => (
                    <div key={idx} className="instruction-item">
                      <strong>{instruction.title}</strong>
                      <p>{instruction.text}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
