---
schema: 1
id: plan-visual-refresh-rollout
kind: prompt
title: Plan a visual refresh rollout through the design system
description: Plans how a brand or visual refresh reaches every product through tokens and components, with a change inventory, a switchable theme, sequencing, visual QA and rollback.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [designer, frontend-engineer, tech-lead, product-manager]
requires: [none]
inputs: [text, spec, image]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [visual-refresh, rebrand-rollout, theming, visual-qa, release-planning]
pairs_with:
  prompts: [audit-hardcoded-styles-against-tokens, define-design-tokens, plan-rebrand]
  personas: [design-systems-lead, brand-strategist]
args:
  - name: refresh
    description: What is changing, e.g. "new primary colour, new typeface with different metrics, larger corner radius, new icon set". Include the new values if known.
    type: text
    required: true
  - name: products
    description: The products and platforms that must change and how each consumes the design system (package version, design library, hard-coded styles, native apps, emails, PDFs).
    type: text
    required: true
  - name: constraints
    description: Optional. Launch date, marketing announcement, release cycles, team capacity, or regulatory or contractual constraints on look and feel.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Change inventory, Readiness per product, Rollout strategy, Sequencing, Quality checks, Communication, Rollback, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A visual refresh is where a design system pays for itself or exposes its gaps. Changes that live entirely in semantic tokens ship in one release; anything hard-coded, overridden or built outside the system has to be found and fixed by hand, and that is where refreshes stall. Different kinds of change carry different risk: a new colour mostly risks contrast failures, while a new typeface changes line heights, text widths and truncation, and a new radius or spacing value moves layouts. Experienced teams ship the new look as a switchable theme so old and new can coexist, measure how much of each product is token-driven before promising a date, re-baseline visual regression tests on purpose rather than accepting every diff, and plan for the surfaces that lag: native apps tied to store releases, transactional emails, generated PDFs and third-party embeds.
</context>

<task>
Plan the rollout of this visual refresh.

<refresh>
{{refresh}}
</refresh>

<products>
{{products}}
</products>
{{#constraints}}

<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. **Change inventory.** For each change, say which layer it touches (primitive tokens, semantic tokens, component internals, assets such as icons and illustrations, fonts) and its risk type (contrast, layout shift, text metrics, recognisability). Flag any change that cannot be expressed through tokens.
2. **Readiness per product.** From the products list, estimate how token-driven each product is and what must happen before it can take the refresh (upgrade to a recent system version, remove hard-coded styles, migrate off overrides). Where readiness is unknown, name the audit that would measure it.
3. **Rollout strategy.** Recommend how old and new coexist: a new theme selected by a flag or attribute, a new major version, or a direct switch, and explain the choice. Cover fonts (loading, fallbacks, licence for every platform) and assets.
4. **Sequencing.** Order: system foundations, core components, then products by readiness and visibility. Separate the internal readiness date from any public launch date, and say what can ship dark (built but switched off) before launch.
5. **Quality checks.** Contrast for every text and UI pair in every theme, text truncation and wrapping with the new font in long and translated strings, layout checks at key breakpoints, a deliberate review of visual regression diffs, and screens outside the system (emails, PDFs, error pages, app store assets).
6. **Communication.** What product teams need to know and do, by when, and where to raise problems.
7. **Rollback.** How to switch back per product if something fails after launch, and what cannot be rolled back (store releases, sent emails).
8. If the refresh description lacks values the plan depends on (for example no new colour values), list them as open questions instead of guessing.
</task>

<constraints>
- Do not invent colour values, font names, contrast ratios or product readiness figures; compute contrast only from values given and mark estimates.
- Do not promise that the whole estate switches on one day unless the readiness evidence supports it.
- Font licensing is a legal question; flag it for checking rather than asserting what a licence allows.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Change inventory and sequencing as tables. Quality checks as a checklist. End with Open questions.
</output_format>
