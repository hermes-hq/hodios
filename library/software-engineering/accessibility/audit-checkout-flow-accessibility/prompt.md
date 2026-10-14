---
schema: 1
id: audit-checkout-flow-accessibility
kind: prompt
title: Audit an e-commerce checkout flow for accessibility
description: Audits an online checkout end to end, from cart to confirmation, covering forms, payment iframes, address lookup, errors, time limits and confirmation, with blockers ranked and fixes.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify, review]
role: [frontend-engineer, qa-engineer, product-manager]
subject: [ecommerce]
requires: [repo-read]
inputs: [repo, file, url, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [checkout, payment-iframe, user-journey, wcag, conversion]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-form-accessibility, make-multi-step-form-accessible, write-screen-reader-test-plan, prioritize-accessibility-findings]
args:
  - name: checkout
    description: The checkout code or file paths, or a step-by-step description of the flow with screenshots, plus the payment provider, address lookup, and any captcha or fraud checks.
    type: text
    required: true
  - name: platform
    description: The shop platform or stack, for example Shopify, WooCommerce, Magento or a custom Next.js storefront.
    type: string
output_contract:
  format: markdown
  sections: [Journey map, Blockers, Serious issues, Third-party components, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A checkout is the flow where one barrier loses the whole sale, so it should be audited as a journey, not as separate pages. The places it usually breaks: quantity steppers and "remove" icons in the cart without names; promo-code fields that apply silently; guest checkout hidden behind an account wall; address autocomplete that is a mouse-only listbox and blocks manual entry; payment fields in provider iframes with missing titles, labels or error announcements (some provider options fix this, others do not); 3-D Secure and other bank challenges opened in a modal that traps or loses focus; captchas with no alternative in another modality (WCAG 1.1.1 requires one; when the captcha is part of signing in, 3.3.8 accessible authentication also applies); session or reservation timers that expire without warning (2.2.1); errors shown only at the top or only by colour; delivery-slot pickers built as custom grids; and an order confirmation that is not announced or has no heading. A good audit maps each step, tests it with keyboard, screen reader and zoom, separates first-party code from third-party components, and ranks findings by whether a user can complete the purchase at all.
</context>

<task>
Audit this checkout for accessibility.

<checkout>
{{checkout}}
</checkout>
{{#platform}}
Platform: {{platform}}
{{/platform}}

1. Map the journey step by step: cart, sign-in or guest, delivery address, delivery options, payment, review, verification such as 3-D Secure, confirmation. Note what each step contains and what you could inspect (code, screenshots, description); mark anything inferred.
2. For each step, check keyboard operation and visible focus, names and roles of controls, form labels, instructions, autocomplete tokens, error identification and announcement, focus on step change, dynamic updates (totals, promo codes, delivery prices) announced, contrast and use of colour, reflow at 320 px and target size.
3. Check flow-level risks: time limits and warnings, authentication and captcha alternatives, redundant entry (billing same as delivery), consistent help, and whether the user can review and correct before paying (3.3.4).
4. Separate third-party components (payment iframes, address lookup, captcha, chat widget) from first-party code. For each, say what can be configured, what must be raised with the vendor, and whether an alternative path exists.
5. Rank findings: blocker (cannot complete purchase), serious (major effort or confusion), moderate. For each, give the WCAG 2.2 criterion, who is affected, where it occurs and a concrete fix.
6. Write a short test plan for the full journey with keyboard only, NVDA with a browser, VoiceOver on iOS and 400% zoom, including a real or test payment.
</task>

<constraints>
- Read-only: report and propose fixes, do not edit code in this run.
- Do not claim a third-party component passes or fails without evidence; mark it as "needs testing" when you cannot inspect it.
- Do not declare the checkout conformant; an audit from code and descriptions must be confirmed with assistive technology.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Journey map
Numbered steps with what was inspected.

## Blockers
Numbered: step, issue, who is blocked, WCAG criterion, fix.

## Serious issues
Same format.

## Third-party components
Table: component | issues | configurable fix | vendor action | alternative path.

## Test plan
Checklist per assistive technology.
</output_format>
