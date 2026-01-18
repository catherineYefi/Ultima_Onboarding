import React, { useMemo, useState } from "react";

const normalizeRoles = (content = {}) => {
  const fromSections = content?.sections?.roles || {};
  const fromRoot = content?.roles || {};
  const src = Object.keys(fromSections).length ? fromSections : fromRoot;

  const title = src?.title || "Роли и зоны ответственности";
  const subtitle =
    src?.subtitle ||
    "Фиксация ролей, их миссий, обязанностей, полномочий и метрик успеха.";

  const rolesArr = Array.isArray(src?.roles) ? src.roles : [];

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
            kpis: ["Скорость поставки ценности", "Достижение продуктовых метрик"],
            antiPatterns: ["Микроменеджмент исполнения задач команды разработки"],
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

const Roles = ({ id = "roles", content = {} }) => {
  const data = useMemo(() => normalizeRoles(content), [content]);
  const [openKey, setOpenKey] = useState(null);

  return (
    <section id={id} className="section">
      <div className="container">
        <header className="section__header">
          <h2 className="section__title">{data.title}</h2>
          {data.subtitle && <p className="section__subtitle">{data.subtitle}</p>}
        </header>

        <ul className="list">
          {data.roles.map((r) => {
            const open = openKey === r.key;
            return (
              <li key={r.key} className="item">
                <div className="card" onClick={() => setOpenKey(open ? null : r.key)}>
                  <div className="card__header">
                    <h4>{r.title}</h4>
                    {r.owner ? <span className="meta">Владелец: {r.owner}</span> : null}
                  </div>

                  {open && (
                    <div className="card__body">
                      {r.mission && (
                        <>
                          <div className="meta-title">Миссия</div>
                          <p>{r.mission}</p>
                        </>
                      )}

                      {r.responsibilities.length > 0 && (
                        <>
                          <div className="meta-title">Обязанности</div>
                          <ul className="list">
                            {r.responsibilities.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {r.rights.length > 0 && (
                        <>
                          <div className="meta-title">Полномочия</div>
                          <ul className="list">
                            {r.rights.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {r.kpis.length > 0 && (
                        <>
                          <div className="meta-title">KPI</div>
                          <ul className="list">
                            {r.kpis.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {r.antiPatterns.length > 0 && (
                        <>
                          <div className="meta-title">Антипаттерны</div>
                          <ul className="list">
                            {r.antiPatterns.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {(r.contacts.email || r.contacts.tg || r.contacts.phone) && (
                        <>
                          <div className="meta-title">Контакты</div>
                          <ul className="list">
                            {r.contacts.email && (
                              <li>
                                Email: <a href={`mailto:${r.contacts.email}`}>{r.contacts.email}</a>
                              </li>
                            )}
                            {r.contacts.tg && (
                              <li>
                                TG: <a href={r.contacts.tg}>{r.contacts.tg}</a>
                              </li>
                            )}
                            {r.contacts.phone && <li>Телефон: {r.contacts.phone}</li>}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Roles;
