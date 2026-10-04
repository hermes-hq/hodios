---
schema: 1
id: assess-charity-merger-options
kind: prompt
title: Assess charity merger options
description: Compares options for a charity considering a merger - collaboration, shared services, merger or planned closure - on mission, beneficiaries, money, people and governance, with questions for advisers.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [executive, manager]
subject: [nonprofit]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, notes, document]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [merger, collaboration, shared-services, trustees, due-diligence, closure-and-transfer]
pairs_with:
  prompts: [write-charity-three-year-strategy, build-theory-of-change]
  personas: [nonprofit-advisor]
args:
  - name: situation
    description: Your charity - mission, services, income and reserves, staff and volunteers, premises, why merger is being considered (funding pressure, a partner's approach, succession, duplication) and any deadline.
    type: text
    required: true
  - name: partner
    description: The possible partner or partners - their mission, size, finances if known, culture, and how talks started. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Why now, Options compared, Mission and beneficiaries, Money, People and culture, Governance, Due diligence questions, Questions for advisers, Next steps for trustees]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help trustees and chief executives of small and mid-sized charities think through a possible merger before they commit time and money to it. Merger is one point on a range: informal collaboration, a joint project, shared back-office services, a group structure, a full merger, or a planned closure that transfers services and assets to another charity. Common mistakes: treating merger as rescue when one party is weeks from running out of cash (which weakens every option); letting governance seats and the name dominate talks while beneficiaries are barely discussed; underestimating integration costs, pension and lease liabilities, and culture clashes between staff and volunteers; and starting due diligence too late. You put beneficiaries first, compare the realistic options and prepare questions for the professionals.
</context>

<task>
<situation>
{{situation}}
</situation>

{{#partner}}
<partner>
{{partner}}
</partner>
{{/partner}}

1. Short answer: which options look worth exploring and the deciding factors.
2. Why now: the driver, how urgent it is (months of reserves at current spending, if figures allow), and what problem a combination must solve.
3. Options compared: collaboration, shared services, group structure, full merger, and planned closure with transfer. Score each on fit with the problem, cost and effort, reversibility and control kept.
4. Mission and beneficiaries: mission fit with the partner, services that would improve, change or end, and how beneficiaries would experience the change. Note any purpose differences trustees must check against both governing documents.
5. Money: combined income and reserves, dependence on funders who may not continue after a merger, one-off integration costs, savings that are realistic (and how slowly they arrive), and liabilities to examine (pensions, leases, restricted funds, contracts).
6. People and culture: staff, volunteers and leadership roles, consultation duties to check, and culture differences to test early.
7. Governance: board composition, the name and brand, decision process, and conflicts of interest for trustees.
8. Due diligence questions to exchange with the partner.
9. Questions for a charity solicitor, an accountant and, where relevant, the charity regulator's guidance.
10. Next steps for trustees: decisions, a timeline, and a point at which to stop talks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Charity law, regulator consents, employment transfer rules and pension liabilities differ by country. Do not state legal requirements; refer them to a charity solicitor and accountant and say what to bring (governing documents, accounts, contracts, pension statements, leases).
- Never invent the partner's finances or reputation; mark unknowns.
- Put beneficiaries before organisational pride; say so plainly if a closure-and-transfer option serves them best.
- If the charity's finances or mission are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences, then one line on the professional advice needed.
## Why now
Bullets with the reserves arithmetic if possible.
## Options compared
Table: Option | Solves the problem? | Cost and effort | Reversible? | Control kept.
## Mission and beneficiaries
Bullets.
## Money
Table: Item | Us | Partner | Combined or note.
## People and culture
Bullets.
## Governance
Bullets.
## Due diligence questions
Numbered, grouped by topic.
## Questions for advisers
Grouped by solicitor, accountant, regulator guidance.
## Next steps for trustees
Table: Step | Who | By when; then the stop-talks point.
</output_format>
