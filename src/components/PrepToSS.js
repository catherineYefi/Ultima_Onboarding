import React from "react";
import {
  Target,
  ArrowRight,
  Users,
  Zap,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  ExternalLink,
} from "lucide-react";

export default function PrepToSS({
  content,
  promptExpanded,
  setPromptExpanded,
  copiedPrompt,
  copyPrompt,
  downloadPrompt,
}) {
  // ---- SAFE READS ----
  const prep = content?.sections?.prepSS || {};

  const nextStep = prep?.nextStep || {
    title: "Подготовка к стратегической сессии",
    description:
      "Пройди шаги подготовки перед Start-СС: встречи с БИ, материалы, чек-листы.",
    cta: { text: "Перейти к шагам" },
  };

  const why =
    prep?.why ||
    "Качество СС определяется не днём работы, а подготовкой к ней.";

  const readinessChecklists = Array.isArray(prep?.readinessChecklists)
    ? prep.readinessChecklists
    : [];

  const ssCriteriaTitle = prep?.ssCriteria?.title || "Критерии готовности к СС";
  const ssCriteriaItems = Array.isArray(prep?.ssCriteria?.items)
    ? prep.ssCriteria.items
    : [];

  const biMeetings = Array.isArray(prep?.biMeetings) ? prep.biMeetings : [];

  const booster = prep?.booster || {};
  const boosterDesc =
    booster?.description ||
    "Короткий интенсив перед стартом: проясняем продукт, экономику и стратегию.";
  const boosterModules = Array.isArray(booster?.modules) ? booster.modules : [];
  const boosterUrl =
    content?.links?.booster?.url || "https://nkl6yv.csb.app/";

  const aiPrompt = content?.aiMentorPrompt || "";

  const openAIMentor = () => {
    window.dispatchEvent(new CustomEvent("openAIMentor"));
  };

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
            <h3>{nextStep.title}</h3>
            <p>{nextStep.description}</p>
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
              {nextStep?.cta?.text || "Перейти"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="section-block fade-in">
          <h3>Зачем готовиться?</h3>
          <p>{why}</p>
        </div>

        {/* Readiness Checklists */}
        <div className="readiness-checklists fade-in">
          <h3>Чек-листы готовности к встречам</h3>
          <div className="checklists-grid">
            {readinessChecklists.map((checklist, idx) => (
              <div key={checklist?.id || idx} className="checklist-card">
                <div className="checklist-header">
                  <div className="checklist-number">{idx + 1}</div>
                  <h4>{checklist?.title || `Шаг ${idx + 1}`}</h4>
                </div>
                <ul className="checklist-items">
                  {(Array.isArray(checklist?.items) ? checklist.items : []).map(
                    (item, itemIdx) => (
                      <li key={itemIdx}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
                <div className="checklist-bring">
                  <strong>Что принести:</strong> скрин/таблица/файл — любой
                  формат, главное факты
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SS Readiness Criteria */}
        <div className="ss-criteria fade-in">
          <h3>{ssCriteriaTitle}</h3>
          <div className="criteria-grid">
            {ssCriteriaItems.map((item, idx) => (
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
                <p className="step-outcome">Готовность к стратегической сессии</p>
              </div>
            </div>
            <div className="step-content">
              <p className="step-description">3 встречи с Бизнес-Инженером</p>
              {biMeetings.length === 0 ? (
                <p className="muted">Список встреч будет добавлен.</p>
              ) : (
                biMeetings.map((meeting, idx) => (
                  <div key={idx} className="meeting-item">
                    <div className="meeting-number">{idx + 1}</div>
                    <div className="meeting-content">
                      <strong>
                        Встреча №{idx + 1}: {meeting?.title || "Без названия"}
                      </strong>
                      <p>{meeting?.goal || "Цель встречи будет уточнена."}</p>
                    </div>
                  </div>
                ))
              )}
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
              <p>{boosterDesc}</p>
              {boosterModules.length > 0 ? (
                <ul>
                  {boosterModules.map((module, idx) => (
                    <li key={idx}>{module}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Модули будут опубликованы позже.</p>
              )}
              <a
                href={boosterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                Перейти к Booster <ExternalLink size={20} />
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
              <p>
                AI-наставник = твой персональный «строгий трекер» для подготовки
                к стратегической сессии. Его задача — провести тебя по 17
                слайдам, проверять качество на трёх уровнях и не пускать дальше,
                пока всё не идеально. В финале проверит PDF-версию и даст
                вердикт: «ГОТОВО» или список правок.
              </p>

              <div className="prompt-section">
                <h5>Промпт AI-наставника:</h5>
                <div
                  className={`prompt-box ${
                    promptExpanded ? "expanded" : "collapsed"
                  }`}
                >
                  <pre>
                    {promptExpanded
                      ? aiPrompt
                      : (aiPrompt || "").substring(0, 300) + "..."}
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
                      <ChevronUp size={16} /> Свернуть
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} /> Показать полностью
                    </>
                  )}
                </button>
                <div className="prompt-actions">
                  <button onClick={copyPrompt} className="cta-button secondary">
                    {copiedPrompt ? (
                      "Скопировано!"
                    ) : (
                      <>
                        <Copy size={18} /> Скопировать
                      </>
                    )}
                  </button>
                  <button onClick={downloadPrompt} className="cta-button secondary">
                    <Download size={18} /> Скачать .txt
                  </button>
                  <button onClick={openAIMentor} className="cta-button primary">
                    Подробная инструкция
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 3 */}
        </div>
      </div>
    </section>
  );
}
