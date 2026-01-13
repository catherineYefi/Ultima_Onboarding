import React, { useState } from "react";
import { Triangle } from "lucide-react";

export default function Formula({ content }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const pyramidLevels = [
    {
      id: 1,
      title: "Трекер",
      description:
        "Управляет процессом, задаёт темп, фокусирует на золотых задачах",
      width: 180,
      y: 0,
      opacity: 0.9,
    },
    {
      id: 2,
      title: "Бизнес Ассистент",
      description:
        "Ведёт протоколы, контролирует сроки, помогает в организации",
      width: 280,
      y: 90,
      opacity: 0.8,
    },
    {
      id: 3,
      title: "Лидер Группы",
      description: "Выбранный участниками, держит фокус и командный дух",
      width: 380,
      y: 180,
      opacity: 0.7,
    },
    {
      id: 4,
      title: "Группа предпринимателей",
      description:
        "8 человек, каждый с амбициями и опытом, готовый давать и брать по максимуму",
      width: 480,
      y: 270,
      opacity: 0.6,
    },
    {
      id: 5,
      title: "Адвайзери-борд",
      description:
        "Совет трекеров и экспертов, к которому можно обратиться за стратегическим советом или проверкой гипотез",
      width: 580,
      y: 360,
      opacity: 0.5,
    },
  ];

  return (
    <section id="formula" className="section">
      <div className="container">
        <div className="section-header fade-in">
          <Triangle size={32} className="section-icon" />
          <h2>Формула неизбежности результата</h2>
          <p className="section-subtitle">5 уровней системы ULTIMA</p>
        </div>

        <div className="pyramid-glass-container fade-in">
          <div className="pyramid-wrapper">
            {/* SVG Pyramid */}
            <svg viewBox="0 0 700 480" className="pyramid-glass-svg">
              <defs>
                {/* Glass gradient */}
                <linearGradient
                  id="glass-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow-filter">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pyramid levels */}
              {pyramidLevels.map((level, idx) => {
                const centerX = 350;
                const halfWidth = level.width / 2;
                const height = 85;
                const nextLevel = pyramidLevels[idx + 1];
                const nextY = nextLevel ? nextLevel.y : level.y + height;
                const nextHalfWidth = nextLevel
                  ? nextLevel.width / 2
                  : halfWidth;

                return (
                  <g
                    key={level.id}
                    className="pyramid-glass-level"
                    onMouseEnter={() => setHoveredLevel(level.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Glass trapezoid */}
                    <path
                      d={`
                        M ${centerX - halfWidth} ${level.y + 15}
                        L ${centerX + halfWidth} ${level.y + 15}
                        L ${centerX + nextHalfWidth} ${nextY + 15}
                        L ${centerX - nextHalfWidth} ${nextY + 15}
                        Z
                      `}
                      fill="url(#glass-gradient)"
                      stroke="rgba(99, 102, 241, 0.6)"
                      strokeWidth="2"
                      opacity={hoveredLevel === level.id ? 1 : level.opacity}
                      filter="url(#glow-filter)"
                      className="glass-shape"
                    />

                    {/* Level number circle - внутри слева */}
                    <circle
                      cx={centerX - halfWidth + 40}
                      cy={level.y + 50}
                      r="22"
                      fill="rgba(15, 15, 30, 0.9)"
                      stroke="rgba(99, 102, 241, 0.8)"
                      strokeWidth="2"
                    />
                    <text
                      x={centerX - halfWidth + 40}
                      y={level.y + 50}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="18"
                      fontWeight="700"
                    >
                      {level.id}
                    </text>

                    {/* Text inside pyramid */}
                    <text
                      x={centerX}
                      y={level.y + 50}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="18"
                      fontWeight="700"
                      className="pyramid-text"
                    >
                      {level.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover descriptions - справа */}
            {hoveredLevel && (
              <div className="pyramid-hover-description">
                {pyramidLevels.find((l) => l.id === hoveredLevel) && (
                  <>
                    <div className="hover-desc-number">{hoveredLevel}</div>
                    <h4>
                      {pyramidLevels.find((l) => l.id === hoveredLevel).title}
                    </h4>
                    <p>
                      {
                        pyramidLevels.find((l) => l.id === hoveredLevel)
                          .description
                      }
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
