# Phase 8: CI/CD & Continuous Monitoring Setup

This document explains the automated accessibility monitoring infrastructure for DineWithMee.

---

## 📁 Files Created

### GitHub Actions Workflows
- **`.github/workflows/accessibility.yml`** - Main CI/CD pipeline for accessibility checks
  - Runs ESLint accessibility checks on every PR
  - Performs Lighthouse audits
  - Comments PR with detailed violation reports
  - Uploads artifacts for later review

### Configuration Files
- **`.lighthouserc.json`** - Lighthouse CI configuration
  - Defines which pages to audit
  - Sets minimum accessibility scores (90%)
  - Configures desktop testing preset

### Documentation
- **`MONTHLY_A11Y_AUDIT.md`** - Comprehensive monthly audit checklist
- **`.github/PROFESSIONAL_AUDIT_GUIDE.md`** - Guide for hiring external auditors
- **`.github/A11Y_QUICK_REFERENCE.md`** - Developer quick reference guide
- **`.github/ISSUE_TEMPLATE/accessibility-issue.md`** - Template for reporting a11y issues

---

## 🚀 How It Works

### Automated PR Checks

When you create or update a pull request:

1. **ESLint Accessibility Check** runs automatically
   - Scans all `.jsx` and `.js` files for accessibility violations
   - Reports errors and warnings
   - Posts detailed comment to PR with findings table
   - Fails the build if critical errors exist

2. **Lighthouse Accessibility Audit** runs
   - Builds the application
   - Audits key pages (home, health, marketplace, etc.)
   - Checks for 90% minimum accessibility score
   - Provides detailed Lighthouse report

3. **PR Comment** is posted automatically
   - Summary of violations found
   - Table of top 10 accessibility issues
   - Links to resources and documentation
   - Pass/fail status

4. **Artifacts Uploaded**
   - ESLint JSON report saved for 30 days
   - Lighthouse reports saved
   - Can be downloaded for detailed analysis

### Build Protection

- **PRs with critical errors cannot merge** until fixed
- Warnings don't block merges but should be addressed
- Maintainers can override if necessary

---

## ⚙️ Setup Required

### Prerequisites (Phase 1 Must Be Complete)

Before this workflow functions properly, you need:

1. **Install ESLint jsx-a11y plugin:**
   ```bash
   npm install --save-dev eslint-plugin-jsx-a11y
   ```

2. **Configure ESLint** (in `eslint.config.js`):
   ```javascript
   import jsxA11y from 'eslint-plugin-jsx-a11y';
   
   export default [
     {
       plugins: {
         'jsx-a11y': jsxA11y,
       },
       rules: {
         ...jsxA11y.configs.recommended.rules,
       },
     },
   ];
   ```

3. **Add npm scripts** (in `package.json`):
   ```json
   {
     "scripts": {
       "lint:a11y": "eslint . --ext .js,.jsx",
       "lint:a11y:fix": "eslint . --ext .js,.jsx --fix"
     }
   }
   ```

### GitHub Repository Settings

1. **Enable GitHub Actions**
   - Go to Settings → Actions → General
   - Allow all actions and reusable workflows

2. **Configure Branch Protection** (recommended)
   - Go to Settings → Branches → Branch protection rules
   - Add rule for `main` branch:
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - Select: "Accessibility Compliance Check"

3. **Enable Issues**
   - Go to Settings → General → Features
   - ✅ Issues (for accessibility issue template)

---

## 🔍 Testing the Workflow

### Local Testing (Before Pushing)

```bash
# Install dependencies (if Phase 1 complete)
npm install

# Run accessibility lint
npm run lint:a11y

# Fix auto-fixable issues
npm run lint:a11y -- --fix

# Build for Lighthouse testing
npm run build
npm run preview

# Run Lighthouse manually (Chrome DevTools)
# Open http://localhost:4173 in Chrome
# F12 → Lighthouse tab → Generate report
```

### Testing the GitHub Action

1. **Create a test branch:**
   ```bash
   git checkout -b test-accessibility-workflow
   ```

2. **Make a small change** to trigger the workflow:
   ```bash
   echo "// Test comment" >> src/App.jsx
   git add src/App.jsx
   git commit -m "test: Trigger accessibility workflow"
   git push origin test-accessibility-workflow
   ```

3. **Create a PR** from `test-accessibility-workflow` to `main`

4. **Check the Actions tab** in GitHub to see the workflow running

5. **Review the PR comment** posted by the bot

---

## 📊 Interpreting Results

### ESLint Report

**Example output:**
```
Accessibility Check Results
Status: Accessibility violations found

Summary:
- Total Errors: 12
- Total Warnings: 24
- Accessibility Errors: 8
- Accessibility Warnings: 18
```

**Common violations:**

| Rule | Severity | Meaning |
|------|----------|---------|
| `jsx-a11y/alt-text` | Error | Image missing alt text |
| `jsx-a11y/label-has-associated-control` | Error | Form input missing label |
| `jsx-a11y/click-events-have-key-events` | Error | Click handler needs keyboard support |
| `jsx-a11y/anchor-is-valid` | Warning | Link has no href |
| `jsx-a11y/no-autofocus` | Warning | Autofocus should be avoided |

**What to do:**
1. Click on the artifact link to download full report
2. Open `eslint-report.json` to see all violations
3. Fix errors first, then warnings
4. Run `npm run lint:a11y` locally to verify fixes

### Lighthouse Report

**Scoring:**
- **90-100:** Good - Minor issues only
- **50-89:** Needs improvement - Address moderate issues
- **0-49:** Poor - Critical issues exist

**Common Lighthouse failures:**
- Missing ARIA labels
- Poor color contrast
- Missing form labels
- Images without alt text
- Missing document title

**What to do:**
1. Review the Lighthouse report artifact
2. Focus on "Accessibility" category
3. Fix issues listed in "Opportunities"
4. Re-run Lighthouse locally to verify

---

## 🔄 Monthly Audit Process

### Schedule
**First week of each month** - rotate auditor each month

### Steps

1. **Use the checklist:** Open `MONTHLY_A11Y_AUDIT.md`
2. **Complete all sections:**
   - Automated testing (ESLint, Lighthouse, axe)
   - Manual keyboard testing
   - Screen reader testing
   - Visual testing (contrast, zoom)
3. **Document findings:** Create GitHub issues for any problems
4. **Prioritize:** Label issues as Critical/Serious/Moderate/Minor
5. **Report:** Share summary with team
6. **Track progress:** Update issues in sprint planning

### Auditor Rotation

| Month | Auditor | Status |
|-------|---------|--------|
| May 2026 | TBD | Upcoming |
| June 2026 | TBD | Upcoming |
| July 2026 | TBD | Upcoming |

*Update this table as audits are completed*

---

## 💰 Professional Audit Planning

### When to Schedule

- **Before public launch** (Q3 2026)
- **After completing Phases 1-7**
- **Before major releases**
- **Annually for compliance**

### Budget

- **Initial audit:** $4,000 - $6,000
- **Re-testing:** $1,500 - $2,000
- **Annual audits:** $3,000 - $5,000

### Process

1. Review `.github/PROFESSIONAL_AUDIT_GUIDE.md`
2. Request quotes from 2-3 firms (Deque, Level Access, TPGi)
3. Schedule for post Phase 1-5 completion
4. Allocate budget: ~$25,000 for Year 1 (audit + remediation)

---

## 🐛 Reporting Issues

### For Developers

**Found an accessibility issue?**

1. Go to GitHub Issues → New Issue
2. Select "Accessibility Issue" template
3. Fill out all relevant sections:
   - Description
   - Location
   - WCAG criteria violated
   - Steps to reproduce
   - Suggested fix
4. Add `accessibility` label
5. Assign to appropriate developer

### For Users

**Users can report via:**
- Email: accessibility@dinewithmee.com (set this up)
- Contact form with "Accessibility Issue" option
- GitHub issue (if they're technical)

**Triage process:**
1. Verify the issue
2. Determine severity
3. Create/update GitHub issue
4. Prioritize in next sprint
5. Notify reporter of timeline

---

## 📈 Metrics & Tracking

### Key Metrics

Track these monthly:

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| ESLint a11y errors | TBD | 0 | - |
| ESLint a11y warnings | TBD | <10 | - |
| Lighthouse score (avg) | TBD | >90 | - |
| Critical issues open | TBD | 0 | - |
| Time to fix (avg days) | TBD | <7 | - |
| Audit completion rate | TBD | 100% | - |

### Reporting

**Monthly report includes:**
- Violation trends (improving/worsening?)
- Issues opened vs closed
- Pages audited
- New accessibility features added
- Team training completed

**Share with:**
- Engineering team (Slack #accessibility)
- Product managers
- Executive team (quarterly)

---

## 🎓 Team Training

### Onboarding

**New developers must:**
1. Read `.github/A11Y_QUICK_REFERENCE.md` (15 min)
2. Complete interactive tutorial: https://www.w3.org/WAI/tutorials/ (2 hours)
3. Shadow a monthly audit (4 hours)
4. Fix 3 accessibility issues (supervised)

### Ongoing Education

**Quarterly workshops:**
- Q2 2026: Keyboard navigation and focus management
- Q3 2026: Screen reader testing basics
- Q4 2026: ARIA best practices
- Q1 2027: Advanced accessibility patterns

**Resources:**
- Weekly #a11y Slack digest
- Lunch & learn sessions
- Conference talks (A11y Camp, CSUN)
- Certification: IAAP CPACC (optional)

---

## 🔧 Troubleshooting

### Workflow Fails But Code Seems Fine

**Possible causes:**
1. ESLint config not loaded properly
   - Check `eslint.config.js` imports jsx-a11y plugin
   - Run `npx eslint --print-config src/App.jsx` to verify

2. Lighthouse can't build the app
   - Check build logs in GitHub Actions
   - Verify `VITE_API_URL` is set correctly
   - Test `npm run build` locally

3. PR comment not posted
   - Check GitHub token permissions
   - Verify workflow has `issues: write` permission

### False Positives

**If ESLint flags valid code:**

1. Verify it's actually valid (consult WCAG 2.1 docs)
2. If truly valid, add ESLint disable comment:
   ```jsx
   {/* eslint-disable-next-line jsx-a11y/rule-name */}
   <Component />
   ```
3. Document why in a comment
4. Consider if there's a better approach

### Lighthouse Scores Fluctuate

**This is normal.** Lighthouse scores vary slightly between runs.

**To get consistent results:**
- Run multiple times (workflow does 3 runs)
- Test on same hardware/network
- Focus on violations, not score number
- Track trends over time, not individual runs

---

## 🚀 Next Steps

### Immediate (This Week)
- [ ] Complete Phase 1 setup (ESLint jsx-a11y)
- [ ] Test workflow on a PR
- [ ] Review any violations found
- [ ] Schedule first monthly audit

### Short-term (This Month)
- [ ] Fix all critical violations
- [ ] Train team on quick reference guide
- [ ] Set up Slack #accessibility channel
- [ ] Assign monthly auditor rotation

### Long-term (This Quarter)
- [ ] Complete Phases 2-7 of accessibility plan
- [ ] Schedule professional audit
- [ ] Achieve 90+ Lighthouse scores across all pages
- [ ] Zero critical accessibility violations

---

## 📞 Support

**Questions about CI/CD setup?**
- Check this document first
- Review `.github/workflows/accessibility.yml` comments
- Ask in #accessibility Slack channel
- Contact DevOps lead

**Questions about accessibility?**
- See `.github/A11Y_QUICK_REFERENCE.md`
- See `ACCESSIBILITY.md` (when Phase 6 complete)
- Monthly audit documentation
- External resources in Professional Audit Guide

---

## 📚 Related Documentation

- [Accessibility Implementation Plan](../.claude/plans/suggest-new-improvement-declarative-raccoon.md)
- [Monthly Audit Checklist](../MONTHLY_A11Y_AUDIT.md)
- [Professional Audit Guide](./.github/PROFESSIONAL_AUDIT_GUIDE.md)
- [Quick Reference Guide](./.github/A11Y_QUICK_REFERENCE.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Phase 8 Status:** ✅ Complete
**Created:** April 2026
**Last Updated:** April 2026
**Next Review:** May 2026 (after first monthly audit)
