import React, { useState } from "react";
import {
  Info,
  Target,
  LineChart,
  ListChecks,
  FileText,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

/**
 * AboutProgram — премиум-версия с карточками вместо аккордеонов
 * Визуально красиво и современно, легче читается
 */
export default function AboutProgram({ content, scrollToSection }) {
  const about = content?.sections?.about ?? {};
  const ssOffline = content?.sections?.ssOffline ?? {};
  const mainCycle = content?.sections?.mainCycle ?? {};
  const finalSec = content?.sections?.final ?? {};
  const formula = content?.sections?.formula ?? {};

  const [selectedId, setSelectedId] = useState("about");

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
      icon: <Info size={24} />,
      title: "Что такое ULTIMA?",
      color: "primary",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {about?.lead ??
              "ULTIMA — управляемый сезон стратегической работы над ростом бизнеса: цели, метрики, дисциплина исполнения."}
          </p>
          <ul className="ap-list">
            <li>Результат: WIG/OKR, дорожная карта, приборы контроля</li>
            <li>Управление: недельный ритм, дедлайны, отчётность</li>
            <li>Команда: группа предпринимателей, трекеры и ассистент</li>
          </ul>
        </div>
      ),
    },
    {
      id: "cycle",
      icon: <LineChart size={24} />,
      title: "Цикл сезона",
      color: "accent",
      body: (
        <div className="ap-body">
          <ul className="ap-list">
            <li>
              <strong>Start-СС:</strong> {ssOffline?.format || "2 дня офлайн"}
            </li>
            <li>
              <strong>Главный цикл:</strong> {mainCycle?.lead || "6 месяцев с еженедельными спринтами"}
            </li>
            <li>
              <strong>Выпускной:</strong> {finalSec?.lead || "Презентация результата"}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "roadmap",
      icon: <Target size={24} />,
      title: "Дорожная карта",
      color: "primary",
      body: (
        <div className="ap-body">
          <ol className="ap-steps">
            <li><strong>Start-СС:</strong> Определение целей и метрик</li>
            <li><strong>Главный цикл:</strong> Еженедельные спринты и контроль</li>
            <li><strong>Выпускной:</strong> Презентация и план на 90 дней</li>
          </ol>
        </div>
      ),
    },
    {
      id: "rules",
      icon: <FileText size={24} />,
      title: "Правила группы",
      color: "accent",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            Режим неизбежности, фокус на ROI и прозрачность.
          </p>
          <ul className="ap-list">
            <li><strong>Дисциплина:</strong> Посещаемость и дедлайны</li>
            <li><strong>Коммуникации:</strong> Ответ ≤ 12 часов</li>
            <li><strong>Цена слова:</strong> Фиксированная ответственность</li>
          </ul>
        </div>
      ),
    },
    {
      id: "formula",
      icon: <ListChecks size={24} />,
      title: "Формула сезона",
      color: "primary",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            {formula?.lead ||
              "Связь целей, метрик, гипотез и ритма исполнения."}
          </p>
          <ul className="ap-list">
            <li>Цели (WIG/OKR) → ключевые драйверы</li>
            <li>Метрики → приборы контроля</li>
            <li>Гипотезы → спринты и коррекции</li>
          </ul>
        </div>
      ),
    },
    {
      id: "final",
      icon: <GraduationCap size={24} />,
      title: "Выпускной",
      color: "accent",
      body: (
        <div className="ap-body">
          <p className="ap-lead">
            Краткий питч, подтверждённые цифры, ясные следующие шаги.
          </p>
          <ul className="ap-list">
            <li>PDF-презентация результата</li>
            <li>Дашборд метрик и P&L за сезон</li>
            <li>План на 90 дней</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="about-program" className="section container about-program">
      <div className="section-header">
        <h2>О программе</h2>
        <p className="section-subtitle">
          Структура ULTIMA: как мы идём к результату и что нужно от вас
        </p>
      </div>

      <div className="ap-cards-grid">
        {items.map((it) => {
          const isSelected = selectedId === it.id;
          return (
            <div 
              key={it.id} 
              className={`ap-card ap-card-${it.color} ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedId(isSelected ? '' : it.id)}
            >
              <div className="ap-card-header">
                <div className="ap-card-icon">{it.icon}</div>
                <h3 className="ap-card-title">{it.title}</h3>
              </div>
              
              {isSelected && (
                <div className="ap-card-body">
                  {it.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
