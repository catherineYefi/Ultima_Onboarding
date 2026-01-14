import React from "react";
import { ArrowRight, Brain, Calendar as CalendarIcon, FileText, ShieldCheck, ExternalLink } from "lucide-react";

/**
 * FooterCTA — закрывающий блок с призывом к действию
 * - 3 основные CTA: "Перейти к подготовке", "Календарь", "Документы"
 * - Быстрые ссылки: Rules (попап в секции #rules), NDA, Org Presentation
 * - Использует content.links.*, но имеет дефолты чтобы не падать
 */
export default function FooterCTA({ content, scrollToSection, setActiveTab }) {
  const links = content?.links || {};

  const go = (hrefOrId) => {
    if (!hrefOrId) return;
    if (hrefOrId.startsWith("#")) {
      const id = hrefOrId.slice(1);
      scrollToSection?.(id);
    } else {
      window.open(hrefOrId, "_blank", "noopener,noreferrer");
    }
  };

  const openPrep = () => {
    // Перейти к разделу подготовки и сразу подсветить вкладку BI-встреч (если передан сеттер)
    setActiveTab?.("bi-meetings");
    go("#prep-ss");
  };

  const calendarLabel = links?.calendar?.available ? "Календарь" : (links?.calendar?.label || "СКОРО БУДЕТ");

  return (
    <footer id="footer-cta" className="section footer-cta">
      <div className="container">
        <div className="footer-cta-inner fade-in">
          <h2 className="footer-title">Готовы к сильному сезону ULTIMA 9.0?</h2>
          <p className="footer-subtitle">
            Соберите подготовку, синхронизируйте ритм и приходите на Start-СС полностью вооружёнными.
          </p>

          {/* Основные действия */}
          <div className="footer-actions">
            <button className="cta-button primary" onClick={openPrep} aria-label="Перейти к подготовке">
              <Brain size={20} /> Перейти к подготовке <ArrowRight size={18} />
            </button>

            <button
              className={`cta-button ${links?.calendar?.available ? "secondary" : "disabled"}`}
              onClick={() => go("#calendar")}
              disabled={!links?.calendar?.available}
              aria-label={calendarLabel}
            >
              <CalendarIcon size={20} /> {calendarLabel}
            </button>

            <button className="cta-button secondary" onClick={() => go("#org-start")} aria-label="Документы">
              <FileText size={20} /> Документы
            </button>
          </div>

          {/* Быстрые ссылки */}
          <div className="footer-quicklinks">
            <a href="#rules" className="quicklink">
              <FileText size={16} /> Правила Ultima
            </a>

            <a
              href={links?.nda?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="quicklink"
            >
              <ShieldCheck size={16} /> NDA <ExternalLink size={14} />
            </a>

            <a
              href="https://33wgq2.csb.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="quicklink"
            >
              <FileText size={16} /> Презентация 9 сезона <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
