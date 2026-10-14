---
schema: 1
id: build-design-system-business-case
kind: prompt
title: Build a business case for a design system
description: Builds a business case to fund or grow a design system team, with the problem in evidence, costs, conservative benefit estimates, risks, options and a clear ask for leadership.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan]
role: [designer, engineering-manager, product-manager, manager]
requires: [none]
inputs: [text, notes, dataset]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [business-case, funding, roi, headcount, stakeholder-buy-in]
pairs_with:
  prompts: [measure-design-system-adoption, plan-design-system-governance, plan-design-system-roadmap]
  personas: [design-systems-lead]
args:
  - name: situation
    description: The organisation, products, teams, what exists today (no system, a neglected one, a volunteer effort), and the pain you see.
    type: text
    required: true
  - name: ask
    description: What you want approved, e.g. "two engineers and one designer for 12 months" or "keep the current team and add an accessibility specialist".
    type: string
    required: true
  - name: evidence
    description: Optional. Numbers you have, e.g. duplicated components counted, hours spent rebuilding UI, accessibility defects, time to ship a new screen, salaries or loaded cost per person.
    type: text
output_contract:
  format: markdown
  sections: [Summary, The problem, Options, Costs, Benefits, Assumptions, Risks, Measures of success, The ask, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leaders fund outcomes, not components. Design system pitches fail when they lead with consistency and craft, quote industry savings percentages as if they applied here, or hide the ongoing cost: a system is a product that needs a team after launch, and product teams pay an adoption cost too. Persuasive cases use the organisation's own evidence (the number of date pickers in the codebase, hours spent rebuilding the same UI, accessibility defects and the effort to fix them, how long a new screen takes), turn it into ranges with stated assumptions, compare real options including "do nothing" and "adopt an open-source base with a thin layer", and propose a pilot with a checkpoint so leadership can stop if the numbers do not appear. Accessibility obligations vary by country and sector, so the case should state them as something to confirm with legal, not as a threat.
</context>

<task>
Build the business case.

<situation>
{{situation}}
</situation>

The ask: {{ask}}
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. **Problem.** Describe the cost of the current state in the organisation's terms (slower delivery, duplicated work, inconsistent experience, accessibility defects, onboarding time), backed by the evidence given. Where evidence is missing, list what to collect in two weeks and how.
2. **Options.** At least three: do nothing, a minimal option (for example adopt an open-source component base plus tokens with part-time owners), and the requested option. For each, what it delivers and what it does not.
3. **Costs.** People, tools and the adoption effort product teams will spend, for year one and ongoing. Use the user's cost figures; if none are given, use placeholders such as "[loaded cost per engineer]" rather than inventing salaries.
4. **Benefits.** Estimate time saved and defects avoided as low, expected and high ranges, each with its formula and assumptions, starting from the organisation's own numbers. Separate hard savings from softer benefits (brand consistency, hiring appeal).
5. **Assumptions.** Every number's source, labelled measured, estimated or placeholder.
6. **Risks.** Low adoption, the team becoming a bottleneck, scope creep, and dependence on a few people, each with a mitigation.
7. **Measures of success.** Three to five measures with a baseline and a target at 6 and 12 months, and a go or stop checkpoint for a pilot.
8. **The ask.** One paragraph: what, how much, for how long, and what leadership gets back by when.
9. Write for a reader with five minutes: the summary must stand on its own.
</task>

<constraints>
- Do not invent statistics, studies, salaries or company examples. If you mention published industry figures, say they vary widely and are not evidence for this organisation.
- Do not claim specific legal requirements; say accessibility obligations depend on jurisdiction and sector and should be confirmed.
- Keep benefit estimates conservative and show the arithmetic.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Summary under 150 words. Options, costs and benefits as tables with formulas visible. End with Open questions.
</output_format>
