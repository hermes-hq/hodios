---
schema: 1
id: divide-belongings-fairly
kind: prompt
title: Divide shared belongings fairly
description: Sets up a fair way to divide belongings among siblings, heirs, former partners or housemates - turn-taking picks, points bidding or sealed bids - with rules agreed before anyone chooses.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
advice_risk: [legal]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [fair-division, inheritance, heirlooms, siblings, separation]
pairs_with:
  prompts: [settle-estate-checklist, declutter-sentimental-items, make-group-decision]
args:
  - name: situation
    description: What is being divided and why (a parent's home contents, a shared flat after a break-up), who is sharing, and the rough mix of items (sentimental, valuable, practical).
    type: text
    required: true
  - name: tensions
    description: Optional - known disagreements, items more than one person wants, people who live far away, and anything in a will or agreement about specific items.
    type: text
output_contract:
  format: markdown
  sections: [What applies first, Recommended method, Ground rules, Step by step, Handling disputes, Recording the result]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people divide belongings without lasting resentment. Your limits:
{{> guardrails/professional-limits}}

Fights over belongings are rarely about money; a cheap item can carry a lot of memory, and grief or a break-up makes every choice feel like a judgement on the relationship. Fairness comes mostly from agreeing the method before anyone sees who wants what. Proven methods: a round-robin draft (people take turns picking one item, with the order reversed each round, a "snake" order, so first pick is balanced out); points bidding (everyone gets the same number of points to spread across the items they want; highest bid wins each item); sealed bids with money (the winner pays the others their share, useful for valuable items); "one divides, the other chooses" for two people splitting lots; and selling what nobody wants and splitting the proceeds. First, though, anything a will, court order, prenuptial or separation agreement says about specific items applies, and an executor or administrator may have formal duties; valuable items may need valuing before division so shares are equal.

Situation:
<situation>
{{situation}}
</situation>
{{#tensions}}Tensions and constraints:
<tensions>
{{tensions}}
</tensions>
{{/tensions}}
</context>

<task>
1. What applies first: list what to check before dividing (will or agreement terms, executor's role and any need to value items, debts or sale needed first, who legally owns jointly bought items), described as general points to confirm with the executor or a lawyer.
2. Recommend a method for this situation (draft, points, sealed bids, divide-and-choose, or a mix such as a draft for sentimental items and sale for valuables) and say why it fits the number of people and the mix of items.
3. Write ground rules for everyone to agree in advance: who takes part (including how distant relatives join by video or proxy), the pick order and how it is set (for example by lot), how valuable items count against a share, a time limit, and what happens to unclaimed items.
4. Give the step-by-step process: list and photograph items, mark items already promised, flag items several people want, run the method, settle up any money.
5. Handling disputes: how to resolve a clash over one item (bidding points, a swap, a coin toss agreed in advance, taking turns with a time-share, a neutral person), and how to pause if emotions run high.
6. Recording the result: a simple record of who received what and any payments, signed or confirmed by all.
</task>

<constraints>
- Do not state inheritance or property law as fact for any country; say what usually needs checking and with whom.
- Treat sentimental value as real, not as something to be argued away with prices.
- Do not take sides between the people involved.
- If there is a serious dispute about the will, the estate or a separation, recommend mediation or legal advice before dividing anything.
</constraints>

<output_format>
## What applies first
Checklist to confirm.

## Recommended method
The method and why it fits.

## Ground rules
Numbered rules to agree before starting.

## Step by step
Numbered steps.

## Handling disputes
Bullets.

## Recording the result
What to record and how.
</output_format>
