---
schema: 1
id: plan-supporting-family-financially
kind: prompt
title: Plan supporting family financially
description: Plans supporting a parent, sibling or adult child financially - a sustainable amount, gift versus loan versus paying bills directly, written terms, a conversation script and your own goals protected.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-support, lending-to-family, gifting, boundaries, sandwich-generation]
pairs_with:
  prompts: [manage-parent-finances, plan-long-term-care-costs, build-emergency-fund-plan, plan-couple-money-conversation]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Who needs help, why, how much and for how long (one-off or ongoing), what they have already tried, and whether anyone else in the family is contributing.
    type: text
    required: true
  - name: your_finances
    description: Your take-home income, regular costs, savings, debts, pension contributions and your own goals, plus a partner's view if finances are shared.
    type: text
    required: true
  - name: country
    description: Country, since gift tax, inheritance rules and the effect of support on the recipient's benefits differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What you can sustain, Ways to give help compared, A structure to consider, Written terms, The conversation, Protecting your own plans, Points to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Helping family is one of the most meaningful uses of money and one of the most common ways people damage their own finances and relationships. The patterns that go wrong are predictable: open-ended support with no amount or end date, a "loan" with no terms that becomes resentment, co-signing a debt the giver cannot afford to pay, draining the emergency fund or stopping pension contributions, siblings who feel the arrangement is unfair, and support that unintentionally reduces the recipient's means-tested benefits. A good plan starts from what the helper can sustain without wrecking their own security, chooses the form of help deliberately, and writes the terms down.

{{#country}}Country: {{country}}{{/country}}

<situation>
{{situation}}
</situation>

<your_finances>
{{your_finances}}
</your_finances>
</context>

<task>
1. What you can sustain: compute the helper's monthly surplus after essentials, debt payments, pension contributions and their own savings goals. Propose a sustainable range for ongoing help (and the maximum one-off amount that keeps their emergency fund intact). Show the arithmetic. If there is no real surplus, say so kindly and focus on non-cash help.
2. Ways to give help compared: a gift, a loan, paying specific bills directly (rent, utilities, care), co-signing or guaranteeing a loan, sharing housing, and non-cash help (time, admin, helping them find benefits or free advice). For each: cost to the helper, risk, effect on the relationship, effect on the recipient's independence, and tax or benefit implications to check.
3. A structure to consider: one or two concrete arrangements that fit the situation (for example a fixed monthly amount for six months paid directly to the landlord, reviewed in month five). Describe; the decision is theirs.
4. Written terms: for a loan, a plain template - amount, purpose, repayment schedule, what happens if a payment is missed, what happens if the borrower or lender dies, whether interest applies. Add the rule of thumb: lend only what you could afford to see become a gift.
5. The conversation: a short script with an opener, the offer with its limits, how to say no to part of a request, and how to raise the review date. Include a variant for explaining it to siblings or a partner.
6. Protecting your own plans: what to keep untouched (emergency fund, pension contributions especially if an employer matches, essential insurance), and the signal that tells them to reduce help.
7. Points to verify: gift or inheritance tax rules, whether regular help could affect the recipient's benefits, and legal implications of co-signing, with who to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Respect the helper's wish to help; never moralise in either direction. Present trade-offs.
- Explain the risks of co-signing or guaranteeing plainly: the helper becomes liable for the full debt.
- Never help conceal gifts or support from benefit agencies, tax authorities or a spouse with shared finances; if asked, decline and explain the risk.
- If the situation suggests financial abuse, coercion or a scam (pressure, secrecy, an online "relative" in sudden trouble), say so gently and point to appropriate help.
- Use only the figures given; mark gaps.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you can sustain
Calculation and the range.

## Ways to give help compared
Table: form | cost to you | risk | relationship | independence | check.

## A structure to consider
One or two arrangements.

## Written terms
Template.

## The conversation
Script plus the sibling or partner variant.

## Protecting your own plans
Bullets.

## Points to verify
Bullets with who to ask.
</output_format>
