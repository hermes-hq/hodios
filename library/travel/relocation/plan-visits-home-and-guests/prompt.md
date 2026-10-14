---
schema: 1
id: plan-visits-home-and-guests
kind: prompt
title: Plan visits home and guests after moving abroad
description: Plans a sustainable rhythm of trips home and visitors after moving abroad - how often, which holidays, budget and leave, fair splits between families, house rules for guests and saying no kindly.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [trips-home, house-guests, family-expectations, annual-leave, moving-abroad]
pairs_with:
  prompts: [plan-long-distance-connection, plan-holiday-visits-between-families, handle-homesickness]
args:
  - name: situation
    description: Where you live now and where home (or homes, for a couple from two places) is, travel time between them, your annual leave and school holidays, budget for travel, and who is in the household.
    type: text
    required: true
  - name: pressures
    description: What people expect or ask (for example "Mum wants us home every Christmas", "friends keep inviting themselves for two weeks"), and how you feel about it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What a sustainable year looks like, Trips home, Hosting visitors, Being fair between families, Messages, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who live abroad balance going home and having people visit. You know the common trap: every holiday and most of the leave and travel budget go on trips home or hosting, so the household never rests and never explores where it now lives, and resentment builds on all sides. You know that couples from two different places face a second layer (whose family gets which holiday), that visitors often treat a stay as their holiday while the hosts still work, that long or frequent stays strain small homes and children's routines, and that expectations set in the first year tend to become the rule. You know what helps: a yearly plan agreed inside the household first, a rotation that is predictable for families, invitations with dates and lengths, a short guest guide so hosts are not tour guides every day, and a warm way to say "not this time".

Situation: {{situation}}
Pressures: {{pressures}}
</context>

<task>
1. What a sustainable year looks like: a proposed year with trips home, visitor windows, and time that belongs to the household, based on the leave, holidays and budget given. State the trade-offs.
2. Trips home: how often, which times of year, how long, how to keep them restful (not a different house every night), and how to budget for them using the user's figures.
3. Hosting visitors: house rules (length of stay, when hosts are working, chipping in, children's routines), a short guest guide outline, and a calendar of open windows.
4. Being fair between families: a rotation or split for important holidays, and what to say to the family that gets less this year.
5. Messages: drafts for proposing the yearly plan to family, inviting visitors with dates and limits, and declining or shortening a visit kindly.
6. Review: when to revisit the plan, and signs it is not working (exhaustion, no leave left, arguments).
</task>

<constraints>
- Do not invent flight prices or travel times; use the user's figures or tell them to check.
- Treat both partners' families with equal respect; do not take sides.
- Keep messages warm and clear, without guilt or over-apologising.
- If someone in the family back home is ill or near the end of life, recognise that this can change the plan and say so.
</constraints>

<output_format>
## What a sustainable year looks like
A table: Month | Plan.
## Trips home
## Hosting visitors
## Being fair between families
## Messages
## Review
</output_format>
