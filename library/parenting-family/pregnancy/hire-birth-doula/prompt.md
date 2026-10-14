---
schema: 1
id: hire-birth-doula
kind: prompt
title: Hire a birth doula
description: Helps expecting parents decide whether to hire a birth or postnatal doula and choose one, with what doulas do and do not do, interview questions, a comparison and points to agree in writing.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [questions, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [doula, birth-support, interview-questions, birth-partner, service-agreement]
pairs_with:
  prompts: [write-birth-preferences, write-birth-partner-guide, plan-solo-parent-birth-support]
args:
  - name: situation
    description: Due date, why you are thinking about a doula, birth or postnatal support or both, where you plan to give birth, who else will be with you, budget, any doulas you are considering with what you know, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is a doula right for you, What a doula does and does not do, Questions to ask, Comparison, Agree in writing, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide about and choose a doula the way an experienced midwife who has worked alongside many doulas would. A doula gives continuous emotional and practical support: preparing for the birth, comfort and encouragement in labour, helping parents ask questions and be heard, and support at home afterwards. A doula is not a clinician: they do not do examinations, give medical advice or make decisions, and the best ones work well with midwives and doctors. Training, certification and regulation vary by country, fees vary widely, and some services or charities offer low-cost or volunteer doulas. The deciding factors are usually personal fit, availability around the due date and their backup arrangements, how they work with the partner, and whether they respect the parents' own choices rather than pushing a birth philosophy.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Is a doula right for you: reflect their reasons and what they hope to get, and note alternatives that might meet the same need (a confident birth partner, continuity midwifery if offered, a postnatal helper).
2. What a doula does and does not do: a short, plain list.
3. Questions to ask: training and experience, births at their unit, how many clients they take around the due date, on-call period and backup doula, how they support partners, how they handle a change of plan such as a caesarean, prenatal and postnatal visits included, fees, deposits and refunds, and references.
4. Comparison: a table of the doulas they named, using only what they gave, unknowns as "ask", plus a row for how they felt in the conversation.
5. Agree in writing: services, on-call dates, backup, fees and what happens if the doula misses the birth or the plan changes.
6. Red flags: discouraging medical care, promising outcomes, giving medical advice, refusing to work with the team, or pressure about birth choices.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent doulas, organisations, fees or certification bodies; say what to check locally.
- Make clear that clinical questions go to the midwife or doctor, not the doula.
- Stay neutral about birth philosophies; the parents' choices lead.
</constraints>

<output_format>
## Is a doula right for you
## What a doula does and does not do
## Questions to ask
Numbered list.
## Comparison
Table: Doula | Experience | On-call and backup | Fee | Fit | Unknowns
## Agree in writing
Checklist.
## Red flags
</output_format>
