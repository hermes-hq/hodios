---
schema: 1
id: plan-mental-health-day
kind: prompt
title: Plan a mental health day
description: Plans a restorative day off for your mental health around how you feel, with what to do, what to avoid, how to ask for the day at work or school, and a small step for the day after.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [mental-health-day, rest, recovery, self-care, sick-day]
pairs_with:
  prompts: [check-burnout-signs, plan-burnout-recovery, reset-from-overwhelm, plan-digital-detox]
  personas: [supportive-listener]
args:
  - name: state
    description: How you feel and why you need the day, for example "wiped out after a month of deadlines", "anxious and tearful", "can't face people", "numb and foggy".
    type: text
    required: true
  - name: constraints
    description: What shapes the day, for example "kids at school 9 to 3", "no money for outings", "live in a city", "partner works from home". Optional.
    type: text
  - name: asking
    description: Who you need to ask for the day, if anyone.
    type: enum
    enum: [employer, school-or-university, my-child-school, self-employed, no-one]
    default: employer
output_contract:
  format: markdown
  sections: [How you are today, Your plan for the day, What to avoid, Asking for the day, Tomorrow, If one day is not enough]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone plan a single day off for their mental health so that it actually restores them. Many people waste a mental health day: they spend it catching up on chores, checking work messages, doom-scrolling, or feeling guilty, and return as tired as before. Research on recovery from work stress points to four things that help: psychological detachment (really not thinking about or checking work), relaxation, mastery (a small, absorbing, achievable activity), and a sense of control over how the time is spent. Light, movement and time outdoors, a proper meal, rest without pressure to sleep all day, and some low-key contact with a person they like also help. What restores depends on the state: exhaustion needs rest and gentle movement, anxiety needs calming and a break from triggers, numbness or low mood benefits from small doses of activity and connection. In most places a mental health problem is a legitimate reason for sick leave; people do not owe their employer the details.

State: {{state}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
Asking: {{asking}}
</context>

<task>
1. How you are today: reflect their state in one or two sentences and say which kind of day fits best (rest-heavy, calming, gently active).
2. Your plan for the day: a loose plan in morning, midday, afternoon and evening blocks, with one anchor per block rather than a schedule, fitted to any constraints they gave: a slow start, light and movement outdoors, a proper meal, one small absorbing activity they choose, one low-key contact with someone, and a calm evening with a set time for screens off. Offer two alternatives for each anchor so they can choose on the day.
3. What to avoid: checking work email or chat (and how to switch off notifications), turning the day into a chore marathon, alcohol as the way to relax, and long scrolling sessions. Say guilt may show up and what to tell themselves.
4. Asking for the day: a short script for {{asking}}: for an employer, a simple sick-day message without detail ("I'm unwell today and won't be working; I'll update you tomorrow"), and a note that sick leave rules and whether a doctor's note is needed vary; for school or university, a short message and who to send it to; for a child's school, a parent's note; for self-employed, how to clear the day with clients. If no-one, skip.
5. Tomorrow: one small thing to make the first hour back easier, and one change to carry forward from what helped.
6. If one day is not enough: if they need these days often, feel no better after rest, or feel this way most days for two weeks or more, suggest checking for burnout and talking to a doctor, and that longer sick leave or adjustments may be possible.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Keep the plan flexible and short; no productivity targets.
- Do not tell them to lie to their employer; a brief truthful message without detail is enough.
- Do not state sick leave entitlements as fact for their country.
- Do not suggest spending money they may not have; offer free options.
</constraints>

<output_format>
## How you are today
## Your plan for the day
Table: Block | Anchor | Or instead.
## What to avoid
## Asking for the day
## Tomorrow
## If one day is not enough
</output_format>
