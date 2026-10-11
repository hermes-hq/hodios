---
schema: 1
id: build-freelance-pipeline-routine
kind: prompt
title: Build a freelance pipeline routine
description: Ends the feast-or-famine cycle for an established freelancer with a small weekly business-development routine, a lead tracker, past-client touchpoints and capacity rules for busy months.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [consultant, designer, writer, copywriter]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [feast-or-famine, lead-tracking, business-development, past-clients, capacity-planning]
pairs_with:
  prompts: [ask-clients-for-referrals, screen-freelance-inquiry, pitch-agency-for-overflow-work]
  workflows: [land-first-clients-track]
args:
  - name: business_snapshot
    description: What you sell, typical project size and length, where the last ten clients came from, how many clients you can handle at once, and what the last year looked like month by month (busy and quiet spells).
    type: text
    required: true
  - name: hours_per_week
    description: Hours a week you can protect for finding work even when busy.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Diagnosis, Weekly routine, Lead tracker, Touchpoint calendar, Busy-month rules, Quiet-month moves]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an established freelancer stop the feast-or-famine cycle. The cycle has a known cause: marketing stops when the freelancer is busy, so a quiet spell arrives one project-length later. The fix is a small routine that runs every week regardless of workload, aimed at the channels that already produce clients (for most freelancers: past clients, referrals and a few partners) before new channels. Lead time matters: if projects are booked six weeks ahead, the routine must keep six weeks of conversations warm. A simple tracker with next-action dates beats any tool.

Protected hours per week: {{hours_per_week}}
</context>

<task>
<snapshot>
{{business_snapshot}}
</snapshot>

1. Diagnosis: from the snapshot, name where clients actually come from, the typical lead time from first contact to paid work, the capacity, and the pattern behind quiet spells. If the source of past clients is missing, ask; it decides the plan.
2. Weekly routine sized to the protected hours: three to five specific actions with time boxes (for example, two past-client check-ins, one partner coffee, one piece of visible work), in priority order, with the minimum version for a very busy week.
3. Lead tracker: columns and stages (contact, conversation, proposal, booked, paid, lost) with next-action date, plus the one weekly review question set.
4. Touchpoint calendar for past and current clients: when and why to get in touch (project anniversaries, their seasonal peaks, a useful idea), with two sample messages that offer value rather than "any work for me?".
5. Busy-month rules: what never stops, a waitlist or later start date offer, and a rule for when to raise prices or refer work on.
6. Quiet-month moves: the first three things to do in the first week of a quiet spell, based on the snapshot.
</task>

<constraints>
- Fit the routine inside the stated hours; do not hand a two-hour freelancer a ten-hour plan.
- Base channel choices on where clients actually came from; do not default to generic social media advice.
- Do not invent statistics, conversion rates or client names.
- Outreach must be honest and permission-respecting; no buying lists or mass unsolicited messages.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Four bullets: sources, lead time, capacity, pattern.

## Weekly routine
Numbered actions with minutes, plus the busy-week minimum.

## Lead tracker
Table header with one example row using [placeholders].

## Touchpoint calendar
Table: when | who | reason | message angle; then two sample messages.

## Busy-month rules
Bullets.

## Quiet-month moves
Three numbered steps.
</output_format>
