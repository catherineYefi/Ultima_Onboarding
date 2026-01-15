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
import RulesOverlay from "./components/RulesOverlay";
import AIMentorOverlay from "./components/AIMentorOverlay";
import Rules from "./components/Rules";            // если у тебя остался блок-аккордеон внизу — пусть живёт
import Formula from "./components/Formula";
import PrepToSS from "./components/PrepToSS";
import SSOffline from "./components/SSOffline";
import MainCycle from "./components/MainCycle";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import CalendarSection from "./components/CalendarSection";

import "./styles.css";

/** НОРМАЛИЗАЦИЯ ДАННЫХ — безопасные дефолты */
function normalizeContent(raw) {
  const safe = (v, fb) => (v === undefined || v === null ? fb : v);

  const links = {
    nda: {
      available: true,
      url: "https://drive.google.com/file/d/1s2I-HdtHI4TP1KS2yEEKaWYt7CMaGRgx/view?usp=drive_link",
      label: "Открыть NDA",
    },
    rules: {
      available: true,
      url: "#rules-overlay",
      label: "Открыть правила",
    },
    calendar: {
      available: true,
      url: "#calendar",
      label: "Открыть календарь",
    },
    booster: {
      url: "https://nkl6yv.csb.app/",
    },
    aiMentorGuide: {
      url: "https://vagabond-cadmium-aba.notion.site/AI-277308771f1a8080afdbeb807f819be8?source=copy_link",
    },
    orgPresentation9: {
      url: "https://33wgq2.csb.app/",
    },
    ...(raw.links || {}),
  };

  // mainCycle.rhythm: объект с description, meetings[], additional[]
  const mc = raw?.sections?.mainCycle || {};
  const rhythm =
    Array.isArray(mc?.rhythm)
      ? mc.rhythm
      : {
          description:
            mc?.rhythm?.description ||
            "Встречи проходят каждую неделю: месяц 1 — трекер; далее чередование трекер/лидер. Бадди — раз в 2 недели.",
          meetings: Array.isArray(mc?.rhythm?.meetings)
            ? mc.rhythm.meetings
            : [
                {
                  week: "Неделя 1",
                  format: "Встреча с трекером",
                  focus:
                    "Разбор прогресса, работа с препятствиями, экспертная обратная связь",
                },
                {
                  week: "Неделя 2",
                  format: "Встреча с лидером группы",
                  focus: "Командная работа, поддержка, обмен опытом",
                },
              ],
          additional: Array.isArray(mc?.rhythm?.additional)
            ? mc.rhythm.additional
            : [
                "Бадди-созвоны раз в 2 недели",
                "P&L weekly, CRM, KPI — еженедельный апдейт",
              ],
        };

  return {
    ...raw,
    links,
    sections: {
      ...(raw.sections || {}),
      mainCycle: {
        ...(raw.sections?.mainCycle || {}),
        rhythm,
      },
    },
    aiMentorPrompt:
      raw?.aiMentorPrompt ||
      `Ты — СС-НАСТАВНИК (Ultima)...`, // (не будет использовано, у нас полный в content.js)
  };
}

export default function App() {
  const content = normalizeContent(rawContent);

  // UI state
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Overlays state
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);

  // Prompt state (AI-наставник)
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const current =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const items = content.navItems || [];
    const observers = items.map((it) => {
      const el = document.getElementById(it.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(it.id),
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [content]);

  // helpers
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(
        content.aiMentorPrompt || content.aiNastavnikPrompt || ""
      );
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadPrompt = () => {
    const data = content.aiMentorPrompt || content.aiNastavnikPrompt || "";
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AI-наставник-ULTIMA-9.0.txt";
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

      <Onboarding content={content} />

      <AboutUltima content={content} />

      <AboutProgram
        content={content}
        scrollToSection={scrollToSection}
        onOpenRules={() => setIsRulesOpen(true)}
      />

      <CalendarSection />

      <CycleTimeline content={content} />

      <Documents
        content={content}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenAIMentor={() => setIsAIMentorOpen(true)}
      />

      {/* Старый аккордеон правил можно оставить для SEO/страницы,
          но основная точка входа — overlay */}
      <Rules content={content} />

      <Formula content={content} />

      <PrepToSS
        content={content}
        promptExpanded={promptExpanded}
        setPromptExpanded={setPromptExpanded}
        copiedPrompt={copiedPrompt}
        copyPrompt={copyPrompt}
        downloadPrompt={downloadPrompt}
        // Кнопка «Открыть подстраницу AI-наставника»
        onOpenAIMentor={() => setIsAIMentorOpen(true)}
      />

      <SSOffline content={content} />

      <MainCycle content={content} />

      <Final content={content} />

      <FooterCTA content={content} scrollToSection={scrollToSection} />

      {isRulesOpen && <RulesOverlay onClose={() => setIsRulesOpen(false)} />}

      {isAIMentorOpen && (
        <AIMentorOverlay
          onClose={() => setIsAIMentorOpen(false)}
          prompt={content.aiMentorPrompt || content.aiNastavnikPrompt || ""}
        />
      )}
    </div>
  );
}
