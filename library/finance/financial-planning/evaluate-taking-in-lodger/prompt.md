---
schema: 1
id: evaluate-taking-in-lodger
kind: prompt
title: Evaluate taking in a lodger
description: Works out whether letting a spare room in your home pays after tax reliefs, bills, insurance and mortgage or landlord consent, and lists the house rules and checks to settle first.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [spare-room, rental-income, side-income, lodger-agreement, household-finances]
pairs_with:
  prompts: [check-rights-as-lodger, write-house-share-agreement, compare-home-insurance-quotes, compare-sell-vs-rent-out-home]
  personas: [personal-finance-coach]
args:
  - name: home
    description: Whether you own (with a mortgage or not) or rent, the room on offer, shared spaces, who lives there now, and current household bills.
    type: text
    required: true
  - name: plan
    description: Expected rent and what it includes (bills, cleaning, meals), whether it is short or long term, and why you want the income.
    type: text
    required: true
  - name: country
    description: Country and region, because tax-free allowances for room letting, lodger rights and licensing rules differ.
    type: string
output_contract:
  format: markdown
  sections: [The headline, Net income, Permissions and cover, Tax, Living with a lodger, Checklist before advertising, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide whether to let a spare room in the home they live in. It is one of the most tax-efficient sources of extra income in some countries, because special allowances can make room rent tax-free up to a limit, but the real net figure is usually lower than the advertised rent: bills go up (energy, water, internet, sometimes council or property tax discounts are lost), insurance may need to change, and there will be empty weeks between lodgers. A mortgage lender or a landlord (if the person rents) may need to give consent; letting without it can breach the mortgage or tenancy. A lodger who shares the home usually has fewer rights than a tenant, which makes ending the arrangement simpler, but the rules differ by country and depend on the details. Safety checks, a written agreement, a deposit, referencing and clear house rules prevent most problems. Effects on means-tested benefits should be checked.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Home:

<home>
{{home}}
</home>

Plan:

<plan>
{{plan}}
</plan>

1. Give the headline: realistic net monthly and yearly income in one line, with the main condition it depends on.
2. Calculate net income: rent, minus extra bills, lost discounts, insurance change, wear and furnishing, advertising and referencing, and an allowance for empty weeks. Show the arithmetic and mark typical allowances as assumptions.
3. List permissions and cover to arrange: mortgage lender or landlord consent, home insurance, and any local licensing or safety requirements, marked "verify".
4. Explain the tax position generally: whether a room-letting allowance may exist in their country (verify the amount and conditions), the alternative of declaring income minus expenses, and effects on benefits.
5. Cover living with a lodger: rights compared with a tenant in general terms, a written agreement, deposit, notice, house rules, privacy and safety, especially if children or vulnerable people live there.
6. Give a checklist before advertising and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax-free allowance amounts, rights or licensing rules. Mark any you mention with country and year and "verify".
- Warn that letting a room without the mortgage lender's or landlord's consent, where required, can breach the agreement.
- Do not draft a binding agreement; list what it should cover.
- Mention basic safety: identity and reference checks, a lock on the person's own room where appropriate, and not sharing personal documents.
{{> output/uncertainty}}
</constraints>

<output_format>
## The headline
One line.

## Net income
Table: line | monthly | yearly | source or assumption.

## Permissions and cover
Bullets.

## Tax
Short explanation with points to verify.

## Living with a lodger
Bullets.

## Checklist before advertising
Checklist.

## Assumptions
Bullets.
</output_format>
