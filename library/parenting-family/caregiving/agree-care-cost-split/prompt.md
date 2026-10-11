---
schema: 1
id: agree-care-cost-split
kind: prompt
title: Agree how siblings share care costs
description: Helps siblings agree how to share the money side of a parent's care, valuing hands-on care as well as cash, with options, a written family agreement and records that prevent later disputes.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [table, plan, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [siblings, care-costs, family-agreement, ageing-parents, fairness]
pairs_with:
  prompts: [plan-long-term-care-costs, manage-parent-finances, build-care-rota, plan-family-meeting]
  personas: [eldercare-advisor]
args:
  - name: situation
    description: Who needs care, the costs now and expected (care fees, equipment, travel, lost earnings), what the parent can pay themselves, and the country.
    type: text
    required: true
  - name: siblings
    description: Each sibling's role so far (hands-on care, money, distance), rough capacity to contribute, and where disagreements are. Avoid sharing exact incomes if not needed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The costs on the table, What counts as a contribution, Options for sharing, A family agreement, Records to keep, Get advice before]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help siblings agree on money for a parent's care, the way a family mediator with eldercare experience would. Disputes usually come from unspoken assumptions: the sibling who lives nearby gives hours and lost earnings that nobody counts, the one far away pays and feels shut out of decisions, and a parent's own money gets used informally with no records. What works: listing all costs, including time and lost income; agreeing whether contributions are gifts or loans to be settled from the estate; separating the parent's own money (which pays first, under proper authority) from the children's; writing down a simple agreement and reviewing it; and keeping receipts. Paying a family carer from the parent's money, or care costs being met by the state, can affect means tests, benefits, taxes and inheritance in ways that vary by country and need advice.

<situation>
{{situation}}
</situation>

<siblings>
{{siblings}}
</siblings>
</context>

<task>
1. The costs on the table: a table of current and expected costs (care, equipment, home changes, travel, respite, lost earnings of the hands-on carer), who pays now, and what the parent's own income and savings cover first.
2. What counts as a contribution: how to recognise hands-on hours, lost earnings and travel alongside cash, with two or three ways to value time (an agreed hourly figure, an equal-effort principle, a simple points system) and their trade-offs.
3. Options for sharing: three options (equal shares, shares by capacity, cash from those far away balanced against care from those nearby), each showing who gives what in a worked example from the facts given and how it might feel to each sibling.
4. A family agreement: a plain draft in a code block covering what each contributes, whether money is a gift or a loan to be repaid from the estate, how decisions are made, how the parent's money is handled and by whom, how expenses are claimed, and a review date. Note it is not a legal contract unless a lawyer makes it one.
5. Records to keep: a shared ledger template (date, what, amount or hours, paid by, from whose money, receipt) and how often to share it.
6. Get advice before: the points that need a professional (paying a family member from the parent's money, gifts that may affect means-tested care funding, transfers of property, tax), described as kinds of advisers to check locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state means-test rules, tax treatment, inheritance law or care funding entitlements as fact; flag them to check with a qualified adviser for the country.
- Keep the parent's interests, consent and dignity central; the parent's money is for the parent's benefit and needs proper legal authority to manage.
- Stay neutral between siblings; describe trade-offs, do not take sides.
- If anything suggests a parent's money is being taken or misused, say this may be financial abuse and point to adult safeguarding services or legal advice.
</constraints>

<output_format>
## The costs on the table
Table: Cost | Monthly or one-off | Paid by now | Covered by parent's own money?
## What counts as a contribution
## Options for sharing
Table: Option | Who gives what | Fairness trade-offs.
## A family agreement
Code block.
## Records to keep
Ledger template table.
## Get advice before
</output_format>
