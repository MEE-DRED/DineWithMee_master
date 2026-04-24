# Monthly Accessibility Audit Checklist

**Purpose:** Ensure ongoing WCAG 2.1 AA compliance and catch regressions early.

**Schedule:** First week of each month

**Auditor Rotation:** Rotate team members each month to spread knowledge

---

## Pre-Audit Preparation

- [ ] Review git log for accessibility-related changes in the past month
- [ ] Check GitHub Actions for any failed accessibility builds
- [ ] Review user feedback/support tickets for accessibility issues
- [ ] Prepare testing environment (browser, screen reader, extensions)

---

## Automated Testing

### 1. ESLint Accessibility Check
```bash
npm run lint:a11y
```

- [ ] **Result:** Pass / Fail
- [ ] **Errors found:** ____
- [ ] **Warnings found:** ____
- [ ] **Action items documented:** Yes / No

### 2. Lighthouse Accessibility Audit
```bash
npm run build
npm run preview
# Run Lighthouse in Chrome DevTools
```

**Pages to audit:**
- [ ] Home page - Score: ____
- [ ] Health page - Score: ____
- [ ] Marketplace - Score: ____
- [ ] Customer Dashboard - Score: ____
- [ ] Nutritionist Dashboard - Score: ____
- [ ] AI Chat (ChatwithMee) - Score: ____

**Target:** All pages ≥90

### 3. axe DevTools Browser Extension

**Pages to scan:**
- [ ] Home
- [ ] Health Assessment Form
- [ ] AI Chat
- [ ] Consultation Scheduler
- [ ] Cart/Checkout flow

**Critical Issues:** ____
**Serious Issues:** ____
**Moderate Issues:** ____

---

## Manual Keyboard Testing

### Navigation Flows
Test each flow using **keyboard only** (no mouse):

#### Health Assessment Flow
- [ ] Navigate to `/customer/dashboard`
- [ ] Open health assessment form
- [ ] Tab through all form fields
- [ ] Complete all 4 steps using Tab, Enter, Space, Arrow keys
- [ ] Submit form
- [ ] Verify focus management between steps
- [ ] **Result:** Pass / Fail
- [ ] **Issues found:** ________________

#### AI Chat Flow
- [ ] Navigate to `/chat`
- [ ] Tab to message input
- [ ] Type message and press Enter to send
- [ ] Tab to quick reply buttons
- [ ] Activate quick reply with Enter/Space
- [ ] **Result:** Pass / Fail
- [ ] **Issues found:** ________________

#### Cart/Checkout Flow
- [ ] Navigate to marketplace
- [ ] Add item to cart (verify announcement)
- [ ] Open cart sidebar
- [ ] Adjust quantity with keyboard
- [ ] Tab to checkout button
- [ ] **Result:** Pass / Fail
- [ ] **Issues found:** ________________

#### Consultation Booking Flow
- [ ] Navigate to consultation scheduler
- [ ] Navigate date picker with arrow keys
- [ ] Select time slot with keyboard
- [ ] Complete booking form
- [ ] **Result:** Pass / Fail
- [ ] **Issues found:** ________________

### Focus Management
- [ ] Focus visible on all interactive elements
- [ ] No keyboard traps exist
- [ ] Focus order is logical
- [ ] Skip links work correctly
- [ ] Modals trap focus properly
- [ ] Focus restored after modal close

**Issues found:** ________________

---

## Screen Reader Testing

**Screen Reader Used:** NVDA / JAWS / VoiceOver / Other: ____

### Landmark Navigation
- [ ] Page title announced correctly
- [ ] Main landmark present and announced
- [ ] Navigation landmark present
- [ ] Complementary landmarks used appropriately
- [ ] Skip link functions correctly

### Component Testing

#### Health Assessment Form
- [ ] Form label associations correct
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Step progress announced
- [ ] Success/failure announced on submit
- [ ] **Result:** Pass / Fail

#### AI Chat Interface
- [ ] New messages announced automatically
- [ ] Typing indicator announced
- [ ] Message sender identified
- [ ] Timestamps readable
- [ ] Quick replies accessible
- [ ] **Result:** Pass / Fail

#### Navigation & Menus
- [ ] Navigation structure clear
- [ ] Current page identified
- [ ] Dropdown menus accessible
- [ ] Mobile menu accessible
- [ ] **Result:** Pass / Fail

#### Data Tables (if applicable)
- [ ] Table caption/summary present
- [ ] Headers properly associated
- [ ] Row/column navigation works
- [ ] **Result:** Pass / Fail

---

## Visual Testing

### Color Contrast
**Tool:** WebAIM Contrast Checker or browser extension

Sample locations to check:
- [ ] Body text on background (4.5:1)
- [ ] Heading text on background (4.5:1)
- [ ] Button text on button background (4.5:1)
- [ ] Link text (4.5:1)
- [ ] Error messages (4.5:1)
- [ ] Success messages (4.5:1)
- [ ] Focus indicators (3:1)
- [ ] Form field borders (3:1)

**Failures found:** ____

### Zoom & Reflow Testing
- [ ] Page tested at 200% zoom
- [ ] No horizontal scrolling at 200%
- [ ] Content remains readable
- [ ] No overlapping elements
- [ ] All functionality still works

**Issues found:** ________________

### Color Independence
**Tool:** Color Oracle (colorblind simulator)

- [ ] Information conveyed without color alone
- [ ] Error states have icons/text
- [ ] Success states have icons/text
- [ ] Required fields marked with asterisk
- [ ] Links underlined or otherwise distinguishable

**Issues found:** ________________

---

## Recently Changed Components

**List components modified in the past month:**

1. Component: ________________
   - [ ] Accessibility tested
   - [ ] Issues found: ________________

2. Component: ________________
   - [ ] Accessibility tested
   - [ ] Issues found: ________________

3. Component: ________________
   - [ ] Accessibility tested
   - [ ] Issues found: ________________

---

## User Feedback Review

**Accessibility-related support tickets/feedback this month:** ____

**Summary of issues:**
- Issue 1: ________________
- Issue 2: ________________
- Issue 3: ________________

**Actions taken:**
- ________________
- ________________

---

## Summary & Action Items

### Overall Assessment
- **Compliance Status:** Compliant / Minor Issues / Major Issues
- **Compared to last month:** Improved / Same / Regressed
- **Priority areas for improvement:** ________________

### Critical Issues (Fix within 1 week)
1. ________________
2. ________________
3. ________________

### Important Issues (Fix within 1 month)
1. ________________
2. ________________
3. ________________

### Minor Issues (Backlog)
1. ________________
2. ________________
3. ________________

### GitHub Issues Created
- Issue #____ - ________________
- Issue #____ - ________________
- Issue #____ - ________________

---

## Recommendations for Next Month

**Focus areas:**
- ________________
- ________________

**Training needed:**
- ________________
- ________________

**Tools to investigate:**
- ________________
- ________________

---

## Sign-off

**Auditor:** ________________
**Date:** ________________
**Time spent:** ____ hours
**Next audit due:** ________________

**Notes:**
________________
________________
________________

---

## Appendix: Testing Tools

### Required
- **ESLint:** Automated linting (built into project)
- **Lighthouse:** Chrome DevTools > Lighthouse tab
- **axe DevTools:** [Browser extension](https://www.deque.com/axe/devtools/)
- **Keyboard:** Physical keyboard testing

### Recommended
- **Screen Readers:**
  - NVDA (Windows) - Free
  - JAWS (Windows) - $95/year
  - VoiceOver (Mac) - Built-in
  - TalkBack (Android) - Built-in
- **Color Tools:**
  - WebAIM Contrast Checker
  - Color Oracle (colorblind simulator)
  - Stark plugin (Figma/Sketch)
- **Browser Extensions:**
  - WAVE
  - Accessibility Insights
  - Lighthouse
  - axe DevTools

### Professional Services
- **Annual Professional Audit:** $2,000-$5,000
  - Comprehensive manual testing
  - Legal compliance verification
  - Detailed remediation report
  - Consider for major releases

---

## Version History

| Version | Date | Changes | Auditor |
|---------|------|---------|---------|
| 1.0 | 2026-04-22 | Initial checklist created | - |
