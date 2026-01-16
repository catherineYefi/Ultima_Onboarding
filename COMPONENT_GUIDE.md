# 🔧 GUIDE: Использование новой дизайн-системы

## Быстрый старт

### 1. Кнопки

```jsx
// Primary (главная кнопка)
<button className="btn btn-primary">
  Click me <ArrowRight size={20} />
</button>

// Secondary (вторичная)
<button className="btn btn-secondary">
  Learn more
</button>

// Ghost (прозрачная)
<button className="btn btn-ghost">
  Cancel
</button>

// Accent (яркая)
<button className="btn btn-accent">
  Important action
</button>

// С размерами
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Regular</button>
<button className="btn btn-primary btn-lg">Large</button>

// На всю ширину
<button className="btn btn-primary btn-block">Full width</button>

// Disabled
<button className="btn btn-primary" disabled>
  Disabled
</button>
```

---

### 2. Карточки

```jsx
// Базовая карточка
<div className="card">
  <h3 className="card-title">Заголовок</h3>
  <p className="card-subtitle">Подзаголовок</p>
  <p className="card-description">Основной текст</p>
</div>

// Маленькая карточка
<div className="card card-sm">
  {/* content */}
</div>

// Большая карточка
<div className="card card-lg">
  {/* content */}
</div>

// Карточка с кнопкой
<div className="card">
  <h3 className="card-title">Title</h3>
  <p className="card-description">Description</p>
  <button className="btn btn-primary">Action</button>
</div>
```

---

### 3. Табы

```jsx
const [activeTab, setActiveTab] = useState(0);
const tabs = ["Tab 1", "Tab 2", "Tab 3"];

<div>
  <div className="tabs">
    {tabs.map((tab, idx) => (
      <button
        key={idx}
        className={`tab-button ${activeTab === idx ? 'active' : ''}`}
        onClick={() => setActiveTab(idx)}
      >
        {tab}
      </button>
    ))}
  </div>

  <div className={`tab-content ${activeTab === 0 ? '' : 'hidden'}`}>
    Content for tab 1
  </div>
  <div className={`tab-content ${activeTab === 1 ? '' : 'hidden'}`}>
    Content for tab 2
  </div>
</div>
```

---

### 4. Бейджи

```jsx
<span className="badge">Default</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```

---

### 5. Ввод данных

```jsx
// Текстовое поле
<input type="text" className="input" placeholder="Enter text" />

// Textarea
<textarea className="textarea" placeholder="Enter message"></textarea>

// Чекбокс
<div className="checkbox">
  <input type="checkbox" id="cb1" />
  <label htmlFor="cb1">Agree to terms</label>
</div>

// Radio button
<div className="radio">
  <input type="radio" id="rb1" name="option" />
  <label htmlFor="rb1">Option 1</label>
</div>
```

---

### 6. Flex layout

```jsx
// Horizontal flex
<div className="flex gap-4">
  <button className="btn btn-primary">Button 1</button>
  <button className="btn btn-secondary">Button 2</button>
</div>

// Vertical flex
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Centered
<div className="flex flex-center gap-4">
  <div>Centered content</div>
</div>

// Space between
<div className="flex flex-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

### 7. Grid layout

```jsx
// 2 колонки
<div className="grid grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// 3 колонки
<div className="grid grid-cols-3 gap-6">
  {items.map((item, i) => (
    <div key={i} className="card">{item}</div>
  ))}
</div>

// Адаптивная сетка
<div className="grid gap-6">
  {/* На мобилке 1 колонка, на планшете 2, на десктопе 3 */}
  {cards.map((card, i) => (
    <div key={i} className="card">{card}</div>
  ))}
</div>
```

---

### 8. Spacing утилиты

```jsx
// Padding
<div className="p-4">Padding on all sides</div>
<div className="pt-6 pb-4">Padding top + bottom</div>

// Margin (используются через CSS переменные)
<div style={{ marginBottom: 'var(--spacing-6)' }}>
  Text with margin
</div>

// Gap (в flex/grid контейнерах)
<div className="flex gap-2">Items with 8px gap</div>
<div className="flex gap-4">Items with 16px gap</div>
<div className="flex gap-8">Items with 32px gap</div>
```

---

### 9. Текстовые утилиты

```jsx
// Размеры
<p className="text-sm">Small text</p>
<p className="text-base">Normal text</p>
<p className="text-lg">Large text</p>

// Цвета
<p className="text-primary">Primary color</p>
<p className="text-secondary">Secondary color</p>
<p className="text-tertiary">Tertiary color</p>
<p className="text-accent">Accent color</p>

// Вес
<p className="font-light">Light</p>
<p className="font-normal">Normal</p>
<p className="font-medium">Medium</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>
```

---

### 10. Alerts

```jsx
<div className="alert alert-info">
  <div className="alert-icon">ℹ️</div>
  <div className="alert-content">Informational message</div>
</div>

<div className="alert alert-success">
  <div className="alert-icon">✓</div>
  <div className="alert-content">Success message</div>
</div>

<div className="alert alert-warning">
  <div className="alert-icon">⚠️</div>
  <div className="alert-content">Warning message</div>
</div>

<div className="alert alert-error">
  <div className="alert-icon">✕</div>
  <div className="alert-content">Error message</div>
</div>
```

---

### 11. Модалы

```jsx
const [isOpen, setIsOpen] = useState(false);

<>
  <button onClick={() => setIsOpen(true)}>Open Modal</button>

  {isOpen && (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Modal Title</h2>
          <button 
            className="modal-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p>Modal content goes here</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}
</>
```

---

## CSS переменные для кастомизации

### Цвета

```css
:root {
  /* Primary colors */
  --color-primary-500: #8b5cf6;
  --color-primary-400: #a78bfa;
  --color-primary-300: #c4b5fd;

  /* Secondary colors */
  --color-secondary-500: #6366f1;
  --color-secondary-600: #4f46e5;

  /* Accent */
  --color-accent-500: #ec4899;

  /* Backgrounds */
  --bg-primary: #0a0a14;
  --bg-secondary: #12121f;
  --bg-elevated: #252538;

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
}
```

### Как изменить цвет кнопки на весь сайт

```css
/* Просто измени переменную */
:root {
  --color-primary-500: #6366f1; /* Было фиолет, стало индиго */
}
/* Все кнопки автоматически изменятся */
```

---

## Анимации

### Встроенные анимации

```jsx
// Fade in
<div className="animate-fade">Content appears</div>

// Slide in up
<div className="animate-slide-in-up">Slides in from bottom</div>

// Slide in down
<div className="animate-slide-in-down">Slides in from top</div>

// Pulse (пульсирование)
<div className="animate-pulse">Loading...</div>
```

### Кастомные анимации

```css
/* В вашем CSS файле */
@keyframes myAnimation {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.my-animated-element {
  animation: myAnimation 0.3s ease-out;
}
```

---

## Responsive design примеры

```jsx
// На мобилке 1 колонка, на планшете 2, на десктопе 3
<div className="grid grid-cols-3 gap-6">
  {cards.map(card => (
    <div key={card.id} className="card">
      {/* content */}
    </div>
  ))}
</div>

// На мобилке flex-col, на десктопе flex-row
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Left side</div>
  <div className="flex-1">Right side</div>
</div>
```

---

## Accessibility (Доступность)

```jsx
// Всегда добавляй title и aria-label
<button 
  className="btn btn-primary" 
  title="Save document"
  aria-label="Save current document"
>
  Save
</button>

// Для иконок используй aria-hidden
<button className="btn btn-primary">
  Download
  <Download size={20} aria-hidden="true" />
</button>

// Для форм правильный label
<label htmlFor="email-input" className="block mb-2">
  Email address
</label>
<input id="email-input" type="email" className="input" />

// Для функциональности клавиатуры
<div role="tablist">
  <button 
    role="tab" 
    aria-selected={activeTab === 0}
    onClick={() => setActiveTab(0)}
  >
    Tab 1
  </button>
</div>
```

---

## Частые вопросы

### Q: Как поменять цвет только одной кнопки?
**A**: Используй inline style:
```jsx
<button className="btn btn-primary" style={{background: '#ec4899'}}>
  Special button
</button>
```

### Q: Как добавить тень?
**A**: Используй утилиту `box-shadow`:
```jsx
<div className="card" style={{boxShadow: 'var(--shadow-lg)'}}>
  Content
</div>
```

### Q: Как сделать скругленные углы больше?
**A**: Используй var(--radius-2xl):
```jsx
<div style={{borderRadius: 'var(--radius-2xl)'}}>
  Very rounded
</div>
```

### Q: Как добавить spacing между элементами?
**A**: Используй gap утилиту:
```jsx
<div className="flex flex-col gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## Resources

- [CSS Variables Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Happy coding!** 🚀
