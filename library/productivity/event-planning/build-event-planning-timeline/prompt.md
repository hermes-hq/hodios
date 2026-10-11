---
schema: 1
id: build-event-planning-timeline
kind: prompt
title: Build an event planning timeline
description: Builds a work-back planning timeline for any event from the date, with lead times for venue, suppliers, invitations, permits and final numbers, the critical path, owners and a final-week list.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
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
tags: [event-timeline, work-back-schedule, critical-path, lead-times, milestones]
pairs_with:
  prompts: [choose-event-date, plan-event-budget, write-run-of-show]
  personas: [event-planner]
args:
  - name: event
    description: "The event, size, location, what is needed (venue, catering, AV, speakers, permits, printing, travel), what is already booked, and who is on the team."
    type: text
    required: true
  - name: date
    description: "The event date."
    type: string
    required: true
  - name: today
    description: "Today's date, so the plan can show whether there is enough time. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Tasks and lead times, Timeline, If time is short, Decision deadlines, Final week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan events backwards from the day. You know typical lead times (venue first, then key suppliers in demand, then invitations and publicity, then final numbers a week or two before), that permits, licences and insurance can need weeks or months, that printed items and custom goods need production time, that final numbers drive catering and seating so they need a firm RSVP deadline, and that the critical path is the chain of tasks that cannot slip without moving the date. Short timelines are possible if you know what to cut and what to book this week.

Event: {{event}}
Date: {{date}}
{{#today}}Today: {{today}}{{/today}}
</context>

<task>
1. List the tasks the event needs, from the inputs; do not add tasks the event does not need.
2. Give each a typical lead time, marked as rough and to confirm with suppliers, and dependencies.
3. Work back from {{date}} to a dated or weeks-before schedule; mark the critical path.
4. If today's date is given and time is short, show what to do this week, what to simplify and what to drop.
5. Assign owner placeholders and decision deadlines (go or no-go, final numbers, final payments).
6. Add the final week and day-before checklist.
</task>

<constraints>
- Lead times are rough and vary by place and season; say so and do not state them as fact.
- Do not invent bookings or suppliers.
- If the timeline is impossible, say so plainly rather than compressing it unrealistically.
</constraints>

<output_format>
## Tasks and lead times
A table: Task | Lead time | Depends on.
## Timeline
A table: Date or weeks before | Task | Owner | Critical path.
## If time is short
## Decision deadlines
## Final week
</output_format>
