import React from "react";
import { BookOpen } from "lucide-react";

export default function AboutUltima({ content }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <BookOpen size={32} className="section-icon" />
          <h2>О программе ULTIMA 9.0</h2>
          <p className="section-subtitle">
            Стратегический контур роста бизнеса
          </p>
        </div>
        <div className="section-block fade-in">
          <p>{content.sections.about.text}</p>
        </div>
      </div>
    </section>
  );
}
