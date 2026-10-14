---
schema: 1
id: plan-launch-calendar
kind: prompt
title: Plan a quarterly launch calendar
description: Builds a quarter's launch calendar from many teams' planned releases - tiering each, spacing them to avoid collisions and audience fatigue, respecting blackout dates and flagging dependencies.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, marketer, project-manager, executive]
requires: [none]
inputs: [dataset, text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [launch-calendar, release-planning, launch-tiering, cross-team-coordination]
pairs_with:
  prompts: [define-launch-tiers, plan-product-launch, write-monthly-product-update]
args:
  - name: releases
    description: The planned releases for the period - name, team, what it is, target date and how confident it is, audience, and the team's suggested tier.
    type: text
    required: true
  - name: calendar_constraints
    description: Blackout dates (holidays in key markets, code freezes, financial year end), big external moments (conferences, competitor events), capacity of marketing, sales enablement and support, and channel limits such as how often you email customers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Tiering, Calendar, Collisions and fixes, Dependencies and risks, Decisions needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketing or launch operations lead coordinating a quarter of releases from several teams. Individually reasonable launches often add up to a bad calendar: three tier-one launches in one week fight for the same email slot and press attention, sales is asked to learn four things before quarter end, support absorbs several changes at once, and launches land on holidays in a key market. Teams also over-tier their own work and give dates with optimism. A useful calendar tiers every release consistently, treats date confidence as data, spaces big launches, bundles small ones into a recurring update, respects the capacity of the teams that do the launching, and makes the trade-offs explicit for leadership instead of quietly picking winners.
{{#calendar_constraints}}

Calendar constraints:

<calendar_constraints>
{{calendar_constraints}}
</calendar_constraints>
{{/calendar_constraints}}
</context>

<task>
Planned releases:

<releases>
{{releases}}
</releases>

1. Tier each release using a simple consistent rule (customer impact, revenue, breadth of audience, change to existing behaviour). Where you disagree with the team's suggested tier, say why in one line.
2. Place releases on a week-by-week calendar. Rules of thumb: no more than one top-tier launch in the same week; keep a buffer week after a top-tier launch for its follow-up; bundle low-tier releases into a recurring update; avoid blackout dates and key-market holidays; keep low-confidence dates out of fixed external slots.
3. List collisions (same week, same audience, same channel, same enabling team) and propose a fix for each: move, bundle, downgrade the external push, or decouple the ship date from the announcement date.
4. Note dependencies between releases (one needs another, shared pricing or docs) and risks from low-confidence dates.
5. List the decisions leadership must make, with the trade-off in one sentence each.
</task>

<constraints>
- Never invent releases, dates or holidays; if you mention a likely holiday or event, mark it as an assumption to check for the markets involved.
- Separate the ship date from the announcement date; a feature can ship quietly and be announced later.
- Do not decide priorities between teams; recommend and surface the trade-off.
- Keep the calendar readable: one row per week.
</constraints>

<output_format>
## Summary
Three to five bullets.

## Tiering
Table: release | team | suggested tier | recommended tier | reason.

## Calendar
Table: week | top-tier | mid-tier | bundled update | notes (blackouts, buffers).

## Collisions and fixes
Table: collision | proposed fix.

## Dependencies and risks
Bullets.

## Decisions needed
Numbered, each with the trade-off.
</output_format>
