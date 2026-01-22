// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import content from "./content";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Glossary from "./components/Glossary";
import AboutUltima from "./components/AboutUltima";
import Roadmap from "./components/Roadmap";
import Checklist from "./components/Checklist";
import OrganizationalSteps from "./components/OrganizationalSteps";
import PrepToSS from "./components/PrepToSS";
import StartCC from "./components/StartCC";
import FourDX from "./components/FourDX";
import MainCycle from "./components/MainCycle";
import MeetingCycle from "./components/MeetingCycle";
import Roles from "./components/Roles";
import WIGDeclaration from "./components/WIGDeclaration";
import ControlPanel from "./components/ControlPanel";
import ToolsHub from "./components/ToolsHub";
import Documents from "./components/Documents";
import Rules from "./components/Rules";
import Final from "./components/Final";
import FooterCTA from "./components/FooterCTA";
import ScrollToTop from "./components/ScrollToTop";

import CalendarOverlay from "./components/CalendarOverlay";
import AIMentorOverlay from "./components/AIMentorOverlay";

import "./styles-unified.css";

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
  "4dx",
  "wig-declaration",
  "control-panel",
  "tools-hub",
  "documents",
  "rules",
  "final-cc",
  "footer",
];

const ALIASES = {
  onboarding: "glossary",
  about: "about-program",
  "documents-nda": "documents",

  templates: "tools-hub",
  "documents-presentation": "documents",

  calendar: "__open_calendar__",
  "ai-mentor": "__open_ai_mentor__",
};

function getFirstParagraph(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  let i = 0;

  while (
    i < lines.length &&
    (lines[i].trim() === "" || lines[i].trim().startsWith("#"))
  ) {
    i += 1;
  }

  const para = [];
  for (; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "") break;
    para.push(line.trim());
  }

  return para.join(" ").trim();
}

async function copyToClipboard(text) {
  const value = String(text || "");
  if (!value) return false;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fallback below
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [aiMentorOpen, setAIMentorOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("bi-meetings");

  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const [aiPromptShort, setAIPromptShort] = useState("");
  const [aiPromptFull, setAIPromptFull] = useState("");
  const [aiPromptLoading, setAIPromptLoading] = useState(true);
  const [aiPromptError, setAIPromptError] = useState("");

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

  useEffect(() => {
    const base = process.env.PUBLIC_URL || "";
    const shortUrl = `${base}/prompts/ss-mentor-short-v3.md`;
    const fullUrl = `${base}/prompts/ss-mentor-full-v3.md`;

    const load = async () => {
      setAIPromptLoading(true);
      setAIPromptError("");

      try {
        const [shortRes, fullRes] = await Promise.all([
          fetch(shortUrl, { cache: "no-store" }),
          fetch(fullUrl, { cache: "no-store" }),
        ]);

        if (!shortRes.ok) throw new Error(`Short prompt not found: ${shortRes.status}`);
        if (!fullRes.ok) throw new Error(`Full prompt not found: ${fullRes.status}`);

        const [shortText, fullText] = await Promise.all([
          shortRes.text(),
          fullRes.text(),
        ]);

        setAIPromptShort(shortText);
        setAIPromptFull(fullText);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        setAIPromptShort("");
        setAIPromptFull("");
        setAIPromptError("Не удалось загрузить промпт. Используйте кнопку «Подробная инструкция».");
      } finally {
        setAIPromptLoading(false);
      }
    };

    load();
  }, []);

  const aiPromptPreview = useMemo(
    () => getFirstParagraph(aiPromptShort),
    [aiPromptShort],
  );

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

  const copyPrompt = async () => {
    if (aiPromptLoading || !aiPromptFull) return;

    const ok = await copyToClipboard(aiPromptFull);
    if (ok) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1500);
    }
  };

  const downloadPrompt = () => {
    if (aiPromptLoading || !aiPromptFull) return;

    const blob = new Blob([aiPromptFull], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "СС-НАСТАВНИК_Ultima_v3.0.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();

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
        <Hero id="hero" content={content} scrollToSection={scrollToSection} />
        <Glossary id="glossary" content={content} />
        <AboutUltima id="about-program" content={content} />
        <Roadmap id="roadmap" content={content} />
        <OrganizationalSteps
          id="org-steps"
          content={content}
          scrollToSection={scrollToSection}
        />
        <Checklist id="checklist" content={content} />

        <PrepToSS
          id="prep-start-cc"
          content={content}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          aiPromptPreview={aiPromptPreview}
          aiPromptFull={aiPromptFull}
          aiPromptLoading={aiPromptLoading}
          aiPromptError={aiPromptError}
          copiedPrompt={copiedPrompt}
          copyPrompt={copyPrompt}
          downloadPrompt={downloadPrompt}
        />

        <StartCC id="start-cc" content={content} />
        <FourDX id="4dx" content={content} scrollToSection={scrollToSection} />
        <MainCycle id="meetings-rhythm" content={content} />
        <MeetingCycle id="meeting-cycle" content={content} />
        <Roles id="roles" content={content} />
        <WIGDeclaration id="wig-declaration" content={content} />
        <ControlPanel id="control-panel" content={content} />

        <ToolsHub id="tools-hub" content={content} />

        <Documents id="documents" content={content} />
        <Rules id="rules" content={content} />
        <Final id="final-cc" content={content} scrollToSection={scrollToSection} />

        <FooterCTA
          id="footer"
          content={content}
          scrollToSection={scrollToSection}
          aiPromptPreview={aiPromptPreview}
          aiPromptFull={aiPromptFull}
          aiPromptLoading={aiPromptLoading}
          aiPromptError={aiPromptError}
        />
      </div>

      {calendarOpen && <CalendarOverlay onClose={() => setCalendarOpen(false)} />}

      {aiMentorOpen && (
        <AIMentorOverlay
          promptText={aiPromptFull}
          promptLoading={aiPromptLoading}
          promptError={aiPromptError}
          onClose={() => setAIMentorOpen(false)}
        />
      )}
    </div>
  );
}