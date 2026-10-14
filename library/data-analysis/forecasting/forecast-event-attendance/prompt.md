---
schema: 1
id: forecast-event-attendance
kind: prompt
title: Forecast event attendance
description: Forecasts how many people will actually turn up to an event from registrations, ticket type and past events, with a range, planning numbers for catering and staff, and signals to update it.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer, manager]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [no-shows, registrations, turnout, catering-numbers, event-capacity]
pairs_with:
  prompts: [plan-event-marketing, combine-expert-forecasts]
args:
  - name: event
    description: What the event is, date, day and time, location, whether it is free or paid (and price), audience, capacity limits, and anything competing for attention (weather season, other events, holidays).
    type: text
    required: true
  - name: registrations
    description: "Registrations or RSVPs so far, how many days before the event, broken down by type if possible (paid, free, members, speakers, staff, plus-ones), and reminders planned."
    type: text
    required: true
  - name: history
    description: Past similar events - registrations at the same point before the event, final registrations and actual attendance.
    type: text
output_contract:
  format: markdown
  sections: [Summary, What drives turnout here, Registration forecast, Attendance estimate, Planning numbers, Signals to update, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Registrations are not attendance. The gap depends mostly on what people have committed: free events routinely lose a large share of registrants, paid events lose far fewer, and people who were personally invited or have a role (speakers, volunteers, award nominees) almost always come. Registrations also keep arriving until the last days, so a count two weeks out is not the final count; past events give the share of final registrations usually reached by each point. Day of week, start time, weather, travel effort and competing events shift turnout, and reminders the day before reduce no-shows. Organisers plan different things off different numbers: venue safety off the maximum that could arrive, catering off expected attendance with a margin, and staffing off the peak hour. The organiser's own history beats any rule of thumb.

Event: {{event}}
{{#history}}

<history>
{{history}}
</history>
{{/history}}
</context>

<task>
<registrations>
{{registrations}}
</registrations>

1. List what drives turnout for this event: price or commitment, audience segments, timing, travel, weather, competing events, reminders. Mark each as raising or lowering turnout.
2. Registration forecast: if the count is not final, project final registrations from the share usually reached at this point (from history, or a labelled assumption if no history).
3. Attendance estimate: apply a show-up rate per segment (paid, free, invited roles, plus-ones), from history where available and otherwise from a stated, cautious range labelled as an assumption the organiser should replace with their own data. Give low, expected and high attendance.
4. Planning numbers: venue and safety (plan for the high end and say what happens if more arrive than capacity), catering (expected plus a margin, and how much waste the margin implies), staff and check-in (peak arrivals in the first 30 minutes), materials.
5. Signals to update the forecast: registration pace in the final week, reminder open or confirmation rates, weather forecast, and how each would move the estimate.
6. Assumptions, with the ones that matter most first, and what to record at this event so the next forecast is better.
</task>

<constraints>
- Do not present an industry no-show rate as a fact; any rate not from the organiser's history is a labelled assumption with a range.
- Never plan safety or capacity off the expected number; use the high case.
- Keep segments separate; a blended rate hides the difference between paid and free registrants.
- If the event is very small (under about 20 registrations), say that individual circumstances dominate and a rate-based estimate is rough.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Expected attendance with the range, and the planning number for catering and for capacity.

## What drives turnout here
Table: factor | effect | how strong.

## Registration forecast
Arithmetic and final registrations range.

## Attendance estimate
Table: segment | registrations | show-up rate | low | expected | high | source.

## Planning numbers
Table: decision | number to plan for | why.

## Signals to update
Bullets.

## Assumptions
Bullets, then what to record this time.
</output_format>
