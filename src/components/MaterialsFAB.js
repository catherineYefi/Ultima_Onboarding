import React, { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  ShieldCheck,
  Brain,
  Zap,
  Calendar as CalendarIcon,
  X,
  ExternalLink,
} from "lucide-react";

/**
 * Плавающая кнопка + сайдбар материалов.
 * - Открывается/закрывается по клику
 * - Быстрые ссылки: NDA, Правила (открывает попап), Booster, AI-инструкция (Notion), Презентация 9 сезона, Календарь
 * - Calendar автоматически дизейблится, если content.links.calendar.available === false
 */
export default function MaterialsFAB({ content }) {
  const links = content?.links || {};

  const [open, setOpen] = useState(false);

  // Закрываем по ESC
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  // Открыть попап правил через кастомное событие
  const openRulesPopup = () => {
    // Сообщим секции Rules открыть модалку
    window.dispatchEvent(new CustomEvent("openRules"));
    setOpen(false);
    // ещё и прокрутим к секции
    const el = document.getElementById("rules");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = [
    {
      key: "nda",
      title: "NDA",
      subtitle: "Соглашение о конфиденциальности",
      href: links?.nda?.url || "#",
      external: true,
      icon: <ShieldCheck size={18} />,
    },
    {
      key: "rules",
      title: "Правила Ultima",
      subtitle: "Регламент и дисциплина",
      onClick: openRulesPopup,
      icon: <FileText size={18} />,
    },
    {
      key: "booster",
      title: "Pre-Ultima Booster",
      subtitle: "Прояснение продукта и экономики",
      href: links?.booster?.url || "https://nkl6yv.csb.app/",
      external: true,
      icon: <Zap size={18} />,
    },
    {
      key: "ai-notion",
      title: "AI-наставник — инструкция",
      subtitle: "Полный гайд в Notion",
      href: "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link",
      external: true,
      icon: <Brain size={18} />,
    },
    {
      key: "org-presentation",
      title: "Презентация 9 сезона",
      subtitle: "Ориентиры и структура",
      href: "https://33wgq2.csb.app/",
      external: true,
      icon: <BookOpen size={18} />,
    },
    {
      key: "calendar",
      title: "Календарь Нечто",
      subtitle: links?.calendar?.available ? "Открыть" : "СКОРО БУДЕТ",
      href: links?.calendar?.available ? (links?.calendar?.url || "#calendar") : undefined,
      disabled: !links?.calendar?.available,
      icon: <CalendarIcon size={18} />,
    },
  ];

  return (
    <>
      {/* FAB */}
      <button
        className="fab"
        aria-label={open ? "Закрыть материалы" : "Открыть материалы"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <BookOpen size={22} />}
      </button>

      {/* Overlay */}
      {open && <div className="fab-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fab-sidebar ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="fab-header">
          <h3>Материалы</h3>
          <button aria-label="Закрыть" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="fab-list">
          {items.map((it) => {
            const Tag = it.href && !it.disabled ? "a" : "button";
            const commonProps =
              Tag === "a"
                ? {
                    href: it.href,
                    target: it.external ? "_blank" : undefined,
                    rel: it.external ? "noopener noreferrer" : undefined,
                    onClick: () => setOpen(false),
                  }
                : {
                    onClick: it.disabled
                      ? undefined
                      : it.onClick || (() => setOpen(false)),
                    disabled: !!it.disabled,
                  };

            return (
              <Tag
                key={it.key}
                className={`fab-item ${it.disabled ? "disabled" : ""}`}
                {...commonProps}
              >
                <div className="fi-left">{it.icon}</div>
                <div className="fi-center">
                  <div className="fi-title">{it.title}</div>
                  <div className="fi-subtitle">{it.subtitle}</div>
                </div>
                <div className="fi-right">
                  {it.external ? <ExternalLink size={16} /> : null}
                </div>
              </Tag>
            );
          })}
        </div>
      </aside>
    </>
  );
}
