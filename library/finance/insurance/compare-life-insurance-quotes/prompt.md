---
schema: 1
id: compare-life-insurance-quotes
kind: prompt
title: Compare life insurance quotes
description: Compares life insurance quotes on cover type, term, sum assured, level or decreasing cover, guaranteed or reviewable premiums and exclusions, so the cheapest quote is not mistaken for the right one.
category: insurance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, parent, founder]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [life-cover, term-life, decreasing-term, reviewable-premiums, joint-policy]
pairs_with:
  prompts: [calculate-life-cover-need, prepare-insurance-disclosure, review-insurance-coverage]
args:
  - name: quotes
    description: The quotes or illustrations you have, with insurer names removed if you prefer - sum assured, term, premium, cover type, guaranteed or reviewable, any critical illness add-on, waiver of premium, and the key features document if you have it.
    type: text
    required: true
  - name: purpose
    description: What the cover is for - a mortgage, income for a partner and children until a given age, debts, a business loan - and the amount and term you worked out you need.
    type: text
    required: true
  - name: country
    description: Country you live in, for example "Ireland" or "Ontario, Canada". Product names, tax treatment and trust rules vary by place.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Like-for-like check, Quote comparison, What the price hides, Questions to ask, Before you apply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Life insurance quotes are rarely like for like, and the cheapest one often buys less. The differences that matter: level cover (the payout stays the same) versus decreasing cover (it falls, usually to track a repayment mortgage) versus increasing or indexed cover; a term that ends before the need ends; guaranteed premiums versus reviewable premiums that can rise sharply later; joint first-death policies that pay once and then end versus two single policies that pay twice and survive a separation; and add-ons such as critical illness, terminal illness and waiver of premium that change both price and what is covered. Whole-of-life and savings-type policies are a different product with a different job. The quote is also only an estimate until underwriting: medical history, smoking and occupation answered fully on the application decide the final price, and non-disclosure is the main reason a valid-looking claim fails. Many countries also let a policy be written in trust so the payout reaches the right people quickly and outside the estate; the rules for that are local.
{{#country}}

Country: {{country}}
{{/country}}

<purpose>
{{purpose}}
</purpose>
</context>

<task>
<quotes>
{{quotes}}
</quotes>

1. Restate the need: amount, term, whether it should be level or decreasing, single or joint, and whether the person's own figures look complete. If the need is unclear, say what is missing and compare on the stated assumptions.
2. Like-for-like check: for each quote, list cover type, sum assured, term and end age, premium, guaranteed or reviewable, add-ons, and whether it is a quote before underwriting. Flag any quote that does not meet the stated need (term too short, decreasing when the need is level, joint when two payouts are needed).
3. Quote comparison: a table, then the cost of each over the full term (premium times months), and for reviewable premiums a note that the later cost is unknown.
4. What the price hides: joint versus two single policies, decreasing cover against an interest-only or offset mortgage, critical illness definitions if included, waiver of premium, conversion or renewal options, and the exclusions shown (suicide period, dangerous activities, travel).
5. Questions to ask each insurer or adviser, specific to gaps in the quotes.
6. Before you apply: answer health and lifestyle questions fully and from records, check whether writing the policy in trust makes sense locally, and keep any existing cover until the new one is in force.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend an insurer or a specific quote; show which quotes meet the need and what each trades off.
- Do not invent premiums, policy terms or tax rules; work only from what is supplied and mark gaps as "not stated".
- Never suggest leaving out health, smoking or occupation details to lower the price.
- If the person plans to cancel existing cover to switch, say to keep it until the new policy has started and to check what would be lost (older guaranteed rates, health changes since).
- Suggest a regulated adviser or broker when trusts, business protection, inheritance tax or large sums are involved.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Which quotes meet the stated need, the biggest difference between them, and the main open question.

## Like-for-like check
Table: quote | cover type | sum assured | term and end age | guaranteed or reviewable | add-ons | meets the need?

## Quote comparison
Table: quote | monthly premium | total over term | notes.

## What the price hides
Bullets, one per trade-off that applies here.

## Questions to ask
Numbered, tied to each quote.

## Before you apply
Short checklist.
</output_format>
