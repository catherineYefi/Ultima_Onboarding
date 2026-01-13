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
  // ---------- НОРМАЛИЗАЦИЯ ДАННЫХ ----------
  const isArr = (v) => Array.isArray(v);
  const toArr = (v) => (Array.isArray(v) ? v : []);

  const rawPrep = content?.sections?.prepSS ?? {};

  const prep = {
    nextStep: {
      title: rawPrep?.nextStep?.title ?? "Подготовка к стратегической сессии",
      description:
        rawPrep?.nextStep?.description ??
        "Ключевой этап перед офлайн СС — пройди шаги подготовки.",
      cta: {
        text: rawPrep?.nextStep?.cta?.text ?? "Перейти к шагам",
      },
    },
    why:
      rawPrep?.why ??
      "Качество СС определяется не днём работы, а подготовкой к нему.",
    readinessChecklists: toArr(rawPrep?.readinessChecklists).map((c, i) => ({
      id: c?.id ?? `check-${i}`,
      title: c?.title ?? `Шаг ${i + 1}`,
      items: toArr(c?.items?.filter(Boolean) ?? c?.deliverables),
    })),
    ssCriteria: {
      title: rawPrep?.ssCriteria?.title ?? "Критерии готовности к СС",
      items: toArr(rawPrep?.ssCriteria?.items).map(String),
    },
    biMeetings: toArr(rawPrep?.biMeetings).map((m, i) => ({
      title: m?.title ?? `Встреча ${i + 1}`,
      goal: m?.goal ?? "",
    })),
    booster: {
      description:
        rawPrep?.booster?.description ??
        "Мини-курс для прояснения продукта, экономики и стратегии.",
      modules: toArr(rawPrep?.booster?.modules).map(String),
    },
    aiMentor: {
      description:
        rawPrep?.aiMentor?.description ??
        "Используй AI-наставника, чтобы быстро собрать и структурировать материалы.",
      features: toArr(rawPrep?.aiMentor?.features).map(String),
      result: toArr(rawPrep?.aiMentor?.result).map(String),
      instructions: toArr(rawPrep?.aiMentor?.instructions).map((it, i) => ({
        title: it?.title ?? `Шаг ${i + 1}`,
        text: it?.text ?? "",
      })),
    },
  };

  const links = {
    booster: { url: content?.links?.booster?.url ?? "#" },
    rules: { url: content?.links?.rules?.url ?? "#" },
    nda: { url: content?.links?.nda?.url ?? "#" },
  };

  const aiPrompt =
    content?.aiMentorPrompt ??
    `Я — AI-наставник ULTIMA. Помоги подготовиться к Start-СС:
— собери P&L за 3 месяца,
— выпиши ключевые метрики,
— зафиксируй WIG/OKR и приборы контроля.`;

  // ---------- РЕНДЕР ----------
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
            <h3>{prep.nextStep.title}</h3>
            <p>{prep.nextStep.description}</p>
            <button
              onClick={() => {
                const aiSection = document.querySelector(".prompt-section");
                aiSection?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="cta-button primary"
            >
              {prep.nextStep.cta.text}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="section-block fade-in">
          <h3>Зачем готовиться?</h3>
          <p>{prep.why}</p>
        </div>

        {/* Readiness Checklists */}
        <div className="readiness-checklists fade-in">
          <h3>Чек-листы готовности к встречам</h3>
          <div className="checklists-grid">
            {prep.readinessChecklists.length === 0 ? (
              <div className="checklist-card">
                <div className="checklist-header">
                  <div className="checklist-number">—</div>
                  <h4>Чек-листы появятся позже</h4>
                </div>
                <div className="checklist-bring">
                  Свяжись с куратором, если нужно ускорить публикацию.
                </div>
              </div>
            ) : (
              prep.readinessChecklists.map((checklist, idx) => (
                <div key={checklist.id || idx} className="checklist-card">
                  <div className="checklist-header">
                    <div className="checklist-number">{idx + 1}</div>
                    <h4>{checklist.title}</h4>
                  </div>
                  <ul className="checklist-items">
                    {toArr(checklist.items).map((item, itemIdx) => (
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
              ))
            )}
          </div>
        </div>

        {/* SS Readiness Criteria */}
        <div className="ss-criteria fade-in">
          <h3>{prep.ssCriteria.title}</h3>
          <div className="criteria-grid">
            {prep.ssCriteria.items.map((item, idx) => (
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
              {prep.biMeetings.map((meeting, idx) => (
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
              <p>{prep.booster.description}</p>
              <ul>
                {prep.booster.modules.map((module, idx) => (
                  <li key={idx}>{module}</li>
                ))}
              </ul>
              <a
                href={links.booster.url}
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
              <p>{prep.aiMentor.description}</p>

              <div className="ai-features">
                <h5>Как это работает:</h5>
                <ul>
                  {prep.aiMentor.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="ai-result">
                <h5>Результат подготовки:</h5>
                <ul>
                  {prep.aiMentor.result.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="prompt-section">
                <h5>Промпт AI-наставника:</h5>
                <div
                  className={`prompt-box ${promptExpanded ? "expanded" : "collapsed"}`}
                >
                  <pre>
                    {promptExpanded ? aiPrompt : aiPrompt.slice(0, 300) + "..."}
                  </pre>
                  {!promptExpanded && (
                    <p className="prompt-hint">
                      Показан фрагмент. Полная версия — по кнопке.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setPromptExpanded?.(!promptExpanded)}
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
                    {copiedPrompt ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    {copiedPrompt ? "Скопировано!" : "Скопировать промпт"}
                  </button>
                  <button onClick={downloadPrompt} className="cta-button secondary">
                    <Download size={20} />
                    Скачать .txt
                  </button>
                </div>
              </div>

              <div className="instructions">
                <h5>Инструкция использования:</h5>
                {prep.aiMentor.instructions.map((instruction, idx) => (
                  <div key={idx} className="instruction-item">
                    <strong>{instruction.title}</strong>
                    <p>{instruction.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
