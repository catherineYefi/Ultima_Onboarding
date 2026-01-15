import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Brain,
  ListChecks,
  Info,
  ExternalLink,
  Copy,
  CheckCircle2,
  Download,
} from "lucide-react";

/**
 * AIMentorOverlay — подстраница-оверлей с полной инструкцией и ПОЛНЫМ промптом.
 * Поведение:
 *  - Блокирует скролл body, закрывается по ESC и по кнопке «крестик»
 *  - Ничего не обрезает: показывает весь промпт (прокрутка внутри overlay)
 *  - Кнопки: "Скопировать промпт", "Скачать .txt", "Подробная инструкция (Notion)"
 *
 * Пропсы:
 *  - onClose: () => void
 *  - content?: объект из content.js (необязателен; есть безопасные дефолты)
 */
export default function AIMentorOverlay({ onClose, content }) {
  const [copied, setCopied] = useState(false);

  // ссылки
  const links = content?.links || {};
  const aimGuideUrl =
    links?.aiMentorGuide?.url ||
    "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link";

  // полный промпт (без усечения)
  const aiPrompt = useMemo(() => {
    const full =
      (content && (content.aiMentorPrompt || content.aiNastavnikPrompt)) || "";
    return String(full).trim();
  }, [content]);

  // блокируем скролл body
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "unset";
    };
  }, []);

  // закрытие по ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // no-op
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([aiPrompt || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SS-NASTAVNIK_Ultima_prompt.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calendar-overlay ai-mentor-overlay">
      {/* HEADER */}
      <div className="calendar-overlay-header">
        <div className="container">
          <div className="overlay-header-content">
            <h2>
              <span className="section-icon" style={{ marginRight: 10 }}>
                <Brain size={28} />
              </span>
              AI-наставник: строгий трекер подготовки к Start-СС
            </h2>
            <p className="overlay-subtitle">
              Ведёт по 17 слайдам, проверяет качество на трёх уровнях и не пускает дальше, пока не идеально. В финале проверяет PDF и даёт вердикт.
            </p>
          </div>

          <div className="overlay-header-actions">
            <button
              className="overlay-close-btn"
              onClick={onClose}
              aria-label="Закрыть"
              title="Закрыть"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="calendar-overlay-body">
        <div className="container">
          {/* Вводный блок */}
          <section className="section-block fade-in">
            <div className="card info" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Info size={20} />
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>AI-наставник = твой персональный «строгий трекер» для подготовки к стратегической сессии.</strong>
                    <br />
                    Его задача — провести тебя по каждому из 17 слайдов, проверить качество на трёх уровнях и не пустить дальше, пока всё не идеально. В финале он проверит PDF-версию и даст вердикт: «ГОТОВО» или список правок.
                  </p>
                </div>
              </div>
            </div>

            <div className="card muted">
              <h3 style={{ marginTop: 0 }}>Как работать с AI-наставником (кратко)</h3>
              <ol className="final-list numbered" style={{ marginTop: 8 }}>
                <li>
                  <strong>Создай папку на Google Диске «СС – Ultima – 9 сезон».</strong> Сохрани туда: шаблон презентации (PDF, 17 слайдов), РНП, P&amp;L, ДДС, CRM-выгрузки, оргструктуру, фото, таблицы.
                </li>
                <li>
                  Открой ChatGPT → новый чат.
                </li>
                <li>
                  Вставь промпт <strong>«СС-НАСТАВНИК (Ultima)»</strong> (ниже).
                </li>
                <li>
                  <strong>Загрузи PDF-шаблон презентации (17 слайдов).</strong> Без этого AI не начнёт работу.
                </li>
                <li>
                  Сделай <strong>расширенный рассказ о бизнесе</strong> (лучше голосом, кусками 1.5–2 мин): ниша, продукты, команда, клиенты/сегменты, ключевые метрики, вызовы.
                </li>
                <li>
                  Дальше AI ведёт строго по порядку: объясняет смысл слайда, даёт чек-лист, просит документы и факты, проводит проверку L1/L2/L3 и не пускает дальше, пока не «Готово».
                </li>
                <li>
                  <strong>Финал:</strong> экспортируй презентацию в PDF и загрузи в чат — AI проверит полноту, согласованность, укажет дыры/риски, выдаст топ-5 правок и вердикт.
                </li>
              </ol>
            </div>
          </section>

          {/* CTA действия */}
          <section className="section-block fade-in" style={{ marginTop: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button className="cta-button secondary" onClick={copyPrompt}>
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copied ? "Скопировано" : "Скопировать промпт"}
              </button>

              <button className="cta-button secondary" onClick={downloadPrompt}>
                <Download size={18} />
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
            </div>
          </section>

          {/* ПОЛНЫЙ промпт */}
          <section className="section-block fade-in" style={{ marginTop: 12 }}>
            <h3>
              <ListChecks size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
              Промпт «СС-НАСТАВНИК (Ultima)»
            </h3>

            <div className="prompt-box expanded" style={{ maxHeight: "60vh", overflow: "auto" }}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {aiPrompt || "Промпт появится позже."}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
