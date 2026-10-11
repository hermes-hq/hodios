---
schema: 1
id: write-pay-review-letters
kind: prompt
title: Write pay review letters
description: Writes pay review outcome letter templates, with variants for an increase, a promotion, a lump sum above range and no increase, plus merge fields and checks against the approved data.
category: hr-operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [text, dataset]
output: [docs, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [pay-review, salary-increase-letter, compensation-letters, merge-fields, pay-communication]
pairs_with:
  prompts: [allocate-merit-increases, write-total-rewards-statement, design-salary-bands]
args:
  - name: cycle_details
    description: The pay review cycle facts that apply to everyone, such as effective date, the general approach (merit, cost of living, market adjustment), whether there are lump sums or bonuses, and who signs.
    type: text
    required: true
  - name: outcome_types
    description: Which outcomes you need letters for, for example "merit increase", "promotion with increase", "above range maximum, lump sum", "no increase due to performance", "below range, phased adjustment".
    type: text
    required: true
  - name: tone
    description: Language, tone and company style notes. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Merge fields, Letter templates, Manager talking points, Pre-send checks, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pay review letters are read closely, compared between colleagues and kept. The ones that cause trouble are inconsistent with what the manager said, include the wrong figure because of a merge error, promise future increases, explain the decision with comparisons to colleagues, or use phrasing that changes the contract by accident. Experts send the letter after the manager's conversation, never instead of it; state old salary, new salary, percentage and effective date; explain the reason in one neutral sentence; say clearly when an amount is a one-off payment that does not change base pay; and handle "no increase" with respect, a reason that matches what the person has already heard, and what would change the outcome next time.

<cycle_details>
{{cycle_details}}
</cycle_details>

<outcome_types>
{{outcome_types}}
</outcome_types>
{{#tone}}Tone and style: {{tone}}{{/tone}}
</context>

<task>
1. Merge fields: list every field the letters use (for example [First name], [Current salary], [New salary], [Increase %], [Effective date], [Lump sum], [New title]), with format rules (currency, rounding, date format) and the source system for each.
2. Letter templates: one per outcome type, under 200 words each, with the reason sentence, the figures, what happens in payroll and when, and who to ask. For the lump-sum variant, say it is a one-off and not added to base pay. For no increase, a respectful explanation and a pointer to the development conversation.
3. Manager talking points: three to five lines per outcome so the conversation and the letter match.
4. Pre-send checks: a checklist to compare letters against the approved pay data (figures, dates, percentages recomputed, right template for each person, no letters sent before the conversation, part-time amounts handled correctly).
5. Questions for HR or payroll.
</task>

<constraints>
- Do not promise future increases or bonuses, and do not compare the person with colleagues.
- Avoid wording that could create a contractual entitlement, such as "you will receive this every year"; flag anything the user asks for that might.
- Do not invent figures; use merge fields.
- Keep templates neutral about personal circumstances (leave, health and similar).
{{> output/uncertainty}}
</constraints>

<output_format>
## Merge fields
Table: Field | Format | Source.
## Letter templates
One subsection per outcome.
## Manager talking points
## Pre-send checks
Checkboxes.
## Questions
</output_format>
