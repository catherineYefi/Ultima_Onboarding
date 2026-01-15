// src/components/AboutProgram.js
import React, { useMemo } from "react";
import {
  Info,
  Target,
  LineChart,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  FileText,
} from "lucide-react";

/**
 * AboutProgram — единый аккордеон «О программе»
 *
 * По ТЗ:
 *  - «Что такое ULTIMA?» — добавлено про 3 мастермайнда (ММ) в год только для ULTIMA,
 *    и про размер группы — 8 участников.
 *  - «Цикл сезона» — CTA-кнопки как secondary (светлый текст).
 *  - «Правила» — кнопка открывает RulesOverlay через onOpenRules.
 *
 * Пропсы:
 *  - content
 *  - scrollToSection?: (id: string) => void
 *  - onOpenRules?: () => void — открыть overlay правил
 */
export default function AboutProgram({ content, scrollToSection, onOpenRules }) {
  const about = content?.sections?.about ?? {};
  const ssOffline = content?.sections?.ssOffline ?? {};
  const mainCycle = content?.sections?.mainCycle ?? {};
  const finalSec = content?.sections?.final ?? {};
  const formula = content?.sections?.formula ?? {};

  const [openId, setOpenId] = React.useState("about");

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      scrollToSection?.(id);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const metrics = useMemo(() => {
    const base = Array.isArray(about?.metrics) ? about.metrics : [];
    // гарантируем нужные уточнения по ТЗ
    const defaults = [
      { label: "Длительность сезона", value: "6 месяцев" },
      { label: "Группы", value: "8 человек" },
      { label: "Формат", value: "онлайн + офлайн СС" },
      { label: "Экосистема", value: "3 мастермайнда (ММ) в год" },
    ];
    // если у пользователя уже есть метрики — не ломаем их, но добавим/заменим «Группы» и «Экосистема»
    const override = (arr, label, value) => {
      const idx = arr.findIndex((m) => String(m?.label).toLowerCase() === String(label).toLowerCase());
      if (idx >= 0) {
        const copy = [...arr];
        copy[idx] = { ...(copy[idx] || {}), value };
        return copy;
      }
      return [...arr, { label, value }];
    };
    let out = base.length ? [...base] : [];
    out = override(out, "Группы", "8 человек");
    out = override(out, "Экосистема", "3 мастермайнда (ММ) в год");
    if (!out.some((m) => String(m?.label).toLowerCase() === "длительность сезона"))
      out.push({ label: "Длительность сезона", value: "6 месяцев" });
    if (!out.some((m) => String(m?.label).toLowerCase() === "формат"))
      out.push({ label: "Формат", value: "онлайн + офлайн СС" });
    return out;
  }, [about?.metrics]);

  const items = [
    {
      id: "about",
      icon: <Info size={20} />,
      title: "Что такое ULTIMA?",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {about?.lead ??
              "ULTIMA — это управляемый сезон стратегической работы над ростом бизнеса: цели, метрики, дисциплина исполнения и командная ответственность."}
          </p>
          <ul className="ap-list">
            <li>Результат: WIG/OKR, дорожная карта, приборы контроля</li>
            <li>Управление: недельный ритм, дедлайны, отчётность</li>
            <li>Команда: группа предпринимателей (8 человек), лидер и трекер</li>
            <li>Экосистема: 3 мастермайнда (ММ) в год только для участников ULTIMA</li>
          </ul>

          {/* мини-метрики */}
          <div className="about-metrics" style={{ marginTop: 10 }}>
            {metrics.map((m, i) => (
              <div key={i} className="metric">
                <CheckCircle2 size={18} />
                <div>
                  <div className="metric-value">{m.value}</div>
                  <div className="metric-label">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
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
              {mainCycle?.lead || "Недельный ритм: месяц 1 — трекер каждую неделю; далее чередование трекер/лидер. Бадди — раз в 2 недели."}
            </li>
            <li>
              <strong>Выпускной:</strong>{" "}
              {finalSec?.lead || "Презентация результата, подтверждённые метрики, план 90 дней"}
            </li>
          </ul>
          <div className="ap-actions">
            {/* secondary — светлый текст на тёмном фоне */}
            <button className="cta-button secondary" onClick={() => go("#cycle-timeline")}>
              Дорожная карта <ArrowRight size={16} />
            </button>
            <button className="cta-button secondary" onClick={() => go("#main-cycle")}>
              Ритм встреч <ArrowRight size={16} />
            </button>
          </div>
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
            Режим неизбежности, фокус на ROI и прозрачность. Полные правила представлены в подстранице.
          </p>
          <ul className="ap-list">
            <li><strong>Дисциплина:</strong> посещаемость, дедлайны, обязательные артефакты</li>
            <li><strong>Коммуникации:</strong> ответ ≤ 12 часов, тишина — красный флаг</li>
            <li><strong>Цена слова:</strong> фиксированная ответственность из декларации</li>
          </ul>
          <div className="ap-actions">
            <button
              className="cta-button primary"
              onClick={() => (typeof onOpenRules === "function" ? onOpenRules() : go("#org-start"))}
            >
              Открыть правила
            </button>
            <button className="cta-button" onClick={() => go("#org-start")}>
              Документы и материалы <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "formula",
      icon: <Target size={20} />,
      title: "Формула сезона",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {formula?.lead ||
              "Формула — связка целей, метрик, гипотез и ритма исполнения. Фокус только на том, что приближает к WIG/OKR."}
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
  ];

  return (
    <section id="about-program" className="section container about-program">
      <div className="section-header fade-in">
        <h2>О программе</h2>
        <p className="section-subtitle">
          Коротко о содержании сезона ULTIMA: как идём к результату и что потребуется от вас.
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
