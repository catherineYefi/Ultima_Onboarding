import React, { useState, useEffect } from "react";
import rawContent from "./content";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUltima from "./components/AboutUltima";
import AboutProgram from "./components/AboutProgram";
import CycleTimeline from "./components/CycleTimeline";
import Documents from "./components/Documents";
import Formula from "./components/Formula";
import PrepToSS from "./components/PrepToSS";
import SSOffline from "./components/SSOffline";
import MainCycle from "./components/MainCycle";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import CalendarSection from "./components/CalendarSection";
import MaterialsFAB from "./components/MaterialsFAB";

import RulesOverlay from "./components/RulesOverlay";
import AIMentorOverlay from "./components/AIMentorOverlay";

import "./styles.css";

/** ---------- НОРМАЛИЗАЦИЯ КОНТЕНТА ---------- */
function normalizeContent(raw) {
  const links = {
    nda: {
      available: true,
      url:
        raw?.links?.nda?.url ||
        "https://drive.google.com/file/d/1s2I-HdtHI4TP1KS2yEEKaWYt7CMaGRgx/view?usp=drive_link",
      label: "Открыть NDA",
    },
    rules: { available: true, url: "#rules", label: "Открыть правила" },
    calendar: { available: false, url: "#calendar", label: "СКОРО БУДЕТ" },
    booster: { url: "https://nkl6yv.csb.app/" },
    ...(raw.links || {}),
  };

  const prepFrom = raw?.sections?.prepSS || raw?.sections?.prepToSS || {};
  const readiness =
    prepFrom?.readinessChecklists ||
    (Array.isArray(prepFrom?.phases)
      ? prepFrom.phases.map((p, i) => ({
          id: `phase-${i}`,
          title: p?.name || `Шаг ${i + 1}`,
          items: Array.isArray(p?.deliverables) ? p.deliverables : [],
        }))
      : []);

  const prepSS = {
    nextStep: {
      title: prepFrom?.title || "Подготовка к стратегической сессии",
      description:
        prepFrom?.note ||
        "Пройди шаги подготовки перед Start-СС: встречи, материалы, чек-листы.",
      cta: { text: "Перейти к шагам" },
    },
    why:
      prepFrom?.why ||
      "Качество СС определяется не днём работы, а подготовкой к ней.",
    readinessChecklists: readiness,
    ...(raw?.sections?.prepSS || {}),
  };

  const ssOffline = {
    ...(raw?.sections?.ssOffline || {}),
    format: raw?.sections?.ssOffline?.format || "2 дня офлайн",
    results:
      Array.isArray(raw?.sections?.ssOffline?.results) &&
      raw.sections.ssOffline.results.length > 0
        ? raw.sections.ssOffline.results
        : [
            "Определены WIG/OKR",
            "Настроены приборы контроля",
            "Собрана дорожная карта на 12 недель",
          ],
  };

  const rhythmRaw = raw?.sections?.mainCycle?.rhythm;
  const rhythmArray = Array.isArray(rhythmRaw)
    ? rhythmRaw
    : Array.isArray(rhythmRaw?.meetings)
    ? rhythmRaw.meetings.map((m) => ({
        title: `${m?.week || ""} — ${m?.format || ""}`.trim(),
        description: m?.focus || "",
      }))
    : [];

  const mainCycle = { ...(raw?.sections?.mainCycle || {}), rhythm: rhythmArray };

  // ТВОЙ ПОЛНЫЙ ПРОМПТ (дефолт, если в content нет своего)
  const ultimatePrompt = `
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
- Методы регулярного менеджмента (РНП, еженедельный контроль, спринты).
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

  return {
    ...raw,
    links,
    aiMentorPrompt: raw?.aiMentorPrompt || ultimatePrompt,
    sections: { ...(raw?.sections || {}), prepSS, ssOffline, mainCycle },
  };
}

export default function App() {
  const content = normalizeContent(rawContent);

  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({});
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [promptExpanded, setPromptExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      setActiveSection("hero");
      return;
    }
    const observers = (content.navItems || []).map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(item.id),
        { threshold: 0.3 }
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [content]);

  const scrollToSection = (sectionId) => {
    const el = typeof document !== "undefined" && document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAccordion = (idx) =>
    setOpenAccordions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const copyPrompt = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content.aiMentorPrompt);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([content.aiMentorPrompt || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "СС-НАСТАВНИК_Ultima.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        content={content}
        scrollProgress={scrollProgress}
      />

      <Hero content={content} scrollToSection={scrollToSection} />
      <AboutUltima content={content} />
      <AboutProgram content={content} scrollToSection={scrollToSection} />

      <CalendarSection />
      <CycleTimeline content={content} />
      <Documents content={content} />
      <Formula content={content} />

      <PrepToSS
        content={content}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        promptExpanded={promptExpanded}
        setPromptExpanded={setPromptExpanded}
        copiedPrompt={copiedPrompt}
        copyPrompt={copyPrompt}
        downloadPrompt={downloadPrompt}
      />

      <SSOffline content={content} />
      <MainCycle content={content} />
      <Final content={content} />

      <FooterCTA content={content} scrollToSection={scrollToSection} setActiveTab={setActiveTab} />

      <RulesOverlay />
      <AIMentorOverlay content={content} />

      <MaterialsFAB content={content} />
    </div>
  );
}
