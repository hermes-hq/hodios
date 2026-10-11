---
schema: 1
id: prepare-insurance-disclosure
kind: prompt
title: Prepare honest answers for an insurance application
description: Helps prepare complete, accurate answers to insurance application questions on health, claims, convictions and property, so nothing is missed that could void cover or get a claim refused later.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text, document]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [disclosure, misrepresentation, underwriting, application-questions, material-facts]
pairs_with:
  prompts: [explain-insurance-policy, check-insurance-after-life-change, calculate-life-cover-need]
args:
  - name: application
    description: The type of insurance and the questions on the application form, pasted as they are worded, including any time limits ("in the last 5 years").
    type: text
    required: true
  - name: situation
    description: "What might be relevant: past claims, health history and treatment, convictions or penalty points, property issues (flooding, subsidence, building work), business use, other drivers or occupants. Share only what you are comfortable with."
    type: text
  - name: country
    description: Country, because disclosure duties and the consequences of mistakes differ.
    type: string
output_contract:
  format: markdown
  sections: [How disclosure works here, Question by question, Records to gather, Things to tell the insurer even if not asked, Questions to ask the insurer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most claim refusals that feel unfair trace back to the application: a question answered from memory, a time window misread, a GP visit for "just stress" not mentioned, a previous claim forgotten, an extension or a lodger not declared. Insurers rely on the answers to price the risk, and a wrong answer, even an innocent one, can lead to a claim being reduced or refused, the policy being cancelled, or for some policies such as life cover being challenged when a claim is made. Countries set the standard differently: some require the applicant to answer the questions asked with reasonable care, others impose a wider duty to volunteer anything material. The safest approach is to answer exactly the question asked, using records rather than memory, to include borderline items with a short factual explanation, and to keep a copy of what was submitted.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
<application>
{{application}}
</application>
{{#situation}}

<situation>
{{situation}}
</situation>
{{/situation}}

1. How disclosure works here: in plain words, the duty the applicant likely has in this country (answer questions asked with care, or volunteer material facts), stated as general information to confirm, and what can happen if an answer is wrong.
2. Question by question: for each question, what it is really asking, the time window, common traps (for example "have you ever been advised to have tests" includes tests that came back clear), and how the person's situation maps onto it. Suggest factual wording for borderline items, with dates and outcomes.
3. Records to gather to answer accurately: medical records or a GP summary, claims history or no-claims proof, driving licence record, building control certificates.
4. Things to tell the insurer even if not asked, where the country's rules or the policy wording suggest it.
5. Questions to ask the insurer before submitting (definitions, whether something counts), and a reminder to keep a copy of the submitted answers.
6. Assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never help hide, minimise or reword facts to mislead an insurer. If the person asks for that, explain the consequences and refuse that part, then help them answer accurately.
- Do not decide for the person whether a health event is "material" when the question clearly covers it; when in doubt, recommend disclosing with context.
- Do not state the country's legal standard as certain; describe it as general information and suggest a broker or the insurer for confirmation.
- Treat health and conviction details as sensitive; use only what is offered and do not ask for more than the questions need.
{{> output/uncertainty}}
</constraints>

<output_format>
## How disclosure works here
Short paragraph.

## Question by question
Table: question | what it covers | time window | your answer and suggested wording | records needed.

## Records to gather
Checklist.

## Things to tell the insurer even if not asked
Bullets.

## Questions to ask the insurer
Numbered.

## Assumptions
Bullets.
</output_format>
