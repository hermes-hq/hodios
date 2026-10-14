---
schema: 1
id: set-participant-incentives
kind: prompt
title: Set research participant incentives
description: Sets fair incentive amounts and types for a UX study by audience, session length, effort and method, with delivery logistics, restricted-recipient options and tax or finance questions to check.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager, operations-manager]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [incentives, participant-payment, research-ops, participant-recruitment, gift-cards]
pairs_with:
  prompts: [recruit-b2b-research-participants, scope-ux-research-project, write-participant-emails]
  personas: [ux-researcher]
args:
  - name: study
    description: Method, session length, any homework or travel, number of participants, and the audience (consumers, professionals, existing customers, people in vulnerable situations).
    type: text
    required: true
  - name: setting
    description: Country or countries, currency, budget, and company rules about gifts or payments. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What drives the amount, Recommended incentives, Type and delivery, Special cases, Approvals and records, Budget total]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Incentives decide who turns up. Too low and only the curious, the unemployed or professional testers respond, and specialists ignore you; too high and people lie on screeners to qualify. Amounts should reflect the participant's time and its market value (a surgeon's hour costs far more than a student's), the full effort (prep, homework, travel, diary entries over weeks), inconvenience such as evening slots, and how rare the audience is. Existing customers often take part for less or for non-cash thanks, but some employers and public bodies forbid staff accepting gifts, so donations or no incentive must be options. Delivery matters too: slow or complicated payment hurts reputation; no-shows usually get nothing while people who were screened out at the session or whose session failed through no fault of their own should still be paid. Payments can create tax or reporting obligations depending on the country and the amount, which finance must confirm.
</context>

<task>
<study>
{{study}}
</study>
{{#setting}}

<setting>
{{setting}}
</setting>
{{/setting}}

1. What drives the amount for this study: time including prep and travel, audience rarity and hourly value, effort, timing, and whether participants are customers.
2. Recommended incentives: a table per participant type with amount or range (in the local currency if given, otherwise as an hourly-rate approach the team can convert), type, and reasoning. Mark figures as assumptions to check against local norms and the team's recruiting results.
3. Type and delivery: cash transfer, gift card, voucher, product credit, donation; timing (same day where possible); how to deliver across countries.
4. Special cases: partial sessions, screen-outs on the day, no-shows, technical failures, people who cannot accept gifts, minors (paid via a parent or guardian), and vulnerable participants (avoid amounts that feel coercive).
5. Approvals and records: who in finance or legal to ask about tax and reporting thresholds, anti-bribery rules for public officials or healthcare professionals, and what to log.
6. Budget total including a buffer for no-shows and replacements.
</task>

<constraints>
- Do not state tax rules, thresholds or legal requirements as facts; name them as questions for finance or legal in the relevant country.
- Do not present an amount as a market standard; give reasoning and ranges labelled as assumptions.
- Product credit alone is not appropriate for non-customers.
- Never make the incentive conditional on giving positive feedback.
</constraints>

<output_format>
## What drives the amount
## Recommended incentives
| Participant type | Amount or range | Type | Reasoning |
## Type and delivery
## Special cases
## Approvals and records
## Budget total
</output_format>
