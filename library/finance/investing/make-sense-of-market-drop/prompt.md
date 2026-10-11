---
schema: 1
id: make-sense-of-market-drop
kind: prompt
title: Make sense of a market drop
description: Helps an anxious investor understand a portfolio fall - its size in context, past falls, what selling would lock in - and check it against their own plan, without predictions.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [market-downturn, bear-market, panic-selling, investor-behaviour]
pairs_with:
  prompts: [write-investment-policy-statement, assess-risk-tolerance, explain-rebalancing, write-investment-decision-journal]
  personas: [investing-educator]
args:
  - name: what_happened
    description: What you hold (roughly), how much it has fallen in money and percent, and what you are tempted to do.
    type: text
    required: true
  - name: plan
    description: Your time horizon, when you need the money, whether you are still adding money, and any written plan or target mix. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First, a pause, The fall in context, What selling would and would not do, Check it against your plan, Things within your control, When to talk to someone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Share markets fall by 10% or more fairly often, by 20% or more every several years, and occasionally by much more. The emotional pain of a loss is felt roughly twice as strongly as an equal gain, which pushes people to sell after falls and buy after rises, the opposite of what most long-term plans need. Selling turns a paper fall into a realised loss and raises the question of when to get back in, which nobody can time reliably; some of the strongest days have historically come close to the worst ones. But "never sell" is also not the answer: the right response depends on when the money is needed, whether the portfolio was ever suitable for the person, and whether the fall reveals they took more risk than they can live with. The useful job is to slow down, put the fall in context and check it against the person's own plan.

<what_happened>
{{what_happened}}
</what_happened>
{{#plan}}Plan: {{plan}}{{/plan}}
</context>

<task>
1. First, a pause: acknowledge the feeling briefly and suggest not making a decision today.
2. The fall in context: their fall in money and percent; how falls of that size compare with past declines in broad terms (frequency, typical recovery times as wide ranges) with the caveat that past patterns do not guarantee future ones. If they are still adding money, explain that new contributions now buy at lower prices.
3. What selling would and would not do: what it locks in, the two decisions it creates (when to sell and when to buy back), possible tax and dealing costs to check, and when reducing risk can still be reasonable (money needed soon, a portfolio that was never right for them).
4. Check it against your plan: ask or use their horizon and needs; separate money needed within a few years from long-term money; if they have a written plan or target mix, check whether the fall triggers a rebalancing rule rather than a new decision.
5. Things within your control: spending, contributions, rebalancing rules, checking the emergency fund, reducing how often they look at the portfolio, writing down the reason for any change.
6. When to talk to someone: an adviser if the money is needed soon or the portfolio feels wrong for them; a doctor or support line if anxiety is affecting sleep or health.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict whether markets will fall further or recover by a date.
- Do not tell the person to hold, sell or buy; lay out what each choice involves.
- Historical statistics are broad and approximate; do not invent precise figures.
- Keep it short and calm.
{{> output/uncertainty}}
</constraints>

<output_format>
## First, a pause
Two or three sentences.

## The fall in context
Short paragraph with their numbers.

## What selling would and would not do
Bullets.

## Check it against your plan
Bullets or a few questions.

## Things within your control
Checklist.

## When to talk to someone
Two or three bullets.
</output_format>
