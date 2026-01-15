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

/**
 * AboutProgram — единый аккордеон «О программе»
 * Секции:
 *  - Что такое ULTIMA (кратко из content.sections.about)
 *  - Цикл сезона (коротко из content.sections.mainCycle / ssOffline)
 *  - Дорожная карта (3 этапа: Start-СС → Главный цикл → Выпускной)
 *  - Правила (кнопка ведёт к секции #org-start, где открывается подпопап с правилами)
 *  - Формула сезона (если есть в content.sections.formula)
 *  - Выпускной (кратко из content.sections.final)
 *
 * Важное по ТЗ:
 * - Кнопки «Дорожная карта» и «Ритм встреч» сделаны как `cta-button secondary`
 *   (светлый текст на тёмном фоне).
 */
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

  const items = [
    {
      id: "about",
      icon: <Info size={20} />,
      title: "Что такое ULTIMA?",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {about?.lead ??
              "ULTIMA — управляемый сезон стратегической работы над ростом бизнеса: цели, метрики, дисциплина исполнения. Фокус — ROI и предсказуемый результат."}
          </p>
          <ul className="ap-list">
            <li>Результат: WIG/OKR, дорожная карта, приборы контроля</li>
            <li>Управление: недельный ритм, дедлайны, отчётность</li>
            <li>Команда: группа предпринимателей (8 чел.), трекеры и ассистент</li>
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
              {ssOffline?.format || "2 дня офлайн: фокус, экономика, карта работ"}
            </li>
            <li>
              <strong>Главный цикл (6 месяцев):</strong>{" "}
              {mainCycle?.lead ||
                "Ритм встреч: 1-й месяц — трекер каждую неделю; 2–6-й — чередование трекер/лидер. Бадди-созвоны раз в 2 недели."}
            </li>
            <li>
              <strong>Выпускной:</strong>{" "}
              {finalSec?.lead ||
                "Презентация результата, подтверждённые метрики, план 90 дней"}
            </li>
          </ul>
          <div className="ap-actions">
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
            <li>
              <strong>Start-СС:</strong> WIG/OKR → приборы контроля → план на 6 месяцев
            </li>
            <li>
              <strong>Главный цикл:</strong> еженедельные спринты, контроль метрик,
              работа с узкими местами
            </li>
            <li>
              <strong>Выпускной:</strong> PDF-презентация, дашборд, P&L за сезон, план 90 дней
            </li>
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
            Режим неизбежности, фокус на ROI и прозрачность. Полные правила открываются в подстранице.
          </p>
          <ul className="ap-list">
            <li>
              <strong>Дисциплина:</strong> посещаемость, дедлайны, артефакты
            </li>
            <li>
              <strong>Коммуникации:</strong> ответ ≤ 12 часов, тишина = красный флаг
            </li>
            <li>
              <strong>Цена слова:</strong> фиксированная ответственность в декларации
            </li>
          </ul>
          <div className="ap-actions">
            <button className="cta-button secondary" onClick={() => go("#org-start")}>
              Открыть правила <ArrowRight size={16} />
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
