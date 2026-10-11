---
schema: 1
id: plan-roadmap-around-fixed-event
kind: prompt
title: Plan a roadmap around a fixed event
description: Plans product work backwards from a fixed conference, keynote or trade show date, with scope tiers, a cut-line, decision dates and a fallback story if the cut-line is reached.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fixed-date, scope-tiers, cut-line, backward-planning, keynote, trade-show]
pairs_with:
  prompts: [plan-release, plan-launch-event, forecast-roadmap-dates-with-ranges, fit-regulatory-deadline-into-roadmap]
args:
  - name: event
    description: The event, its date, what the company wants to show or announce there, and the audience (customers, press, partners, investors).
    type: text
    required: true
  - name: work
    description: The features or items wanted for the event, with rough sizes, dependencies and who builds them.
    type: text
    required: true
  - name: capacity
    description: Optional. Team capacity until the event, other commitments in the same period, and any freeze or demo-preparation time needed.
    type: text
output_contract:
  format: markdown
  sections: [Fixed points, Scope tiers, Backward schedule, Cut-line and decision dates, Fallback story, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan product work that has to be ready for a date that will not move: a user conference, a keynote, a trade show, a partner summit. With a fixed date the only variable is scope, so the plan must say up front what is essential, what is nice to have, and when each will be cut if it is not on track. Teams get this wrong by counting back to the event day itself, forgetting that marketing needs final material weeks before, demos need rehearsal on a stable build, and the press needs embargoed briefings. They also confuse "shown" with "shipped": a feature can be previewed, demoed in a controlled environment, or generally available, and each needs different work. Announcing something customers cannot get for months damages trust.
{{#capacity}}
Capacity: {{capacity}}
{{/capacity}}
</context>

<task>
Event:

<event>
{{event}}
</event>

Work wanted:

<work>
{{work}}
</work>

1. List the fixed points working back from the event: demo build freeze, rehearsal dates, marketing and press material deadlines, partner or customer previews, and any app store or approval lead times. Use the user's dates; label any you assume.
2. Sort the work into scope tiers: must show (the event fails without it), should show, and could show. For each, state the level needed: preview, controlled demo, beta, or generally available.
3. Build a backward schedule from the event to today, fitting the tiers into capacity. Show slack, and flag if the must-show tier alone does not fit.
4. Set the cut-line and decision dates: the date by which each should and could item must hit a named checkpoint or be cut, and who decides.
5. Write the fallback story: what the company says at the event if items fall below the cut-line, so the announcement still works.
6. List risks (dependencies, demo fragility, approval delays, key people unavailable) with mitigations.
</task>

<constraints>
- Never move the event date in the plan. Adjust scope, not the date.
- Do not invent dates for the user's internal deadlines; mark assumptions clearly and ask.
- Keep "shown" and "available" separate, and do not recommend announcing a general availability date the plan cannot support.
- If the must-show tier does not fit, say so directly and propose cuts or a smaller announcement.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fixed points
Table: date | milestone | owner | source (given or assumed).

## Scope tiers
Table: item | tier | level needed (preview, demo, beta, GA) | size.

## Backward schedule
Table or week list from today to the event.

## Cut-line and decision dates
Table: item | checkpoint | decision date | decider.

## Fallback story
Short paragraph.

## Risks
Bullets with mitigations.
</output_format>
