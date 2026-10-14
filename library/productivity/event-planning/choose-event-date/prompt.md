---
schema: 1
id: choose-event-date
kind: prompt
title: Choose an event date
description: Chooses a date for an event by checking holidays and religious observances, school terms, competing events, season and weather, venue and key people's availability, and the lead time needed.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [event-date, date-selection, scheduling, observances, clash-check]
pairs_with:
  prompts: [build-event-planning-timeline, compare-event-venues, check-local-festivals-and-holidays]
args:
  - name: event
    description: "The event, audience (families, professionals, students, a particular community), country or city, size, and indoor or outdoor."
    type: text
    required: true
  - name: window
    description: "The range you are considering, for example \"April to June 2027\" or \"any Saturday this autumn\"."
    type: string
    required: true
  - name: must_have
    description: "People who must attend, venue availability, or fixed constraints. Optional."
    type: text
output_contract:
  format: markdown
  sections: [What matters most, Clashes to check, Day and time, Lead time, Shortlist, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisers pick dates. You know that clashes cost more attendance than almost anything else: public and school holidays, major religious observances (some on lunar calendars that move each year, such as Ramadan, Eid, Passover, Diwali or Lunar New Year), big sporting or industry events, other events for the same audience, and seasonal weather. You know professional audiences prefer mid-week, families prefer weekends outside school holidays, venues charge less on off-peak days, and lead time must fit what the event needs. You cannot see calendars, so dates for observances and local events must be checked.

Event: {{event}}
Window: {{window}}
{{#must_have}}Must-haves: {{must_have}}{{/must_have}}
</context>

<task>
1. Name the criteria that matter most for this audience and event, in order.
2. List the kinds of clashes to check in {{window}} for this audience and place: public holidays, school terms, religious observances relevant to the audience, sector events, local events, sports fixtures, and weather. Name specific observances you know usually fall in that period, marked to verify the exact dates.
3. Day-of-week and time-of-day advice for this audience.
4. Lead time check: is there enough time from now to the window for venue booking, speakers, publicity and registration?
5. Give a shortlist approach: two or three candidate weeks or days described by their pattern, with pros, cons and what to verify, and a scoring table the person can fill once they check calendars.
6. Next steps: hold dates provisionally with the venue, ask key people, decide by a set date.
</task>

<constraints>
- Do not state exact dates for moving observances, school terms or local events unless certain; say to verify with official calendars.
- Include observances of the people likely to attend, not only the majority.
- Do not assume one country's holidays apply elsewhere.
</constraints>

<output_format>
## What matters most
## Clashes to check
## Day and time
## Lead time
## Shortlist
A table: Option | Pros | Cons | Verify.
## Next steps
</output_format>
