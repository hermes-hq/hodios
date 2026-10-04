---
schema: 1
id: write-sandwich-board-lines
kind: prompt
title: Write sandwich board lines
description: Writes a week of pavement sign and chalkboard lines for a cafe, shop, pub or salon, with hooks of five words or fewer, a rotation of angles and a board layout sketch.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [a-board, chalkboard, footfall, signage, shopfront]
pairs_with:
  prompts: [write-outdoor-ad-copy, write-taglines, write-menu-descriptions, write-shelf-talkers]
args:
  - name: business
    description: What you sell, the street or spot where the board stands, who walks past and when (office workers at 8am, school-run parents, weekend shoppers), your prices or best sellers, and anything locals know you for.
    type: text
    required: true
  - name: this_week
    description: Anything happening this week - specials, new stock, an event, the weather forecast, a local match or market day. Optional.
    type: text
  - name: humour
    description: How much humour the lines carry - none, light (warm wordplay) or cheeky (bolder jokes that still suit families walking past).
    type: enum
    enum: [none, light, cheeky]
    default: light
output_contract:
  format: markdown
  sections: [Board rules for your spot, Week of lines, Board layout, Rotation and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pavement boards (A-boards, sandwich boards, chalkboards) for independent shops, cafes, pubs and salons. A walker passes a board in about two seconds, often looking at a phone, so a board earns its place only if the hook reads in one glance and gives a reason to step inside now. Boards fail in three common ways: too many words in small chalk lettering, the same line for weeks so regulars stop seeing it, and jokes that get a smile but say nothing about what is sold. A line that changes daily gives regulars a reason to look and gives the board a personality people photograph and share.

Humour level: {{humour}}
</context>

<task>
<business>
{{business}}
</business>

{{#this_week}}<this_week>
{{this_week}}
</this_week>{{/this_week}}

1. If you do not know what the business sells or where the board stands, ask for those two things and stop.
2. Work out the moment: who passes, which direction they walk, the time of day, and what they want then (coffee before work, a treat after school, a pint after the match). If the board is seen from both directions, plan a different message for each side.
3. Write seven days of lines, mixing these angles across the week: offer or price, humour, local reference, seasonal or weather, practical (open now, card accepted, dogs welcome, step-free), and product spotlight. Each line has:
   - a hook of five words or fewer, readable in one glance;
   - one supporting line of up to eight words (the offer, price or detail);
   - an optional pointer ("Inside, 10 steps", an arrow, "Open till 7").
4. Ground every line in supplied facts. Prices, events and products come only from the input; anything you would need to confirm is marked [check].
5. Sketch the board layout: hook at the top in the largest letters, at most three elements in total, lots of empty space, plain print-style lettering, high contrast (white or yellow chalk on black), one small drawing at most.
6. Give rotation and check advice: when to change the line (daily for regulars, mid-afternoon for a second audience), how to test which lines bring people in (ask "what brought you in?" for a week, or a "mention the board" offer), and where to place the board so it does not block the pavement.
</task>

<constraints>
- Hooks are five words or fewer; count them. Never more than three elements on one side of the board.
- No invented prices, awards, reviews or events.
- Keep humour kind and suitable for children walking past: no jokes about groups of people, politics, or drinking to excess. For pubs, keep alcohol lines about the place and the occasion, not about getting drunk.
- Remind the owner that many councils require a permit for pavement boards and a clear walkway width for wheelchairs, prams and people with visual impairments; tell them to check the local rules rather than stating them.
- If a supplied idea would mislead (fake "last day" sale, "best coffee in town" with no basis), rewrite it honestly and say why.
</constraints>

<output_format>
## Board rules for your spot
Three or four bullets: who passes, when, which direction, and what the board must do for them.

## Week of lines
Table: Day | Angle | Hook (5 words max) | Supporting line | Pointer | Hook word count. Add a second table for side B if the board is seen from both directions.

## Board layout
A simple text sketch of one board side showing hook, supporting line and pointer placement, plus lettering and colour notes.

## Rotation and checks
Bullets: when to change lines, how to track which lines work, placement and permit reminders, and any [check] items.
</output_format>
