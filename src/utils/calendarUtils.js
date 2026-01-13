// Утилиты для работы с календарём в grid-режиме

// Получить дни месяца с группировкой по неделям
export const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0 (вс) - 6 (сб)

  // Корректируем: понедельник = 0, воскресенье = 6
  const adjustedStartWeekday = startWeekday === 0 ? 6 : startWeekday - 1;

  const days = [];
  let currentWeek = [];

  // Пустые ячейки до первого дня
  for (let i = 0; i < adjustedStartWeekday; i++) {
    currentWeek.push(null);
  }

  // Заполняем дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);

    if (currentWeek.length === 7) {
      days.push(currentWeek);
      currentWeek = [];
    }
  }

  // Заполняем последнюю неделю
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    days.push(currentWeek);
  }

  return days;
};

// Группировать события по датам
export const groupEventsByDate = (events) => {
  const grouped = {};

  events.forEach((event) => {
    if (!event.start) return; // Пропускаем TBD события

    const startDate = new Date(event.start);
    const endDate = event.end ? new Date(event.end) : startDate;

    // Для диапазонов создаём записи для каждого дня
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push({
        ...event,
        isStart: currentDate.getTime() === startDate.getTime(),
        isEnd: currentDate.getTime() === endDate.getTime(),
        isRange: startDate.getTime() !== endDate.getTime(),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return grouped;
};

// Проверить есть ли события в конкретный день
export const hasEventsOnDate = (eventsByDate, year, month, day) => {
  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  return eventsByDate[dateKey] || [];
};

// Получить события месяца
export const getMonthEvents = (events, year, month) => {
  return events.filter((event) => {
    if (!event.start) return false;

    const startDate = new Date(event.start);
    const endDate = event.end ? new Date(event.end) : startDate;

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    // Событие попадает в месяц если пересекается с его диапазоном
    return startDate <= monthEnd && endDate >= monthStart;
  });
};

// Названия месяцев
export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Короткие названия дней недели (пн-вс)
export const weekdayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Получить цвет для уровня события
export const getLevelColor = (level) => {
  const colors = {
    nechto: "rgba(156, 163, 175, 0.8)", // серый
    ultima: "rgba(99, 102, 241, 0.8)", // фиолетовый
    group: "rgba(236, 72, 153, 0.8)", // розовый
  };
  return colors[level] || colors.nechto;
};

// Получить название уровня
export const getLevelLabel = (level) => {
  const labels = {
    nechto: "Нечто",
    ultima: "ULTIMA",
    group: "Группа",
  };
  return labels[level] || level;
};
