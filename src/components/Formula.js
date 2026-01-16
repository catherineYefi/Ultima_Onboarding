import React from "react";
import {
  Target,
  Users,
  UserCheck,
  ClipboardList,
  Gauge,
  BarChart2,
  FileText,
  Building2,
  ArrowRight,
} from "lucide-react";

/**
 * Формула неизбежности результата
 * Трекер + Лидер + Группа (8 чел) + Ассистент + Приборы контроля
 */
export default function Formula({ id = "formula", content }) {
  const f = content?.sections?.formula ?? {};

  const title = f?.title ?? "Формула неизбежности результата";
  const subtitle =
    f?.subtitle ??
    "Трекер + Лидер + Группа (8 человек) + Ассистент → рост по приборам (P&L weekly, CRM, KPI, оргструктура)";

  // ПРАВИЛЬНАЯ ФОРМУЛА (из методологии)
  const formulaComponents = [
    {
      icon: Target,
      title: "Трекер",
      description:
        "Действующий предприниматель-практик с большим опытом. Управляет процессом, фокусирует на WIG, видит препятствия, помогает принимать решения.",
      cta: { label: "Смотреть ритм встреч", href: "#main-cycle" },
    },
    {
      icon: UserCheck,
      title: "Лидер группы",
      description:
        "Участник программы, который берёт на себя роль модератора встреч. Держит командный дух, организует ритм, следит за временем.",
      cta: { label: "Стартовая СС офлайн", href: "#ss-offline" },
    },
    {
      icon: Users,
      title: "Группа из 8 предпринимателей",
      description:
        "Адвайзери-борд друг для друга. Дают обратную связь, делятся опытом, поддерживают, помогают видеть слепые зоны.",
      cta: { label: "О правилах группы", href: "#rules" },
    },
    {
      icon: ClipboardList,
      title: "Ассистент группы",
      description:
        "Протоколирует встречи, контролирует сроки, ведёт дашборд группы, напоминает о дедлайнах, обеспечивает структуру.",
      cta: null,
    },
  ];

  // Приборы контроля (дополнение к формуле)
  const instruments = [
    {
      icon: BarChart2,
      name: "P&L weekly",
      desc: "Недельный отчёт по финансам: выручка, маржа, расходы.",
    },
    {
      icon: Gauge,
      name: "CRM воронка",
      desc: "Конверсии, сделки, темп заполнения и завершения.",
    },
    {
      icon: FileText,
      name: "KPI",
      desc: "Лидовые, продуктовые и операционные показатели.",
    },
    {
      icon: Building2,
      name: "Оргструктура",
      desc: "Роли, зоны ответственности, «шляпы» и ЦКП.",
    },
  ];

  const go = (href) => {
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* ФОРМУЛА ULTIMA (4 элемента) */}
        <div className="formula-section">
          <h3 className="formula-section-title">4 элемента формулы</h3>
          <div className="formula-components-grid">
            {formulaComponents.map((component, idx) => {
              const IconComponent = component.icon;
              return (
                <div key={idx} className="formula-component-card">
                  <div className="formula-component-icon">
                    <IconComponent size={28} />
                  </div>
                  <h4 className="formula-component-title">{component.title}</h4>
                  <p className="formula-component-description">
                    {component.description}
                  </p>
                  {component.cta && (
                    <button
                      className="formula-cta-button"
                      onClick={() => go(component.cta.href)}
                    >
                      {component.cta.label}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ПРИБОРЫ КОНТРОЛЯ */}
        <div className="instruments-section">
          <h3 className="formula-section-title">
            <Gauge size={24} /> Приборы контроля
          </h3>
          <p className="instruments-lead">
            Управление по данным, а не по ощущениям. Еженедельное обновление приборов
            обязательно.
          </p>
          <div className="instruments-grid">
            {instruments.map((instrument, idx) => {
              const IconComponent = instrument.icon;
              return (
                <div key={idx} className="instrument-card">
                  <div className="instrument-icon">
                    <IconComponent size={20} />
                  </div>
                  <div className="instrument-content">
                    <h5 className="instrument-name">{instrument.name}</h5>
                    <p className="instrument-desc">{instrument.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="formula-final-cta">
          <button className="cta-button primary" onClick={() => go("#main-cycle")}>
            Посмотреть ритм работы <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}