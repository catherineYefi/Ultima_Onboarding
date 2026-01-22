import React, { useEffect } from "react";
import { X, ExternalLink, Copy, Download } from "lucide-react";

/**
 * Оверлей "AI-наставник"
 * - Полная инструкция (из ТЗ)
 * - Полный промпт (берём из content.aiMentorPrompt или aiNastavnikPrompt)
 * - Кнопка на Notion
 */
const NOTION_GUIDE =
  "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link";

export default function AIMentorOverlay({ content, promptText, onClose }) {
  const prompt = String(promptText || content?.aiMentorPrompt || content?.aiNastavnikPrompt || "");

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt || "");
      alert("Промпт скопирован в буфер обмена");
    } catch (e) {
      alert("Не удалось скопировать промпт");
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "СС-НАСТАВНИК_Ultima_v3.0.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overlay-root">
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="overlay-panel">
        <div className="overlay-header">
          <h2>AI-наставник — строгий трекер подготовки к Start-СС</h2>
          <button className="overlay-close-btn" onClick={onClose} aria-label="Закрыть">
            <X size={24} />
          </button>
        </div>

        <div className="overlay-body">
          <p>
            <strong>AI-наставник = твой персональный «строгий трекер» для подготовки к стратегической сессии.</strong>
            Его задача — провести тебя по каждому из 20 слайдов, проверить качество на трёх уровнях и не пустить дальше,
            пока всё не идеально. В финале он проверит PDF-версию и даст вердикт: «ГОТОВО» или список правок.
          </p>

          <h3>Пошаговая инструкция</h3>
          <ol className="ordered">
            <li>
              Создай папку на Google Диске «СС – Ultima – 9 сезон». Сохрани туда: шаблон презентации, РНП, P&L, ДДС,
              CRM-выгрузки, оргструктуру, фото, таблицы.
            </li>
            <li>Открой ChatGPT → новый чат.</li>
            <li>Вставь промпт «СС-НАСТАВНИК (Ultima)» (ниже).</li>
            <li>Загрузите PDF-шаблон презентации (17 слайдов). Без этого AI не начнёт работу.</li>
            <li>
              Сделай расширенный рассказ о бизнесе:
              <ul className="final-list dots" style={{ marginTop: 6 }}>
                <li>что за бизнес, ниша, продукты,</li>
                <li>команда и оргструктура,</li>
                <li>клиенты и сегменты,</li>
                <li>ключевые метрики (выручка, маржа, клиенты, сделки),</li>
                <li>вызовы и проблемы.</li>
              </ul>
              <span className="muted">👉 лучше надиктовать голосом (короткими кусками по 1.5–2 минуты).</span>
            </li>
            <li>
              Дальше AI ведёт строго по порядку:
              <ul className="final-list dots" style={{ marginTop: 6 }}>
                <li>объясняет, зачем нужен слайд,</li>
                <li>даёт чек-лист «что внести»,</li>
                <li>просит документы и факты,</li>
                <li>проводит проверку L1/L2/L3,</li>
                <li>не пускает дальше, пока не «Готово».</li>
              </ul>
            </li>
            <li>
              Финал: экспортируй презентацию в PDF и загрузи в чат.
              <ul className="final-list dots" style={{ marginTop: 6 }}>
                <li>AI проверит полноту, согласованность, укажет дыры и риски,</li>
                <li>выдаст топ-5 правок,</li>
                <li>скажет «ГОТОВО» или «Нужно доработать».</li>
              </ul>
            </li>
          </ol>

          <div className="cta-row" style={{ display: "flex", gap: 8, margin: "12px 0 6px" }}>
            <a
              className="cta-button primary"
              href={NOTION_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Полная инструкция в Notion <ExternalLink size={16} />
            </a>
            <button className="cta-button secondary" onClick={copyPrompt}>
              <Copy size={16} /> Скопировать промпт
            </button>
            <button className="cta-button secondary" onClick={downloadPrompt}>
              <Download size={16} /> Скачать .txt
            </button>
          </div>

          <h3>Промпт «СС-НАСТАВНИК (Ultima)»</h3>
          <pre className="prompt-pre">{prompt || "Промпт будет добавлен позже."}</pre>
        </div>
      </div>
    </div>
  );
}
