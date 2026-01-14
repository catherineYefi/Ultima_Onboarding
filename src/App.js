import React, { useState, useEffect } from "react";
import rawContent from "./content";

// Import all components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StartHere from "./components/StartHere";
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
import MaterialsFAB from "./components/MaterialsFAB";

import "./styles.css";

/** ---- НОРМАЛИЗАЦИЯ ДАННЫХ ИЗ content.js ----
 * Делает поля такими, какими их ожидают компоненты:
 * - content.links.{nda,rules,calendar,booster}
 * - content.sections.prepSS (из prepToSS)
 * - content.sections.ssOffline.{format,results}
 * - content.sections.mainCycle.rhythm -> массив
 * - content.aiMentorPrompt
 */
function normalizeContent(raw) {
  const safe = (v, fb) => (v === undefined || v === null ? fb : v);

  const documents =
    raw?.sections?.about?.documents && Array.isArray(raw.sections.about.documents)
      ? raw.sections.about.documents
      : [];

  const findDoc = (re) =>
    documents.find((d) => re.test((d?.title || "") + (d?.name || "")));

  // ====== ВАЖНО: фиксированные ссылки/статусы по ТЗ ======
  const links = {
    // NDA — живой линк
    nda: {
      available: true,
      url: "https://drive.google.com/file/d/1s2I-HdtHI4TP1KS2yEEKaWYt7CMaGRgx/view?usp=drive_link",
      label: "Открыть NDA",
    },
    // Правила — ведём в секцию #rules (там попап)
    rules: {
      available: true,
      url: "#rules",
      label: "Открыть правила",
    },
    // Календарь — в карточке документов показываем «СКОРО БУДЕТ»
    calendar: {
      available: false,
      url: "#calendar",
      label: "СКОРО БУДЕТ",
    },
    // Booster — ссылка из задания
    booster: {
      url: "https://nkl6yv.csb.app/",
    },
    // возможность переопределить через raw.links при желании
    ...(raw.links || {}),
  };

  // prepSS из prepToSS
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

  // ssOffline: добавим format/results по умолчанию
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

  // mainCycle.rhythm: ожидается массив; у тебя rhythm={ description, meetings:[...] }
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
  // Нормализованный контент
  const content = normalizeContent(rawContent);

  // States
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({});
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState("bi-meetings");
  const [promptExpanded, setPromptExpanded] = useState(false);

  // Track scroll progress
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

  // Intersection Observer for active section
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

  // Utility functions
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
      <StartHere content={content} scrollToSection={scrollToSection} />
      <Onboarding content={content} />
      <AboutUltima content={content} />
      <AboutProgram content={content} scrollToSection={scrollToSection} />
      <CalendarSection />
      <CycleTimeline content={content} />
      <Documents content={content} />
      <Rules content={content} openAccordions={openAccordions} toggleAccordion={toggleAccordion} />
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
      <MaterialsFAB content={content} />
    </div>
  );
}
