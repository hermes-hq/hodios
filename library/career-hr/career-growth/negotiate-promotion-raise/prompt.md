---
schema: 1
id: negotiate-promotion-raise
kind: prompt
title: Negotiate a promotion raise
description: Prepares how to negotiate the pay that comes with a promotion when the first number is low, using the new level's band, market data and the scope you take on, with a script and fallbacks.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [plan, script, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [salary-negotiation, pay-raise, compensation, pay-band, new-level]
pairs_with:
  prompts: [ask-for-raise, benchmark-my-salary, prepare-promotion-case]
  personas: [career-coach]
args:
  - name: offer
    description: The promotion offered (new title and level), the new pay and any change in bonus or equity, your current pay, and the band for the new level if known.
    type: text
    required: true
  - name: context
    description: What the new role adds in scope (people, budget, responsibility), how long you have already been doing parts of it, market data you have, and how the company usually handles promotion pay.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Read the offer, Your number, The case, Script, Responses to common replies, Fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people negotiate pay when they are promoted. Internal promotions often come with smaller increases than an external hire would get for the same job, because companies apply a fixed percentage or place the person at the bottom of the new band. People rarely negotiate because they feel grateful, yet this is the moment the company has already decided they are worth more and the base for future raises is set. The strongest arguments are the new level's band (where they should sit given they are already doing the work), external market data for the new role, and the scope they take on. The tone is appreciative and specific: accept the role with enthusiasm and treat pay as a detail to get right.

<offer>
{{offer}}
</offer>
<context_notes>
{{context}}
</context_notes>
</context>

<task>
1. Read the offer: calculate the increase in money and percent, where the new pay sits in the new band (bottom, lower third, midpoint) if the band is known, and how it compares with any market figures given. Note what is unknown.
2. Your number: a specific target and a floor, with reasoning (for example the band midpoint because they have done the role for months, or the market median for the new role). If the offer already looks fair, say so.
3. The case: three or four points: time already spent doing the work, scope and accountability added, market data, and the band position. Separate strong points from weak ones.
4. Script: a short, warm conversation that accepts the promotion, then raises pay ("I'm excited to take this on. Before we finalise, I'd like to talk about the salary"), states the number and reasons, and asks what is possible. Add a follow-up email.
5. Responses to common replies: "promotion increases are capped at X%", "you'll move up the band over time", "this is already a big jump", "budget is fixed this cycle", "let's revisit at your next review". One or two sentences each.
6. Fallbacks: if base pay cannot move: a dated review in writing (for example at six months with criteria), a one-off bonus, equity, an earlier effective date, or extra benefits. How to get any commitment in writing.
</task>

<constraints>
- Do the arithmetic exactly; mark missing figures as [X].
- Do not invent the company's band or market figures; any orienting figure is labelled unverified.
- Never suggest declining the promotion as a bluff or inventing an outside offer.
- Keep the tone appreciative; the person stays in the company.
</constraints>

<output_format>
## Read the offer
Table: Item | Current | Offered | Change.
## Your number
## The case
## Script
Spoken version, then follow-up email.
## Responses to common replies
Table: They say | You say.
## Fallbacks
</output_format>
