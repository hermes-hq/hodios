---
schema: 1
id: plan-fertility-treatment-finances
kind: prompt
title: Plan paying for fertility treatment
description: Plans paying for fertility treatment - real cost per cycle and for several, public or insurance coverage to check, funding options and risks, and a budget with stopping points agreed in advance.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [ivf-costs, treatment-budget, insurance-coverage, multi-cycle-packages, medical-costs]
pairs_with:
  prompts: [prepare-fertility-consultation, prioritize-financial-goals, plan-parental-leave-finances, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: treatment
    description: The treatment discussed (for example IUI, IVF, egg freezing, donor treatment), clinic quotes if you have them, and what the clinic said about likely number of cycles.
    type: text
    required: true
  - name: money
    description: Income, savings, debts, monthly spending, any health insurance or employer benefits, and eligibility for public funding as far as you know.
    type: text
    required: true
  - name: country
    description: Country and region, because public funding, insurance coverage, tax relief on medical costs and clinic pricing vary greatly.
    type: string
output_contract:
  format: markdown
  sections: [The plan in brief, What one cycle really costs, Coverage to check, Funding options, Budget and stopping points, Questions for the clinic and insurer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan the money side of fertility treatment. Clinic headline prices often exclude medication, consultations, scans, blood tests, embryo freezing and storage, frozen embryo transfers and extra add-ons, so the real cost per cycle can be much higher than the advertised figure. Many people need more than one cycle, so budgeting for one is a common mistake. Some clinics offer multi-cycle or refund packages: these can help if several cycles are likely, but the eligibility conditions and what counts as success need reading carefully. Public funding or insurance cover, where it exists, often has strict criteria (age, previous children, body weight, waiting times) and limits. High-interest borrowing to pay for repeated cycles can leave lasting debt whatever the outcome. Agreeing a total budget and stopping points in advance, before emotions run high, protects both finances and wellbeing. Treatment decisions and success chances are medical questions for the clinic; this is only the money side.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Treatment:

<treatment>
{{treatment}}
</treatment>

Money:

<money>
{{money}}
</money>

1. Summarise the plan in brief: treatment, the number of cycles to budget for (based on what the clinic said, not your own estimate), and the headline figure.
2. Break down what one cycle really costs: every item the person's quote includes, items it may exclude to ask about (medication, tests, freezing, storage, transfers, add-ons), and time off work or travel. Use the person's figures; mark missing items "ask the clinic".
3. List coverage to check: public funding criteria, health insurance or employer benefits, tax relief on medical costs where it exists, all marked "verify".
4. Compare funding options: savings, adjusting other goals, family help, multi-cycle packages, clinic payment plans, and borrowing, with the risks of each, especially high-interest debt.
5. Build a budget and stopping points: a total amount the person is willing to spend, how it maps to cycles, a monthly saving plan, and decision points to agree in advance.
6. List questions for the clinic and insurer, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give success rates or medical recommendations; refer those to the clinic.
- Never invent prices, funding criteria or insurance rules. Use the person's figures and mark gaps.
- Be warm and non-judgemental; this is emotionally hard. Do not push the person toward or away from treatment.
- Point out the risks of high-interest borrowing plainly.
{{> guardrails/crisis-safety}}
{{> output/uncertainty}}
</constraints>

<output_format>
## The plan in brief
Short bullets.

## What one cycle really costs
Table: item | in the quote? | amount or "ask the clinic".

## Coverage to check
Bullets.

## Funding options
Table: option | amount | risk or trade-off.

## Budget and stopping points
Short budget and the agreed decision points.

## Questions for the clinic and insurer
Bullets.

## Assumptions
Bullets.
</output_format>
