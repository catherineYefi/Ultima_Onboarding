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
  Info,
  ShieldAlert,
  ListChecks,
} from "lucide-react";

export default function PrepToSS({
  content,
  promptExpanded,
  setPromptExpanded,
  copiedPrompt,
  copyPrompt,
  downloadPrompt,
  onOpenAIMentor, // ⬅️ новое
}) {
  const c = content || {};
  const links = c.links || {};
  const sections = c.sections || {};
  const prepSS = sections.prepSS || sections.prepToSS || {};
  const nextStep = prepSS.nextStep || {
    title: "Подготовка к стратегической сессии",
    description:
      "Пройди шаги подготовки: встречи с БИ, Pre-Ultima Booster и AI-наставник.",
    cta: { text: "Перейти к шагам" },
  };

  const why =
    prepSS.why ||
    "Качество СС определяется не днём работы, а подготовкой к ней: собери факты и цифры заранее, чтобы день офлайн-погружения превратился в рывок, а не в «сбор данных».";

  const readinessChecklists = Array.isArray(prepSS.readinessChecklists)
    ? prepSS.readinessChecklists
    : [
        {
          id: "check-bi",
          title: "Перед встречами с БИ",
          items: [
            "Собраны выписки P&L за 3 месяца",
            "Подготовлены скрины CRM/дашбордов",
            "Сформирована оргструктура и текущие роли",
          ],
        },
        {
          id: "check-booster",
          title: "Перед Booster",
          items: [
            "Очевиден текущий продукт/предложение",
            "Есть гипотезы по unit-экономике",
            "Понимание ключевых каналов",
          ],
        },
        {
          id: "check-aim",
          title: "Перед AI-наставником",
          items: [
            "Создана папка «СС – Ultima – 9 сезон» на Google Диске",
            "Загружен PDF-шаблон презентации (17 слайдов)",
            "Подготовлен свободный рассказ о бизнесе",
          ],
        },
      ];

  const ssCriteria = prepSS.ssCriteria || {
    title: "Критерии готовности к Start-СС",
    items: [
      "Есть P&L за 3 месяца и ключевые метрики",
      "Заполнена «Точка А и Точка Б»",
      "Собрана визитка/презентация бизнеса",
      "Определён предварительный WIG",
    ],
  };

  const biMeetings = Array.isArray(prepSS.biMeetings)
    ? prepSS.biMeetings
    : [
        { title: "Сбор фактов (Точка А)", goal: "Поднять текущие цифры бизнеса" },
        {
          title: "Проработка точки Б",
          goal: "Сформулировать цели и необходимые изменения на 6 месяцев",
        },
        {
          title: "Финализация к СС",
          goal: "Собрать материалы и подготовить вопросы к Start-СС",
        },
      ];

  const booster = prepSS.booster || {
    description:
      "Интерактивный мини-курс для прояснения продукта, экономики и стратегии.",
    modules: [
      "Продукт и ценностное предложение",
      "Экономика (unit-экономика, ROMI)",
      "Гипотезы роста и приоритизация",
    ],
  };

  const aiMentor = prepSS.aiMentor || {
    description:
      "AI-наставник = персональный строгий «трекер» подготовки. Проводит по 17 слайдам, проверяет качество на 3 уровнях и не пускает дальше, пока не идеально. В финале проверит PDF и даст вердикт: «ГОТОВО» или список правок.",
    features: [
      "Пошаговая работа по слайдам шаблона",
      "Чек-листы и запрос документов",
      "Встроенная проверка L1/L2/L3",
    ],
    result: [
      "Заполненный шаблон презентации",
      "Консистентные цифры и факты",
      "Готовность к Start-СС",
    ],
    instructions: [
      {
        title: "1) Подготовь материалы",
        text:
          "Создай папку «СС – Ultima – 9 сезон» на Google Диске и сохрани туда: шаблон презентации (PDF), РНП, P&L, ДДС, CRM-выгрузки, оргструктуру, фото, таблицы.",
      },
      {
        title: "2) Запусти чат",
        text:
          "Открой ChatGPT, создай новый чат и вставь промпт «СС-НАСТАВНИК (Ultima)». Загрузите PDF-шаблон (17 слайдов) — без этого AI не начнёт работу.",
      },
      {
        title: "3) Свободный рассказ",
        text:
          "Коротко расскажи о бизнесе (ниша, продукты, команда, клиенты/сегменты, ключевые метрики, вызовы). Удобно надиктовать голосом фрагментами 1.5–2 мин.",
      },
      {
        title: "4) Дальше AI ведёт",
        text:
          "AI объясняет каждый слайд, даёт чек-лист, просит фактуру, проводит L1/L2/L3 и не пускает дальше, пока не «Готово».",
      },
      {
        title: "5) Финал",
        text:
          "Экспортируй презентацию в PDF и загрузи в чат. AI проверит полноту и согласованность, выдаст правки и вердикт.",
      },
    ],
  };

  const aiPrompt = String(c.aiMentorPrompt || c.aiNastavnikPrompt || "");
  const boosterUrl = links.booster?.url || "https://nkl6yv.csb.app/";
  const aimGuideUrl =
    links.aiMentorGuide?.url ||
    "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link";

  const onScrollToPrompt = () => {
    const aiSection = document.querySelector(".prompt-section");
    aiSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="prep-ss" className="section highlight-section">
      <div className="container">
        <div className="section-header fade-in">
          <Target size={32} className="section-icon" />
          <h2>Подготовка к стратегической сессии</h2>
          <p className="section-subtitle">Ключевой этап перед офлайн Start-СС</p>
        </div>

        {/* Акцент: 3 параллельных направления */}
        <div className="card info fade-in" style={{ marginBottom: 16 }}>
          <div className="flex-row" style={{ alignItems: "flex-start", gap: 12 }}>
            <Info size={22} />
            <div>
              <h3 style={{ margin: 0, fontSize: 18 }}>3 параллельных направления</h3>
              <ul className="final-list dots" style={{ marginTop: 6 }}>
                <li>
                  <strong>1) Работа с БИ:</strong> 3 встречи на группу — собираем фактуру и цифры.
                </li>
                <li>
                  <strong>2) Pre-Ultima Booster:</strong> мини-курс — проясняем продукт, экономику, стратегию.
                </li>
                <li>
                  <strong>3) AI-наставник:</strong> 17 слайдов, проверка L1/L2/L3, финальный аудит PDF.
                </li>
              </ul>
              <div className="muted" style={{ marginTop: 6, display: "flex", gap: 8 }}>
                <ShieldAlert size={16} />
                <span>
                  <strong>Важно:</strong> БИ участвует только на этапе подготовки к Start-СС. В течение сезона БИ нет.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step Block */}
        <div className="next-step-block fade-in">
          <div className="next-step-icon">
            <ArrowRight size={32} />
          </div>
          <div className="next-step-content">
            <h3>{nextStep.title}</h3>
            <p>{nextStep.description}</p>
            <button onClick={onScrollToPrompt} className="cta-button primary">
              {nextStep?.cta?.text || "Перейти к шагам"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="section-block fade-in">
          <h3>Зачем готовиться?</h3>
          <p>{why}</p>
        </div>

        {/* Readiness Checklists */}
        {readinessChecklists.length > 0 && (
          <div className="readiness-checklists fade-in">
            <h3>Чек-листы готовности к встречам</h3>
            <div className="checklists-grid">
              {readinessChecklists.map((checklist, idx) => (
                <div key={checklist.id || idx} className="checklist-card">
                  <div className="checklist-header">
                    <div className="checklist-number">{idx + 1}</div>
                    <h4>{checklist.title || `Чек-лист ${idx + 1}`}</h4>
                  </div>
                  <ul className="checklist-items">
                    {Array.isArray(checklist.items) &&
                      checklist.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <CheckCircle2 size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="checklist-bring">
                    <strong>Что принести:</strong> скрин/таблица/файл — любой формат, главное факты
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SS Readiness Criteria */}
        {Array.isArray(ssCriteria.items) && ssCriteria.items.length > 0 && (
          <div className="ss-criteria fade-in">
            <h3>{ssCriteria.title || "Критерии готовности"}</h3>
            <div className="criteria-grid">
              {ssCriteria.items.map((item, idx) => (
                <div key={idx} className="criteria-item">
                  <div className="criteria-check">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <p className="step-description">
                3 встречи с Бизнес-Инженером (БИ) — специалист помогает собрать фактуру бизнеса для Start-СС.
                <strong> БИ участвует только на этапе подготовки.</strong>
              </p>
              {biMeetings.map((meeting, idx) => (
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
              <p>{booster.description}</p>
              {Array.isArray(booster.modules) && booster.modules.length > 0 && (
                <ul className="final-list dots" style={{ marginTop: 8 }}>
                  {booster.modules.map((module, idx) => (
                    <li key={idx}>{module}</li>
                  ))}
                </ul>
              )}
              <a
                href={boosterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button primary"
                style={{ marginTop: 10 }}
              >
                Перейти к Booster <ExternalLink size={18} />
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
                  Материалы собраны и структурированы; проверка «ГОТОВО/доработать»
                </p>
              </div>
            </div>
            <div className="step-content">
              <p>{aiMentor.description}</p>

              {/* Как это работает */}
              {Array.isArray(aiMentor.features) && aiMentor.features.length > 0 && (
                <div className="ai-features">
                  <h5>Как это работает:</h5>
                  <ul>
                    {aiMentor.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Результат подготовки */}
              {Array.isArray(aiMentor.result) && aiMentor.result.length > 0 && (
                <div className="ai-result">
                  <h5>Результат подготовки:</h5>
                  <ul>
                    {aiMentor.result.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Промпт */}
              <div className="prompt-section">
                <h5>Промпт «СС-НАСТАВНИК (Ultima)»</h5>
                <div className={`prompt-box ${promptExpanded ? "expanded" : "collapsed"}`}>
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {promptExpanded
                      ? aiPrompt || "Промпт появится позже."
                      : (aiPrompt ? aiPrompt.slice(0, 300) + "..." : "Промпт появится позже.")}
                  </pre>
                  {!promptExpanded && aiPrompt && (
                    <p className="prompt-hint">Показан фрагмент. Полная версия — по кнопке ниже.</p>
                  )}
                </div>

                <div className="prompt-actions" style={{ gap: 8 }}>
                  <button
                    onClick={() => setPromptExpanded?.(!promptExpanded)}
                    className="expand-button"
                    aria-expanded={!!promptExpanded}
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

                  <button onClick={copyPrompt} className="cta-button secondary">
                    {copiedPrompt ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    {copiedPrompt ? "Скопировано!" : "Скопировать промпт"}
                  </button>

                  <button onClick={downloadPrompt} className="cta-button secondary">
                    <Download size={20} />
                    Скачать .txt
                  </button>

                  <a
                    className="cta-button primary"
                    href={aimGuideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Подробная инструкция <ExternalLink size={18} />
                  </a>

                  {/* Открыть подстраницу/overlay AI-наставника */}
                  <button
                    className="cta-button secondary"
                    onClick={() => onOpenAIMentor && onOpenAIMentor()}
                  >
                    Открыть подстраницу AI-наставника
                  </button>
                </div>
              </div>

              {/* Инструкция использования — краткая */}
              {Array.isArray(aiMentor.instructions) && aiMentor.instructions.length > 0 && (
                <div className="instructions" style={{ marginTop: 16 }}>
                  <h5>Краткая инструкция:</h5>
                  {aiMentor.instructions.map((instruction, idx) => (
                    <div key={idx} className="instruction-item">
                      <strong>{instruction.title}</strong>
                      <p>{instruction.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Доп. секция: мини чек-лист финальной готовности к СС */}
        <div className="section-block fade-in" style={{ marginTop: 24 }}>
          <h3>
            <ListChecks size={18} style={{ marginRight: 6, verticalAlign: "-3px" }} />
            Мини-чек-лист финальной готовности
          </h3>
          <ul className="final-list dots">
            <li>Есть P&L и ключевые метрики за 3 месяца</li>
            <li>Заполнены «Точка А/Б», определён предварительный WIG</li>
            <li>Собран шаблон презентации (17 слайдов), проверен AI-наставником</li>
            <li>Подготовлен список вопросов/рисков для обсуждения на Start-СС</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
