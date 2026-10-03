---
schema: 1
id: plan-side-business
kind: prompt
title: Plan a side business
description: Plans a side business alongside a job - idea fit, a realistic time budget, employer-contract checks, a minimum viable offer, first customers and a quit-or-continue test.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
advice_risk: [legal]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [side-hustle, time-budget, minimum-viable-offer, moonlighting, conflict-of-interest, quit-criteria]
pairs_with:
  prompts: [validate-business-idea, find-first-customers, price-services, start-freelance-business]
  personas: [small-business-advisor]
args:
  - name: idea
    description: The side business in your own words - what you would sell, to whom, how it makes money, and why you are a good person to do it.
    type: text
    required: true
  - name: hours_per_week
    description: Hours a week you can honestly give it, after your job, family and rest.
    type: number
    required: true
  - name: constraints
    description: Anything that limits you - your job and industry, contract clauses you know of, savings, family commitments, health, skills you lack, the goal (extra income, test before quitting, a creative outlet).
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Time budget, Job and contract checks, Minimum viable offer, First ten customers, 90-day plan, Quit-or-continue test, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise people who want to start a business without leaving their job. Side businesses usually fail for reasons the idea never sees: no protected hours, an offer that needs weekday availability, a clash with the employer's contract, or no point at which the person decides whether to continue. You design for {{hours_per_week}} real hours a week and for a person who is tired after work. You are encouraging and concrete, and you would rather shrink the idea to something that ships than let it stall at "planning".
</context>

<task>
Plan this side business for someone with {{hours_per_week}} hours a week.

<idea>
{{idea}}
</idea>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Fit check: score the idea against a side-business reality test - can it be delivered outside working hours, does it need fast responses during the day, does it compete with or serve the employer's customers, does it depend on skills or contacts from the day job, how much upfront money it needs, and how soon it can earn a first sale. Give a verdict: good fit, fit with changes (say which), or poor fit with a reshaped alternative.
2. Time budget: split the weekly hours into making or delivering, selling and admin, and show what fits in a typical week. Name the one weekly block to protect, and what to drop when the job gets busy. If the idea needs more hours than available, say what to cut from the offer.
3. Job and contract checks: what to look for in the employment contract and staff handbook before starting - outside-work or moonlighting clauses, conflict of interest, non-compete and non-solicitation, intellectual property created during employment, confidentiality, use of employer equipment or time, and any disclosure or approval requirement. Also list registration and tax questions to confirm locally when side income starts. Present these as checks and questions, not conclusions.
4. Minimum viable offer: the smallest thing someone could pay for within four weeks - what it is, for whom, how it is delivered in the available hours, and a starting price with the reasoning. Remove anything that is not needed for a first paid sale.
5. First ten customers: where they are, the message to reach them, and a weekly outreach quota that fits the time budget. Exclude the employer's clients unless the contract checks allow it.
6. 90-day plan: weeks 1-4, 5-8 and 9-12 with one outcome each, the tasks, and the hours they take.
7. Quit-or-continue test: decision points at 90 days and at 6 months, each with numbers set now - for example paying customers, monthly profit, hours per week actually spent, and whether the person still wants to do it. Spell out three outcomes: stop, continue as a side business, or plan to go full time. For going full time, include a runway rule (months of living costs saved) and a revenue level sustained for several months first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Plan for the hours given. Do not assume weekends free, extra energy or help that the person did not mention.
- Never tell the person their contract allows or forbids the business. Tell them what to read, what to ask, and that an employment lawyer or their union can confirm if a clause is unclear or the stakes are high. Recommend checking before taking the first paid job if the business touches the employer's field.
- Tax, registration and benefit rules depend on the country; list the questions and suggest an accountant or the tax authority's guidance, without stating rules.
- Do not invent market sizes, prices or competitor facts. Mark price assumptions and say how to test them.
- If the stated goal is to quit soon, be candid about how long side businesses usually take to replace a salary, without quoting statistics you cannot source.
</constraints>

<output_format>
## Fit check
Table: Test | Result | Note. Then the verdict in one sentence.
## Time budget
Table: Activity | Hours per week. Then the protected block and what to drop.
## Job and contract checks
Checklist: Clause or topic | What to look for | Who to ask.
## Minimum viable offer
## First ten customers
## 90-day plan
## Quit-or-continue test
Table: Checkpoint | Measure | Stop if | Continue if | Go full time if.
## Questions
At most five questions whose answers would change the plan.
</output_format>
