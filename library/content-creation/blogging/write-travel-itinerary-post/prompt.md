---
schema: 1
id: write-travel-itinerary-post
kind: prompt
title: Write a travel itinerary post
description: Writes a publishable day-by-day itinerary post from the writer's own trip, with realistic pacing, logistics, dated costs, booking tips and who the route suits or does not.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, traveler]
requires: [none]
inputs: [notes, text]
output: [article, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [realistic-pacing, travel-writing, day-by-day, trip-costs, booking-tips]
pairs_with:
  prompts: [write-travel-story, write-local-guide-post, plan-itinerary]
args:
  - name: trip_notes
    description: Where you went, when, for how many days, what you did each day in order, how you got between places, where you stayed, what things cost (with currency), what you would change, and anything you booked ahead.
    type: text
    required: true
  - name: reader
    description: Who the itinerary is for, for example first-timers, families, budget backpackers, or travellers without a car.
    type: string
  - name: word_count
    description: Target length in words.
    type: number
    default: 2000
output_contract:
  format: markdown
  sections: [Post, Costs table, Recheck list, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a writer's own trip into an itinerary post that readers can actually follow. Readers use these posts as plans, so the failures hurt them: days that look fine on the page but ignore travel time between places, sights closed on the day suggested, prices with no date or currency, everything booked "on the day" when it sells out, and no word on who the pace suits. Strong itinerary posts are grouped by area, honest about pace, show how to get from A to B, say where to base yourself, mark what to book ahead, give a dated cost picture, and say plainly what the writer would do differently. They come from a real trip; they never pad with places the writer did not visit.
</context>

<task>
<trip_notes>
{{trip_notes}}
</trip_notes>

Reader: {{reader}}. Length: about {{word_count}} words.

1. Open with who this route suits (and who it does not), the season the writer went, the total days, and the pace (relaxed, moderate, packed).
2. Add an "at a glance" summary: the route day by day in one line each, where to stay, and how to get around.
3. Write each day: morning, afternoon and evening from the notes, how to get between places with the travel time the notes give, where to eat if the notes say, a tip, and what the writer would change. Flag days that look too full and offer what to drop.
4. Add a booking-ahead section for anything the notes say sold out or needed reservations, and a bad-weather or closure alternative per day if the notes give one.
5. Add the costs section from the notes, with the month and year of the trip and the currency.
6. Close with practical notes from the trip (money, transport passes, connectivity, access for people with limited mobility if known) and the "last checked" line.
</task>

<constraints>
- Use only places, routes, times and prices from the notes. Never add sights, restaurants, opening hours, prices or travel times the writer did not supply; put `[ADD: ...]` where the post would need one and list it under Gaps.
- Mark every price, opening time, timetable and booking rule with `[CHECK]` so the writer can verify it before publishing; these change often.
- Do not give visa, entry, vaccination or safety rules as fact; tell readers to check official government sources for their nationality.
- Mark any free or discounted stays or tours from the notes for disclosure.
</constraints>

<output_format>
## Post
Title, intro, at a glance, day sections, booking ahead, costs, practical notes, and the last-checked line. Word count at the end.

## Costs table
Table: item | cost from notes | currency | per person or total | trip month and year.

## Recheck list
Table: item | detail in the post | what to verify.

## Gaps
Every `[ADD]` item and anything a reader would expect that the notes do not cover.
</output_format>
