// src/components/Onboarding.js
import React, { useMemo } from "react";
import {
  BookOpen,
  ListChecks,
  FileText,
  ExternalLink,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";

/**
 * Onboarding — секция онбординга с поддержкой:
 * - 📖 Глоссария терминов (если нет в content — выводим дефолт из ТЗ)
 * - Обновлённого чек-листа
 * - Гибкого рендера: items / stages / documents / text
 *
 * Где берём данные:
 *   const ob = content.sections.onboarding
 *   ob.sections: массив секций (introduction, roadmap, org-steps, prep-ss, cycle-analysis, declaration, season-work, tools, и т.д.)
 *   ob.glossary?: { terms: Array<{term, definition}> }  // НЕобязательно
 *   ob.checklist?: string[]                               // обновлено по ТЗ
 */

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="doc-card">
      <div className="ap-icon">
        <Info size={18} />
      </div>
      <h3>{title}</h3>
      {subtitle ? <p className="doc-subtitle">{subtitle}</p> : null}
      {children}
    </div>
  );
}

function ListDots({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="final-list dots">
      {items.map((it, i) => (
        <li key={i}>{String(it)}</li>
      ))}
    </ul>
  );
}

function StagesList({ stages }) {
  if (!Array.isArray(stages) || stages.length === 0) return null;
  return (
    <ol className="ap-steps">
      {stages.map((s, i) => (
        <li key={i}>
          <strong>{s?.title || `Шаг ${i + 1}`}</strong>
          {s?.description ? <div>{s.description}</div> : null}
        </li>
      ))}
    </ol>
  );
}

function DocumentsList({ documents }) {
  if (!Array.isArray(documents) || documents.length === 0) return null;
  return (
    <ul className="documents-list" style={{ marginTop: 8 }}>
      {documents.map((d, i) => (
        <li key={i} className="document-item">
          <FileText size={18} />
          <a
            href={d.link || d.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.title || "Документ"} <ExternalLink size={14} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Onboarding({ content }) {
  const ob = content?.sections?.onboarding ?? {};

  // ---------- ГЛОССАРИЙ ----------
  const glossary = useMemo(() => {
    // 1) Явный блок glossary, если есть (приоритетнее)
    if (Array.isArray(ob?.glossary?.terms) && ob.glossary.terms.length > 0) {
      return ob.glossary.terms;
    }

    // 2) Если в ob.sections уже есть секция с id === 'glossary', используем её terms
    const sGloss =
      Array.isArray(ob?.sections) &&
      ob.sections.find((s) => String(s?.id).toLowerCase() === "glossary");
    if (Array.isArray(sGloss?.content?.terms) && sGloss.content.terms.length > 0) {
      return sGloss.content.terms;
    }

    // 3) Дефолт из ТЗ
    return [
      {
        term: "ММ (Мастермайнд)",
        definition:
          "Встреча с топ-экспертами для обмена опытом и управленческих инсайтов. 3 ММ в год только для участников ULTIMA.",
      },
      {
        term: "WIG (Wildly Important Goal)",
        definition:
          "Сверхважная цель — ОДНА главная измеримая цель на 6 месяцев, на которой фокусируется вся работа.",
      },
      {
        term: "Lead/Lag метрики",
        definition:
          "Lag-метрика — итоговый результат (например, выручка). Lead-метрики — опережающие показатели, влияющие на результат (например, количество лидов).",
      },
      {
        term: "БИ (Бизнес-Инженер)",
        definition:
          "Специалист, который помогает собрать фактуру и цифры бизнеса на этапе подготовки к Start-СС. В течение сезона БИ не участвует.",
      },
      {
        term: "Ассистент группы",
        definition:
          "Протоколирует встречи, контролирует сроки и фиксирует решения в течение всего сезона.",
      },
      {
        term: "Бадди (Buddy)",
        definition:
          "Партнёр внутри группы для взаимной поддержки и ответственности. Созвоны — раз в 2 недели.",
      },
      {
        term: "Золотая задача",
        definition:
          "Действие по принципу Парето 80/20 — задача, которая движет WIG на 80% результата.",
      },
    ];
  }, [ob]);

  // ---------- СЕКЦИИ ОНБОРДИНГА ----------
  const sections = Array.isArray(ob?.sections) ? ob.sections : [];

  // Вставляем «виртуальную» секцию Glossary первой, если её нет
  const hasGlossarySection = sections.some(
    (s) => String(s?.id).toLowerCase() === "glossary"
  );

  const mergedSections = useMemo(() => {
    if (hasGlossarySection) return sections;
    return [
      {
        id: "glossary",
        title: "📖 Глоссарий терминов",
        subtitle: "Основные понятия ULTIMA",
        content: { terms: glossary },
      },
      ...sections,
    ];
  }, [sections, hasGlossarySection, glossary]);

  // ---------- ЧЕК-ЛИСТ ----------
  const checklist =
    Array.isArray(ob?.checklist) && ob.checklist.length > 0
      ? ob.checklist
      : [
          "Подписал NDA",
          "Вступил в чаты группы",
          "Узнал про роль buddy (назначение на первой встрече)",
          "Записал видео-визитку о бизнесе (2–3 минуты)",
          'Заполнил "Точку А и Б"',
          "Подготовил презентацию для Start-СС",
          "Составил черновик декларации WIG",
          "Определил первую золотую задачу",
        ];

  return (
    <section id="onboarding" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>📚 Онбординг</h2>
          <p className="section-subtitle">
            Быстрый старт: глоссарий, дорожная карта, документы и чек-лист
          </p>
        </div>

        {/* Грид карточек секций онбординга */}
        <div className="cards-grid fade-in">
          {mergedSections.map((sec, idx) => {
            const c = sec?.content || {};
            const terms = Array.isArray(c?.terms) ? c.terms : null;
            const items = Array.isArray(c?.items) ? c.items : null;
            const stages = Array.isArray(c?.stages) ? c.stages : null;
            const documents = Array.isArray(c?.documents) ? c.documents : null;
            const text = c?.text;

            return (
              <SectionCard
                key={sec?.id || idx}
                title={sec?.title || `Раздел ${idx + 1}`}
                subtitle={sec?.subtitle}
              >
                {/* glossary terms */}
                {Array.isArray(terms) && terms.length > 0 && (
                  <div>
                    <ul className="final-list dots">
                      {terms.map((t, i) => (
                        <li key={i}>
                          <strong>{t.term}:</strong> {t.definition}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* plain text */}
                {text ? <p style={{ marginTop: 8 }}>{text}</p> : null}

                {/* bullets */}
                <ListDots items={items} />

                {/* stages */}
                <StagesList stages={stages} />

                {/* documents */}
                <DocumentsList documents={documents} />

                {/* небольшой CTA внутрь карточек, если это «Введение» */}
                {String(sec?.id).toLowerCase() === "introduction" && (
                  <button
                    className="cta-button secondary"
                    onClick={() => {
                      const el = document.getElementById("org-start");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{ marginTop: 10 }}
                  >
                    Перейти к документам <ArrowRight size={16} />
                  </button>
                )}
              </SectionCard>
            );
          })}
        </div>

        {/* Общий чек-лист онбординга */}
        <div className="section-block fade-in" style={{ marginTop: 18 }}>
          <h3 className="block-title">
            <ListChecks size={20} /> Чек-лист онбординга
          </h3>
          <ListDots items={checklist} />
          <div className="muted" style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={16} />
            <span>
              Совет: начните с{" "}
              <a
                href="#org-start"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("org-start");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-link"
              >
                организационного старта
              </a>{" "}
              и параллельно подключите AI-наставника для подготовки к Start-СС.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
