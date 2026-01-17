import React, { useState, useEffect } from "react";
import content from "./content";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Glossary from "./components/Glossary";
import AboutUltima from "./components/AboutUltima";
import Roadmap from "./components/Roadmap";
import Checklist from "./components/Checklist";
import Onboarding from "./components/Onboarding";
import OrganizationalSteps from "./components/OrganizationalSteps";
import PrepToSS from "./components/PrepToSS";
import StartCC from "./components/StartCC";
import MainCycle from "./components/MainCycle";
import Documents from "./components/Documents";
import Rules from "./components/Rules";
import Final from "./components/Final";
import Roles from "./components/Roles";
import ToolsHub from "./components/ToolsHub";
import MeetingCycle from "./components/MeetingCycle";
import FooterCTA from "./components/FooterCTA";
import CalendarSection from "./components/CalendarSection";

// СТИЛИ: Единый объединённый CSS файл
import "./styles-unified.css";

/**
 * ULTIMA 9.0 ONBOARDING - ГЛАВНОЕ ПРИЛОЖЕНИЕ
 * VERSION 2.0 - Новая структура из 5 секций
 */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);

  // ═══════════════════════════════════════════════════════════
  // НОВЫЙ СПИСОК СЕКЦИЙ (ДЛЯ НАВИГАЦИИ И СКРОЛЛА)
  // ═══════════════════════════════════════════════════════════
  
  const sectionIds = [
    // СЕКЦИЯ 1: HERO
    "hero",
    
    // СЕКЦИЯ 2: ОНБОРДИНГ
    "glossary",
    "about-program",
    "roadmap",
    "checklist",
    "org-steps",
    "prep-start-cc",
    
    // СЕКЦИЯ 3: ПРОГРАММА
    "start-cc",
    "meetings-rhythm",
    "meeting-cycle",
    "roles",
    "wig-declaration",
    "control-panel",
    
    // СЕКЦИЯ 4: ИНСТРУМЕНТЫ
    "tools-hub",
    "templates",
    "calendar",
    
    // СЕКЦИЯ 5: ДОКУМЕНТЫ
    "documents",
    "documents-presentation",
    "rules",
    "ai-mentor",
    
    // СЕКЦИЯ 6: ЗАВЕРШЕНИЕ
    "final-cc",
  ];

  // ═══════════════════════════════════════════════════════════
  // ОТСЛЕЖИВАНИЕ АКТИВНОЙ СЕКЦИИ ПРИ СКРОЛЛЕ
  // ═══════════════════════════════════════════════════════════
  
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

  // ═══════════════════════════════════════════════════════════
  // ПЛАВНЫЙ СКРОЛЛ К СЕКЦИИ
  // ═══════════════════════════════════════════════════════════
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ═══════════════════════════════════════════════════════════
  // КОПИРОВАНИЕ ПРОМПТА AI-НАСТАВНИКА
  // ═══════════════════════════════════════════════════════════
  
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

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT - НОВЫЙ ПОРЯДОК СЕКЦИЙ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      
      <div className="main-content">
        
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 1: HERO */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        <Hero id="hero" content={content} scrollToSection={scrollToSection} />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 2: ОНБОРДИНГ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        {/* 2.1. ОСНОВЫ (понять систему) */}
        <Glossary id="glossary" content={content} />
        <AboutUltima id="about-program" content={content} />
        <Roadmap id="roadmap" content={content} />
        
        {/* 2.2. ПЕРВЫЕ ШАГИ (что делать прямо сейчас) */}
        <Checklist id="checklist" content={content} />
        <OrganizationalSteps id="org-steps" content={content} scrollToSection={scrollToSection} />
        
        {/* 2.3. ПОДГОТОВКА К START-CC */}
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

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 3: ПРОГРАММА (как это работает) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        {/* 3.1. START-CC */}
        <StartCC id="start-cc" content={content} />
        
        {/* 3.2. ОСНОВНОЙ ЦИКЛ */}
        {/* Используем существующий MainCycle для meetings-rhythm */}
        <MainCycle id="meetings-rhythm" content={content} />
        
        {/* ВРЕМЕННЫЕ ЗАГЛУШКИ для новых секций */}
        {/* Эти компоненты мы создадим на следующих шагах */}
        <section id="meeting-cycle" className="section">
          <div className="container">
            <h2>Цикл разбора на встречах</h2>
            <MeetingCycle id="meeting-cycle" content={content} />
          </div>
        </section>

        <section id="roles" className="section">
          <div className="container">
            <h2>Роли в программе</h2>
            <p><Roles id="roles" content={content} /></p>
          </div>
        </section>

        <section id="wig-declaration" className="section">
          <div className="container">
            <h2>Работа с декларацией WIG</h2>
            <p>Раздел в разработке - будет добавлен на следующем шаге</p>
          </div>
        </section>

        <section id="control-panel" className="section">
          <div className="container">
            <h2>Приборы контроля</h2>
            <p>Раздел в разработке - будет добавлен на следующем шаге</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 4: ИНСТРУМЕНТЫ И РЕСУРСЫ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        <section id="tools-hub" className="section">
          <div className="container">
            <h2>Полезные инструменты</h2>
            <ToolsHub id="tools-hub" content={content} />
          </div>
        </section>

        <section id="templates" className="section">
          <div className="container">
            <h2>Шаблоны</h2>
            <p>Раздел в разработке - будет добавлен на следующем шаге</p>
          </div>
        </section>

        <CalendarSection id="calendar" content={content} />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 5: ДОКУМЕНТЫ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        <Documents id="documents" content={content} />
        
        <section id="documents-presentation" className="section">
          <div className="container">
            <h2>Презентации</h2>
            <p>Раздел в разработке - будет добавлен на следующем шаге</p>
          </div>
        </section>

        <Rules id="rules" content={content} />
        
        <section id="ai-mentor" className="section">
          <div className="container">
            <h2>AI-наставник</h2>
            <p>Раздел в разработке - будет добавлен на следующем шаге</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕКЦИЯ 6: ЗАВЕРШЕНИЕ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        
        <Final id="final-cc" content={content} scrollToSection={scrollToSection} />
        
        {/* Footer CTA */}
        <FooterCTA id="footer" content={content} scrollToSection={scrollToSection} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}