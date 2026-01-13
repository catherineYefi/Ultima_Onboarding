import React, { useState, useEffect } from "react";
import content from "./content";

// Import all components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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

import "./styles.css";

export default function App() {
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
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observers = content.navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  // Utility functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAccordion = (idx) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(content.aiMentorPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([content.aiMentorPrompt], { type: "text/plain" });
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

      <AboutUltima content={content} />

      <CalendarSection />

      <CycleTimeline content={content} />

      <Documents content={content} />

      <Rules
        content={content}
        openAccordions={openAccordions}
        toggleAccordion={toggleAccordion}
      />

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

      <FooterCTA
        content={content}
        scrollToSection={scrollToSection}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
