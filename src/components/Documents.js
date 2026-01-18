import React, { useMemo } from "react";

// Обязательные материалы — из твоего сообщения
const REQUIRED_DOCS = [
  {
    title: "Инструкция по подготовке к СС",
    description: "Подробный гид по подготовке к стратегической сессии",
    link: "https://drive.google.com/file/d/1jTvD3JntNpZz5YZSpFKtevAc2YDPCXXC/view",
    fileType: "PDF",
    required: true,
    tags: ["prep", "ss"],
  },
  {
    title: "Гайд «Как провести стратсессию»",
    description: "Презентация с методикой проведения СС",
    link: "https://docs.google.com/presentation/d/13QR3jl9IwIkM5Ij5kx1Yf9en62k5mCoQxr_6jLMFQKY/edit?slide=id.g381bf69af62_0_11#slide=id.g381bf69af62_0_11",
    fileType: "PDF / Slides",
    required: false,
    tags: ["prep", "guide", "presentation"],
  },
  {
    title: "Шаблон презентации для видеовизитки к СС",
    description: "Слайды для короткой видеовизитки команды",
    link: "https://docs.google.com/presentation/d/1brgQbqOdak24-CHKzmBDt-3GuZWCT43T0er1JiMwFKQ/edit?slide=id.g2bc4dd5ad13_0_0#slide=id.g2bc4dd5ad13_0_0",
    fileType: "Slides",
    required: false,
    tags: ["template", "presentation"],
  },
  {
    title: "Шаблон «Точка А и Б» для видеокружочка (PPTX)",
    description: "Презентационный шаблон «точка А/Б»",
    link: "https://docs.google.com/presentation/d/1z_oHesd8fBq88aRzIpjaTCGa8-yCgw8ViFpYUsNJIAY/edit?usp=drive_link",
    fileType: "PPTX",
    required: false,
    tags: ["template", "presentation"],
  },
  {
    title: "Чек-лист места проведения СС (Excel)",
    description: "Проверка площадки и логистики",
    link: "https://docs.google.com/spreadsheets/d/1uqT4Xu3s5jy3XceaJg1izrJ5cfV-pu3shSRsue74sw4/edit?usp=drive_link",
    fileType: "XLSX",
    required: false,
    tags: ["checklist"],
  },
  {
    title: "Шаблон декларации (PDF)",
    description: "Бланк декларации для заполнения",
    link: "https://drive.google.com/file/d/1dB1SPS8zETaqiCC7RPpXFM5PvSlXkZE7/view?usp=drive_link",
    fileType: "PDF",
    required: true,
    tags: ["wig", "template"],
  },
  {
    title: "ROI симулятор",
    description: "Оценка возврата инвестиций",
    link: "https://huggingface.co/spaces/CatherineYefi/4.0_AI_Business_Health_ROI_Simulator",
    fileType: "Web",
    required: false,
    tags: ["calc", "roi"],
  },
  {
    title: "LTV калькулятор",
    description: "Оценка LTV",
    link: "https://huggingface.co/spaces/CatherineYefi/4_0_ultima-ltv",
    fileType: "Web",
    required: false,
    tags: ["calc", "ltv"],
  },
];

const dedupeByLink = (arr) => {
  const seen = new Set();
  const out = [];
  for (const it of arr) {
    const k = (it?.link || "").trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
};

const fallbackGroups = (docsArr) => {
  const required = [];
  const optional = [];
  docsArr.forEach((d) => (d?.required ? required.push(d) : optional.push(d)));

  const groups = [];
  if (required.length) groups.push({ key: "required", label: "Обязательные материалы", items: required });
  if (optional.length) groups.push({ key: "optional", label: "Полезные материалы", items: optional });
  if (!groups.length) groups.push({ key: "all", label: "Документы", items: docsArr });
  return groups;
};

const normalize = (content) => {
  const legacy = content?.sections?.about?.documents;
  const modernGroups = content?.documents?.groups;
  const modernItems = content?.documents?.items;

  if (Array.isArray(modernGroups) && modernGroups.length) {
    // Докидываем обязательные материалы в отдельную группу (без дублей)
    const merged = [...modernGroups];
    merged.push({
      key: "required-ultima",
      label: "Материалы ULTIMA",
      items: REQUIRED_DOCS,
    });
    // плоская нормализация
    return merged
      .filter((g) => Array.isArray(g?.items))
      .map((g, idx) => ({
        key: g.key || `group-${idx}`,
        label: g.label || g.title || `Группа ${idx + 1}`,
        items: dedupeByLink(g.items),
      }));
  }

  const items =
    (Array.isArray(modernItems) && modernItems.length && modernItems) ||
    (Array.isArray(legacy) && legacy.length && legacy) ||
    [];

  const mergedItems = dedupeByLink([...items, ...REQUIRED_DOCS]);
  return fallbackGroups(mergedItems);
};

const DocCard = ({ doc }) => {
  const title = doc?.title || doc?.name || "Документ";
  const description = doc?.description || "";
  const href = doc?.link || "#";
  const fileType = doc?.fileType || "";
  const isRequired = !!doc?.required;

  return (
    <li className="item">
      <div className="card" style={{ border: "1px solid #eee", borderRadius: 12, padding: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
          <h4 style={{ margin: 0 }}>{title}</h4>
          {fileType ? (
            <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>{fileType}</span>
          ) : null}
          {isRequired ? (
            <span style={{ fontSize: 11, background: "#111", color: "#fff", padding: "2px 8px", borderRadius: 999 }}>
              must
            </span>
          ) : null}
        </div>

        {description && <p style={{ margin: "6px 0 8px", color: "rgba(0,0,0,0.72)" }}>{description}</p>}

        <a
          href={href}
          className="btn btn--primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (href === "#") e.preventDefault();
          }}
          style={{ textDecoration: "none" }}
        >
          Открыть
        </a>
      </div>
    </li>
  );
};

const Documents = ({ id = "documents", content = {} }) => {
  const groups = useMemo(() => normalize(content), [content]);

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">Документы</h2>
          <p className="section__subtitle">Все материалы для подготовки и прохождения ULTIMA.</p>
        </header>

        {groups.map((g) => (
          <div key={g.key} style={{ margin: "18px 0" }}>
            <h3 style={{ marginTop: 0 }}>{g.label}</h3>
            <ul className="list" style={{ display: "grid", gap: 12 }}>
              {g.items.map((doc, i) => (
                <DocCard key={`${g.key}-${i}`} doc={doc} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Documents;
