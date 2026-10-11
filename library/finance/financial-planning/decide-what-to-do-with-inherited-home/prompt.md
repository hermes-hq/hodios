---
schema: 1
id: decide-what-to-do-with-inherited-home
kind: prompt
title: Decide what to do with an inherited home
description: Compares selling, renting out, keeping or living in an inherited home - with co-heirs' choices, holding costs while empty, tax questions, timing and a fair buyout method.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [inherited-property, co-heirs, sibling-buyout, empty-property, estate-planning]
pairs_with:
  prompts: [compare-sell-vs-rent-out-home, plan-windfall, settle-estate-checklist, compare-short-let-vs-long-let]
  personas: [personal-finance-coach]
args:
  - name: property
    description: The home - rough value, condition and repairs needed, location, any mortgage or debt on it, and whether it is empty now.
    type: text
    required: true
  - name: heirs
    description: Who inherits and in what shares, what each heir wants (sell, keep, live there), their finances if relevant, and where the estate is in the legal process.
    type: text
    required: true
  - name: country
    description: Country and region of the property, and where the heirs live, because inheritance tax, tax on a later sale, empty-property rules and estate procedures differ.
    type: string
output_contract:
  format: markdown
  sections: [Where things stand, The options, Numbers for each option, If heirs disagree, Holding costs while you decide, Questions for the executor and advisers, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide what to do with a home they have inherited, alone or with siblings or other heirs. The decision is often made in grief and under pressure, and the house carries memories, so a short pause is usually wise unless costs force a decision. Practical points matter early: an empty home may need special insurance cover, can lose tax discounts, deteriorates, and may have to be secured; the executor usually controls it until the estate is settled. With several heirs, the common outcomes are selling and splitting the proceeds, one heir buying the others out at an agreed valuation (independent valuations, and who pays costs, avoid disputes), or keeping and renting it jointly, which needs a written agreement about costs, decisions and exit. Tax questions differ by country: inheritance or estate tax on the transfer, the value used as the base for a later gain, and tax on rent; some countries give reliefs that depend on selling within a time window or living in the property. Renting out an inherited home turns heirs into landlords with all the duties that brings.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Property:

<property>
{{property}}
</property>

Heirs:

<heirs>
{{heirs}}
</heirs>

1. Summarise where things stand: who controls the property now, what has to happen before any option is possible, and any deadline or cost that forces timing.
2. Lay out the options that fit: sell, one heir buys out the others, keep and rent, keep for family use, or a heir lives in it, with what each needs.
3. Give rough numbers for each: net sale proceeds after costs and repairs, each heir's share, buyout amounts at the valuation given, rental net income after costs, and holding costs per month. Use the person's figures and mark typical allowances as assumptions.
4. If heirs disagree, describe fair processes: independent valuations, a buyout formula, a time limit to decide, and mediation before legal steps, which can be costly and slow.
5. List holding costs and duties while deciding: insurance for an unoccupied property, security, utilities, property taxes, maintenance.
6. List questions for the executor, a lawyer and a tax adviser (inheritance tax, the base value for later gains, reliefs tied to timing), and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent inheritance tax rules, reliefs or thresholds. Mark any you mention with country and "verify".
- Do not take sides between heirs; set out options and fair processes.
- Acknowledge that grief and family history may weigh as much as money, without lecturing.
- Note that the executor or administrator, not individual heirs, usually controls the property until the estate is settled (verify locally).
{{> output/uncertainty}}
</constraints>

<output_format>
## Where things stand
Short bullets.

## The options
Table: option | what it needs | suits | main risk.

## Numbers for each option
Table: option | money now | money over time | each heir's share | assumptions.

## If heirs disagree
Bullets.

## Holding costs while you decide
Table: cost | monthly estimate | note.

## Questions for the executor and advisers
Bullets grouped by who to ask.

## Assumptions
Bullets.
</output_format>
