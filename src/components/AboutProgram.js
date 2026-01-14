import React, { useState } from "react";
import {
  Info,
  Target,
  LineChart,
  ListChecks,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

export default function AboutProgram({ content, scrollToSection }) {
  const about = content?.sections?.about ?? {};
  const ssOffline = content?.sections?.ssOffline ?? {};
  const mainCycle = content?.sections?.mainCycle ?? {};
  const finalSec = content?.sections?.final ?? {};
  const formula = content?.sections?.formula ?? {};

  const [openId, setOpenId] = useState("about");

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      scrollToSection?.(id);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const openRulesOverlay = () =>
    window.dispatchEvent(new CustomEvent("openRules"));

  const items = [
    {
      id: "about",
      icon: <Info size={20} />,
      title: "Что такое ULTIMA?",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {about?.lead ??
              "ULTIMA — это управляемый сезон стратегической работы над ростом бизнеса: цели, метрики, дисциплина выполнения. Фокус — ROI и предсказуемый результат."}
          </p>
          <ul className="ap-list">
            <li>Результат: WIG/OKR, дорожная карта, приборы контроля</li>
            <li>Управление: недельный ритм, дедлайны, отчётность</li>
            <li>Команда: лидер и группа предпринимателей (без БИ)</li>
            <li>Плюс: 3 офлайн-мастермайнда с экспертами в год для Нечто ULTIMA</li>
            <li>Размер группы: 8 участников</li>
          </ul>
          <button className="cta-button secondary" onClick={() => go("#about")}>
            Подробнее в разделе «О программе» <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
    {
      id: "cycle",
      icon: <LineChart size={20} />,
      title: "Цикл сезона",
      body: (
        <div className="ap-body">
          <ul className="ap-list">
            <li>
              <strong>Start-СС:</strong>{" "}
              {ssOffline?.format ||
                "2 дня офлайн: фокус, экономика, карта работ"}
            </li>
            <li>
              <strong>Главный цикл (12 недель):</strong>{" "}
              {mainCycle?.lead ||
                "Ритм встреч, отчётность, устранение узких мест"}
            </li>
            <li>
              <strong>Выпускной:</strong>{" "}
              {finalSec?.lead ||
                "Презентация результата, подтверждённые метрики, план 90 дней"}
            </li>
          </ul>
          <div className="ap-actions">
            {/* было outline (тёмный текст), ставим secondary (светлый) */}
            <button
              className="cta-button secondary"
              onClick={() => go("#cycle-timeline")}
            >
              Дорожная карта <ArrowRight size={16} />
            </button>
            <button
              className="cta-button secondary"
              onClick={() => go("#main-cycle")}
            >
              Ритм встреч <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "roadmap",
      icon: <Target size={20} />,
      title: "Дорожная карта",
      body: (
        <div className="ap-body">
          <ol className="ap-steps">
            <li><strong>Start-СС:</strong> WIG/OKR → приборы контроля → план на 12 недель</li>
            <li><strong>Главный цикл:</strong> еженедельные спринты, контроль метрик, работа с трекером, лидером и группой</li>
            <li><strong>Выпускной:</strong> PDF-презентация, дашборд, P&L за сезон, план 90 дней</li>
          </ol>
          <button className="cta-button secondary" onClick={() => go("#prep-ss")}>
            Начать с подготовки <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
    {
      id: "rules",
      icon: <FileText size={20} />,
      title: "Правила группы",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            Режим неизбежности, фокус на ROI и прозрачность. Полные правила открываются в отдельной подстранице.
          </p>
          <ul className="ap-list">
            <li><strong>Дисциплина:</strong> посещаемость, дедлайны, артефакты</li>
            <li><strong>Коммуникации:</strong> ответ ≤ 12 часов, тишина = красный флаг</li>
            <li><strong>Цена слова:</strong> ответственность из декларации</li>
          </ul>
          <div className="ap-actions">
            {/* открываем overlay */}
            <button className="cta-button primary" onClick={openRulesOverlay}>
              Открыть правила
            </button>
            <button className="cta-button" onClick={() => go("#org-start")}>
              Документы и материалы
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "formula",
      icon: <ListChecks size={20} />,
      title: "Формула сезона",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {formula?.lead ||
              "Формула — это связь целей, метрик, гипотез и ритма исполнения. Делаем только то, что приближает к WIG/OKR."}
          </p>
          <ul className="ap-list">
            <li>Цели (WIG/OKR) → ключевые драйверы роста</li>
            <li>Метрики → приборы контроля и дашборды</li>
            <li>Гипотезы → спринты, ретроспективы, коррекции</li>
          </ul>
          <button className="cta-button secondary" onClick={() => go("#formula")}>
            Подробнее о формуле <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
    {
      id: "final",
      icon: <GraduationCap size={20} />,
      title: "Выпускной",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            Краткий питч, подтверждённые цифры, ясные следующие шаги. Готовим финальный пакет артефактов.
          </p>
          <ul className="ap-list">
            <li>PDF-презентация результата (15–20 слайдов)</li>
            <li>Дашборд метрик, P&L за сезон</li>
            <li>План на 90 дней</li>
          </ul>
          <button className="cta-button secondary" onClick={() => go("#final")}>
            К списку артефактов <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section id="about-program" className="section container about-program">
      <div className="section-header fade-in">
        <h2>О программе</h2>
        <p className="section-subtitle">
          Коротко о содержании сезона ULTIMA: как идём к результату и что нужно от вас.
        </p>
      </div>

      <div className="ap-accordion fade-in">
        {items.map((it) => {
          const isOpen = openId === it.id;
          return (
            <div key={it.id} className={`ap-item ${isOpen ? "open" : ""}`}>
              <button
                className="ap-trigger"
                onClick={() => setOpenId(isOpen ? "" : it.id)}
                aria-expanded={isOpen}
                aria-controls={`ap-panel-${it.id}`}
              >
                <span className="ap-trigger-left">
                  <span className="ap-icon">{it.icon}</span>
                  <span className="ap-title">{it.title}</span>
                </span>
                <span className="ap-trigger-right">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              <div
                id={`ap-panel-${it.id}`}
                className="ap-panel"
                role="region"
                aria-hidden={!isOpen}
                style={{ display: isOpen ? "block" : "none" }}
              >
                {it.body}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
