---
schema: 1
id: translate-features-to-benefits
kind: prompt
title: Translate features into benefits
description: Turns technical features or trade jargon into customer benefits with proof using a so-what ladder, flags features no customer cares about, and writes plain lines a buyer understands.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, sales-rep]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [features-benefits, so-what, plain-language, jargon, value-proposition]
pairs_with:
  prompts: [write-product-description, write-landing-page-copy, write-headline-variations, write-sales-faq]
  personas: [copywriter]
args:
  - name: features
    description: The features, specs or trade terms as you would write them (for example "A-rated triple glazing, 28mm cavity, multi-point locks" or "SOC 2 Type II, SSO, 99.9% uptime SLA"). Include any proof you have.
    type: text
    required: true
  - name: customer
    description: Who is buying and what they worry about (for example "homeowners in older terraced houses who hate draughts and noise from the road").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [So-what ladder, Lines to use, Features to drop or move, Proof needed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tradespeople, engineers and product makers explain what they sell in the customer's terms. Experts describe what a thing is; buyers want to know what it does for them. The fix is a so-what ladder: feature (what it is), advantage (what it does), benefit (what changes for this customer), and sometimes the deeper outcome (money, time, safety, pride, peace of mind). Two failure modes to avoid: stopping at the advantage ("faster processing") and climbing so high that every line becomes the same vague promise ("peace of mind"). The best line names the benefit and keeps the feature as proof, because benefits without the feature behind them sound like fluff.

Customer: {{customer}}
</context>

<task>
<features>
{{features}}
</features>

1. If you cannot tell what is being sold or who buys it, ask and stop.
2. For each feature, climb the ladder: feature, advantage, benefit for this customer, and the deeper outcome only when it is genuinely different. Stop at the rung where this customer would nod.
3. Translate every piece of jargon into words the customer uses; keep a term only when customers search for it or a regulator requires it, and then explain it in brackets.
4. Rate each feature for this customer: lead (a main reason to buy), support (proof or reassurance), table stakes (expected; mention briefly) or drop (no customer cares, or it belongs in the spec sheet).
5. Write customer-facing lines for the lead and support features: a short headline-style line and a one-sentence version that pairs benefit and feature ("Quieter rooms from the day it's fitted: triple glazing cuts road noise").
6. List what proof each benefit claim needs (test result, standard, warranty, customer quote, number) and whether the input supplies it.
</task>

<constraints>
- Never invent numbers, test results, savings or certifications. If a benefit needs a number that is not given, write the line without it or add [PROOF NEEDED].
- Benefits must follow from the feature; no stretching ("SSO" does not make a team "more innovative").
- Plain, concrete words. No "cutting-edge", "seamless", "world-class" or "peace of mind" unless tied to a specific worry.
- Different customers get different benefits from the same feature; write for the named customer only.
{{> output/uncertainty}}
</constraints>

<output_format>
## So-what ladder
Table: Feature | Advantage | Benefit for this customer | Deeper outcome (or -) | Rating.

## Lines to use
For each lead and support feature: a short line and a one-sentence benefit-plus-feature line.

## Features to drop or move
Bullets: feature and where it belongs instead (spec sheet, FAQ, nowhere), with the reason.

## Proof needed
Table: Claim | Proof needed | Supplied? (yes or no).
</output_format>
