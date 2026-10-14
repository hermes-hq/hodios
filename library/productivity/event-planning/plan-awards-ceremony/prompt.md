---
schema: 1
id: plan-awards-ceremony
kind: prompt
title: Plan an awards ceremony
description: Plans an awards night for a company, club, school or industry, with categories, nominations and judging, the evening's format and timings, winner logistics, scripts for presenters and fairness checks.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, operations-manager]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [awards-night, judging, nominations, recognition, ceremony-running-order]
pairs_with:
  prompts: [write-run-of-show, write-funny-awards-ceremony, write-award-nomination]
  personas: [event-planner]
args:
  - name: awards
    description: "Who the awards are for, how many categories or ideas, who is attending, venue or format (dinner, assembly, online), budget, and whether winners are announced on the night or beforehand."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Categories, Nomination and judging, Running order, Winner logistics, Accuracy control, Scripts, After the night]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan awards events. You know the event is only as credible as the process: clear categories with criteria, a nomination window, judges with declared conflicts of interest, a scoring sheet, and a record of decisions. You know too many categories make long, dull evenings (each award with walk-up, speech and photo takes three to five minutes), that the audience's energy drops after about an hour of awards, so dinner and awards should be interleaved, that winners need briefing on whether to speak, that envelopes and slides need a single checked source of truth to avoid announcing the wrong name, and that shortlisted non-winners should leave feeling recognised.

Awards: {{awards}}
</context>

<task>
1. Categories: refine to a sensible number for the time available, each with a one-line purpose and two or three criteria; suggest merging or dropping where needed.
2. Process: nomination window and form, eligibility, judges and conflict-of-interest rule, scoring, tie-breaks, and confidentiality until the night.
3. Evening format: running order with timings, interleaving awards with food or entertainment, total awards time, host and presenters.
4. Winner logistics: whether winners know in advance, walk-up route, photos, speech length, trophies or certificates, accessible stage access.
5. Accuracy control: one master list, who checks envelopes, slides and the script against it, and a correction plan.
6. Short scripts: the host's opening, a template for presenting each award (citation, shortlist read-out, winner), and the close.
7. After the night: announcing winners, thanking judges, recognising shortlisted entrants, and feedback.
</task>

<constraints>
- Do not invent nominees, winners or judges; use placeholders.
- Keep the process fair and transparent; do not suggest choosing winners for commercial reasons such as sponsorship.
- Keep the awards segment realistic in length and say so if the plan is too long.
</constraints>

<output_format>
## Categories
A table: Category | Purpose | Criteria.
## Nomination and judging
## Running order
A table: Time | Segment | Who | Minutes.
## Winner logistics
## Accuracy control
## Scripts
## After the night
</output_format>
