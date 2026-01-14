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
  const prep = content?.sections?.prepSS || {};
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
            <h3>{prep?.nextStep?.title || "Подготовка к стратегической сессии"}</h3>
            <p>{prep?.nextStep?.description || "Выполни шаги подготовки перед Start-СС."}</p>
            <button
              onClick={() => {
                const aiSection = document.querySelector(".prompt-section");
                aiSection?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="cta-button primary"
            >
              {prep?.nextStep?.cta?.text || "Перейти к шагам"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* WHY */}
        <div className="section-block fade-in">
          <h3>Зачем готовиться?</h3>
          <p>{prep?.why || "Качество СС определяется не днём работы, а подготовкой к ней."}</p>
        </div>

        {/* Readiness Checklists */}
        <div className="readiness-checklists fade-in">
          <h3>Чек-листы готовности к встречам</h3>
          <div className="checklists-grid">
            {(Array.isArray(prep?.readinessChecklists) ? prep.readinessChecklists : []).map(
              (checklist, idx) => (
                <div key={checklist?.id || idx} className="checklist-card">
                  <div className="checklist-header">
                    <div className="checklist-number">{idx + 1}</div>
                    <h4>{checklist?.title || `Шаг ${idx + 1}`}</h4>
                  </div>
                  <ul className="checklist-items">
                    {(Array.isArray(checklist?.items) ? checklist.items : []).map((item, i2) => (
                      <li key={i2}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="checklist-bring">
                    <strong>Что принести:</strong> скрин/таблица/файл — факты важнее формата
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="prep-steps fade-in">
          <h3 className="steps-title">Пошаговая подготовка</h3>

          {/* Step 1 */}
          <div className="prep-step">
            <div className="step-header">
              <div className="step-number">1</div>
              <Users size={32} className="step-icon" />
              <div className="step-title-block">
                <h4>Встречи группы</h4>
                <p className="step-outcome">Готовность к стратегической сессии</p>
              </div>
            </div>
            <div className="step-content">
              <p className="step-description">Синхронизация, артефакты, краткие ревью</p>
              {(Array.isArray(prep?.biMeetings) ? prep.biMeetings : []).map((meeting, idx) => (
                <div key={idx} className="meeting-item">
                  <div className="meeting-number">{idx + 1}</div>
                  <div className="meeting-content">
                    <strong>Встреча №{idx + 1}: {meeting?.title || "Без названия"}</strong>
                    <p>{meeting?.goal || "Цель будет уточнена."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
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
              <p>{prep?.booster?.description || "Короткий интенсив перед стартом."}</p>
              {Array.isArray(prep?.booster?.modules) && prep.booster.modules.length > 0 ? (
                <ul>
                  {prep.booster.modules.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              ) : (
                <p className="muted">Модули будут опубликованы позже.</p>
              )}
              <a
                href={content?.links?.booster?.url || "https://nkl6yv.csb.app/"}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                Перейти к Booster <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Step 3 — AI Mentor */}
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
              <p>
                AI-наставник = твой персональный «строгий трекер» для подготовки к стратегической сессии.
                Ведёт по 17 слайдам, ставит гейты L1/L2/L3, и в финале проверяет PDF: «ГОТОВО» или список правок.
              </p>

              <div className="prompt-section">
                <h5>Промпт AI-наставника:</h5>

                {/* ВАЖНО: управление высотой прямо здесь — без зависимости от CSS */}
                <div
                  className="prompt-box"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: 12,
                    background: "rgba(255,255,255,0.04)",
                    maxHeight: promptExpanded ? "none" : 240,
                    overflow: promptExpanded ? "visible" : "hidden",
                  }}
                >
                  <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {promptExpanded ? aiPrompt : (aiPrompt || "").slice(0, 300) + (aiPrompt?.length > 300 ? "…" : "")}
                  </pre>
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
                    {copiedPrompt ? "Скопировано!" : <><Copy size={18} /> Скопировать</>}
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
