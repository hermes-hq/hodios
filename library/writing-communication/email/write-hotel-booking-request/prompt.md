---
schema: 1
id: write-hotel-booking-request
kind: prompt
title: Write a special request to a hotel or host
description: Writes a message to a hotel or rental host asking for an accessible room, early check-in, a group arrangement or a special-occasion touch, and asks them to confirm in writing.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [hotel-request, accessible-room, early-check-in, special-occasion, booking-confirmation]
pairs_with:
  prompts: [plan-arrival-day, answer-group-booking-enquiry, cancel-trip-bookings]
args:
  - name: booking
    description: The hotel or rental, booking reference, booking channel (direct, booking site), dates, room type and number of guests.
    type: string
    required: true
  - name: requests
    description: What you need and why, in order of importance - for example step-free access and a roll-in shower, arrival at 8am after a night flight, adjoining rooms for a family, a cot, quiet room, dietary needs for breakfast, a birthday or anniversary, parking, luggage storage.
    type: text
    required: true
  - name: language
    description: The language to write in if not English, for example the hotel's local language, with an English copy.
    type: string
output_contract:
  format: markdown
  sections: [Message, Short version for the booking site, What to confirm, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hotel front desks see requests in the booking notes that are vague ("nice room please"), arrive too late, or never reach the property because they were typed into a third-party site. Frequent travellers know what works: send the request to the property directly a week or two ahead, quote the booking reference, list requests in order of importance, separate needs (accessibility, a cot, allergies) from preferences (high floor, view), and ask for written confirmation of the needs, since "request noted" is not the same as "guaranteed". For accessibility, specific details beat labels: door widths, step-free route, roll-in shower, grab rails, bed height, distance from the lift. Early check-in and late check-out are usually subject to availability or a fee; asking about luggage storage and a shower option is the useful fallback.
</context>

<task>
Write a request to the property for this booking.{{#language}} Language: {{language}}.{{/language}}

<booking>
{{booking}}
</booking>

<requests>
{{requests}}
</requests>

1. If the booking reference or dates are missing, use [placeholders] and list them under "What to confirm".
2. Subject: "Booking [reference], [dates]: request for [main need]".
3. One line: who you are and the booking.
4. Requests as a numbered list, needs first, then preferences, each specific (for accessibility: the exact features needed; for early check-in: arrival time and the fallback of luggage storage or a shower; for a group: room adjacency and a single bill or split bills; for an occasion: what would be appreciated, without asking for freebies).
5. Ask them to confirm in writing which needs are guaranteed and whether any fee applies, and by when you need to know so you can change plans if not.
6. Thank them briefly.
7. A short version under 300 characters for the booking site's request box, pointing to the email.
8. If a language other than English is requested, write the message in that language, followed by the English version, and keep names, dates and references unchanged.
9. Under "What to confirm", list what to check in their reply and the fallback if a need cannot be met.
</task>

<constraints>
- Message body under about 160 words.
- Never invent booking references, prices, hotel policies or facilities; ask rather than assume.
- Polite and specific, no entitlement or demands for upgrades. Do not ask for complimentary items unless the user wants to; it is fine to mention the occasion.
- Medical or allergy details: include only what the hotel needs to act on.
</constraints>

<output_format>
## Message
Subject, then body.
## Short version for the booking site
Under 300 characters.
## What to confirm
Bullets.
## Notes
"None" if nothing.
</output_format>
