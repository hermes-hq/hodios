---
schema: 1
id: write-community-radio-segment
kind: prompt
title: Write a community radio segment
description: Writes a community radio show segment with links between tracks, local listings, a short interview plan and a running order timed to the second for live broadcast.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator]
requires: [none]
inputs: [notes, text]
output: [script, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [live-radio, running-order, links, backtiming]
pairs_with:
  prompts: [write-guest-interview-questions, write-radio-ad, write-podcast-intro-outro]
args:
  - name: show
    description: The show's name, station, time slot, audience and presenting style, plus station rules you must follow (station ID times, no commercial endorsements, language policy).
    type: string
    required: true
  - name: segment_minutes
    description: Length of the segment in minutes, from the opening link to the hand-back.
    type: number
    default: 15
  - name: items
    description: "What goes in: tracks with exact durations and intros or outros, news or listings items with dates, guests with who they are and why they are on, any promos or idents."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Running order, Link scripts, Interview plan, Listings, Timing safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Live radio runs on the clock. A segment that overruns by a minute eats the news; one that underruns leaves dead air. Presenters handle this with a running order timed to the second, backtiming from the hard out, scripted links that back-announce and forward-promote, interviews with a planned hard stop, and items that can be dropped or stretched when things move. Community radio adds its own duties: station identification, local listings that must be accurate, fairness when local issues are discussed, and usually no on-air commercial endorsement.
</context>

<task>
Write a {{segment_minutes}}-minute live segment for {{show}}.

<items>
{{items}}
</items>

1. If track durations are missing, ask for them in one message and stop: the running order cannot be timed without them. If listings lack dates, times or venues, include them with [CONFIRM] rather than guessing.
2. **Running order.** A table with start time (from 00:00 at the segment start), item, duration, end time, and notes (fade, talk over intro, hit the vocal). Talk links typically run 30 to 90 seconds. The final end time must equal {{segment_minutes}}:00 exactly, with the hand-back as the last item.
3. **Link scripts.** Write each link in the presenter's spoken style: back-announce the track just played (title and artist as supplied), the station ID where the rules require it, one piece of content (a listing, a teaser, a listener message), and the forward-announce. Where a track has an instrumental intro, mark how many seconds the presenter can talk over it and end the link before the vocal. Keep sentences short and easy to say live.
4. **Interview plan.** For each guest: a one-line on-air introduction, the purpose of the chat, five questions in order (the most important first, in case time runs out), a planned hard stop with a polite wrap line, and a plug for their event or work stated factually without commercial endorsement. Note any sensitive topics where fairness or balance matters and how to handle them on air.
5. **Listings.** Each local listing written for the ear: what, where, when, cost (free or not), and how to find out more, with [CONFIRM] on anything not supplied.
6. **Timing safety.** Backtiming notes: the latest time each item must start to hit the hand-back; one item marked "drop if late" and one "stretch if early" (a short evergreen piece or an extra listing, 30 to 60 seconds); and the exact words for the hand-back.
7. Before answering, add up the durations and check that they total {{segment_minutes}} minutes to the second, and that every track has a back-announce.
</task>

<constraints>
- Use only track titles, artists and facts the user supplied; do not invent details about real local people, venues or events.
- Respect the station rules in the show description; if none are given, assume station ID at the top of the segment and no commercial endorsements, and say so.
- Do not script on-air personal attacks or unverified allegations about local people or organisations.
</constraints>

<output_format>
## Running order
Table: Start | Item | Duration | End | Notes.
## Link scripts
One block per link, labelled with its start time.
## Interview plan
## Listings
## Timing safety
</output_format>
