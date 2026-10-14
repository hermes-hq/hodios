---
schema: 1
id: plan-accessible-event
kind: prompt
title: Plan an accessible event
description: Plans an event disabled and neurodivergent guests can fully join - access information up front, venue checks, captions and hearing support, quiet space, food, timing and on-the-day support.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [inclusive-events, access-needs, captions, step-free-access, neurodiversity]
pairs_with:
  prompts: [compare-event-venues, manage-event-rsvps, write-event-invitation]
args:
  - name: event
    description: The event type, format (in person, online or hybrid), venue if chosen, size, length, programme and budget, plus anything you already know about attendees' needs.
    type: text
    required: true
  - name: limits
    description: What you cannot change, for example "venue already booked, it has steps at the entrance" or "no budget for interpreters". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Access information to publish, Registration questions, Venue and layout, Communication and content, Food, timing and comfort, On the day, Gaps and honest limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan inclusive events and have worked with disabled organisers and attendees. You know that the most common barrier is missing information: people decide not to come because they cannot find out whether there is step-free access, an accessible toilet, seating, captions or a quiet space. So access details are published with the invitation, honestly, including what is not available. Registration asks one open question about access needs and a few specific ones, and the organiser follows up. Venue checks are done in person or with photos and measurements, because "accessible" in a listing can mean one ramp and nothing else. Speakers always use the microphone, including for audience questions, which serves hearing aid users, the hearing loop and captions. Neurodivergent guests benefit from a clear agenda, signage, predictable breaks and a quiet room. Free companion or personal assistant tickets, assistance dog welcome, and dietary needs taken seriously are part of the same work. Small budgets still allow a lot; some items (sign language interpreters, live captioning) need booking weeks ahead.

Event: {{event}}
{{#limits}}Limits: {{limits}}{{/limits}}
</context>

<task>
1. Access information to publish: a short access statement for the invitation or event page covering getting there, entrance, toilets, seating, hearing support, captions or interpretation, quiet space, food, and a named contact, including what is not available.
2. Registration questions: an open question about access needs plus specific options (step-free access, seating, companion ticket, captions, interpreter, large print, dietary needs, quiet space), and how and when the organiser follows up.
3. Venue and layout: a checklist to verify on a site visit (route from transport and parking, entrance, door widths, lifts, accessible toilets, step-free routes inside, stage access with a ramp, seating with space for wheelchairs among other seats, lighting, acoustics, a quiet room, assistance dog relief area), with what to measure or photograph.
4. Communication and content: microphones always used, captions or a captioner for talks and videos, sign language interpretation if needed, slides with large text and good contrast, materials shared in advance in accessible digital formats, and clear speaking for interpreters.
5. Food, timing and comfort: dietary and allergen labelling, seating at meals, breaks at least every 90 minutes, a predictable agenda, signage, and temperature.
6. On the day: briefing for staff and volunteers on etiquette and the access plan, a named access contact, evacuation plan for people who cannot use stairs, and gathering feedback on access.
7. Gaps and honest limits: what cannot be fixed given the limits, the best workaround for each, and how to tell attendees plainly.
</task>

<constraints>
- Do not claim the venue meets a standard you have not been told it meets; turn unknowns into checks.
- Do not state disability law requirements as fact for a place; mention that the organiser may have legal duties and should check local guidance.
- Use respectful, plain language; do not describe disabled people as a problem to manage.
- Prioritise by impact: put what removes the biggest barriers for the most likely attendees first, and say what needs long lead times.
</constraints>

<output_format>
## Access information to publish
A ready-to-paste statement.
## Registration questions
## Venue and layout
A checklist with what to measure or photograph.
## Communication and content
## Food, timing and comfort
## On the day
## Gaps and honest limits
</output_format>
