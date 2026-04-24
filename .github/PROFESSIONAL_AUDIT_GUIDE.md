# Professional Accessibility Audit Guide

## Why Get a Professional Audit?

While automated tools and manual testing catch many issues, a professional accessibility audit provides:

✅ **Expert Manual Testing** - Real people with disabilities test your application
✅ **Legal Compliance** - Verification of ADA, Section 508, WCAG 2.1 AA compliance
✅ **Assistive Technology Testing** - Testing with multiple screen readers and tools
✅ **Risk Assessment** - Identify high-priority legal and UX risks
✅ **Detailed Remediation** - Specific, actionable fixes for each issue
✅ **Certification** - Documentation for compliance requirements

---

## When to Get an Audit

### Recommended Timeline
- **Before Public Launch** - Ensure compliance before exposing to legal risk
- **Annually** - Ongoing compliance verification
- **After Major Redesign** - Validate accessibility of new features
- **Before Healthcare Compliance Review** - HIPAA, ADA requirements

### Trigger Events
- Preparing for Series A/B funding (due diligence requirement)
- Receiving accessibility complaint or legal notice
- Expanding to government/enterprise customers (508 compliance)
- Launching in regulated markets (healthcare, education, finance)

---

## Cost & Timeline

### Typical Pricing
- **Small Audit (5-10 pages):** $2,000 - $3,500
- **Medium Audit (10-20 pages):** $3,500 - $6,000
- **Large Audit (20+ pages):** $6,000 - $15,000
- **Ongoing Support:** $1,000 - $3,000/month

### Timeline
- **Initial Audit:** 2-4 weeks
- **Remediation Support:** 1-3 months
- **Re-testing:** 1-2 weeks

---

## Recommended Audit Firms

### Top-Tier Firms

**1. Deque Systems**
- Website: https://www.deque.com
- Strengths: Industry leader, creators of axe
- Services: Audits, training, consulting, tools
- Best for: Enterprise, complex applications

**2. Level Access**
- Website: https://www.levelaccess.com
- Strengths: Compliance expertise, government clients
- Services: Audits, remediation, monitoring
- Best for: Healthcare, government, financial services

**3. TPGi (The Paciello Group)**
- Website: https://www.tpgi.com
- Strengths: Deep technical expertise, ARIA authors
- Services: Audits, consulting, research
- Best for: Technical implementations, SPA/PWA

**4. Accessible360**
- Website: https://accessible360.com
- Strengths: User testing with disabilities, training
- Services: Audits, user testing, training
- Best for: User-centered approach

### Mid-Tier Firms

**5. Bureau of Internet Accessibility (BoIA)**
- Website: https://www.boia.org
- Pricing: More affordable, automated + manual
- Best for: Small-medium businesses

**6. UsableNet**
- Website: https://usablenet.com
- Strengths: AI-powered monitoring
- Best for: Ongoing compliance monitoring

### Freelance/Consultants

**7. Independent Accessibility Consultants**
- Find via: a11y Slack community, Twitter #a11y
- Pricing: $150 - $300/hour
- Best for: Smaller budgets, specific issues

---

## What to Expect from an Audit

### Phase 1: Scoping (Week 1)
- **Kickoff Meeting** - Discuss goals, scope, timeline
- **Page Selection** - Identify critical user flows
- **Template Definition** - Which page templates to audit
- **User Persona Selection** - Which roles/permissions to test

**DineWithMee Scope Recommendation:**
- Home page
- Health Assessment Form (high priority)
- AI Chat interface
- Customer Dashboard
- Nutritionist Dashboard
- Consultation Scheduler
- Marketplace & Cart
- Login/Signup flows

### Phase 2: Testing (Weeks 2-3)
- **Automated Scanning** - axe, WAVE, other tools
- **Manual Keyboard Testing** - All user flows
- **Screen Reader Testing** - NVDA, JAWS, VoiceOver
- **Assistive Tech Testing** - Voice control, magnification
- **Mobile Testing** - iOS VoiceOver, Android TalkBack
- **User Testing** - Real users with disabilities (optional)

### Phase 3: Reporting (Week 3-4)
- **Findings Report** - All issues documented
- **Severity Ratings** - Critical, Serious, Moderate, Minor
- **WCAG Mapping** - Which success criteria violated
- **Remediation Guidance** - How to fix each issue
- **Priority Matrix** - What to fix first

### Phase 4: Remediation Support (Ongoing)
- **Developer Q&A** - Clarify recommended fixes
- **Code Review** - Review proposed solutions
- **Re-testing** - Validate fixes
- **Certification** - Compliance documentation

---

## Audit Report Example Structure

```
1. Executive Summary
   - Overall compliance rating
   - High-level findings
   - Risk assessment
   - Recommendations

2. Methodology
   - Tools used
   - Pages tested
   - Standards applied (WCAG 2.1 AA)

3. Detailed Findings
   For each issue:
   - Description & location
   - WCAG criteria violated
   - Severity (Critical/Serious/Moderate/Minor)
   - User impact
   - How to reproduce
   - Recommended fix
   - Code example

4. Summary Tables
   - Issues by severity
   - Issues by WCAG principle
   - Issues by page/component

5. Remediation Roadmap
   - Priority order
   - Estimated effort
   - Dependencies

6. Appendices
   - Screenshots
   - Screen reader logs
   - Test environment details
```

---

## Preparing for an Audit

### 2 Weeks Before
- [ ] Complete as much internal testing as possible
- [ ] Run automated tools (ESLint, axe, Lighthouse)
- [ ] Fix obvious issues
- [ ] Document known issues
- [ ] Prepare staging environment
- [ ] Create test accounts for each role (Customer, Nutritionist, Admin, Pharmacy)
- [ ] Document user flows to prioritize

### 1 Week Before
- [ ] Share technical documentation
- [ ] Provide access credentials
- [ ] Schedule kickoff meeting
- [ ] Identify stakeholders for remediation phase
- [ ] Set success criteria and deadlines

### During Audit
- [ ] Assign internal point of contact
- [ ] Be available for questions
- [ ] Don't make major changes during audit period
- [ ] Document any issues you find independently

---

## Maximizing Value from an Audit

### Do's
✅ **Fix low-hanging fruit first** - Don't pay auditors to find obvious issues
✅ **Ask questions** - Clarify anything unclear in the report
✅ **Prioritize by user impact** - Not just by severity rating
✅ **Request code examples** - Ensure remediation guidance is actionable
✅ **Learn patterns** - Understand root causes, not just individual issues
✅ **Schedule re-test** - Validate your fixes before final certification

### Don'ts
❌ **Don't treat as one-time checklist** - Build ongoing accessibility culture
❌ **Don't ignore "minor" issues** - They add up to poor UX
❌ **Don't rush remediation** - Take time to fix properly
❌ **Don't audit unfinished features** - Wait until features are stable
❌ **Don't skip training** - Ensure team understands how to maintain compliance

---

## ROI & Business Case

### Risk Mitigation
- **Legal Risk:** ADA lawsuits average $20K-$50K in settlements
- **Reputational Risk:** Public complaints damage brand trust
- **Market Access:** Required for government/enterprise contracts

### Market Expansion
- **Addressable Market:** 26% of US adults have a disability
- **Purchasing Power:** $490B annual spending by people with disabilities
- **SEO Benefits:** Many a11y practices improve search rankings
- **Mobile UX:** Accessibility improvements benefit all mobile users

### Healthcare Specific
- **Compliance Required:** ADA, Section 508, HIPAA all have a11y components
- **Patient Safety:** Accessible health tools reduce medical errors
- **Inclusive Care:** Ethical requirement to serve all patients
- **Insurance Requirements:** Some health plans require a11y certification

---

## Questions to Ask Audit Firms

### Methodology
- [ ] What automated tools do you use?
- [ ] How much manual testing vs automated?
- [ ] Do you test with real assistive technology users?
- [ ] Which screen readers and devices?
- [ ] Do you test mobile accessibility?

### Deliverables
- [ ] What does the final report include?
- [ ] Will you provide code examples for fixes?
- [ ] Do you offer remediation support?
- [ ] Can you review our fixes before re-testing?
- [ ] Do you provide compliance certification?

### Team & Expertise
- [ ] Who will conduct the audit? (junior vs senior)
- [ ] Do you have healthcare experience?
- [ ] Are your auditors certified? (IAAP CPACC/WAS)
- [ ] Do you have users with disabilities on your team?

### Timeline & Pricing
- [ ] What's included in base price?
- [ ] What costs extra?
- [ ] How long until we receive the report?
- [ ] What's your re-testing policy?
- [ ] Do you offer ongoing monitoring?

---

## Alternatives to Full Audit

### Lower-Cost Options

**1. Self-Serve Audit Tools**
- **Equally AI:** $500-$2,000/year for automated monitoring
- **AudioEye:** $500-$5,000/year depending on site size
- **Pros:** Affordable, continuous monitoring
- **Cons:** Less thorough than human testing

**2. Crowdsourced Testing**
- **Fable:** $1,500-$3,000 per test with users with disabilities
- **UserTesting:** Pay-per-test with accessibility panel
- **Pros:** Real user feedback
- **Cons:** Less structured than formal audit

**3. Consultant Review**
- **Hire independent consultant** for 2-3 days
- **Cost:** $3,000-$6,000
- **Pros:** Personal attention, teaching opportunity
- **Cons:** Less formal documentation

---

## After the Audit

### Remediation Process
1. **Triage issues** by severity and impact
2. **Create GitHub issues** for each finding
3. **Assign to sprints** based on priority
4. **Test fixes** with same tools as auditors
5. **Request re-test** from audit firm
6. **Obtain certification** if applicable

### Ongoing Compliance
- Continue monthly audits (see MONTHLY_A11Y_AUDIT.md)
- Run automated tools in CI/CD
- Train new developers on accessibility
- Budget for annual professional re-audit

### Documentation
- Keep audit report for compliance records
- Document remediation decisions
- Update internal accessibility guidelines
- Share learnings with team

---

## Budget Template

### One-Time Costs
| Item | Cost | Notes |
|------|------|-------|
| Initial Professional Audit | $5,000 | 10-15 pages |
| Remediation Development | $15,000 | ~80 dev hours @ $150/hr |
| Re-testing | $1,500 | Validate fixes |
| Training for Team | $2,000 | 2-day workshop |
| **Total Year 1** | **$23,500** | |

### Ongoing Costs
| Item | Annual Cost | Notes |
|------|-------------|-------|
| Annual Re-audit | $4,000 | Smaller scope |
| Monitoring Tools | $1,500 | Automated scanning |
| Monthly Internal Audits | $6,000 | 4 hours/month @ $125/hr |
| **Total Annual** | **$11,500** | |

---

## Contact Information

**Ready to schedule an audit?**

1. Review recommended firms above
2. Request quotes from 2-3 firms
3. Compare methodology and pricing
4. Schedule for Q3 2026 (post Phase 1-5 completion)

**Questions?** Contact your engineering lead or accessibility champion.

---

## Additional Resources

- [ADA Requirements for Web Accessibility](https://www.ada.gov/resources/web-guidance/)
- [Section 508 Standards](https://www.section508.gov/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Healthcare Accessibility Resources](https://webaim.org/articles/healthcare/)

---

**Last Updated:** April 2026
**Next Review:** October 2026
