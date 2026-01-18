import React, { useMemo, useState } from "react";

/**
 * РОЛИ — строгий якорь id="roles"
 *
 * Поддерживаемые источники данных:
 *  A) content.sections.roles = {
 *       title?, subtitle?, roles?: Role[]
 *     }
 *  Б) content.roles = аналогичная структура
 *
 * Role (поддерживаемая форма):
 *  {
 *    key?: string,                  // системный ключ (например, "owner")
 *    title?: string,                // название роли (например, "Владелец продукта")
 *    mission?: string,              // краткая миссия/назначение роли
 *    responsibilities?: string[],   // обязанности
 *    rights?: string[],             // полномочия/права
 *    kpis?: string[],               // метрики успеха
 *    antiPatterns?: string[],       // что НЕ делает роль / антипаттерны
 *    owner?: string,                // ФИО/должность
 *    contacts?: { email?: string, tg?: string, phone?: string } // опционально
 *  }
 */

const normalizeRoles = (content = {}) => {
  const fromSections = content?.sections?.roles || {};
  const fromRoot = content?.roles || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "Роли и зоны ответственности";
  const subtitle =
    src?.subtitle ||
    "Фиксация ролей, их миссий, обязанностей, полномочий и метрик успеха.";

  const rolesArr = Array.isArray(src?.roles) ? src.roles : [];

  // Если массив пуст — предоставим безопасные дефолты, чтобы секция выглядела аккуратно
  const defaults =
    rolesArr.length > 0
      ? rolesArr
      : [
          {
            key: "owner",
            title: "Владелец продукта (Product Owner)",
            mission:
              "Определяет ценность, приоритизирует бэклог, принимает ключевые продуктовые решения.",
            responsibilities: [
              "Формирует и поддерживает приоритизированный бэклог",
              "Определяет критерии успешности (DoD, бизнес-метрики)",
              "Коммуницирует визию и контекст команде",
            ],
            rights: [
              "Принимать решения по приоритетам",
              "Утверждать релизы и MVP-критерии",
            ],
            kpis: ["Скорость поставки ценности", "Достижение плановых продуктовых метрик"],
            antiPatterns: ["Микроменеджмент исполнения задач команды разработки"],
            owner: "",
          },
          {
            key: "pm",
            title: "Проектный менеджер",
            mission:
              "Организует контур планирования/контроля, следит за сроками, рисками и коммуникацией.",
            responsibilities: [
              "Составляет план и поддерживает его актуальность",
              "Ведёт риз-реестр и эскалации",
              "Обеспечивает ритм встреч и артефактов",
            ],
            rights: ["Инициировать эскалации", "Требовать обновления статуса от владельцев задач"],
            kpis: ["Соблюдение сроков", "Предсказуемость поставки"],
            antiPatterns: ["Подмена роли PO и принятие продуктовых решений"],
            owner: "",
          },
        ];

  const roles = defaults.map((r, i) => ({
    key: r?.key || `role-${i}`,
    title: r?.title || "Роль",
    mission: r?.mission || "",
    responsibilities: Array.isArray(r?.responsibilities) ? r.responsibilities : [],
    rights: Array.isArray(r?.rights) ? r.rights : [],
    kpis: Array.isArray(r?.kpis) ? r.kpis : [],
    antiPatterns: Array.isArray(r?.antiPatterns) ? r.antiPatterns : [],
    owner: r?.owner || "",
    contacts: {
      email: r?.contacts?.email || "",
      tg: r?.contacts?.tg || "",
      phone: r?.contacts?.phone || "",
    },
  }));

  return { title, subtitle, roles };
};

const Pill = ({ children }) => <span className="roles__pill">{children}</span>;

const RoleCard = ({ role }) => {
  const [open, setOpen] = useState(false);

  const hasDetails =
    (role.mission && role.mission.trim()) ||
    role.responsibilities.length ||
    role.rights.length ||
    role.kpis.length ||
    role.antiPatterns.length ||
    role.owner ||
    role.contacts.email ||
    role.contacts.tg ||
    role.contacts.phone;

  return (
    <li className={`roles__card ${open ? "is-open" : ""}`}>
      <div className="roles__card-head" onClick={() => setOpen((s) => !s)}>
        <h4 className="roles__title">{role.title}</h4>
        <div className="roles__meta">
          {role.owner && <Pill>Владелец: {role.owner}</Pill>}
          {role.kpis.length > 0 && <Pill>KPI: {role.kpis[0]}</Pill>}
        </div>
        <button
          className="roles__toggle"
          aria-expanded={open}
          aria-label={open ? "Свернуть" : "Развернуть"}
        >
          {open ? "−" : "+"}
        </button>
      </div>

      {open && hasDetails && (
        <div className="roles__card-body">
          {role.mission && (
            <div className="roles__block">
              <div className="roles__block-title">Миссия</div>
              <p className="roles__text">{role.mission}</p>
            </div>
          )}

          {role.responsibilities.length > 0 && (
            <div className="roles__block">
              <div className="roles__block-title">Обязанности</div>
              <ul className="roles__list">
                {role.responsibilities.map((t, i) => (
                  <li key={i} className="roles__li">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.rights.length > 0 && (
            <div className="roles__block">
              <div className="roles__block-title">Полномочия</div>
              <ul className="roles__list">
                {role.rights.map((t, i) => (
                  <li key={i} className="roles__li">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.kpis.length > 0 && (
            <div className="roles__block">
              <div className="roles__block-title">KPI</div>
              <ul className="roles__list">
                {role.kpis.map((t, i) => (
                  <li key={i} className="roles__li">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.antiPatterns.length > 0 && (
            <div className="roles__block">
              <div className="roles__block-title">Антипаттерны</div>
              <ul className="roles__list roles__list--warn">
                {role.antiPatterns.map((t, i) => (
                  <li key={i} className="roles__li">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(role.contacts.email || role.contacts.tg || role.contacts.phone) && (
            <div className="roles__block roles__block--contacts">
              <div className="roles__block-title">Контакты</div>
              <ul className="roles__list">
                {role.contacts.email && (
                  <li className="roles__li">
                    Email:{" "}
                    <a href={`mailto:${role.contacts.email}`}>
                      {role.contacts.email}
                    </a>
                  </li>
                )}
                {role.contacts.tg && (
                  <li className="roles__li">
                    TG: <a href={role.contacts.tg}>{role.contacts.tg}</a>
                  </li>
                )}
                {role.contacts.phone && (
                  <li className="roles__li">Телефон: {role.contacts.phone}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

const Roles = ({ id = "roles", content = {} }) => {
  const data = useMemo(() => normalizeRoles(content), [content]);

  return (
    <section id={id} className="section roles">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section__subtitle">{data.subtitle}</p>
          )}
        </header>

        <ul className="roles__grid">
          {data.roles.map((r) => (
            <RoleCard key={r.key} role={r} />
          ))}
        </ul>

        <div className="roles__hint">
          Данные берутся из <code>content.sections.roles.roles</code> (или{" "}
          <code>content.roles.roles</code>). Поля:{" "}
          <code>title</code>, <code>mission</code>,{" "}
          <code>responsibilities[]</code>, <code>rights[]</code>,{" "}
          <code>kpis[]</code>, <code>antiPatterns[]</code>, <code>owner</code>,{" "}
          <code>contacts&#123;email,tg,phone&#125;</code>.
        </div>
      </div>
    </section>
  );
};

export default Roles;
