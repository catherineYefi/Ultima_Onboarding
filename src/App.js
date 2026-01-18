import React, { useState, useEffect } from "react";
import rawContent from "./content";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Glossary from "./components/Glossary";
import Roadmap from "./components/Roadmap";
import Checklist from "./components/Checklist";
import AboutUltima from "./components/AboutUltima";
import Documents from "./components/Documents";
import Rules from "./components/Rules";
import PrepToSS from "./components/PrepToSS";
import StartCC from "./components/StartCC";
import MainCycle from "./components/MainCycle";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import OrganizationalSteps from "./components/OrganizationalSteps";
import MeetingCycle from "./components/MeetingCycle";
import Roles from "./components/Roles";
import WIGDeclaration from "./components/WIGDeclaration";
import ControlPanel from "./components/ControlPanel";
import ToolsHub from "./components/ToolsHub";

// Calendar overlay (твоя версия)
import CalendarOverlay from "./components/CalendarOverlay";

import "./styles-unified.css";

// --- безопасная нормализация контента (без изменений) ---
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
    biMeetings: Array.isArray(prepFrom?.biMeetings) ? prepFrom.biMeetings : [],
    booster: raw?.links?.booster || links.booster?.url || "#",
  };

  const ssFrom = raw?.sections?.ssOffline || {};
  const ssOffline = {
    title: ssFrom?.title || "Офлайн стратегическая сессия",
    location: ssFrom?.location || "TBD",
    agenda: Array.isArray(ssFrom?.agenda)
      ? ssFrom.agenda
      : [
          { time: "10:00", title: "Открытие" },
          { time: "11:00", title: "Разбор стратегии" },
        ],
    results: Array.isArray(ssFrom?.results)
      ? ssFrom.results
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
        description: m?.description || "",
      }))
    : [];

  return {
    ...raw,
    links,
    sections: {
      ...raw.sections,
      prepSS: prepSS,
      ssOffline: ssOffline,
      mainCycle: {
        ...(raw?.sections?.mainCycle || {}),
        rhythm: rhythmArray,
      },
    },
  };
}

export default function App() {
  const content = normalizeContent(rawContent);

  // состояния
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({});
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [promptExpanded, setPromptExpanded] = useState(false);

  // модальный календарь (оверлей)
  const [calendarOpen, setCalendarOpen] = useState(false);

  // список секций (без секционной версии календаря)
  const sectionIds = [
    "hero","glossary","about-program","roadmap","checklist","org-steps","prep-start-cc",
    "start-cc","meetings-rhythm","meeting-cycle","roles","wig-declaration","control-panel",
    "tools-hub","documents","rules","final-cc","footer"
  ];

  // отслеживание активной секции и прогресса
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero";
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const progressValue = Math.min(
        100,
        Math.max(0, Math.round(((scrollTop + windowHeight) / documentHeight) * 100))
      );
      setProgress(progressValue);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // плавный скролл; спец-обработка календаря — открываем модалку
  const scrollToSection = (sectionId) => {
    if (sectionId === "calendar") {
      setCalendarOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAccordion = (idx) =>
    setOpenAccordions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const copyPrompt = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content.aiMentorPrompt || "");
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 1500);
      }
    } catch (e) {
      console.error(e);
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
      {/* Навигация */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Sidebar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        progress={progress}
      />
      <ScrollToTop />

      {/* Контент */}
      <div className="main-content">
        <Hero id="hero" content={content} scrollToSection={scrollToSection} />

        {/* Онбординг */}
        <Glossary id="glossary" content={content} />
        <AboutUltima id="about-program" content={content} />
        <Roadmap id="roadmap" content={content} />
        <Checklist id="checklist" content={content} />
        <OrganizationalSteps id="org-steps" content={content} scrollToSection={scrollToSection} />
        <PrepToSS
          id="prep-start-cc"
          content={content}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          promptExpanded={promptExpanded}
          setPromptExpanded={setPromptExpanded}
          copiedPrompt={copiedPrompt}
          copyPrompt={copyPrompt}
          downloadPrompt={downloadPrompt}
        />

        {/* Программа */}
        <StartCC id="start-cc" content={content} />
        <MainCycle id="meetings-rhythm" content={content} />
        <MeetingCycle id="meeting-cycle" content={content} />
        <Roles id="roles" content={content} />
        <WIGDeclaration id="wig-declaration" content={content} />
        <ControlPanel id="control-panel" content={content} />

        {/* Инструменты */}
        <ToolsHub id="tools-hub" content={content} />

        {/* Документы / Правила / Финал */}
        <Documents id="documents" content={content} />
        <Rules id="rules" content={content} />
        <Final id="final-cc" content={content} scrollToSection={scrollToSection} />
        <FooterCTA
          id="footer"
          content={content}
          scrollToSection={scrollToSection}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Модальный календарь (твоя реализация, рендерим только когда открыт) */}
      {calendarOpen && <CalendarOverlay onClose={() => setCalendarOpen(false)} />}
    </div>
  );
}
