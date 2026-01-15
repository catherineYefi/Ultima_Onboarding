import React from "react";
import { FileText, ExternalLink } from "lucide-react";

/**
 * Rules — тонкий триггер открытия подстраницы (overlay) "Правила Ultima-группы".
 *
 * Зачем такой компонент:
 * - Мы убрали старую секцию с аккордеоном, чтобы не было дублей.
 * - Если всё же понадобится точка входа со страницы — этот компонент безопасно покажет CTA.
 *
 * Пропсы:
 *  - content?: объект из content.js (необязателен; используем для текста-«паузы»)
 *  - onOpenRules?: () => void — открыть RulesOverlay
 *
 * Поведение по умолчанию:
 *  - Если onOpenRules нет, кнопка просто скроллит к #org-start.
 */
export default function Rules({ content, onOpenRules }) {
  const pause =
    content?.pauses?.beforeRules ||
    "Результат в ULTIMA строится не на мотивации, а на дисциплине и системе.";

  const open = () => {
    if (typeof onOpenRules === "function") {
      onOpenRules();
      return;
    }
    const el = document.getElementById("org-start");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Ничего критичного не ломаем: компактная секция-баннер с одной кнопкой
  return (
    <section id="rules" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Правила Ultima-группы</h2>
          <p className="section-subtitle">{pause}</p>
        </div>

        <div className="card info fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <FileText size={24} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                Полная версия правил доступна в подстранице
              </div>
              <div className="muted">
                Режим неизбежности, дисциплина, чек-листы и ответственность.
              </div>
            </div>
          </div>

          <button className="cta-button primary" onClick={open} aria-label="Открыть правила Ultima-группы">
            Открыть правила <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
