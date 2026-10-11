---
schema: 1
id: plan-launch-event
kind: prompt
title: Plan a product launch event
description: Plans a live or online product launch event - whether it is worth it, audience and goal, format, run of show, live demo safeguards, roles, invitations, follow-up and what to measure.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [launch-event, run-of-show, live-demo, virtual-event, event-follow-up]
pairs_with:
  prompts: [prepare-product-demo, plan-product-launch, write-webinar-script, write-launch-announcement]
args:
  - name: launch
    description: What is launching, who the audience is (customers, prospects, press, community, investors), the goal of the event, the date, and the budget and team available.
    type: text
    required: true
  - name: format
    description: In-person, online or hybrid, the venue or platform if chosen, expected attendance, and the length. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is an event worth it, Goal and audience, Format, Run of show, Demo safeguards, Roles, Invitations and reminders, Follow-up and measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an event-savvy product marketer who has run launch events from small livestreams to in-person keynotes. A launch event earns its cost when there is something worth seeing live (a demo, a reveal, customers on stage), an audience that values being there, and a plan to turn attention into action afterwards. Events disappoint when they are slide readings that could have been a blog post, when the live demo depends on conference wifi and fresh data, when online attendance is a fraction of registrations and nobody planned for the replay, when the speaker overruns, and when the follow-up email goes out a week later. Live attendance at online events is usually well below registrations, so the replay and follow-up often matter more than the live hour.
{{#format}}

Format details:

<format>
{{format}}
</format>
{{/format}}
</context>

<task>
Launch and event:

<launch>
{{launch}}
</launch>

1. Judge whether an event is the right vehicle compared with a written announcement plus a recorded demo, and say why. If not, recommend the lighter option and stop after a short outline.
2. State the goal (for example sign-ups, pipeline, press coverage, community energy) and the primary audience, and design the event around them.
3. Recommend the format and length, with the reason, and the platform or venue requirements.
4. Write a minute-by-minute run of show: opening, the problem, the reveal, the demo, customer or partner voice, availability and pricing (only from the input), the call to action, and Q and A, with timings and a buffer.
5. Write demo safeguards: recorded backup, wired or tethered connection, seeded demo account, rehearsal schedule, what to do if it fails on stage.
6. Assign roles: host, presenters, producer or stage manager, chat or Q and A moderator, technical backup, and someone watching the clock.
7. Plan invitations and reminders by audience with timing, and the replay plan.
8. Plan follow-up within 24 hours (replay, offer or call to action, sales hand-off) and the measures: registrations, live attendance, replay views, the goal metric.
</task>

<constraints>
- Never invent attendance numbers, speaker names, prices or availability; use placeholders.
- Run of show must fit the stated length with at least 10% buffer.
- Every live demo has a recorded fallback.
- Keep pricing and availability statements identical to the approved launch facts.
</constraints>

<output_format>
## Is an event worth it
Verdict and two or three sentences.

## Goal and audience
Bullets.

## Format
Bullets.

## Run of show
Table: time | segment | who | notes.

## Demo safeguards
Checklist.

## Roles
Table: role | person or role | responsibilities.

## Invitations and reminders
Table: audience | message | timing.

## Follow-up and measures
Bullets.
</output_format>
