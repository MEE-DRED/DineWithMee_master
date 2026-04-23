# Accessibility Quick Reference Guide

Quick reference for developers working on DineWithMee. For comprehensive guidance, see [ACCESSIBILITY.md](../ACCESSIBILITY.md).

---

## 🚀 Quick Commands

```bash
# Check accessibility issues
npm run lint:a11y

# Fix auto-fixable issues
npm run lint:a11y -- --fix

# Build and preview (for Lighthouse testing)
npm run build && npm run preview

# Run full lint check
npm run lint
```

---

## ✅ Pre-Commit Checklist

Before committing code that touches UI:

- [ ] Ran `npm run lint:a11y` with no errors
- [ ] Tested with keyboard only (Tab, Enter, Space, Arrow keys, Escape)
- [ ] Verified focus visible on all interactive elements
- [ ] Checked color contrast (if adding/changing colors)
- [ ] Added `aria-label` to icon-only buttons
- [ ] Associated labels with form inputs

---

## 🎨 Common Patterns

### Accessible Button

```jsx
// Text button (good by default)
<button onClick={handleClick}>Save Changes</button>

// Icon-only button (needs aria-label)
<button onClick={handleClose} aria-label="Close dialog">
  <XIcon />
</button>

// Loading button
<button 
  onClick={handleSubmit} 
  disabled={loading}
  aria-busy={loading}
>
  {loading ? 'Saving...' : 'Save'}
</button>
```

### Accessible Form Field

```jsx
import { useId } from '../hooks/useAccessibility';

function FormField({ label, error, required }) {
  const id = useId('field');
  const errorId = `${id}-error`;
  
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      <input
        id={id}
        type="text"
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert" className="error">
          {error}
        </span>
      )}
    </div>
  );
}
```

### Accessible Modal

```jsx
import { useFocusTrap } from '../hooks/useAccessibility';
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  useFocusTrap(isOpen, { containerRef: modalRef });
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">
          Close
        </button>
      </div>
    </div>
  );
}
```

### Accessible Live Region (Announcements)

```jsx
import { useAnnouncer } from '../hooks/useAccessibility';

function CartButton() {
  const { announce } = useAnnouncer();
  
  const addToCart = (item) => {
    // Add item to cart logic
    announce(`${item.name} added to cart`, 'polite');
  };
  
  return <button onClick={addToCart}>Add to Cart</button>;
}
```

### Accessible List/Menu

```jsx
function NavigationMenu({ items }) {
  return (
    <nav aria-label="Main navigation">
      <ul role="menubar">
        {items.map((item) => (
          <li key={item.id} role="none">
            <a 
              href={item.url}
              role="menuitem"
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## 🔍 Common ESLint Errors

### `jsx-a11y/alt-text`
```jsx
// ❌ Bad
<img src="logo.png" />

// ✅ Good
<img src="logo.png" alt="DineWithMee logo" />

// ✅ Decorative images
<img src="decorative.png" alt="" />
```

### `jsx-a11y/anchor-is-valid`
```jsx
// ❌ Bad
<a href="#">Click here</a>

// ✅ Good - Use button for click handlers
<button onClick={handleClick}>Click here</button>

// ✅ Good - Real links have hrefs
<a href="/about">About</a>
```

### `jsx-a11y/label-has-associated-control`
```jsx
// ❌ Bad
<label>Email</label>
<input type="email" />

// ✅ Good - Using htmlFor
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Good - Nesting
<label>
  Email
  <input type="email" />
</label>
```

### `jsx-a11y/click-events-have-key-events`
```jsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good - Use button element
<button onClick={handleClick}>Click me</button>

// ✅ Good - Add keyboard handler if div is necessary
<div 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabIndex={0}
>
  Click me
</div>
```

### `jsx-a11y/no-autofocus`
```jsx
// ❌ Bad - Don't use autofocus
<input autoFocus />

// ✅ Good - Focus programmatically when appropriate
useEffect(() => {
  if (shouldFocus) {
    inputRef.current?.focus();
  }
}, [shouldFocus]);
```

---

## 🎯 ARIA Attribute Cheat Sheet

### Common States
| Attribute | Values | Use Case |
|-----------|--------|----------|
| `aria-expanded` | `true`/`false` | Dropdown/accordion state |
| `aria-pressed` | `true`/`false` | Toggle button state |
| `aria-checked` | `true`/`false`/`mixed` | Checkbox state |
| `aria-selected` | `true`/`false` | Selected item in list |
| `aria-current` | `page`/`step`/`true` | Current item in navigation |
| `aria-disabled` | `true`/`false` | Disabled state |
| `aria-hidden` | `true`/`false` | Hide from screen readers |
| `aria-invalid` | `true`/`false` | Form validation state |
| `aria-busy` | `true`/`false` | Loading state |

### Common Properties
| Attribute | Use Case |
|-----------|----------|
| `aria-label` | Label for icon-only buttons |
| `aria-labelledby` | Reference to visible label element |
| `aria-describedby` | Reference to description/help text |
| `aria-controls` | ID of element controlled by this one |
| `aria-live` | Announce dynamic content changes |
| `aria-modal` | Indicate modal dialog |
| `aria-required` | Mark required form fields |

### Live Regions
| Attribute | Politeness | Use Case |
|-----------|-----------|----------|
| `aria-live="polite"` | Wait for pause | Status updates, non-urgent |
| `aria-live="assertive"` | Interrupt | Errors, important alerts |
| `role="alert"` | Assertive | Error messages |
| `role="status"` | Polite | Loading, success messages |
| `role="log"` | Polite | Chat messages, activity feed |

---

## ⌨️ Keyboard Navigation Standards

| Element Type | Keyboard Interaction |
|-------------|---------------------|
| Button | Enter or Space to activate |
| Link | Enter to follow |
| Checkbox | Space to toggle |
| Radio | Arrow keys to select, Space to check |
| Dropdown | Arrow keys to navigate, Enter to select |
| Tab Panel | Arrow keys to switch tabs |
| Dialog | Escape to close |
| Menu | Arrow keys, Home/End, Escape |

---

## 🎨 Color Contrast Requirements

| Content Type | Ratio | Example |
|-------------|-------|---------|
| Normal text | 4.5:1 | Body copy, paragraphs |
| Large text (18pt+) | 3:1 | Headings, callouts |
| UI components | 3:1 | Form borders, icons |
| Focus indicators | 3:1 | Outline around focused element |

**Test your colors:** https://webaim.org/resources/contrastchecker/

---

## 🔧 Testing Tools

### Browser Extensions (Install These)
- **axe DevTools** - https://www.deque.com/axe/devtools/
- **WAVE** - https://wave.webaim.org/extension/
- **Lighthouse** - Built into Chrome DevTools

### Screen Readers
- **NVDA** (Windows) - Free - https://www.nvaccess.org/
- **VoiceOver** (Mac) - Built-in - Cmd+F5
- **TalkBack** (Android) - Built-in
- **JAWS** (Windows) - $95/year - https://www.freedomscientific.com/

### Color Tools
- **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **Color Oracle** - Colorblind simulator - https://colororacle.org/
- **Chrome DevTools** - Built-in vision deficiency simulator

---

## 🚨 Critical Rules (Never Break These)

1. **All images must have alt text** (or `alt=""` if decorative)
2. **All form inputs must have associated labels**
3. **All interactive elements must be keyboard accessible**
4. **Color cannot be the only means of conveying information**
5. **Focus must always be visible**
6. **Modals must trap focus**
7. **Page must have exactly one `<h1>`**
8. **Headings must be in hierarchical order** (no skipping levels)
9. **Links must have descriptive text** (not "click here")
10. **Dynamic content changes must be announced**

---

## 📚 Learn More

### Internal Docs
- [Full Accessibility Guide](../ACCESSIBILITY.md)
- [Monthly Audit Checklist](../MONTHLY_A11Y_AUDIT.md)
- [Professional Audit Guide](./PROFESSIONAL_AUDIT_GUIDE.md)

### External Resources
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Inclusive Components](https://inclusive-components.design/)
- [a11y Project Checklist](https://www.a11yproject.com/checklist/)

### Communities
- [a11y Slack](https://web-a11y.slack.com/)
- [#a11y on Twitter](https://twitter.com/hashtag/a11y)
- [r/accessibility on Reddit](https://www.reddit.com/r/accessibility/)

---

## 💬 Get Help

**Questions about accessibility?**

1. Check [ACCESSIBILITY.md](../ACCESSIBILITY.md) first
2. Search past discussions in team Slack #accessibility channel
3. Ask in daily standup
4. Consult with accessibility champion: [Name]
5. Review past audit reports in `/docs/audits/`

**Found a bug?**
- Label GitHub issues with `a11y` tag
- Include steps to reproduce
- Note which assistive technology you used

---

**Last Updated:** April 2026
**Quick Start:** `npm run lint:a11y` → Fix issues → `git commit`
