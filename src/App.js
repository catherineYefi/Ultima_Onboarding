import React, { useState, useEffect } from "react";
import rawContent from "./content";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Onboarding from "./components/Onboarding";
import AboutUltima from "./components/AboutUltima";
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

// СТИЛИ: сначала базовые, потом премиальные + мост
import "./styles.css";
import "./styles-design-system.css";    // дизайн система + компоненты
import "./styles-premium-v2.css";       // твой новый файл
import "./styles-premium-bridge.css";   // наш бридж-слой

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

  const ssOffline = {
    ...(raw?.sections?.ssOffline || {}),
    format:
      raw?.sections?.ssOffline?.format || "2 дня офлайн (Start-СС: день 1 и день 2)",
    results:
      Array.isArray(raw?.sections?.ssOffline?.results) &&
      raw.sections.ssOffline.results.length > 0
        ? raw.sections.ssOffline.results
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
      ssOffline,
      mainCycle,
    },
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
    a.download = "AI-наставник-ULTIMA-9.0.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // делаем премиальный стиль глобальным
    <div className="app premium">
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
      <CalendarSection />
      <CycleTimeline content={content} />
      <Documents content={content} />
      <Rules content={content} />
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
      <Final content={content} scrollToSection={scrollToSection} />
      <FooterCTA content={content} scrollToSection={scrollToSection} setActiveTab={setActiveTab} />
    </div>
  );
}
