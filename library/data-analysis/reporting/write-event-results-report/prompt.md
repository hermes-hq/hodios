---
schema: 1
id: write-event-results-report
kind: prompt
title: Write a post-event results report
description: Writes a post-event report with attendance against registrations, feedback with response rates, full cost per attendee, outcomes against objectives and recommendations for the next one.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, manager, operations-manager, project-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [event-evaluation, attendance-rate, cost-per-attendee, attendee-feedback, post-event]
pairs_with:
  prompts: [forecast-event-attendance, plan-fundraising-event, write-campaign-results-report]
args:
  - name: event_objectives
    description: "What the event was for and the targets set beforehand: attendance, leads or pipeline, funds raised, sales, learning outcomes, satisfaction, media coverage."
    type: text
    required: true
  - name: event_data
    description: "Registrations and attendance (by ticket type or segment), session attendance, feedback survey results with response count, full budget and actual costs, income (tickets, sponsors), leads or outcomes captured, and any incidents."
    type: text
    required: true
  - name: event_type
    description: "In person, virtual or hybrid; free or paid; conference, trade show, gala, workshop, community event; and the audience for the report. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Summary, Attendance, Feedback, Costs and income, Outcomes against objectives, Lessons and recommendations, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A post-event report decides whether the event runs again and in what form, so it has to be honest about cost and outcome, not just the mood in the room. Event professionals know the measures that matter. Registration-to-attendance rate depends heavily on whether the event was free or paid and in person or virtual, so it is compared with the organiser's own past events, not with a generic figure. Feedback scores come from a minority of attendees, usually the most engaged, so the response rate goes next to every score, and session-level ratings with few responses are not ranked. Full cost per attendee includes venue, catering, AV, travel, staff time and agency fees, net of sponsor and ticket income; reporting only the venue bill makes events look cheap. For business events, leads and pipeline take months to show and should be tracked over an agreed window, separating new contacts from existing customers and prospects already in the pipeline. Operational incidents, accessibility issues and safety near misses belong in the report so the next event fixes them.

{{#event_type}}Event type: {{event_type}}{{/event_type}}
</context>

<task>
<event_objectives>
{{event_objectives}}
</event_objectives>

<event_data>
{{event_data}}
</event_data>

1. Report registrations, attendance and the attendance rate overall and by segment or ticket type, compared with past events if supplied.
2. Summarise feedback with response count and rate, overall scores, the best and weakest elements, and themes from comments with counts.
3. Compute full cost, net cost after income, and net cost per attendee; show any cost lines that are missing from the data.
4. Score each objective as met, partly met or missed; for leads or pipeline, separate new from existing contacts and state the tracking window.
5. Note operational issues, accessibility problems and incidents.
6. Recommend what to keep, change or drop next time, and whether to run the event again, each tied to evidence.
</task>

<constraints>
- Compute only from the data given; show the arithmetic for rates and cost per attendee.
- Put the response count beside every feedback score; do not rank sessions on a handful of responses.
- Do not count existing pipeline or customers as event-generated leads.
- Do not invent industry benchmarks for attendance or satisfaction.
- Do not name attendees or quote comments that identify a person.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: attendance, satisfaction, net cost per attendee, objectives met, the recommendation.

## Attendance
Table: Segment | Registered | Attended | Attendance rate | Previous event.

## Feedback
Scores with response counts, top and weakest elements, comment themes with counts.

## Costs and income
Table: Line | Budget | Actual. Then full cost, income, net cost and net cost per attendee.

## Outcomes against objectives
Table: Objective | Target | Result | Status.

## Lessons and recommendations
Keep, change, drop, and a run-again recommendation.

## Data notes
Bullets: missing costs, survey bias, tracking window.
</output_format>
