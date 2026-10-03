---
schema: 1
id: find-meeting-time-across-time-zones
kind: prompt
title: Find a meeting time across time zones
description: Finds fair meeting slots across time zones from participants' locations and working hours, and rotates the inconvenience for recurring meetings.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, manager, operations-manager, individual]
requires: [none]
inputs: [text]
output: [table, plan, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [time-zones, scheduling, distributed-teams, daylight-saving, fair-rotation]
pairs_with:
  prompts: [design-meeting-cadence, run-hybrid-meeting, write-meeting-agenda]
args:
  - name: participants
    description: Each person or group with their city (not just an abbreviation like "EST"), working hours, and any constraints (for example "Ana - São Paulo, 9-18, no Fridays; Dev team - Bengaluru, 10-19"). Add the date or week you are planning for.
    type: text
    required: true
  - name: duration_minutes
    description: Length of the meeting in minutes.
    type: number
    default: 60
  - name: recurring
    description: Whether this is a recurring meeting (true) that should rotate the inconvenience, or a one-off (false).
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Assumptions, Overlap, Best slots, Rotation, Daylight-saving watch, Invitation note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a scheduler for globally distributed teams. Time-zone scheduling goes wrong in three ways: arithmetic errors with UTC offsets, forgetting that daylight-saving time starts and ends on different dates in different countries (and that many countries, including most of Asia, Africa and parts of the Americas, do not change their clocks at all), and always putting the same people on the early or late end. Abbreviations like "EST" or "IST" are ambiguous; city names are not.

<participants>
{{participants}}
</participants>

Meeting length: {{duration_minutes}} minutes. Recurring: {{recurring}}.
</context>

<task>
1. Assumptions: for each participant, the city or IANA time zone, the UTC offset you are using and the date it applies to, and their working hours. If a location is missing or only an ambiguous abbreviation is given, ask for the city in one message and stop. If no date is given, state the date range you assume and note that the answer depends on it.
2. Convert everyone's working hours to UTC and show the overlap window. Show your conversions so they can be checked.
3. If there is an overlap of at least {{duration_minutes}} minutes, propose the best two or three slots inside it, preferring times away from the very start and end of anyone's day and away from lunch. If there is no full overlap, propose the least bad options and say exactly who would be outside working hours and by how much.
4. Show each proposed slot in every participant's local time, with the day of the week (a slot can fall on a different day for someone across the date line).
5. If recurring is true, design a fair rotation: for example alternate between two slots each week or month so the early or late burden moves between regions, and show who carries the burden in each slot. Also suggest an async alternative for weeks when the burden is too heavy (a recorded update, a written round).
6. Daylight-saving watch: list any clock changes for these locations in the next few months that would shift the meeting for some participants, with the approximate dates, and what the slot becomes after each change. Recommend anchoring the meeting to the time zone of the person most constrained, and say so in the invitation.
7. Draft a short invitation note listing the time in each participant's zone and, if recurring, the rotation.
</task>

<constraints>
- Show every conversion; do not present a time you have not converted step by step.
- Daylight-saving rules change and differ by country: give the dates as "around" and recommend checking with the calendar tool, which handles time zones automatically when the meeting is created in one anchor zone.
- Never schedule anyone outside their stated working hours without saying so explicitly.
- Do not assume a weekend: some participants may work Sunday to Thursday; use what is stated, and ask if it seems likely to matter.
</constraints>

<output_format>
## Assumptions
Table: Participant | Location / zone | UTC offset on [date] | Working hours (local) | Working hours (UTC).

## Overlap
The UTC overlap window, or "no full overlap" with the closest gap.

## Best slots
Table: Option | UTC | each participant's local time and day | Who is stretched.

## Rotation
Only if recurring: the schedule and who carries the burden when.

## Daylight-saving watch
Bullets with approximate dates and the effect.

## Invitation note
Ready to paste.
</output_format>
