import React, { useState, useEffect } from "react";
import rawContent from "./content";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Onboarding from "./components/Onboarding";
import AboutUltima from "./components/AboutUltima";
import AboutProgram from "./components/AboutProgram";
import CycleTimeline from "./components/CycleTimeline";
import Documents from "./components/Documents";
import Rules from "./components/Rules";
import Formula from "./components/Formula";
import PrepToSS from "./components/PrepToSS";
import SSOffline from "./components/SSOffline";
import MainCycle from "./components/MainCycle";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import CalendarSection from "./components/CalendarSection";

// Overlays
import RulesOverlay from "./components/RulesOverlay";
import AIMentorOverlay from "./components/AIMentorOverlay";

import "./styles.css";

/**
 * normalizeContent — маппинг старых полей к ожидаемым компонентами
 */
function normalizeContent(raw) {
  const safe = (v, fb) => (v === undefined || v === null ? fb : v);

  // построим links (минимум)
  const links = {
    booster: { url: "https://nkl6yv.csb.app/" },
    aiMentorGuide: {
      url:
        "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link",
    },
    ...(raw.links || {}),
  };

  // mainCycle.rhythm объект → оставляем как есть, компоненты защищены
  return {
    ...raw,
    links,
    aiMentorPrompt:
      raw.aiMentorPrompt ||
      raw.aiNastavnikPrompt ||
      "Промпт будет добавлен позже.",
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

  // overlays
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observers = (content.navItems || []).map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(item.id),
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [content]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAccordion = (idx) =>
    setOpenAccordions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const copyPrompt = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content.aiMentorPrompt || "");
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
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
    <>
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
        <Onboarding content={content} />
        <AboutUltima content={content} />
        <AboutProgram content={content} scrollToSection={scrollToSection} onOpenRules={() => setIsRulesOpen(true)} />
        <CalendarSection />
        <CycleTimeline content={content} />
        <Documents
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenAIMentor={() => setIsAIMentorOpen(true)}
        />
        <Rules content={content} onOpenRules={() => setIsRulesOpen(true)} />
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
      </div>

      {isRulesOpen && <RulesOverlay onClose={() => setIsRulesOpen(false)} />}
      {isAIMentorOpen && (
        <AIMentorOverlay
          content={content}
          onClose={() => setIsAIMentorOpen(false)}
        />
      )}
    </>
  );
}
