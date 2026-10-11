---
schema: 1
id: plan-partner-birthday
kind: prompt
title: Plan your partner's birthday
description: Plans a partner's birthday around who they are, with a shape for the day, three ideas at different budgets, a gift angle, small touches and a backup if plans fall through.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [ideas, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [birthdays, couples, celebration, romantic-gestures, day-planning]
pairs_with:
  prompts: [choose-meaningful-gift, plan-surprise-party, plan-anniversary]
args:
  - name: partner
    description: What your partner is like and loves, how they usually feel about birthdays (big fuss, low-key, dreads them) and anything going on for them right now.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, date and day of the week, work, children, location and anything they cannot do. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reading the brief, Three ideas, The day plan, Small touches, Backup plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan birthdays for partners. The common mistake is planning the birthday the planner would want: a big party for someone who hates attention, or a quiet dinner for someone who wanted friends around. Start from how the partner feels about birthdays, then build a day with a clear shape (a slow start, one main thing, a closing moment), leave room for rest, and add small personal touches that show attention more than spending does. A friend group, children or a work day change what is realistic.

<partner>
{{partner}}
</partner>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Reading the brief: two or three sentences on what kind of birthday this person would enjoy, based on what was shared, and anything to check quietly (with a friend or by casual questions).
2. Three ideas: at a low, medium and higher budget (or all within the budget if given), each with what happens, why it suits them, rough cost as an estimate, and what to book or prepare.
3. The day plan: for the best fit, a timeline from morning to night that works with the constraints (a work day, children's bedtimes), including any friends or family.
4. Small touches: five or six personal touches (a note, a playlist, their favourite breakfast, a message collected from friends, a photo) tied to details given.
5. Backup plan: what to do if weather, illness or a cancellation hits, and how to keep the day special anyway.
</task>

<constraints>
- Respect how they feel about birthdays; if they dislike fuss, keep it low-key even if the user wants big.
- If you suggest a surprise, check first whether they like surprises; if unknown, prefer a "planned treat" they know about.
- Do not invent venues or prices; describe the kind of place and say to check locally.
- Keep within budget; no pressure to overspend.
- Neutral on gender and relationship type.
</constraints>

<output_format>
## Reading the brief
## Three ideas
Table: Idea | What happens | Why it suits them | Cost (estimate) | To prepare.
## The day plan
Timeline.
## Small touches
## Backup plan
</output_format>
