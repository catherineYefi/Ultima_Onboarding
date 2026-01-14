import React, { useEffect, useMemo, useState } from "react";
import { X, Brain, ExternalLink, Copy, Check, Download } from "lucide-react";

export default function AIMentorOverlay({ content }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openAIMentor", handler);
    return () => window.removeEventListener("openAIMentor", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  const prompt = useMemo(() => {
    if (content?.aiMentorPrompt) return content.aiMentorPrompt;
    return "";
  }, [content]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "СС-НАСТАВНИК_Ultima.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div className="calendar-overlay">
      <div className="calendar-overlay-header">
        <div className="container">
          <div className="overlay-header-content">
            <h2><Brain size={22} /> AI-наставник (подробная инструкция)</h2>
            <p className="overlay-subtitle">
              Персональный «строгий трекер» для подготовки к стратегической сессии
            </p>
          </div>
          <div className="overlay-header-actions">
            <a
              href="https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link"
              target="_blank" rel="noopener noreferrer"
              className="cta-button secondary"
            >
              Открыть гайд в Notion <ExternalLink size={16} />
            </a>
            <button className="overlay-close-btn" onClick={() => setOpen(false)} aria-label="Закрыть">
              <X size={28} />
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-overlay-body">
        <div className="container">
          <div className="card">
            <h3>Как пользоваться</h3>
            <ol>
              <li>
                Создай папку на Google Диске «СС – Ultima – 8 сезон».
                Сохрани туда: шаблон презентации, РНП, P&L, ДДС, CRM-выгрузки, оргструктуру, фото, таблицы.
              </li>
              <li>Открой ChatGPT → новый чат.</li>
              <li>Вставь промпт <strong>«СС-НАСТАВНИК (Ultima)»</strong> (ниже).</li>
              <li><strong>Загрузите PDF-шаблон презентации (17 слайдов)</strong>. Без этого AI не начнёт работу.</li>
              <li>
                Расскажи о бизнесе (лучше голосом, блоками по 1.5–2 мин): ниша, продукты, команда, клиенты, метрики, вызовы.
              </li>
              <li>
                Далее AI ведёт по порядку: объяснение слайда, чек-лист, запрос фактов и документов, проверка L1/L2/L3, гейт «Готово».
              </li>
              <li>
                Финал: экспорт в PDF → загрузка → аудит → топ-5 правок → вердикт «ГОТОВО/Нужно доработать».
              </li>
            </ol>

            <hr />
            <h3>Полный промпт</h3>

            {/* Скроллируемая зона без обрезки */}
            <div
              className="card"
              style={{
                background: "rgba(255,255,255,0.04)",
                maxHeight: "60vh",
                overflow: "auto",
                padding: 12,
              }}
            >
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{prompt}</pre>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="cta-button secondary" onClick={copyPrompt}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Скопировано" : "Скопировать промпт"}
              </button>
              <button className="cta-button secondary" onClick={downloadPrompt}>
                <Download size={18} /> Скачать .txt
              </button>
              <a
                href="https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link"
                target="_blank" rel="noopener noreferrer"
                className="cta-button primary"
              >
                Подробная инструкция в Notion <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
