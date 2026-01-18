import React, { useMemo } from "react";
import { FileText, Calendar, ExternalLink, BookOpen, File } from "lucide-react";

/**
 * Documents — VERSION 2.1
 * 1) Рендер из content.documents.categories
 * 2) Плюс «обязательные материалы ULTIMA» (без дублей по link)
 */

const REQUIRED_DOCS = [
  {
    title: "Инструкция по подготовке к СС",
    description: "Подробный гид по подготовке к стратегической сессии",
    link: "https://drive.google.com/file/d/1jTvD3JntNpZz5YZSpFKtevAc2YDPCXXC/view",
    icon: "FileText",
    linkText: "Открыть",
  },
  {
    title: "Гайд «Как провести стратсессию» (PDF/Slides)",
    description: "Презентация с методикой проведения СС",
    link: "https://docs.google.com/presentation/d/13QR3jl9IwIkM5Ij5kx1Yf9en62k5mCoQxr_6jLMFQKY/edit?slide=id.g381bf69af62_0_11#slide=id.g381bf69af62_0_11",
    icon: "BookOpen",
    linkText: "Открыть",
  },
  {
    title: "Шаблон презентации для видеовизитки к СС",
    description: "Слайды для короткой видеовизитки команды",
    link: "https://docs.google.com/presentation/d/1brgQbqOdak24-CHKzmBDt-3GuZWCT43T0er1JiMwFKQ/edit?slide=id.g2bc4dd5ad13_0_0#slide=id.g2bc4dd5ad13_0_0",
    icon: "FileText",
    linkText: "Открыть",
  },
  {
    title: "Шаблон «Точка А и Б» для видеокружочка (PPTX)",
    description: "Презентационный шаблон «точка А/Б»",
    link: "https://docs.google.com/presentation/d/1z_oHesd8fBq88aRzIpjaTCGa8-yCgw8ViFpYUsNJIAY/edit?usp=drive_link",
    icon: "File",
    linkText: "Открыть",
  },
  {
    title: "Чек-лист места проведения СС (Excel)",
    description: "Проверка площадки и логистики",
    link: "https://docs.google.com/spreadsheets/d/1uqT4Xu3s5jy3XceaJg1izrJ5cfV-pu3shSRsue74sw4/edit?usp=drive_link",
    icon: "Calendar",
    linkText: "Открыть",
  },
  {
    title: "Шаблон декларации (PDF)",
    description: "Бланк декларации для заполнения",
    link: "https://drive.google.com/file/d/1dB1SPS8zETaqiCC7RPpXFM5PvSlXkZE7/view?usp=drive_link",
    icon: "FileText",
    linkText: "Открыть",
  },
  {
    title: "ROI симулятор",
    description: "Оценка возврата инвестиций",
    link: "https://huggingface.co/spaces/CatherineYefi/4.0_AI_Business_Health_ROI_Simulator",
    icon: "BarChart",
    linkText: "Открыть",
  },
  {
    title: "LTV калькулятор",
    description: "Оценка LTV",
    link: "https://huggingface.co/spaces/CatherineYefi/4_0_ultima-ltv",
    icon: "BarChart",
    linkText: "Открыть",
  },
];

export default function Documents({ id = "documents", content }) {
  const documents = content?.documents || {};
  const categories = documents?.categories || [];

  const iconMap = {
    FileText,
    Calendar,
    BookOpen,
    File,
  };

  const getIcon = (iconName, size = 32) => {
    const IconComponent = iconMap[iconName] || FileText;
    return <IconComponent size={size} />;
  };

  const mergedCategories = useMemo(() => {
    // 1) расплющим все ссылки, чтобы избежать дублей
    const seen = new Set();
    const dedupe = (items = []) =>
      items.filter((it) => {
        const key = (it?.link || "").trim();
        if (!key) return true;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    const original = categories.map((c) => ({
      title: c.title,
      items: dedupe(c.items || []),
    }));

    // 2) добавим блок «Материалы ULTIMA»
    const ultima = { title: "Материалы ULTIMA", items: dedupe(REQUIRED_DOCS) };

    return [...original, ultima];
  }, [categories]);

  const handleDocClick = (link) => {
    if (!link) return;
    if (link.startsWith("#")) {
      const targetId = link.slice(1);
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>{documents?.title || "Документы и материалы"}</h2>
          <p className="section-subtitle">
            {documents?.subtitle || "Важные документы для работы в программе"}
          </p>
        </div>

        {mergedCategories.map((category, catIdx) => (
          <div key={catIdx} className="documents-category fade-in">
            {category.title && (
              <h3 className="documents-category-title">{category.title}</h3>
            )}

            <div className="cards-grid">
              {category.items?.map((doc, docIdx) => (
                <div key={docIdx} className="doc-card">
                  <div className="doc-card-icon">
                    {getIcon(doc.icon)}
                  </div>
                  <h4 className="doc-card-title">{doc.title}</h4>
                  {doc.description && (
                    <p className="doc-card-description">{doc.description}</p>
                  )}

                  {doc.link && (doc.link.startsWith("#") ? (
                    <button className="doc-link" onClick={() => handleDocClick(doc.link)}>
                      {doc.linkText || "Открыть"}
                    </button>
                  ) : (
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-link"
                    >
                      {doc.linkText || "Открыть"} <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
