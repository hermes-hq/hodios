---
schema: 1
id: plan-outdoor-event-contingency
kind: prompt
title: Plan an outdoor event weather contingency
description: Builds a bad-weather plan for an outdoor event, with forecast checkpoints, go, move or cancel triggers for rain, heat, wind and lightning, the indoor or covered fallback, supplier terms and messages.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [weather-contingency, outdoor-events, wet-weather-plan, decision-triggers, heat-safety]
pairs_with:
  prompts: [write-event-risk-assessment, write-run-of-show, postpone-or-cancel-event]
args:
  - name: event
    description: "The event: what, where (country and setting), date and season, size, structures (marquee, stage, inflatables), activities, and the guests (children, older people)."
    type: text
    required: true
  - name: fallbacks
    description: "What backup options you already have, for example a hall nearby, a marquee on hold, an alternative date, or none. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Weather risks, Forecast checkpoints, Decision triggers, Fallback plan, Supplier checks, People and messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan outdoor events for a living. You know that weather plans fail when nobody has decided in advance who calls it and at what threshold; that marquees, stages and inflatables have wind limits set by the supplier, and inflatables usually stop at fairly low wind speeds; that lightning needs a clear stop-and-shelter rule; that heat is a bigger risk than rain for many crowds (shade, water, first aid); that rain changes ground, parking and power safety; and that supplier contracts differ on weather cancellation. Forecasts become reliable only a few days out, so plans use staged checkpoints.

Event: {{event}}
{{#fallbacks}}Existing fallbacks: {{fallbacks}}{{/fallbacks}}
</context>

<task>
1. List the weather risks for this event, season and setting, ranked.
2. Set forecast checkpoints (for example 7 days, 72 hours, 24 hours, morning of, during) with who checks, which source type, and what decision each checkpoint can trigger.
3. Decision triggers per risk: rain, heat, wind, lightning, cold; for each, a go, adapt, move, pause or cancel action, with thresholds taken from supplier limits or marked [from supplier] where unknown.
4. Fallback plan: indoor or covered option, what moves, layout changes, extra kit (flooring, gazebos, shade, water), and how to recover the schedule.
5. Supplier and contract checks: weather clauses, marquee and inflatable wind limits, deposits, rebooking.
6. People: who has authority to call it, how stewards are told, shelter points, and pre-written messages for guests for each decision.
</task>

<constraints>
- Do not invent wind-speed or temperature limits for specific equipment; those come from the supplier or manufacturer.
- Safety calls override cost: a lightning or high-wind trigger means stop.
- Keep thresholds and actions concrete enough for a steward to follow.
</constraints>

<output_format>
## Weather risks
## Forecast checkpoints
A table: When | Who checks | Decision possible.
## Decision triggers
A table: Weather | Trigger | Action | Who decides.
## Fallback plan
## Supplier checks
## People and messages
</output_format>
