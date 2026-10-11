---
schema: 1
id: write-place-review-post
kind: prompt
title: Write a place review post
description: Writes an honest review post of a restaurant, café, hotel or attraction the writer visited, with visit details, specifics, prices, access, a fair verdict and who it suits.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [restaurant-review, hotel-review, honest-verdict, disclosure, fair-comment]
pairs_with:
  prompts: [write-local-guide-post, write-product-review-post, write-travel-story]
args:
  - name: visit_notes
    description: The place, when you went and with whom (in general terms), what you ordered, did or stayed in, what was good and bad in specific detail, what you paid, the service, the setting, access details, and any photos you took.
    type: text
    required: true
  - name: place_type
    description: The kind of place.
    type: enum
    enum: [restaurant, cafe, hotel, attraction, other]
    default: restaurant
  - name: disclosure
    description: How the visit was paid for - paid yourself, invited or comped, discounted, or a paid partnership.
    type: string
    default: paid myself
output_contract:
  format: markdown
  sections: [Review post, Facts box, Recheck list, Fairness check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write review posts of places from the writer's own visit. Readers trust place reviews that are specific and honest: when the visit happened, what exactly was eaten, stayed in or seen, what it cost, what was good and what was not, and who the place suits. Reviews lose trust when every visit is glowing, when the writer was hosted for free and does not say so, and when vague praise ("amazing vibes") replaces detail ("the window tables are draughty in winter"). A single visit is one data point, and a fair reviewer says so. Reviews can also create legal risk: honest opinion based on the writer's experience is generally fine, but stating as fact that a place is unhygienic, dishonest or breaking the law needs evidence. Fake reviews of places the writer did not visit are banned outright in many countries.
</context>

<task>
<visit_notes>
{{visit_notes}}
</visit_notes>

Place type: {{place_type}}. Disclosure: {{disclosure}}.

1. Open with the verdict in one or two sentences and who the place is for, then the disclosure line if the visit was not paid for in full.
2. Give the visit context: when (month and year, day of week or time if relevant), the occasion, and how many visits this is based on.
3. Write the experience in order with specific details from the notes. For a restaurant or café: setting, service, each dish or drink, value. For a hotel: arrival, room, sleep quality, breakfast, location, staff. For an attraction: getting there, queues, the experience, facilities, time needed.
4. Give the good and the not-so-good in balance, each tied to a specific moment from the notes.
5. Add who it suits and who it does not, and value for money at the price paid.
6. Close with practical tips from the notes: booking, best time, what to order or which room to ask for.
</task>

<constraints>
- Use only details from the notes. Never invent dishes, prices, staff names, opening hours or facilities. Put `[ADD: ...]` where something useful is missing.
- Write criticism as the writer's experience and opinion ("my steak arrived lukewarm"), not as accusations of fact about hygiene, safety, legality or dishonesty unless the notes include evidence such as an official inspection result. Flag any such claim in the Fairness check.
- Do not name or describe staff in a way that identifies and criticises an individual; describe the service instead.
- If the writer did not visit, or asks for a review of their own business or a competitor, decline and explain that fake or undisclosed reviews mislead readers and are unlawful in many places.
- Disclose any free, discounted or paid visit clearly near the top.
</constraints>

<output_format>
## Review post
Title, verdict, disclosure, sections with subheadings, tips. Word count at the end.

## Facts box
Name, area, type, visit date, price paid or price range from the notes, booking, access notes, each marked `[CHECK]` where it may change.

## Recheck list
Every price, opening time and detail to verify before publishing.

## Fairness check
Bullets on balance, any claim that reads as fact rather than opinion, identifiable individuals, and the disclosure.
</output_format>
