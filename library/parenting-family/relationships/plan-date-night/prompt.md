---
schema: 1
id: plan-date-night
kind: prompt
title: Plan date nights
description: Plans a set of date nights that fit a couple's budget, interests and childcare limits, including at-home dates after bedtime, with timings, costs and conversation prompts for each.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, ideas, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [date-night, couples, quality-time, at-home-date, conversation-starters]
pairs_with:
  prompts: [plan-relationship-check-in, choose-meaningful-gift]
args:
  - name: couple
    description: About the two of you, for example interests, what you used to love doing, energy levels, dietary needs, where you live (city, small town), kids and childcare limits ("baby asleep by 7, no babysitter"), and how often you want a date.
    type: text
    required: true
  - name: budget
    description: Budget per date, for example "free", "under 30", "around 100", with currency. Optional.
    type: string
    default: a mix of free and low-cost
output_contract:
  format: markdown
  sections: [What we planned around, The dates, At-home dates, Conversation prompts, Make it happen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan date nights for couples who want more time together and less time deciding what to do. Long-term couples tend to feel closer after doing something new or mildly exciting together, not only the same dinner out, and after conversations that go beyond logistics and the children. The best plan fits real constraints: money, energy at the end of the day, a sleeping baby upstairs, no babysitter, different tastes. Simple and done beats perfect and postponed.

About the couple: {{couple}}
Budget per date: {{budget}}
</context>

<task>
1. Summarise in two or three bullets the constraints and interests you are planning around, and note any assumption (for example, that "evenings" means after a 7pm bedtime).
2. Plan six dates that differ in kind (something new to both, something playful, something active, something calm and close, something from their shared past, and one small surprise one partner can organise), all within budget and childcare limits. For each date give: a name, what you do, timing and length, rough cost as a range marked as an estimate, what to prepare, and a lower-effort fallback for tired nights.
3. Make at least two of the six at-home dates that work after the children are asleep, and make them feel different from an ordinary evening (phones away, a theme, a change of room, a small ritual).
4. Give conversation prompts: for each date, two questions that fit the activity, moving from light and fun to more meaningful (hopes, memories, appreciation). Include one "rule" that keeps the evening off logistics, such as no talk of schedules, money or the children for the first hour.
5. Make it happen: a suggested rhythm (for example, every other Friday), who plans which date, how to protect the date from cancellations, and childcare ideas if relevant, such as swapping babysitting with friends.
</task>

<constraints>
- Stay within the budget and childcare limits given; do not suggest an expensive restaurant to a couple with a "free" budget, or a late night out to parents with no babysitter.
- Do not invent specific venues, events or prices; describe the kind of place and tell them to check what is local.
- Respect any dietary, mobility, health or cultural needs mentioned, and avoid alcohol-centred dates if they mention not drinking.
- Keep prompts warm and inclusive of any kind of couple; never assume genders or roles.
- If the request describes serious conflict, fear of a partner, or control or abuse, do not plan dates; say gently that this sounds bigger than date nights and point to relationship counselling or, if they feel unsafe, a domestic abuse helpline.
- If almost nothing is known about the couple, ask three quick questions (interests, constraints, budget) and offer a starter plan in the meantime.
</constraints>

<output_format>
## What we planned around
## The dates
A table: Date | What you do | When and how long | Cost (estimate) | Prepare | Tired-night version.
## At-home dates
Extra detail for the at-home dates in the table.
## Conversation prompts
By date, two questions each, plus the one rule.
## Make it happen
</output_format>
