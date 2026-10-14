---
schema: 1
id: choose-workplace-insurance-benefits
kind: prompt
title: Choose workplace insurance benefits
description: Works through the insurance options in an employer's benefits enrolment - health, life, disability and add-ons - against your household, other cover and budget, before the window closes.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, job-seeker]
requires: [none]
inputs: [document, text]
output: [report, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [benefits-enrolment, group-life, group-disability, employee-benefits, salary-sacrifice]
pairs_with:
  prompts: [compare-health-insurance-plans, review-insurance-coverage, calculate-life-cover-need]
args:
  - name: options
    description: The benefits guide or enrolment screen - each insurance option, levels, employee cost per pay period, what the employer pays, and any default if you do nothing.
    type: text
    required: true
  - name: household
    description: Who depends on you, a partner's workplace cover, existing private policies, health needs you expect this year, and roughly what you can afford per month.
    type: text
    required: true
  - name: deadline
    description: The enrolment deadline and whether this is a new job, an annual window or a life event.
    type: string
  - name: country
    description: Country you work in. Tax treatment of benefits and what the state provides vary a lot.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Options at a glance, Benefit by benefit, Overlaps and gaps, Choices to make by the deadline, Questions for HR or the benefits provider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Workplace insurance is often good value because the employer pays part of it and group underwriting may ask fewer health questions, but it has catches people miss in a hurry. Group life cover is usually a multiple of salary and ends when the job ends; buying more through the employer can cost more than an individual policy for a young, healthy person and less for someone with health issues. Group disability or income protection may be short-term or long-term, may replace only part of salary, may stop after a set period, and may be taxable when paid depending on who paid the premium. Health plans differ in total yearly cost, not just the payroll deduction. Optional add-ons (accident, hospital cash, critical illness, cancer, legal, pet) vary from useful to poor value. Enrolment windows are short, and missing one often means waiting a year unless a qualifying life event happens; some benefits offered without health questions at first enrolment need evidence of health if added later.
{{#country}}

Country: {{country}}
{{/country}}
{{#deadline}}

Deadline and situation: {{deadline}}
{{/deadline}}

<household>
{{household}}
</household>
</context>

<task>
<options>
{{options}}
</options>

1. Options at a glance: a table of every insurance benefit, levels, employee cost per pay period and per year, employer contribution, and the default if nothing is chosen.
2. Benefit by benefit: for each, what it pays and when, who it covers, whether it ends with the job, whether health evidence is needed now or later, and how it fits this household. For health plans, compare total yearly cost in a low-use and a high-use year.
3. Overlaps and gaps: compare with the partner's cover and existing policies (duplicate dental, two health plans, life cover already held) and gaps (no long-term disability, life cover far below need, cover that ends if the person leaves).
4. Choices to make by the deadline: an ordered list, with the reasons, marking which are easy to change later and which are not (guaranteed-issue amounts, waiting a year).
5. Questions for HR or the benefits provider, specific to unclear points.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not choose for the person; set out the trade-offs and what each choice costs.
- Do not invent tax rules, plan terms or prices; use the documents supplied and mark gaps.
- Flag that group cover usually ends when employment ends, so long-term needs may also need individual cover.
- If the person has a serious health condition, point out the value of benefits with no health questions at first enrolment.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The few choices that matter most for this household, and the deadline.

## Options at a glance
Table.

## Benefit by benefit
One short section per benefit.

## Overlaps and gaps
Bullets.

## Choices to make by the deadline
Numbered, with "easy to change later" or "hard to change later".

## Questions for HR or the benefits provider
Numbered.
</output_format>
