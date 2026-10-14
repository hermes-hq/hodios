---
schema: 1
id: plan-behavioural-activation
kind: prompt
title: Plan small steps for low mood
description: Builds a gentle behavioural activation plan for low mood with small routine, necessary and enjoyable activities, a realistic weekly schedule, a mood and activity log and a weekly review.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [behavioural-activation, low-mood, depression-self-help, activity-scheduling, motivation]
pairs_with:
  prompts: [build-mood-tracker, plan-for-winter-low-mood, talk-to-doctor-about-mental-health, build-connection-plan]
  personas: [supportive-listener]
args:
  - name: situation
    description: What low mood looks like for you and what has dropped off, for example "stopped going to the gym and seeing friends, stay in bed till noon at weekends, washing up piles up".
    type: text
    required: true
  - name: values
    description: What used to matter or still matters to you, for example "being a good uncle", "being outdoors", "making things". Optional.
    type: text
  - name: energy
    description: How much energy you have most days.
    type: enum
    enum: [very-low, low, some]
    default: low
output_contract:
  format: markdown
  sections: [How this works, What has dropped off, Activity menu, This week, Mood and activity log, Weekly review, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone with low mood use behavioural activation, a well-researched approach for depression. Low mood leads people to withdraw and avoid (staying in bed, cancelling plans, letting tasks pile up), which brings brief relief but removes the things that give pleasure, achievement and connection, so mood drops further. Behavioural activation reverses the cycle by acting "from the outside in": planning small, specific activities at specific times, regardless of motivation, and noticing the effect on mood. The mix matters: routine activities (meals, washing, sleep times), necessary ones (bills, appointments) and pleasurable or meaningful ones linked to what the person values. Starting much smaller than feels worthwhile is the most common key to success, because the aim is to do it even on a bad day. Motivation usually follows action rather than coming first.

Situation: {{situation}}
{{#values}}Values: {{values}}{{/values}}
Energy: {{energy}}
</context>

<task>
1. How this works: explain the withdrawal cycle and the outside-in idea in four or five plain sentences, using their situation as the example.
2. What has dropped off: list what has stopped or shrunk, from {{situation}}, sorted into routine, necessary and pleasurable or meaningful, and link pleasurable ones to the values they named where possible.
3. Activity menu: a table of 10 to 15 small activities across the three types, each broken down to a first step sized for {{energy}} (for very low energy, two to five minutes: "put trainers by the door", "open the curtains", "reply to one message"), with a slightly bigger version for better days.
4. This week: a simple seven-day schedule with two or three activities per day at specific times, anchored to existing routines (after breakfast, after work), mixing the three types, with one rest slot and no more than one demanding task a day.
5. Mood and activity log: a template to record what they did, mood before and after (0 to 10), and a sense of achievement and enjoyment (0 to 10), with one example row.
6. Weekly review: four questions to ask at the end of the week (what lifted mood even slightly, what was too big, what to repeat, what to add), and how to step up gradually. Expect some days to go badly; the plan bends, it does not break.
7. When to get more help: low mood most days for two weeks or more, losing interest in almost everything, changes in sleep or appetite, or hopelessness are reasons to talk to a doctor; behavioural activation is also offered with a therapist's support.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Keep every first step genuinely small. Do not prescribe an overhaul, strict routines, or exercise targets.
- Do not diagnose depression; describe low mood in their words.
- Avoid toxic positivity and "just do it" tone. Doing a smaller step counts as success.
- If they mention not eating, not drinking or not getting out of bed for days, encourage them to see a doctor soon.
</constraints>

<output_format>
## How this works
## What has dropped off
## Activity menu
Table: Activity | Type | First small step | Bigger version.
## This week
Table: Day | Morning | Afternoon | Evening.
## Mood and activity log
Table: Day and time | Activity | Mood before | Mood after | Achievement 0-10 | Enjoyment 0-10.
## Weekly review
## When to get more help
</output_format>
