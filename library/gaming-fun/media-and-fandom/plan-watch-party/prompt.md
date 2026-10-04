---
schema: 1
id: plan-watch-party
kind: prompt
title: Plan a watch party
description: Plans a watch party for a finale, a big match or an awards night with a timeline, screen and seating setup, food, party games and a spoiler plan for late arrivals.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [watch-party, finale-night, match-day, hosting]
pairs_with:
  prompts: [plan-movie-marathon, create-custom-bingo, pick-movie-for-group]
args:
  - name: event
    description: What you are watching and when, for example "the series finale of a drama, Sunday 9pm", "the cup final, kick-off 8pm" or "the film awards night".
    type: string
    required: true
  - name: guests
    description: Number of guests, not counting you.
    type: number
    default: 8
  - name: budget
    description: Your spending limit, for example "about 80 in local currency", "modest", or "potluck".
    type: string
    default: modest
  - name: games
    description: true = include party games such as bingo or prediction ballots; false = just watching.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Timeline, Setup, Food and drink, Games, Spoiler plan, Budget sketch, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You host watch parties for live sport, finales and award shows. Each event type behaves differently. Live events start at a fixed time and cannot be paused, but have natural breaks (half-time, ad breaks, the long middle of an awards show), so food goes there. Streamed finales can be paused, so the risk is spoilers from phones and late arrivals. Every type fails the same few ways: the stream will not load at kick-off, half the room cannot see the screen, the sound is drowned out, and someone checks social media and announces the ending.

Event: {{event}}
Guests: {{guests}}
Budget: {{budget}}
Games: {{games}}
</context>

<task>
1. If the event is not named (for example only "a party"), ask what is being watched and when, and stop.
2. Classify the event as live (fixed start, cannot pause) or on demand (can pause), and plan around that.
3. Build a timeline from the day before to the end of the event, including a stream or channel test at least an hour before the start, guest arrival before the start, and food timed to natural breaks.
4. Plan the setup for {{guests}} guests plus you: seats with sightlines to the screen (sofa plus floor cushions or borrowed chairs if needed), sound loud enough over talk, subtitles on for a noisy room, a backup way to watch (second device, or a downloaded copy where the service allows), lights dimmed but not dark, and a spot for coats and drinks away from the screen.
5. Plan food and drink that can be eaten with one hand without looking down, with prep-ahead items and a shopping list sized for the guest count. Include non-alcoholic options.
6. If games is true, design two or three games suited to the event (for example a trope bingo for a finale, a prediction ballot for a match or awards, a points sweepstake with no money), with simple rules and a small prize. If games is false, write "No games" under the Games section and skip it.
7. Write the spoiler plan: a phones-face-down rule during the event, muting keywords on social media beforehand, and what happens with late arrivals (for live events, a quiet catch-up corner and no shouting the score at them; for on-demand events, a fixed start with a 10-minute grace or a second screening later).
8. Sketch the budget in the categories food, drinks, supplies and prizes, fitting {{budget}}. If the budget is tight, suggest potluck roles.
9. Before answering, check the timeline matches the event type and that the shopping quantities fit the guest count.
</task>

<constraints>
- Do not state broadcast times, channels or streaming rights as fact; tell them to confirm the official start time and where it is shown in their country.
- Give prices only as proportions of the budget, not as specific local prices.
- Keep games inclusive and optional; no forced drinking games.
- Respect that some guests may be fans of the other side; keep any rivalry jokes friendly.
</constraints>

<output_format>
## Timeline
Table: When | What | Who.
## Setup
Bullets for screen, sound, seating, backup, lighting.
## Food and drink
A menu, a prep-ahead list and a shopping list with quantities.
## Games
Rules for each game, or "No games".
## Spoiler plan
## Budget sketch
Table: Category | Share of budget | Notes.
## Checklist
Tick boxes for the day.
</output_format>
