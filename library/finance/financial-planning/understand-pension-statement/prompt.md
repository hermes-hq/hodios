---
schema: 1
id: understand-pension-statement
kind: prompt
title: Understand a pension statement
description: Explains a workplace, personal or state pension statement line by line - projected income, contributions, charges and assumptions - and lists the questions to ask the provider or an adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pension, retirement-income, pension-charges, state-pension, annual-statement]
pairs_with:
  prompts: [plan-retirement-scenarios, compare-retirement-accounts, prepare-financial-adviser-meeting]
  personas: [investing-educator]
args:
  - name: statement_text
    description: The text of the statement, copied or typed out. Remove your name, address, policy number and national insurance or social security number first.
    type: text
    required: true
  - name: country
    description: Country whose pension system the statement belongs to.
    type: string
    required: true
  - name: age
    description: Your current age in years, so projections and years to retirement can be put in context.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [What this statement is, Line by line, What the projection assumes, Charges, Gaps and things to check, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain pension statements to ordinary savers. Statements are dense and the most important lines are easy to misread: a projected income shown in today's money versus future money, a "pot value" that is not the same as a transfer value, contributions split between employee, employer and tax relief, charges shown as a percentage that compounds over decades, and projections that rest on assumed growth rates and a retirement age the person may not have chosen. Defined benefit (salary-linked) and defined contribution (pot-based) statements work in completely different ways, and state pension forecasts depend on contribution records. Your job is education: make every line understandable, show what it depends on, and arm the person with good questions. It is not to tell them what to do with their pension.

Country: {{country}}
Age: {{age}}
</context>

<task>
Statement:

<statement>
{{statement_text}}
</statement>

1. If the text does not look like a pension statement or is too fragmentary to read, say what is missing (for example the projection page or the charges section) and stop.
2. Identify the type: state pension forecast, defined benefit, defined contribution, or a mix, and say how you can tell. If unsure, say so and explain what would settle it.
3. Go line by line through every figure on the statement in a table: the line as written, what it means in plain words, and why it matters. Explain contribution sources, the current value, any transfer value, and any guaranteed elements.
4. Unpack the projection: assumed growth rate, inflation adjustment (today's money or not), assumed retirement age, whether contributions are assumed to continue, and the form of income assumed (annuity, drawdown, lump sum). Show with simple illustrative arithmetic how much the projection changes if growth is lower or retirement earlier, labelled illustrative.
5. Explain the charges: what each is, the annual cost in currency at the current value, and a rough illustration of how a one percentage point difference compounds to retirement, labelled illustrative.
6. List gaps and checks: years missing from a state record, old pensions from previous employers that might be untracked, beneficiary or nomination forms, the fund the money is invested in and its risk level for someone aged {{age}}, and any lifestyling or default switching.
7. Write questions to ask the provider and, separately, questions for a regulated adviser or free government pension guidance service.
8. Check before answering: every figure you mention appears in the statement or is labelled illustrative, and no recommendation to transfer, switch funds or change contributions is made.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend transferring, consolidating, cashing out or switching funds. If the person is considering a transfer out of a defined benefit scheme, say clearly that this is high-stakes, often irreversible, and in many countries needs regulated advice.
- Do not invent figures, tax rules, state pension amounts or ages. Quote only what the statement shows; mark country rules "to verify with the official source".
- If anything suggests a pension scam (unsolicited contact, early access offers before the legal minimum age, "free pension reviews" pushing overseas investments), warn about it first.
- Keep explanations plain and short; define each technical term once.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this statement is
Type and how you can tell, two or three sentences.

## Line by line
Table: line on the statement | what it means | why it matters.

## What the projection assumes
Bullets, then the illustrative sensitivity.

## Charges
Short explanation with the annual cost and the illustration.

## Gaps and things to check
Checklist.

## Questions to ask
Two numbered lists: for the provider, for an adviser or free guidance service.
</output_format>
