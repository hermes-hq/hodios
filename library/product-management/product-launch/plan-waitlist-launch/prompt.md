---
schema: 1
id: plan-waitlist-launch
kind: prompt
title: Plan a waitlist and invite-wave launch
description: Plans opening a product from a waitlist in invite waves sized to capacity, with priority rules, the sign-up and invite emails, activation follow-up and the numbers to watch between waves.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, product-manager, marketer]
requires: [none]
inputs: [text, dataset]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [waitlist, invite-waves, early-access, activation, capacity-planning]
pairs_with:
  prompts: [plan-beta-program, plan-product-launch, write-launch-announcement]
args:
  - name: product
    description: The product, why access is limited (capacity, support load, cost, quality), the waitlist size and how it was collected, and what you know about the people on it.
    type: text
    required: true
  - name: capacity
    description: How many new users you can onboard per week (infrastructure, support, hand-holding) and the target date for open access, if any. Optional.
    type: text
  - name: priorities
    description: Who you want first - for example paying intent, a segment, referrals, partners - and any promises already made to the list. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why a waitlist, Priority rules, Wave plan, Emails, Between-wave checks, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a founder-minded product lead who has opened products from a waitlist. A waitlist is useful when access is genuinely limited by capacity, support or quality, and when each wave teaches something before the next. It turns sour when it is pure theatre: invites drip out with no reason, early sign-ups wait months while latecomers jump the queue, nobody explains how the order works, invited people never activate because the invite email is the first contact in months, and referral schemes reward gaming. Waitlist sign-ups decay quickly, so long silences cost activation. A good plan states the honest reason for the limit, uses priority rules people would accept as fair, sizes waves to the real bottleneck, keeps the list warm with occasional real updates, and checks activation and problems before opening the next wave.
{{#capacity}}

Capacity:

<capacity>
{{capacity}}
</capacity>
{{/capacity}}
{{#priorities}}

Priorities and promises:

<priorities>
{{priorities}}
</priorities>
{{/priorities}}
</context>

<task>
Product and waitlist:

<product>
{{product}}
</product>

1. State the honest reason for limited access. If the input suggests there is no real constraint, say so and recommend an open launch or a short, clearly time-boxed list instead.
2. Write priority rules: who goes first and why, how sign-up order counts, how referrals or partners count (with limits to stop gaming), and how to honour promises already made. Write a one-paragraph public explanation of the order.
3. Plan the waves: size, who is in each, what each wave is meant to learn or prove, the bottleneck it respects, and the gap before the next wave. End with the condition for open access.
4. Draft the emails: a list warm-up update (real news, no hype), the invite (what they get, how to start in under five minutes, the invite expiry if any, who to contact), a nudge for invited-but-not-activated users, and a "still waiting" message with an honest timeframe.
5. Define between-wave checks: invite acceptance, activation (first meaningful action, defined for this product), support contacts per new user, error or quality signals, and the threshold that pauses the next wave.
6. List risks: list decay, unfairness complaints, referral gaming, capacity overrun, and data protection basics for the sign-up list (consent to email, unsubscribe, keeping only what is needed; rules differ by country).
</task>

<constraints>
- Never invent list sizes, activation rates or capacity numbers; use placeholders where missing.
- No fake scarcity or invented demand claims ("thousands waiting") unless the input supports them.
- Keep emails short and specific; each invite email has one clear action.
- Do not recommend buying or importing contacts onto the list.
</constraints>

<output_format>
## Why a waitlist
Two or three sentences, or a recommendation not to use one.

## Priority rules
Bullets, then the public explanation paragraph.

## Wave plan
Table: wave | size | who | learning goal | gap before next.

## Emails
Four drafts with subject lines.

## Between-wave checks
Table: signal | definition | pause threshold.

## Risks
Bullets with mitigations.
</output_format>
