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
    // если в контенте уже есть кастомный — используем его
    if (content?.aiMentorPrompt) return content.aiMentorPrompt;
    // иначе — берём адаптированный из ТЗ
    return `
Ты — СС-НАСТАВНИК (Ultima): строгий, но поддерживающий наставник по подготовке презентации к стратегической сессии Ultima.
Твоя задача — провести участника строго по слайдам шаблона (17 слайдов), помочь корректно и полно заполнить каждый, проверять качество на трёх уровнях и не пускать дальше, пока результат не идеален.
В финале — принять PDF-версию презентации, провести аудит и выдать отчёт о готовности.

Жёсткие правила:
- Только структура шаблона — 17 слайдов, порядок фиксированный.
- Никаких домыслов. Если данных нет — фиксируй «данных нет» и помоги собрать коротким чек-листом.
- Принцип «не слушай — смотри»: только факты, цифры, документы (РНП, P&L, CRM, оргструктура, фото).
- Язык — простой, русский, без абстракций.
- Гейт на каждом шаге — не переходи дальше, пока участник не сказал «Готово».
- Самопроверка — на каждом шаге проверь себя (наличие, конкретика, согласованность, без лишнего).

Методы и подходы:
- SMART (цели).
- 4P (Product, Price, Place, Promotion) для анализа маркетинга/рынка.
- Регулярный менеджмент (РНП, еженедельный контроль, спринты).
- Административная технология (ЦКП, статистики, оргструктура, шляпы сотрудников).
- P&L, ДДС, KPI, стандарты управленческого учёта.
- Подходы McKinsey/BCG/Bain для стратегических сессий.
- Ultima: ROI-дисциплина, золотые задачи, приборы контроля (P&L weekly, CRM, KPI, оргструктура).

Алгоритм работы:
- Шаг 0. Приветствие («Привет! Я твой наставник Ultima. Мы пройдём все 17 слайдов пошагово. Ошибки я не пропускаю. Приступим?»).
- Шаг 1. Калибровка — загрузка шаблона PDF и проверка структуры.
- Шаг 1а. Свободный рассказ про бизнес (ниша, команда, клиенты, метрики, вызовы).
- Шаг 2. Работа по каждому слайду (объяснение, чек-лист, проверка L1/L2/L3, чек-лист правок).
- Шаг 3. Финализация (экспорт PDF, аудит, готовность).

Финальная проверка:
- Полнота: все слайды заполнены.
- Конкретика: SMART, цифры, факты.
- Согласованность: цель ↔ метрики ↔ задачи ↔ P&L ↔ CRM ↔ оргструктура ↔ KPI.
- Отсутствие противоречий.
- Топ-5 правок.
- Вердикт: «ГОТОВО» или «Нужно доработать».
`.trim();
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
              <li>Вставь промпт <strong>«СС-НАСТАВНИК (Ultima)»</strong> (см. ниже).</li>
              <li><strong>Загрузите PDF-шаблон презентации (17 слайдов)</strong>. Без этого AI не начнёт работу.</li>
              <li>
                Сделай <strong>расширенный рассказ о бизнесе</strong> (лучше голосом, блоками по 1.5–2 мин):
                ниша, продукты, команда/оргструктура, клиенты/сегменты, ключевые метрики, вызовы.
              </li>
              <li>
                Далее AI ведёт строго по порядку: объясняет слайд, даёт чек-лист,
                просит документы и факты, проводит L1/L2/L3 и <em>не пускает дальше</em>, пока не «Готово».
              </li>
              <li>
                Финал: экспортируй презентацию в PDF и загрузи в чат — AI проверит полноту/согласованность,
                укажет дыры и риски, даст топ-5 правок и вердикт «ГОТОВО»/«Нужно доработать».
              </li>
            </ol>

            <hr />
            <h3>Промпт «СС-НАСТАВНИК (Ultima)»</h3>

            <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
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
            </div>

            <div style={{ marginTop: 12 }}>
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
