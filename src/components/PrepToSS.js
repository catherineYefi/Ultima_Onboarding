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

const BOOSTER_LINK = "https://nkl6yv.csb.app/";
const AI_NOTION =
  "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link";

export default function PrepToSS({
  content,
  promptExpanded,
  setPromptExpanded,
  copiedPrompt,
  copyPrompt,
  downloadPrompt,
}) {
  // Безопасные геттеры/дефолты
  const prep = content?.sections?.prepSS ?? {};
  const nextStep = {
    title: prep?.nextStep?.title ?? "Подготовка к стратегической сессии",
    description:
      prep?.nextStep?.description ??
      "Ключевой этап перед офлайн СС — пройди шаги подготовки.",
    cta: { text: prep?.nextStep?.cta?.text ?? "Перейти к шагам" },
  };
  const why =
    prep?.why ??
    "Качество СС определяется не днём работы, а подготовкой к нему.";
  const checklists = Array.isArray(prep?.readinessChecklists)
    ? prep.readinessChecklists
    : [];
  const biMeetings = Array.isArray(prep?.biMeetings) ? prep.biMeetings : [];
  const booster = {
    description:
      prep?.booster?.description ??
      "Мини-курс для прояснения продукта, экономики и стратегии.",
    modules: Array.isArray(prep?.booster?.modules) ? prep.booster.modules : [],
  };
  const aiPrompt =
    content?.aiMentorPrompt ??
    `Я — AI-наставник ULTIMA. Помоги подготовиться к Start-СС:
— собери P&L за 3 месяца,
— выпиши ключевые метрики,
— зафиксируй WIG/OKR и приборы контроля.`;
  const aiMentor = prep?.aiMentor ?? {};

  // Новый текст про AI-наставника — как просил(а)
  const aiIntro =
    "AI-наставник = твой персональный «строгий трекер» для подготовки к стратегической сессии.";
  const aiDetails =
    "Его задача — провести тебя по каждому из 17 слайдов, проверить качество на трёх уровнях и не пустить дальше, пока всё не идеально. В финале он проверит PDF-версию и даст вердикт: «ГОТОВО» или список правок.";

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
                document
                  .querySelector(".prompt-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="cta-button primary"
            >
              {nextStep.cta.text}
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
            {checklists.map((checklist, idx) => (
              <div key={checklist?.id || idx} className="checklist-card">
                <div className="checklist-header">
                  <div className="checklist-number">{idx + 1}</div>
                  <h4>{checklist?.title || `Шаг ${idx + 1}`}</h4>
                </div>
                <ul className="checklist-items">
                  {(checklist?.items || []).map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <CheckCircle2 size={16} />
                      <span>{String(item)}</span>
                    </li>
                  ))}
                </ul>
                <div className="checklist-bring">
                  <strong>Что принести:</strong> скрин/таблица/файл — любой
                  формат, главное факты
                </div>
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
              {biMeetings.map((meeting, idx) => (
                <div key={idx} className="meeting-item">
                  <div className="meeting-number">{idx + 1}</div>
                  <div className="meeting-content">
                    <strong>
                      Встреча №{idx + 1}: {meeting?.title || `Шаг ${idx + 1}`}
                    </strong>
                    <p>{meeting?.goal || ""}</p>
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
              <p>{booster.description}</p>
              <ul>
                {booster.modules.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              <a
                href={BOOSTER_LINK}
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
              <p><strong>{aiIntro}</strong></p>
              <p>{aiDetails}</p>

              {/* (оставляем старые фичи/результат, если есть в контенте) */}
              {Array.isArray(aiMentor?.features) && aiMentor.features.length > 0 && (
                <div className="ai-features">
                  <h5>Как это работает:</h5>
                  <ul>
                    {aiMentor.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(aiMentor?.result) && aiMentor.result.length > 0 && (
                <div className="ai-result">
                  <h5>Результат подготовки:</h5>
                  <ul>
                    {aiMentor.result.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="prompt-section">
                <h5>Промпт AI-наставника:</h5>
                <div className={`prompt-box ${promptExpanded ? "expanded" : "collapsed"}`}>
                  <pre>
                    {promptExpanded ? aiPrompt : aiPrompt.substring(0, 300) + "..."}
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

                  {/* Новая кнопка: подробная инструкция */}
                  <a
                    href={AI_NOTION}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-button ghost"
                  >
                    Подробная инструкция <ExternalLink size={16} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
