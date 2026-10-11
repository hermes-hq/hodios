---
schema: 1
id: run-event-debrief
kind: prompt
title: Run an event debrief
description: Turns notes, feedback, attendance and budget figures from a finished event into a debrief - results against goals, what worked, what to change, supplier notes, incidents and a file for next time.
category: event-planning
version: 1.0.0
status: incubating
stage: [review]
role: [individual, operations-manager, marketer, project-manager]
requires: [none]
inputs: [notes, dataset, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [post-event-review, lessons-learned, attendee-feedback, events]
pairs_with:
  prompts: [plan-event-budget, write-event-recap, write-donor-thank-you]
args:
  - name: event
    description: What the event was, its date, and the goals it was meant to meet (numbers, money raised, leads, satisfaction, a community outcome).
    type: text
    required: true
  - name: evidence
    description: What you have - registrations and attendance, budget planned against actual, survey results or comments, team notes, supplier issues, incidents. Paste as much as you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Results against goals, What worked, What to change, Money, Suppliers and venue, Incidents and near misses, Next time file, Thank-yous]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run event debriefs that make the next event better. You know the debrief has to happen within a week or two, while memories are fresh and before the receipts are lost, and that it should be blameless: it looks at what happened and why, not who to blame. You separate the measures that matter (goals met, attendee experience, money, safety) from noise, and read feedback with care: a few loud comments are not the room, survey responders are not everyone, and low response rates limit conclusions. You look for root causes ("the queue was long" is a symptom; "one check-in desk for 300 arrivals in 15 minutes" is the cause). The most useful output is a short "next time" file that a different organiser could pick up next year: what to keep, what to change, supplier notes, real timings and real costs.

Event: {{event}}
Evidence:
<evidence>
{{evidence}}
</evidence>
</context>

<task>
1. Results against goals: each goal with the target, the result and a verdict (met, partly met, missed), with the evidence and any caveat about the data.
2. What worked: the things to keep, with why they worked.
3. What to change: each problem with the likely root cause and a specific change, ranked by impact on the next event.
4. Money: planned against actual by line, the biggest variances and why, and cost per attendee.
5. Suppliers and venue: what each did well or badly, whether to rebook, and what to put in the brief or contract next time.
6. Incidents and near misses: what happened, how it was handled, and what to change in the plan or risk assessment. Flag anything that still needs a follow-up (an injury report, an insurance notice, a complaint reply).
7. Next time file: a checklist of the key timings, lead times, real costs, contacts by role, and decisions to make earlier.
8. Thank-yous: who should be thanked (volunteers, speakers, sponsors, suppliers, venue staff) and anything specific to mention.
</task>

<constraints>
- Use only the evidence given; do not invent numbers or feedback. Say where evidence is thin and what to collect next time.
- Keep it blameless: describe actions and systems, not people's character. If the notes blame an individual, reframe to what happened and what would prevent it.
- Do not overstate survey results; give response counts and rates where known.
</constraints>

<output_format>
## Results against goals
A table: Goal | Target | Result | Verdict | Evidence.
## What worked
## What to change
A table: Problem | Root cause | Change | Impact.
## Money
## Suppliers and venue
## Incidents and near misses
## Next time file
## Thank-yous
</output_format>
