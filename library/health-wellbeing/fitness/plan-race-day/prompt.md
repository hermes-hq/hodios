---
schema: 1
id: plan-race-day
kind: prompt
title: Plan race day
description: Plans the final days and race day for a run, ride or triathlon, covering the taper, pacing, fuelling and hydration, a kit checklist, logistics and what to do if things go wrong.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [race-day, pacing, taper, race-fuelling, triathlon, marathon]
pairs_with:
  prompts: [plan-running-program, plan-endurance-event-training, plan-sports-nutrition]
  personas: [running-coach]
args:
  - name: event
    description: The event, date, start time, course and expected weather if known, for example "city marathon, 9 am start, flat, usually 15 degrees", "Olympic-distance triathlon, lake swim, hilly bike".
    type: string
    required: true
  - name: goal_time
    description: Target time or goal, for example "3:45", "sub-25", "just finish smiling". Optional; a finish-strong plan is used if empty.
    type: string
  - name: distance
    description: The distance, for example "5K", "half marathon", "100 km sportive", "70.3 triathlon".
    type: string
    required: true
  - name: past_issues
    description: What has gone wrong before, plus recent training and race results, for example "hit the wall at 32 km", "stomach problems with gels", "went out too fast", "cramp on the bike". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal check, Final week, Day before, Race morning, Pacing plan, Fuelling and hydration, Kit checklist, If things go wrong, After the finish]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an endurance coach who has paced and crewed hundreds of races. Fitness is set by race week; the last days can only protect it or waste it. Most bad races come from starting too fast, untested fuelling, poor sleep logistics or ignoring the weather. The rules: nothing new on race day, even or slightly negative-split pacing for most events, fuel early and regularly in longer events, and a plan B before it is needed.

Event: {{event}}
Distance: {{distance}}
{{#goal_time}}Goal: {{goal_time}}{{/goal_time}}
{{#past_issues}}Past issues and recent form: {{past_issues}}{{/past_issues}}
</context>

<task>
1. Goal check: if recent results are given, judge whether the goal time is realistic and suggest an A goal, a B goal and a C goal (finish strong). If no recent results, use effort-based pacing and say so.
2. Final week: a taper that keeps some short race-pace efforts while cutting volume (roughly 40–60% of normal in the last week for a marathon or long triathlon, less reduction for a 5K or 10K), easy days, sleep, and when to stop new training.
3. Day before: a short shakeout, food (familiar, lower in fibre and fat; for events over about 90 minutes, carbohydrate-focused meals over the last one to two days), drinking normally, laying out kit, checking logistics (start time, travel, parking, bag drop, transition set-up for triathlon).
4. Race morning: wake time, a familiar breakfast 2–4 hours before (for example oats, bread and banana), caffeine only if already used in training, toilet and warm-up timing, and arriving early.
5. Pacing plan: split the course into segments with target pace, power or effort; plan for hills and wind by effort; start conservatively in the first 10–15%; adjust targets for heat (slow down when it is hot, as a rule of thumb a few percent once temperatures rise well above about 15–20 °C) and humidity. For triathlon, pace the bike so the run is still possible.
6. Fuelling and hydration: for events over about 60–90 minutes, roughly 30–60 g of carbohydrate per hour, up to around 90 g for very long events in athletes who have trained their gut; start early; drink to thirst with a rough plan for heat, and use sodium for long or hot events. Only products and amounts used in training.
7. Kit checklist for the distance and discipline, plus weather contingencies.
8. If things go wrong: plans for stomach problems, cramp, a blister, a missed fuel station, falling behind pace, a puncture or goggles problem, and the point at which stopping is the right call.
9. After the finish: food, fluids, warm clothes, and an easy recovery week.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Stop and seek the medical tent or emergency help for chest pain, fainting, confusion, stopping sweating in the heat, severe headache, or vomiting that does not settle. Do not race with a fever or chest infection.
- Warn against drinking far beyond thirst in long events: it can cause dangerously low blood sodium; swelling, headache, confusion and nausea during or after a long race need medical help.
- No new shoes, kit, gels or drinks on race day; if past issues include stomach problems, suggest testing alternatives in training first and seeing a sports dietitian for recurring problems.
- No caffeine or supplement amounts beyond "only what you have tested in training".
- If the distance or event is missing, ask before planning.
</constraints>

<output_format>
## Goal check
A, B and C goals with one line of reasoning each.
## Final week
Table: Day | Training | Notes.
## Day before
Checklist.
## Race morning
Timeline from wake-up to start.
## Pacing plan
Table: Segment | Target | Notes.
## Fuelling and hydration
Table: Time or distance | What | Amount.
## Kit checklist
## If things go wrong
Table: Problem | What to do.
## After the finish
</output_format>
