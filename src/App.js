import React, { useEffect, useState } from "react";
import content from "./content";

// Твои компоненты (ровно из вложений, без изменений)
import Navbar from "./components/Navbar";           // :contentReference[oaicite:9]{index=9}
import Sidebar from "./components/Sidebar";         // :contentReference[oaicite:10]{index=10}
import Hero from "./components/Hero";
import Glossary from "./components/Glossary";
import AboutUltima from "./components/AboutUltima"; // :contentReference[oaicite:11]{index=11}
import Roadmap from "./components/Roadmap";
import Checklist from "./components/Checklist";
import OrganizationalSteps from "./components/OrganizationalSteps"; // :contentReference[oaicite:12]{index=12}
import PrepToSS from "./components/PrepToSS";
import StartCC from "./components/StartCC";
import MainCycle from "./components/MainCycle";
import MeetingCycle from "./components/MeetingCycle";
import Roles from "./components/Roles";             // :contentReference[oaicite:13]{index=13}
import WIGDeclaration from "./components/WIGDeclaration"; // :contentReference[oaicite:14]{index=14}
import ControlPanel from "./components/ControlPanel";
import ToolsHub from "./components/ToolsHub";       // :contentReference[oaicite:15]{index=15}
import Documents from "./components/Documents";     // :contentReference[oaicite:16]{index=16}
import Rules from "./components/Rules";             // :contentReference[oaicite:17]{index=17}
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import ScrollToTop from "./components/ScrollToTop";

import CalendarOverlay from "./components/CalendarOverlay"; // твой оверлей календаря
import AIMentorOverlay from "./components/AIMentorOverlay"; // :contentReference[oaicite:18]{index=18}

import "./styles-unified.css";

// Секции страницы, которые реально существуют как якоря в DOM
const SECTION_IDS = [
  "hero",
  "glossary",
  "about-program",
  "roadmap",
  "checklist",
  "org-steps",
  "prep-start-cc",
  "start-cc",
  "meetings-rhythm",
  "meeting-cycle",
  "roles",
  "wig-declaration",
  "control-panel",
  "tools-hub",
  "documents",
  "rules",
  "final-cc",
  "footer",
];

// Соответствие «нестандартных» id из твоих Navbar/Sidebar → реальным якорям/действиям
const ALIASES = {
  // Navbar mainSections
  onboarding: "glossary",
  about: "about-program",
  "documents-nda": "documents",

  // Sidebar группы
  templates: "tools-hub",
  "documents-presentation": "documents",

  // Спец-действия (оверлеи)
  calendar: "__open_calendar__", // открыть модальный календарь
  "ai-mentor": "__open_ai_mentor__", // открыть модальный AI-наставник
};

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);

  // оверлеи
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [aiMentorOpen, setAIMentorOpen] = useState(false);

  // служебные состояния (если нужны в твоих секциях)
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // выделение активной секции и прогресс скролла
  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = id;
          break;
        }
      }
      setActiveSection(current);

      const h = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      const y = window.pageYOffset;
      const p = Math.min(100, Math.max(0, Math.round(((y + h) / dh) * 100)));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // нормальная навигация с учётом алиасов и оверлеев
  const scrollToSection = (rawId) => {
    const id = ALIASES[rawId] || rawId;

    if (id === "__open_calendar__") {
      setCalendarOpen(true);
      return;
    }
    if (id === "__open_ai_mentor__") {
      setAIMentorOpen(true);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // util для копирования промпта (используется в PrepToSS, если нужно)
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
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Sidebar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        progress={progress}
      />
      <ScrollToTop />

      <div className="main-content">
        {/* Онбординг */}
        <Hero id="hero" content={content} scrollToSection={scrollToSection} />
        <Glossary id="glossary" content={content} />
        <AboutUltima id="about-program" content={content} />
        <Roadmap id="roadmap" content={content} />
        <Checklist id="checklist" content={content} />
        <OrganizationalSteps
          id="org-steps"
          content={content}
          scrollToSection={scrollToSection}
        />
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

      {/* Оверлеи */}
      {calendarOpen && <CalendarOverlay onClose={() => setCalendarOpen(false)} />}
      {aiMentorOpen && (
        <AIMentorOverlay content={content} onClose={() => setAIMentorOpen(false)} />
      )}
    </div>
  );
}
