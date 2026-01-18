import React, { useState, useEffect } from "react";
import rawContent from "./content";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Glossary from "./components/Glossary";
import Intro from "./components/Intro";
import Roadmap from "./components/Roadmap";
import Checklist from "./components/Checklist";
import Onboarding from "./components/Onboarding";
import AboutUltima from "./components/AboutUltima";
import CycleTimeline from "./components/CycleTimeline";
import Documents from "./components/Documents";
import Rules from "./components/Rules";
import Formula from "./components/Formula";
import PrepToSS from "./components/PrepToSS";
import StartCC from "./components/StartCC";
import MainCycle from "./components/MainCycle";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import CalendarSection from "./components/CalendarSection";

// СТИЛИ: Единый объединённый CSS файл (Phase 2 - Unified)
import "./styles-unified.css";

// --- безопасная нормализация контента (как у нас было ранее) ---
function normalizeContent(raw) {
  const safe = (v, fb) => (v === undefined || v === null ? fb : v);

  const documents =
    raw?.sections?.about?.documents && Array.isArray(raw.sections.about.documents)
      ? raw.sections.about.documents
      : [];

  const findDoc = (re) =>
    documents.find((d) => re.test((d?.title || "") + (d?.name || "")));

  const links = {
    nda: {
      available: !!findDoc(/nda/i),
      url: safe(findDoc(/nda/i)?.link, "#"),
      label: "Скоро",
    },
    rules: {
      available: !!findDoc(/правил|регламент/i),
      url: safe(findDoc(/правил|регламент/i)?.link, "#"),
      label: "Скоро",
    },
    calendar: {
      available: true,
      url: "#calendar",
      label: "Откроется позже",
    },
    booster: {
      url: "#prep-ss",
    },
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
        "Пройди шаги подготовки перед Start-СС: встречи с БИ, материалы, чек-листы.",
      cta: { text: "Перейти к шагам" },
    },
    why:
      prepFrom?.why ||
      "Качество СС определяется не днём работы, а подготовкой к ней.",
    readinessChecklists: readiness,
    ...(raw?.sections?.prepSS || {}),
  };

  const startCC = {
    ...(raw?.sections?.startCC || {}),
    format:
      raw?.sections?.startCC?.format || "2 дня офлайн (Start-СС: день 1 и день 2)",
    results:
      Array.isArray(raw?.sections?.startCC?.results) &&
      raw.sections.startCC.results.length > 0
        ? raw.sections.startCC.results
        : [
            "Определены WIG/OKR",
            "Настроены приборы контроля",
            "Собрана дорожная карта на 6 месяцев",
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

  const mainCycle = {
    ...(raw?.sections?.mainCycle || {}),
    rhythm: rhythmArray,
  };

  return {
    ...raw,
    links,
    aiMentorPrompt:
      raw?.aiMentorPrompt ||
      `Я — AI-наставник ULTIMA. Помоги мне подготовиться к Start-СС: 
— собери P&L за 3 месяца, 
— выпиши ключевые метрики, 
— зафиксируй WIG/OKR и приборы контроля.`,
    sections: {
      ...(raw?.sections || {}),
      prepSS,
      startCC,
      mainCycle,
    },
  };
}

export default function App() {
  const content = normalizeContent(rawContent);

  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({});
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [promptExpanded, setPromptExpanded] = useState(false);

  // Все секции для отслеживания
  const sectionIds = [
    "hero", "glossary", "intro", "roadmap", "checklist", "prep-ss",
    "about", "rhythm", "roles",
    "documents-nda", "documents-calendar",
  ];

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero";
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Если секция в верхней части viewport (с офсетом для navbar)
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);

      // Обновление прогресса
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(Math.round(scrollPercent), 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Вызов один раз при загрузке

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Плавный скролл к секции
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    a.download = "AI-наставник-ULTIMA-9.0.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app premium">
      {/* Navbar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} progress={progress} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Main Content */}
      <div className="main-content">
        <Hero id="hero" content={content} scrollToSection={scrollToSection} />
        <Glossary id="glossary" />
        <Intro id="intro" />
        <Roadmap id="roadmap" />
        <Checklist id="checklist" />
        <Onboarding id="onboarding" content={content} />
        <AboutUltima id="about" content={content} />
        <CycleTimeline id="rhythm" content={content} />
        <Documents id="documents-nda" content={content} />
        <Rules id="rules" content={content} />
        <Formula id="formula" content={content} />
        <PrepToSS
          id="prep-ss"
          content={content}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          promptExpanded={promptExpanded}
          setPromptExpanded={setPromptExpanded}
          copiedPrompt={copiedPrompt}
          copyPrompt={copyPrompt}
          downloadPrompt={downloadPrompt}
        />
        <StartCC id="start-cc" content={content} />
        <MainCycle id="main-cycle" content={content} />
        <Final id="final" content={content} scrollToSection={scrollToSection} />
        <FooterCTA id="footer" content={content} scrollToSection={scrollToSection} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}