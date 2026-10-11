---
schema: 1
id: prepare-retirement-countdown-checklist
kind: prompt
title: Prepare a retirement money countdown checklist
description: Builds a dated money checklist for the last 12 to 24 months before retiring - pensions and claims, workplace benefits, health cover, cash buffer, tax and paperwork - in the order they fall due.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [retirement-date, pension-claim, workplace-benefits, cash-buffer, retirement-admin]
pairs_with:
  prompts: [plan-retirement-transition, plan-retirement-drawdown, understand-pension-statement, compare-pension-lump-sum-vs-income]
  personas: [personal-finance-coach]
args:
  - name: retirement
    description: Planned last working day, your age then (and partner's), and whether it is a full stop, phased retirement or part-time work.
    type: text
    required: true
  - name: finances
    description: Pensions and retirement accounts you hold (workplace, personal, state), savings, debts or mortgage, employer benefits you rely on (health cover, life cover, share schemes), and expected spending in retirement.
    type: text
    required: true
  - name: country
    description: Country, because claim lead times, health cover and tax steps differ.
    type: string
output_contract:
  format: markdown
  sections: [Your countdown, 24 to 12 months before, 12 to 6 months before, 6 to 1 months before, Last month and first month, After the first year, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare the money side of retiring in the right order. Most costly mistakes in the final two years are about timing: pension and state benefit claims that need months of notice, lost pension records from old employers, employer health or life cover that stops on the last day, share schemes or bonuses forfeited by leaving a few weeks early, a final salary that triggers a bad tax position, and choosing a pension option (lump sum, annuity, drawdown) under a deadline without having compared them. Other common gaps are no cash buffer for the first year, a mortgage still running into retirement, and a spending budget never tested on retirement income. A good countdown works backwards from the last working day and puts each task in the month it needs to start.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Retirement:

<retirement>
{{retirement}}
</retirement>

Finances:

<finances>
{{finances}}
</finances>

1. Give a short countdown summary: the last working day, the key dates that follow from it (claims, benefit end dates, first payments expected) and the two or three tasks with the longest lead time.
2. Build the checklist in time bands from 24 months out to the first month of retirement. Include as relevant: tracing old pensions and checking records; requesting statements and forecasts; checking state pension record gaps; comparing pension options before deadlines; employer benefits that stop (health cover, life cover, share schemes, bonuses) and what replaces them; health cover; trying out the retirement budget for a few months; building a cash buffer; mortgage and debts; tax on the final pay and first withdrawals; updating wills, beneficiaries and powers of attorney; insurance changes.
3. Give each item the person's actual date where possible, who to contact, and what to have ready.
4. Add a short after-the-first-year list: review spending against plan, check tax, rebalance, revisit the withdrawal rate.
5. State assumptions about lead times and rules, marked "verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent claim deadlines, lead times or benefit rules. Use typical ranges marked "verify" and name who to confirm with.
- Use only the accounts and benefits the person listed, plus general items worth checking marked as such.
- Do not make the pension option choice for them; point to comparing options before any deadline and seeking regulated advice where it is required.
- Flag any pension contact that pushes urgency or offers unusual investments as a possible scam.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your countdown
Short summary with key dates.

## 24 to 12 months before
Checklist with dates and who to contact.

## 12 to 6 months before
Checklist.

## 6 to 1 months before
Checklist.

## Last month and first month
Checklist.

## After the first year
Short checklist.

## Assumptions
Bullets.
</output_format>
